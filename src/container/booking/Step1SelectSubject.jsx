import React, { useState } from "react";
import Select from "react-select";

const Step1SelectSubject = ({ onNext }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const subjects = [
    { value: "Accounting", label: "Accounting" },
    { value: "Biology", label: "Biology" },
    { value: "Geography", label: "Geography" },
    { value: "Literary Criticism", label: "Literary Criticism" },
  ];

  const durations = [
    { value: "15", label: "15 minutes lesson" },
    { value: "30", label: "30 minutes lesson" },
    { value: "45", label: "45 minutes lesson" },
    { value: "60", label: "60 minutes lesson" },
  ];

  // Custom styles for the Select components
  const customStyles = {
    control: (base, state) => ({
      ...base,
      border: state.isFocused ? "2px solid #eda256" : "1px solid #ccc", // Custom border color
      boxShadow: state.isFocused ? "0 0 5px rgba(237, 162, 86, 0.5)" : "none", // Slight glow when focused
      "&:hover": {
        border: "2px solid #eda256", // Hover effect
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#eda256" // Selected background color
        : state.isFocused
        ? "#f7d6b1" // Hover background color (lighter shade of #eda256)
        : "#fff", // Default background color
      color: state.isSelected ? "#fff" : "#333", // Text color
      "&:hover": {
        backgroundColor: "#f7d6b1", // Hover background color
        color: "#333", // Hover text color
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "8px",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Dropdown shadow
    }),
    placeholder: (base) => ({
      ...base,
      color: "#777", // Custom placeholder color
    }),
    singleValue: (base) => ({
      ...base,
      color: "#eda256", // Selected value text color
    }),
  };

  return (
    <div className="p-4">
      <div className="w-1/3 mx-auto text-sm text-center my-4 font-semibold text-[#888888]">
        Select subject and timeslot. <br /> Click on subject timeslots.
      </div>
      <div className="mb-4 w-1/3 mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select subject
        </label>
        <Select
          options={subjects}
          value={selectedSubject}
          onChange={setSelectedSubject}
          placeholder="Choose a subject"
          styles={customStyles} // Apply custom styles
        />
      </div>
      <div className="mb-4 w-1/3 mx-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select duration
        </label>
        <Select
          options={durations}
          value={selectedDuration}
          onChange={setSelectedDuration}
          placeholder="Choose a duration"
          styles={customStyles} // Apply custom styles
        />
      </div>
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-opacity-80"
          disabled={!selectedSubject || !selectedDuration} // Disable until both are selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1SelectSubject;
