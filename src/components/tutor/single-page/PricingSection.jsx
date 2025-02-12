import React, { useState } from "react";
import { useSelector } from "react-redux";

const PricingSection = () => {
  // Get tutor profile from Redux store
  const { tutorProfile } = useSelector((state) => state.tutors);

  // Handle the selected slot and its charge
  const [selectedSlot, setSelectedSlot] = useState(
    tutorProfile?.tutionSlots[0]
  );

  // If tutorProfile or tuitionSlots are not loaded yet, return a loading message or placeholder
  if (!tutorProfile || !tutorProfile.tutionSlots) {
    return <div>Loading pricing...</div>;
  }

  // Function to handle slot change
  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  // Function to calculate the price based on slot duration
  const calculatePrice = (slot) => {
    // Example: Assuming the price for 30 min is $36 and for 60 min is $72
    const basePrice = 36;
    const pricePerMinute = (72 - 36) / (60 - 30); // Calculate per minute price
    return basePrice + (slot - 30) * pricePerMinute;
  };

  return (
    <div>
      {/* Pricing Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pricing</h2>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between font-medium mb-4">
            <div>Teaching subjects</div>
            <div>Slot price</div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              {tutorProfile?.subjectsTaught
                ?.map((subject) => subject.name)
                .join(", ")}
            </div>
            <div className="flex items-center gap-4">
              {/* Display dynamic price based on selected slot */}
              <div>${calculatePrice(selectedSlot).toFixed(2)}</div>
              {/* Dynamically map tuition slots */}
              <select
                className="border rounded px-2 py-1"
                value={selectedSlot}
                onChange={handleSlotChange}
              >
                {tutorProfile.tutionSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot} minutes
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingSection;
