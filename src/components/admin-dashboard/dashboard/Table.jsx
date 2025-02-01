"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

const tableHeadings = ["Customer Name", "Course Name", "Amount", "Rating"];

const staticSales = [
  {
    name: "Khurshid idrees",
    course: "Spanish Language Basics",
    amount: "5000",
    rating: "4.5",
  },
  {
    name: "Khurshid idrees",
    course: "Spanish Language Basics",
    amount: "5000",
    rating: "4.5",
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "delayed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const BookingTable = () => {
  const [isedit, setisedit] = useState(null);
  const [status, setstatus] = useState("");

  return (
    <div className="overflow-x-auto font-inter max-w-full custom-scrollbar">
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

              <td className="px-6 py-4">
                {isedit === index ? (
                  <select
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                    className="rounded-full px-3 py-1.5 text-xs font-medium capitalize border border-black/10"
                  >
                    {["completed", "pending", "delayed"].map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize ${getStatusClass(
                      sale.status
                    )}`}
                  >
                    {sale.status}
                  </span>
                )}
              </td>
              <td className="px-6 py-4 flex  items-center gap-5">
                <button
                  onClick={() => {
                    if (isedit === index) {
                      setisedit(null);
                      setstatus("");
                    } else {
                      setisedit(index);
                      setstatus(sale.status);
                    }
                  }}
                  className="px-1 py-1 bg-gray-100 rounded-md "
                >
                  {isedit === index ? (
                    <RxCross1 size={18} />
                  ) : (
                    <FiEdit size={18} />
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
