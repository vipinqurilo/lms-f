import React, { useState } from 'react';

const Calendar = ({ bookingData, updateBookingData }) => {
  const [slots, setSlots] = useState(['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']);

  const handleSelectSlot = (slot) => {
    const selectedSlots = bookingData.selectedSlots.includes(slot)
      ? bookingData.selectedSlots.filter((s) => s !== slot)
      : [...bookingData.selectedSlots, slot];
    updateBookingData({ selectedSlots });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Select Available Time Slots</h3>
      <div className="grid grid-cols-2 gap-4">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => handleSelectSlot(slot)}
            className={`px-4 py-2 border rounded-lg ${
              bookingData.selectedSlots.includes(slot)
                ? 'bg-accent text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
