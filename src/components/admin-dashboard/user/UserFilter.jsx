import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import { usePathname } from "next/navigation";

const Dropdown = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border flex items-center px-3 py-1 h-10 rounded-full bg-white text-gray-500 relative cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-center items-center w-full">
        <p className="text-xs">{label}:</p>
        <p className="text-sm font-semibold ml-1">{value}</p>
      </div>
      <div className="ml-2">{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-md z-10">
          {options.map((option) => (
            <p
              key={option}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const UserFilter = ({
  onApplyFilters,
  isRole = true,
  isSearch = true,
  isStatus = true,
  statusData,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    role: "Role",
    status: "Status",
    startDate: "",
    endDate: "",
    payoutStatus: "Status",
  });

  const pathname = usePathname();
  const [isMoreFilters, setIsMoreFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const statusArray = statusData ? statusData[0] : ["inactive", "active"];

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  const handleApplyFilters = () => {
    const appliedFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) => value && value !== "Role" && value !== "Status"
      )
    );
    onApplyFilters(appliedFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      role: "Role",
      status: "Status",
      startDate: "",
      endDate: "",
      payoutStatus: "Status",
    });
    onApplyFilters({});
  };

  const isFilterApplied = Object.values(filters).some(
    (value) => value && value !== "Role" && value !== "Status"
  );

  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      {isSearch && (
        <div className="w-full relative flex">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-1 h-10 border rounded-full w-6/12 focus:border-gray-500 focus:outline-none"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <button
            onClick={() => setIsMoreFilters(!isMoreFilters)}
            className="border ml-5 px-4 py-1 h-10 bg-white flex justify-center items-center gap-2 text-sm rounded-full text-gray-500 hover:bg-gray-100"
          >
            More Filters <IoMdOptions />
          </button>
        </div>
      )}

      <div className="flex justify-between w-full">
        <div className="flex w-10/12 space-x-1 items-center flex-wrap">
          <div className="flex items-center border rounded-full px-4 py-1 text-gray-500 text-sm w-56 bg-white h-10">
            <span className="text-xs w-24">Start Date:</span>
            <input
              type="date"
              className="bg-transparent outline-none w-full font-semibold"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
            />
          </div>

          <div className="flex items-center border rounded-full px-4 py-1 text-gray-500 text-sm w-56 bg-white h-10">
            <span className="text-xs w-24">End Date:</span>
            <input
              type="date"
              className="bg-transparent outline-none w-full font-semibold"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
            />
          </div>

          {isRole && (
            <Dropdown
              label="Role"
              value={
                filters.role === "role"
                  ? "Role"
                  : filters.role.charAt(0).toUpperCase() + filters.role.slice(1)
              } // Display capitalized value
              options={["Student", "Teacher", "Admin"]}
              onChange={(role) =>
                setFilters({ ...filters, role: role.toLowerCase() })
              } // Send lowercase value to backend
            />
          )}

          {isStatus && (
            <Dropdown
              label="Status"
              value={filters.status}
              options={statusArray}
              onChange={(status) => setFilters({ ...filters, status })}
            />
          )}

          {isMoreFilters &&
            pathname === "/instructor-dashboard/withdrawals" && (
              <Dropdown
                label="Payout Status"
                value={filters.payoutStatus}
                options={statusData[1] || []}
                onChange={(payoutStatus) =>
                  setFilters({ ...filters, payoutStatus })
                }
              />
            )}
        </div>

        <div className="flex gap-3 justify-center items-center">
          {isFilterApplied && (
            <button
              className="border py-1 w-28 h-10 rounded-full bg-[#f6f6f6] hover:bg-gray-300 text-sm"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          )}
          <button
            className="border py-1 w-28 h-10 rounded-full bg-black text-white hover:bg-[#4f4f4f] text-sm"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFilter;
