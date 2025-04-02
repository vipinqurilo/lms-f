"use client";

import { useState, useEffect } from "react";
import { BookingLayout } from "./BookingLayout";
import { PaymentSelection } from "./PaymentSelection";
import { SubjectSelection } from "./SubjectSelection";
import { DurationSelection } from "./DurationSelection";
import ScheduleCalendar from "./ScheduleCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAsync } from "@/store/slices/student-dashboard/profileSlice";
import { createBookingAsync, createBookingPayment } from "@/store/slices/bookingSlice";
import { createPayfastBookingCheckout, clearPayfastCheckoutData } from "@/store/slices/paymentSlice";    
import { toast } from "react-hot-toast";
import CheckoutForm from "@/components/payment/CheckoutForm";
import PayfastCheckout from "@/components/payment/PayfastCheckout";
import { useRouter } from "next/router";
import PayfastCheckoutForm from "../../components/payment/PayfastCheckoutForm";

export function BookingModal({ onClose, tutor }) {
  const router = useRouter();
  const [isModalOpen, setisModalOpen] = useState(false);

  const [paymentModal, setPaymentModal] = useState(false);
  const [payfastModal, setPayfastModal] = useState(false);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { profile } = useSelector((state) => state.student.profile);
  const { authUser } = useSelector((state) => state.user);
  const { payfastCheckoutData } = useSelector((state) => state.payment);
  const [subject, setSubject] = useState(tutor?.subjectsTaught[0] || null);
  const [duration, setDuration] = useState(
    tutor?.tutionSlots && tutor?.tutionSlots[0] ? tutor?.tutionSlots[0] : null
  );
  const { bookingsByTutorId } = useSelector((state) => state.booking);
  const [paymentMethod, setPaymentMethod] = useState("payfast");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionEndTime, setSessionEndTime] = useState(null);
  
  const titles = {
    1: "Select subject and duration",
    2: "Select number of slots",
    3: "Schedule your lessons",
    4: "Select payment method",
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  const createBooking = () => {
    // Validate required fields
    if (!subject?._id) {
      toast.error("Please select a subject");
      return;
    }
    if (!tutor?.user?._id) {
      toast.error("Invalid tutor information");
      return;
    }
    if (!profile?._id) {
      toast.error("Please log in to make a booking");
      return;
    }
    if (!scheduledDate) {
      toast.error("Please select a date");
      return;
    }
    if (!sessionStartTime || !sessionEndTime) {
      toast.error("Please select session time");
      return;
    }
    if (!duration) {
      toast.error("Please select session duration");
      return;
    }
    if (!paymentMethod) {
      toast.error("Please select payment method");
      return;
    }
    const price = ((subject?.pricePerHour * duration) / 60).toFixed(2);
    if (price <= 0) {
      toast.error("Session price cannot be zero or negative");
      return;
    }

    // Common booking data for all payment methods
    const sessionTitle = `${duration} Minute Session on ${subject?.name}`;
    const bookingData = {
      sessionTitle: sessionTitle,
      subjectId: subject?._id,
      teacherId: tutor?.user?._id,
      studentId: profile?._id,
      sessionDate: scheduledDate,
      sessionStartTime,
      sessionEndTime,
      sessionDuration: duration,
      amount: price,
    };

    // Process based on selected payment method
    if (paymentMethod === 'payfast') {
      // Handle PayFast payment
      const formattedSessionDate = new Date(scheduledDate);
      const formattedStartTime = new Date(sessionStartTime);
      const formattedEndTime = new Date(sessionEndTime);
      const price = ((subject?.pricePerHour * duration) / 60).toFixed(2);
      const sessionTitle = `${duration} Minute Session on ${subject?.name}`;

      // Create booking data first
      const bookingDetails = {
        teacherId: tutor?.user?._id,
        studentId: profile?._id,
        subjectId: subject?._id,
        sessionDate: formattedSessionDate.toISOString(),
        sessionStartTime: formattedStartTime.toISOString(),
        sessionEndTime: formattedEndTime.toISOString(),
        sessionDuration: duration,
        sessionTitle: sessionTitle
      };

      const payfastData = {
        // Required fields at root level
        teacherId: tutor?.user?._id,
        studentId: profile?._id,
        subjectId: subject?._id,
        
        // Payment details
        amount: price,
        email: authUser?.email,
        name: `${authUser?.firstName || 'Student'} ${authUser?.lastName || ''}`.trim(),
        
        // Session details
        sessionDate: formattedSessionDate.toISOString(),
        sessionStartTime: formattedStartTime.toISOString(),
        sessionEndTime: formattedEndTime.toISOString(),
        sessionDuration: duration,
        sessionTitle: sessionTitle,
        
        // URLs
        returnUrl: `${window.location.origin}/student-dashboard/booking/payment-success`,
        cancelUrl: `${window.location.origin}/student-dashboard/booking/payment-failed`,
        notifyUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/payment/payfast/notify`
      };
      
      console.log("Initiating PayFast checkout with data:", payfastData);
      
      // Clear any previous checkout data
      dispatch(clearPayfastCheckoutData());
      
      dispatch(createPayfastBookingCheckout(payfastData))
        .unwrap()
        .then((response) => {
          console.log("PayFast checkout response:", response);
          
          if (!response.success) {
            throw new Error(response.message || "Failed to initialize payment");
          }
          
          if (!response.data || !response.data.paymentData) {
            throw new Error("Missing required PayFast data in response");
          }
          
          // The modal will be shown automatically by the useEffect watching payfastCheckoutData
          console.log("PayFast checkout initialized successfully");
        })
        .catch((error) => {
          toast.error(error?.message || "Failed to initialize PayFast payment. Please try again.");
          console.error("PayFast payment error:", error);
          setPayfastModal(false);
        });
    } else if (paymentMethod === 'stripe') {
      // Handle Stripe payment
      setPaymentModal(true);
      
      dispatch(createBookingPayment(bookingData))
        .unwrap()
        .then(async (res) => {
          setCheckoutUrl(res.url);
        })
        .catch((error) => {
          setPaymentModal(false);
          toast.error("Failed to initialize payment. Please try again.");
          console.error("Stripe payment error:", error);
        });
    } else {
      // Handle other payment methods (PayPal, Bank Transfer, etc.)
      toast.info(`${paymentMethod} payment option will be implemented soon.`);
    }
  };

  // Add useEffect to handle scroll locking
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, [authUser]);

  // Add effect to detect PayFast checkout data changes
  useEffect(() => {
    if (payfastCheckoutData) {
      console.log("PayFast checkout data changed:", payfastCheckoutData);
      setPayfastModal(true);
    } else {
      setPayfastModal(false);
    }
  }, [payfastCheckoutData]);

  return (
    <>
      {console.log("Render state:", { 
        paymentModal, 
        payfastModal, 
        hasPayfastData: !!payfastCheckoutData,
        payfastCheckoutData 
      })}
      {paymentModal ? (
        <CheckoutForm 
          checkoutUrl={checkoutUrl} 
          setPaymentModal={setPaymentModal} 
          setisModalOpen={setisModalOpen} 
        />
      ) : payfastModal && payfastCheckoutData ? (
        <PayfastCheckoutForm 
          paymentUrl={payfastCheckoutData?.data?.fullPaymentUrl}
          setPaymentModal={setPayfastModal}
          setisModalOpen={setisModalOpen}
        />
      ) : (
        <BookingLayout
          currentStep={step}
          title={titles[step]}
          showBack={step > 1}
          onBack={handleBack}
          onClose={onClose}
        >
          {step === 1 && (
            <SubjectSelection
              sub={tutor?.subjectsTaught}
              selected={subject}
              onSelect={setSubject}
            />
          )}

          {step === 2 && (
            <DurationSelection
              slots={tutor?.tutionSlots}
              selected={duration}
              onSelect={setDuration}
            />
          )}
          
          {step === 3 && (
            <div className=" h-[calc(100%-154px)]">
              <ScheduleCalendar
                rawBookings={bookingsByTutorId}
                scheduledDate={scheduledDate}
                sessionStartTime={sessionStartTime}
                sessionEndTime={sessionEndTime}
                setSessionStartTime={setSessionStartTime}
                setScheduledDate={setScheduledDate}
                setSessionEndTime={setSessionEndTime}
                calendar={tutor.calendar}
                duration={duration}
              />
            </div>
          )}

          {step === 4 && (
            <PaymentSelection
              price={subject?.pricePerHour}
              tutor={tutor}
              duration={duration}
              subject={subject}
              scheduledDate={scheduledDate}
              createBooking={createBooking}
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          )}

          {step < 4 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end">
              <button 
                disabled={
                  subject === null && step === 1 || 
                  duration === null && step === 2 || 
                  scheduledDate === null && step === 3 || 
                  sessionStartTime === null && step === 3 || 
                  sessionEndTime === null && step === 3
                }
                onClick={handleNext}
                className={`w-fit px-8 py-2 bg-secondary text-white rounded-lg ${
                  subject === null && step === 1 || 
                  duration === null && step === 2 || 
                  scheduledDate === null && step === 3 || 
                  sessionStartTime === null && step === 3 || 
                  sessionEndTime === null && step === 3
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-opacity-90"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </BookingLayout>
      )}
    </>
  );
}
