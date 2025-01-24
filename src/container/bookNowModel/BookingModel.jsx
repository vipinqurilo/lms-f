import React, { useState } from "react";
import SubjectSelection from "./SubjectSelection";
import LessonConfig from "./LessonConfig";
import Calendar from "./Calendar";
import Payment from "./Payment";

const steps = ["Select subject", "Lesson type", "Schedule", "Payment"];

const initialData = {
  subject: "",
  duration: "",
  isOffline: false,
  lessonCount: 1,
  isRecurring: false,
  selectedSlots: [],
  paymentMethod: "",
};

const BookingModel = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState(initialData);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const updateBookingData = (data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800"
          >
            {currentStep > 1 && (
              <div className="flex items-center gap-2">
                <span>←</span>
                <span>Back</span>
              </div>
            )}
          </button>
          <h2 className="text-2xl font-semibold text-center">
            {steps[currentStep - 1]}
          </h2>
        </div>

        <div className="step-indicator">
          {steps.map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`step ${
                  index + 1 === currentStep
                    ? "active"
                    : index + 1 < currentStep
                    ? "completed"
                    : "upcoming"
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className="w-16 h-[1px] bg-gray-200" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          {currentStep === 1 && (
            <SubjectSelection
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          )}
          {currentStep === 2 && (
            <LessonConfig
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          )}
          {currentStep === 3 && (
            <Calendar
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          )}
          {currentStep === 4 && (
            <Payment
              bookingData={bookingData}
              updateBookingData={updateBookingData}
            />
          )}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNext}
            className="bg-accent hover:bg-accent/90 text-white"
            disabled={
              (currentStep === 1 &&
                (!bookingData.subject || !bookingData.duration)) ||
              (currentStep === 3 && bookingData.selectedSlots.length === 0)
            }
          >
            {currentStep === 4 ? "Confirm payment" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModel;
