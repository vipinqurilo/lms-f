"use client";

import { useState } from "react";

import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { Download } from "lucide-react";
import { Pagination } from "../../../components/student-dashboard/Pagination";

const orders = [
  {
    id: "#2643",
    courseName: "Build Responsive Real World Websites with HTML5 and CSS3",
    date: "March 24, 2024",
    price: 34,
    status: "On Hold",
  },
  {
    id: "#2644",
    courseName: "Sketch from A to Z (2024): Become an app designer",
    date: "March 26, 2024",
    price: 40,
    status: "On Hold",
  },
  {
    id: "#2645",
    courseName: "Learn Angular Fundamentals Beginners Guide",
    date: "April 12, 2024",
    price: 25,
    status: "Completed",
  },
  {
    id: "#2646",
    courseName: "Build Responsive Real World Websites with HTML5 and CSS3",
    date: "April 16, 2024",
    price: 35,
    status: "On Hold",
  },
];

export default function OrderHistoryPage() {
  const [timeFilter, setTimeFilter] = useState("today");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8 ">Order History</div>
        <hr />
        {/* Time Filter */}
        <div className="flex gap-3 p-4 px-8">
          {[
            { value: "today", label: "Today" },
            { value: "monthly", label: "Monthly" },
            { value: "yearly", label: "Yearly" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setTimeFilter(filter.value)}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors
              ${
                timeFilter === filter.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hiddenp-4 px-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Course Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.courseName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${order.price}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-sm font-medium rounded-full
                        ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-primary">
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t">
            <Pagination
              currentPage={currentPage}
              totalPages={2}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
