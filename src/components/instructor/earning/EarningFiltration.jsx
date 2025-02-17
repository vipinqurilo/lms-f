import { StartEndDateSelector } from "@/components/student-dashboard/StartEndDateSelector";
import { Search } from "lucide-react";
import React from "react";

const EarningFiltration = ({
  keyword,
  setKeyword,
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  tabs,
  isFilter = false,
  activeTab, setActiveTab
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center gap-4 w-full justify-between">
        <div className="relative h-fit">
          <input
            type="text"
            placeholder="Search by Course or Student Name"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:border-gray-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-1/2  -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center gap-6">
          <div className=" flex justify-center items-center gap-2 ">
            <label className="block text-sm text-gray-600">Start-Date</label>
            <StartEndDateSelector
              selectedDate={startDate}
              onDateSelect={handleStartDateChange}
              onClose={() => {}}
            />
          </div>

          <div className=" flex justify-center items-center gap-2 ">
            <label className="block text-sm text-gray-600">End-Date</label>
            <StartEndDateSelector
              selectedDate={endDate}
              onDateSelect={handleEndDateChange}
              onClose={() => {}}
              minDate={startDate}
            />
          </div>
        </div>
      </div>
      {isFilter && (
        <div className="border-b">
          <div className="flex gap-6">
            {tabs.map((item, index) => (
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningFiltration;
