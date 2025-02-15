
import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";

const UserFilter = ({ onApplyFilters, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("Role");
  const [status, setStatus] = useState("Status");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false); // New state for toggling visibility

   const [debouncedSearch, setDebouncedSearch] = useState("");

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setDebouncedSearch(searchTerm);
  //   }, 500); // Delay of 500ms

  //   return () => clearTimeout(timer); // Cleanup function
  // }, [searchTerm]);

  // useEffect(() => {
  //   if (debouncedSearch) onSearch(debouncedSearch); // Trigger search filter
  // }, [debouncedSearch, onSearch]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (typeof onSearch === "function") {
      onSearch(debouncedSearch);
    } else {
      console.error("onSearch is not a function");
    }
  }, [debouncedSearch, onSearch]);



  
  const isFilterApplied =
    searchTerm ||
    role !== "Role" ||
    status !== "Status" ||
    startDate ||
    endDate;

  // const handleApplyFilters = () => {
  //   const filters = {};
  //   if (role !== "Role") filters.role = role;
  //   if (status !== "Status") filters.status = status;
  //   if (startDate) filters.startDate = startDate;
  //   if (endDate) filters.endDate = endDate;

  //   onApplyFilters(filters); // Trigger the filter application
  // };

  const handleApplyFilters = () => {
    const filters = {};
    if (role !== "Role") filters.role = role;
    if (status !== "Status") filters.status = status;
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;

    if (typeof onApplyFilters === "function") {
      onApplyFilters(filters);
    } else {
      console.error("onApplyFilters is not a function");
    }
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setRole("Role");
    setStatus("Status");
    setStartDate("");
    setEndDate("");
    if (typeof onApplyFilters === "function") {
      onApplyFilters({});
    }  };

  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <div className="w-full relative flex">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4" />
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-1 h-10 border rounded-full w-6/12 focus:border-gray-500 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Directly update search term
        />
        <div className="ml-3">
        <button
          className="border px-4 py-1 h-10 bg-white flex justify-center items-center gap-2 text-sm rounded-full text-gray-500"
          onClick={() => setFiltersVisible(!filtersVisible)} // Toggle the visibility of filters
        >
          More Filters <IoMdOptions />
        </button>
        </div>
      </div>

      {/* Conditionally render the filter section based on filtersVisible */}
      {filtersVisible && (
        <div className="flex justify-between w-full">
          <div className="flex w-10/12 space-x-1 items-center flex-wrap">
            <div className="flex items-center border rounded-full px-4 py-1 text-gray-500 text-sm w-56 bg-white h-10">
              <span className="text-xs w-24">Start Date:</span>
              <input
                type="date"
                className="bg-transparent outline-none w-full font-semibold"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex items-center border rounded-full px-4 py-1 text-gray-500 text-sm w-56 bg-white h-10">
              <span className="text-xs w-24">End Date:</span>
              <input
                type="date"
                className="bg-transparent outline-none w-full font-semibold"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div
              className="border text-sm flex bg-white items-center px-3 py-1 h-10 rounded-full text-gray-500 relative cursor-pointer w-32"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
            >
              <div className="flex justify-center items-center w-full">
                <p className="text-xs">Role:</p>
                <p className="text-sm font-semibold ml-1">{role}</p>
              </div>
              <div className="ml-1">
                {roleDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {roleDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-md z-10">
                  {["student", "teacher", "admin"].map((r) => (
                    <p
                      key={r}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setRole(r);
                        setRoleDropdownOpen(false);
                      }}
                    >
                      {r}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div
              className="border flex items-center px-3 py-1 h-10 rounded-full bg-white text-gray-500 relative cursor-pointer w-36"
              onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
            >
              <div className="flex justify-center items-center w-full">
                <p className="text-xs">Status:</p>
                <p className="text-sm font-semibold ml-1">{status}</p>
              </div>
              <div className="ml-2">
                {statusDropdownOpen ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              {statusDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white border rounded-lg shadow-md z-10">
                  {["inactive", "active"].map((s) => (
                    <p
                      key={s}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => {
                        setStatus(s);
                        setStatusDropdownOpen(false);
                      }}
                    >
                      {s}
                    </p>
                  ))}
                </div>
              )}
            </div>
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
              className="border py-1 w-28 h-10 rounded-full bg-black text-white hover:bg-[#4f4f4f] text-sm hover:text-white"
              onClick={handleApplyFilters} // Trigger the filter logic
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFilter;

 