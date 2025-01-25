import React from "react";

const Step2SelectTimeslot = ({ onNext, onBack }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Select timeslot</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select timeslot
        </label>
        <div className="grid grid-cols-3 gap-2">
          <button className="p-2 border border-gray-300 rounded-md">
            00:00
          </button>
          <button className="p-2 border border-gray-300 rounded-md">
            00:30
          </button>
          {/* Add more timeslots as needed */}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="border border-secondary text-secondary px-4 py-2 rounded-md hover:bg-orange-50"
        >
          Back
        </button>
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
