"use client";

import { useState, useEffect } from "react";
import { BookingLayout } from "./BookingLayout";
import { PaymentSelection } from "./PaymentSelection";
import { SubjectSelection } from "./SubjectSelection";
import { DurationSelection } from "./DurationSelection";
import ScheduleCalendar from "./ScheduleCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAsync } from "@/store/slices/student-dashboard/profileSlice";
import { 
  createBookingAsync, 
  createBookingPayment, 
  setBookingData,
  clearBookingData
} from "@/store/slices/bookingSlice";
import { createPayfastBookingCheckout, clearPayfastCheckoutData } from "@/store/slices/paymentSlice";    
import { toast } from "react-hot-toast";
import CheckoutForm from "@/components/payment/CheckoutForm";
import { useRouter } from "next/router";
import PayfastCheckoutForm from "../../components/payment/PayfastCheckoutForm";

export function BookingModal({ onClose, tutor }) {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Local state
  const [step, setStep] = useState(1);
  const [paymentModal, setPaymentModal] = useState(false);
  const [payfastModal, setPayfastModal] = useState(false);
  const [subject, setSubject] = useState(tutor?.subjectsTaught[0] || null);
  const [duration, setDuration] = useState(
    tutor?.tutionSlots && tutor?.tutionSlots[0] ? tutor?.tutionSlots[0] : null
  );  
  const [paymentMethod, setPaymentMethod] = useState("payfast");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [sessionEndTime, setSessionEndTime] = useState(null);
  
  // Redux state
  const { profile } = useSelector((state) => state.student.profile);
  const { authUser } = useSelector((state) => state.user);
  const { payfastCheckoutData } = useSelector((state) => state.payment);
  const { bookingsByTutorId, bookingData, checkoutUrl, isLoading } = useSelector((state) => state.booking);
  
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

    // Format dates
    const formattedSessionDate = new Date(scheduledDate);
    const formattedStartTime = new Date(sessionStartTime);
    const formattedEndTime = new Date(sessionEndTime);
    const sessionTitle = `${duration} Minute Session on ${subject?.name}`;

    // Common booking data for all payment methods
    const bookingData = {
      sessionTitle,
      subjectId: subject?._id,
      teacherId: tutor?.user?._id,
      studentId: profile?._id,
      sessionDate: formattedSessionDate.toISOString(),
      sessionStartTime: formattedStartTime.toISOString(),
      sessionEndTime: formattedEndTime.toISOString(),
      sessionDuration: duration,
      amount: price,
    };

    // Store booking data in Redux
    dispatch(setBookingData(bookingData));

    // Process based on selected payment method
    if (paymentMethod === 'payfast') {
      // Handle PayFast payment
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
        sessionTitle,
        
        // URLs
        returnUrl: `${window.location.origin}/student-dashboard/booking/payment-success`,
        cancelUrl: `${window.location.origin}/student-dashboard/booking/payment-failed`,
        notifyUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/payment/payfast/notify`
      };
      
      // Clear any previous checkout data
      dispatch(clearPayfastCheckoutData());
      
      dispatch(createPayfastBookingCheckout(payfastData))
        .unwrap()
        .then((response) => {
          if (!response.success) {
            throw new Error(response.message || "Failed to initialize payment");
          }
          
          if (!response.data || !response.data.paymentData) {
            throw new Error("Missing required PayFast data in response");
          }
        })
        .catch((error) => {
          toast.error(error?.message || "Failed to initialize PayFast payment. Please try again.");
          console.error("PayFast payment error:", error);
          setPayfastModal(false);
        });
    } else if (paymentMethod === 'stripe') {
      dispatch(createBookingPayment(bookingData))
        .unwrap()
        .then(() => {
          setPaymentModal(true);
        })
        .catch((error) => {
          toast.error("Failed to initialize payment. Please try again.");
          console.error("Stripe payment error:", error);
        });
    } else {
      // Handle other payment methods (PayPal, Bank Transfer, etc.)
      toast.info(`${paymentMethod} payment option will be implemented soon.`);
    }
  };

  // Clean up when component unmounts
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = "hidden";

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "unset";
      dispatch(clearBookingData());
      dispatch(clearPayfastCheckoutData());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, [authUser, dispatch]);

  // Add effect to detect PayFast checkout data changes
  useEffect(() => {
    if (payfastCheckoutData) {
      setPayfastModal(true);
    } else {
      setPayfastModal(false);
    }
  }, [payfastCheckoutData]);

  return (
    <>
      {paymentModal ? (
        <CheckoutForm 
          checkoutUrl={checkoutUrl} 
          setPaymentModal={setPaymentModal} 
        />
      ) : payfastModal && payfastCheckoutData ? (
        <PayfastCheckoutForm 
          paymentFor="booking"
          mode="payfast"
          onClose={onClose}
          paymentUrl={payfastCheckoutData?.data?.fullPaymentUrl}
          setPaymentModal={setPayfastModal}
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
            <div className="h-[calc(100%-154px)]">
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
              isLoading={isLoading.createBookingPayment || isLoading.createPayfastBookingCheckout}
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
