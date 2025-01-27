"use client";

import { useState } from "react";
import { BookingLayout } from "./BookingLayout";
import { PaymentSelection } from "./PaymentSelection";
import { SubjectSelection } from "./SubjectSelection";
import { DurationSelection } from "./DurationSelection";
import ScheduleCalendar from "./ScheduleCalendar";

export function BookingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [subject, setSubject] = useState(null);
  const [duration, setDuration] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const titles = {
    1: "Select subject and duration",
    2: "Select subject and duration",
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

  return (
    <BookingLayout
      currentStep={step}
      title={titles[step]}
      showBack={step > 1}
      onBack={handleBack}
      onClose={onClose}
    >
      {step === 1 && (
        <SubjectSelection selected={subject} onSelect={setSubject} />
      )}
      {step === 2 && (
        <DurationSelection selected={duration} onSelect={setDuration} />
      )}
      {step === 3 && (
        <div className=" h-[calc(100%-154px)]">
          <ScheduleCalendar slotLimit={2} />
        </div>
      )}
      {step === 4 && (
        <PaymentSelection
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
      )}

      {step < 4 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t flex justify-end">
          <button
            onClick={handleNext}
            className="w-fit px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
          >
            Next
          </button>
        </div>
      )}
    </BookingLayout>
  );
}
