import React from "react";

const BookingView = ({ setActiveTab2, activeTab2 }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">My Bookings</h2>
      {/* <div className="flex w-fit bg-white p-1 rounded-lg">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
            activeTab2 === "listing"
              ? "bg-orange-500 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab2("listing")}
        >
          Listing
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
            activeTab2 === "calendar"
              ? "bg-orange-500 text-white"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab2("calendar")}
        >
          Calendar
        </button>
      </div> */}
    </div>
  );
};

export default BookingView;
