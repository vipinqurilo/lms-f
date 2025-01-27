import React from "react";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";

const Step2SelectTimeslot = ({ onNext, onBack }) => {
  return (
    <div className="p-4 h-[80vh]">
      <AvailabilityCalendar />
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2SelectTimeslot;
