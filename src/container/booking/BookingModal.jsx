"use client";

import { useState, useEffect } from "react";
import { BookingLayout } from "./BookingLayout";
import { PaymentSelection } from "./PaymentSelection";
import { SubjectSelection } from "./SubjectSelection";
import { DurationSelection } from "./DurationSelection";
import ScheduleCalendar from "./ScheduleCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAsync } from "@/store/slices/student-dashboard/profileSlice";
import { createBookingAsync } from "@/store/slices/student-dashboard/bookingSlice";
import { toast } from "react-hot-toast";
import CheckoutForm from "@/components/payment/CheckoutForm";
import { createPaymentIntent } from "@/store/slices/paymentSlice";
import { Router, useRouter } from "next/router";

export function BookingModal({ onClose, tutor }) {
  const router = useRouter();
  const [paymentModal, setPaymentModal] = useState(false);
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { profile } = useSelector((state) => state.student.profile);
  const [subject, setSubject] = useState(tutor?.subjectsTaught[0] || null);
  const [duration, setDuration] = useState(
    tutor?.tutionSlots && tutor?.tutionSlots[0] ? tutor?.tutionSlots[0] : 30
  );
  const { bookingsByTutorId } = useSelector((state) => state.student.booking);
  const [paymentMethod, setPaymentMethod] = useState("wallet");
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
  // console.log(tutor, "tutor?.subjectsTaughttutor?.subjectsTaught");
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
    setPaymentModal(true);

    // If all validations pass, proceed with booking
    dispatch(
      createBookingAsync({
        subjectId: subject?._id,
        teacherId: tutor?.user?._id,
        studentId: profile?._id,
        scheduledDate,
        sessionStartTime,
        sessionEndTime,
        sessionDuration: duration,
        paymentId: "67a1acec55d46979078eddd8",
      })
    )
      .unwrap()
      .then((res) => {
        if (res.success) {
          onClose();
        }
      });
  };

  const handlePayment = () => {
    dispatch(createPaymentIntent())
      .unwrap()
      .then((res) => {
        router.push(res.url);
        // setCheckoutUrl(res.url);
        // setPaymentModal(true);
      });
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
  }, []);

  return (
    <>
      {paymentModal ? (
        <CheckoutForm checkoutUrl={checkoutUrl} setPaymentModal={setPaymentModal} />
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
                setScheduledDate={setScheduledDate}
                sessionStartTime={sessionStartTime}
                setSessionStartTime={setSessionStartTime}
                sessionEndTime={sessionEndTime}
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
              handlePayment={handlePayment}
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          )}

          {step < 4 && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end">
              <button
                onClick={handleNext}
                className="w-fit px-8 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90"
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
