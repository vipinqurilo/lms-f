"use client";
import React, { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { CiSearch } from "react-icons/ci";

const tableHeadings = ["Customer Name", "Course Name", "Amount", "Rating"];

const staticSales = [
  {
    name: "Khurshid idrees",
    course: "Spanish Language Basics",
    amount: "5000",
    rating: "4.5",
  },
  { 
    name: "John Dey",
    course: "French Language Basics",
    amount: "5000",
    rating: "4.5",
  },
];

const SalesTable = () => {
  return (
    <div className="overflow-x-auto font-inter max-w-full custom-scrollbar">
      <div className="flex justify-between  p-2 bg-white">
        <div>
          <h2 className="font-bold font-xl">Sale</h2>
        </div>
        <div className="flex">
          <span className="mt-[1px] bg-gray-50 p-[6px] text-xl mx-3 rounded-sm">
            <CiSearch />
          </span>
          <div className="bg-gray-50 flex p-2 rounded-sm">
            <span className="mt-[3px] mx-2">
              <LuCalendarDays />
            </span>
            <select name="" id="" className="bg-gray-50">
              <option value="">17 September - 24 September</option>
              <option value="">17 September - 24 September</option>
              <option value="">17 September - 24 September</option>
              <option value="">17 September - 24 September</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <table className="min-w-full border-collapse text-left text-sm text-gray-500">
          <thead className="bg-[#ECF5FA] text-textColor text-nowrap">
            <tr>
              {tableHeadings.map((heading, index) => (
                <th
                  key={index}
                  className="px-6 py-4 font-medium text-sm text-textColor"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {staticSales.map((sale, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 text-textColor text-sm border-b text-nowrap"
              >
                <td className="px-6 py-4 font-medium text-black text-sm">
                  {sale.name}
                </td>
                <td className="px-6 py-4">{sale.course}</td>
                <td className="px-6 py-4">{sale.amount}</td>
                <td className="px-6 py-4">{sale.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
