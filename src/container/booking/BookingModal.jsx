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

export function BookingModal({ onClose, tutor }) {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const { profile } = useSelector((state) => state.student.profile);
  const [subject, setSubject] = useState(null);
  const [duration, setDuration] = useState("15");
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

  const createBooking = () => {
    console.log({
      subjectId: subject,
      teacherId: tutor?.user?._id,
      studentId: profile?._id,
      scheduledDate,
      sessionStartTime,
      sessionEndTime,
      sessionDuration: duration,
      paymentId: "67a1acec55d46979078eddd8",
    });
    dispatch(
      createBookingAsync({
        subjectId: subject,
        teacherId: tutor?.user?._id,
        studentId: profile?._id,
        scheduledDate,
        sessionStartTime,
        sessionEndTime,
        sessionDuration: duration,
        paymentId: "67a1acec55d46979078eddd8",
      })
    );
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
          createBooking={createBooking}
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
  );
}
