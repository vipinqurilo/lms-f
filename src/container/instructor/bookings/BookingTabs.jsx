import React from "react";

const BookingTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b mb-6">
      <div className="flex gap-6">
        {["All lessons", "Scheduled", "Completed", "Canceled"].map(
          (item, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(item)}
              className={`pb-4 relative ${
                activeTab === item ? "text-emerald-600" : "text-gray-600"
              }`}
            >
              {item}
              {activeTab === item && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
              )}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BookingTabs;
