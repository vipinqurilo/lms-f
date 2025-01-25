import React from "react";

const Step1SelectSubject = ({ onNext, onBack }) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Select subject and duration</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select subject
        </label>
        <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          <option>Accounting</option>
          <option>Biology</option>
          <option>Geography</option>
          <option>Literary Criticism</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Select duration
        </label>
        <select className="mt-1 block w-full p-2 border border-gray-300 rounded-md">
          <option>15 minutes lesson</option>
          <option>30 minutes lesson</option>
          <option>45 minutes lesson</option>
          <option>60 minutes lesson</option>
        </select>
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

export default Step1SelectSubject;
