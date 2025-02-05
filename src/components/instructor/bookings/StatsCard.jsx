import React from "react";

export const StatsCard = ({ title, value, percentage }) => (
  <div className="p-4 px-6 hover:text-white hover:bg-background transition-custom border rounded-lg w-full">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h2 className="mb-2">{title}</h2>
        <div className="text-3xl font-semibold">{value}</div>
      </div>
      <span className="inline-flex items-center px-2 py-1 rounded-full text-green-600 text-sm bg-green-50">
        {percentage}
      </span>
    </div>
  </div>
);
