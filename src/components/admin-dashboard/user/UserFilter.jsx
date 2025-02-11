import React, { useState } from "react";
import { Search } from "lucide-react";

const UserFilter = () => {
  const [role, setRole] = useState("Admin");
  const [status, setStatus] = useState("Active");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex items-center gap-4 p-4 ">
      {/* Search Box */}
      <div className="relative ">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border rounded-full w-64 focus:border-gray-500 focus:outline-none"
        />
      </div>

      {/* Date Filters */}
      <div className="flex items-center gap-2">
        <input
          type="date"
          className="border px-4 py-2 rounded-full text-gray-500 w-40"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border px-4 py-2 rounded-full text-gray-500 w-40"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Role Dropdown */}
      <select
        className="border px-4 py-2 rounded-full text-gray-500"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Admin</option>
        <option>User</option>
        <option>Manager</option>
      </select>

      {/* Status Dropdown */}
      <select
        className="border px-4 py-2 rounded-full text-gray-500"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Active</option>
        <option>Inactive</option>
      </select>

      {/* More Filters Button */}
      <button className="border px-4 py-2 rounded-full text-gray-500">
        More Filters ⚙️
      </button>

      {/* Apply Filters Button */}
      <button className="border px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300">
        Apply Filters
      </button>
    </div>
  );
};

export default UserFilter;
