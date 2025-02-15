"use client";

import { updateTutionSlots } from "@/store/slices/instructor/settingsSlice";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PriceTab = () => {
  const { profile } = useSelector((state) => state.instructor.setting);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.instructor.setting.isLoading.updateTutionSlots
  );
  const subjects = [
    { name: "Biology", hourlyRate: 40 },
    { name: "Earth Sciences", hourlyRate: 155 },
    { name: "Physics", hourlyRate: 155 },
  ];

  const timeSlots = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

  const [selectedSlots, setSelectedSlots] = useState([]);

  useEffect(() => {
    if (profile?.tutionSlots) {
      const slots = profile.tutionSlots
        .map((slot) => `${slot} minutes`)
        .filter((slot) => timeSlots.includes(slot));

      setSelectedSlots(slots);
    }
  }, [profile]);

  const handleSlotSelect = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots((prev) => prev.filter((sele) => sele !== slot));
    } else {
      setSelectedSlots((prev) => [...prev, slot]);
    }
  };

  const calculatePrice = (hourlyRate, slot) => {
    const slotMultiplier = {
      "15 minutes": 0.25,
      "30 minutes": 0.5,
      "45 minutes": 0.75,
      "60 minutes": 1,
    };
    return `$${(hourlyRate * slotMultiplier[slot]).toFixed(2)}`;
  };

  const updateTimeSlots = () => {
    const data = {
      tutionSlots: selectedSlots?.map((slot) => slot?.split(" ")[0]),
    };
    dispatch(updateTutionSlots(data));
  };

  return (
    <div className=" mx-auto p-6 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold">Manage prices</h2>
      <p className="text-gray-600">
        Select the time slots and add the hourly price. Prices are calculated
        accordingly as per selected time slots.
      </p>

      {/* Admin Note */}
      <div
        className={`text-white px-4 py-2 mt-4 rounded-lg font-medium bg-secondary`}
      >
        Note: Prices Are Managed By Admin And In Base Currency [USD]
      </div>

      {/* Pricing Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-4 py-2 font-semibold">Subjects</th>
              <th className="border px-4 py-2 font-semibold">Hourly price</th>
              {timeSlots.map((slot) => (
                <th
                  key={slot}
                  className="border px-4 py-2 font-semibold text-center cursor-pointer"
                  onClick={() => handleSlotSelect(slot)}
                >
                  <label
                    className={`flex items-center justify-center gap-1 cursor-pointer ${
                      selectedSlots?.includes(slot)
                        ? "text-yellow-500"
                        : "text-light"
                    }`}
                  >
                    <div className="w-5 h-5 border border-black/10 rounded flex items-center justify-center">
                      <div
                        className={`w-3 h-3 bg-background rounded ${
                          selectedSlots?.includes(slot)
                            ? "scale-100"
                            : "scale-0"
                        } transition-custom`}
                      ></div>
                    </div>
                    {slot}
                  </label>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subjects.map(({ name, hourlyRate }) => (
              <tr key={name} className="bg-white hover:bg-gray-50">
                <td className="border px-4 py-2">{name}</td>
                <td className="border px-4 py-2">${hourlyRate.toFixed(2)}</td>
                {timeSlots.map((slot) => (
                  <td
                    key={slot}
                    className={`border px-4 py-2 text-center text-yellow-600 ${
                      selectedSlots?.includes(slot)
                        ? "text-yellow-500 bg-yellow-50"
                        : "text-light bg-white"
                    }`}
                  >
                    <label className="flex items-center justify-center">
                      {calculatePrice(hourlyRate, slot)}
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="submit"
        onClick={() => updateTimeSlots()}
        className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? <Loader /> : "Update Price"}
      </button>
    </div>
  );
};

export default PriceTab;
