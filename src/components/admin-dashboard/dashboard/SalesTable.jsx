"use client";
import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux";
import Link from "next/link";

const tableHeadings = [
  "SNO.",
  "Course Name",
  "Instructor Name",
  "Amount",
  "Category",
  "Status",
  "Ratings",
];

const salesData = [
  {
    name: "Khurshid Idrees",
    course: "LMS System",
    instructor: "Unknown Instructor", // Needs to be fetched from instructor ID
    amount: "2999",
    category: "jadus k",
    status: "Published",
    rating: "4.8", // Best Selling
  },
  {
    name: "John Dey",
    course:
      "Spanish Language BasicsSpanish Language BasicsSpanish Language Basics",
    instructor: "Carlos Martinez",
    amount: "5000",
    category: "Languages",
    status: "Published",
    rating: "3.5", // Worst Selling
  },
  {
    name: "Ava Smith",
    course: "French Language Basics",
    instructor: "Sophie Laurent",
    amount: "5000",
    category: "Languages",
    status: "Published",
    rating: "4.5", // Best Selling
  },
];

const SalesTable = () => {
  const dispatch = useDispatch();

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const formattedFirstDay = dateFormat(firstDayOfMonth, "yyyy-mm-dd");
  const formattedLastDay = dateFormat(lastDayOfMonth, "yyyy-mm-dd");

  const [startDate, setStartDate] = useState(formattedFirstDay);
  const [endDate, setEndDate] = useState(formattedLastDay);

  useEffect(() => {
    const requestData = {
      startDate,
      endDate,
    };
    console.log(requestData);
  }, [dispatch, startDate, endDate]);

  return (
    <div
      className="overflow-x-auto w-full"
      style={{
        scrollbarWidth: "thin",
      }}
    >
      <div className="flex justify-between items-center pb-4 w-full sticky left-0">
        <div>
          <h2 className="font-bold text-xl">Course Performance</h2>
        </div>
        <Link
          href={"/admin-dashboard/manage-courses"}
          prefetch={false}
          className="hover:text-secondary font-medium text-xs transition-custom"
        >
          View All →
        </Link>
      </div>

      <div>
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-blue-100 text-textColor text-nowrap">
            <tr>
              {tableHeadings.map((heading, index) => (
                <th
                  key={index}
                  className={`px-6 py-4 font-medium text-sm text-textColor ${
                    heading === "Course Name" ? "min-w-[24rem]" : ""
                  }`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr
                key={index}
                className="hover:bg-gray-100 bg-white text-textColor text-sm border-b text-nowrap"
              >
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4 text-wrap">
                  {sale.course}
                </td>
                <td className="px-6 py-4">{sale.instructor}</td>
                <td className="px-6 py-4">{sale.amount}</td>
                <td className="px-6 py-4">{sale.category}</td>
                <td className="px-6 py-4">{sale.status}</td>
                <td
                  className={`px-6 py-4 font-bold ${
                    parseFloat(sale.rating) >= 4.5
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {sale.rating}{" "}
                  {parseFloat(sale.rating) >= 4.5
                    ? "🔥 Best Selling"
                    : "🔻 Worst Selling"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;
