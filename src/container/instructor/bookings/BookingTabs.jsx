import React from "react";

const BookingTabs = ({ activeTab, setActiveTab }) => {
  const formatTabLabel = (label) => {
    if (label === "reschedule_in_progress") {
      return "Rescheduling";
    }
    return label
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="sticky top-0 bg-gray-50 z-20 pt-5">
      <div className="flex gap-6  border-b ">
        {[
          "All lessons",
          "scheduled",
          "confirmed",
          "canceled",
          "rescheduled",
          "reschedule_in_progress",
          "completed",
        ].map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(item)}
            className={`pb-4 relative ${
              activeTab === item ? "text-emerald-600" : "text-gray-600"
            }`}
          >
            {formatTabLabel(item)}
            {activeTab === item && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BookingTabs;
