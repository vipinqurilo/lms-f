import React from "react";
import { ArrowUpRight, Search } from "lucide-react";

export const Filters = ({
  searchQuery,
  setSearchQuery,
  selectedSlot,
  setSelectedSlot,
  timeSlots,
}) => (
  <div className="flex justify-between items-center p-4 border-b">
    <div className="flex items-center gap-2">
      <div className="bg-background rounded-lg p-2">
        <div className="w-5 h-5 bg-secondary rounded-md flex items-center justify-center">
          <ArrowUpRight className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search Instructor or Student"
          className="pl-10 pr-4 py-2 border rounded-lg w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
    <select
      className="border px-3 py-2 rounded-lg"
      value={selectedSlot}
      onChange={(e) => setSelectedSlot(e.target.value)}
    >
      <option value="">All Time Slots</option>
      {timeSlots.map((slot, index) => (
        <option key={index} value={slot}>
          {slot}
        </option>
      ))}
    </select>
  </div>
);
