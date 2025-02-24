import { StartEndDateSelector } from "@/components/student-dashboard/StartEndDateSelector";
import { Search } from "lucide-react";
import React from "react";

const BookingsFilter = ({
  keyword,
  setKeyword,
  endDateError = null,
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
}) => {
  
  return (
    <div className="sticky top-[60px] bg-gray-50    pb-4 z-20">
      <div className="flex items-center gap-4  pt-4">
        <div className="relative h-fit">
          <input
            type="text"
            placeholder="Search by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:border-gray-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex justify-center items-center gap-4">
          <label className="block text-sm text-gray-600">Lesson start date</label>
          <StartEndDateSelector
            selectedDate={startDate}
            onDateSelect={handleStartDateChange}
            onClose={() => {}}
          />
        </div>

        <div className="flex justify-center items-center gap-4">
          <label className="block text-sm text-gray-600">
            Lesson end date
            {endDateError && (
              <span className="text-red-500 ml-2">Must be after start date</span>
            )}
          </label>
          <StartEndDateSelector
            selectedDate={endDate}
            onDateSelect={handleEndDateChange}
            onClose={() => {}}
            minDate={startDate}
            isError={endDateError}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsFilter;
