"use client";

import { useState } from "react";
import { StatsCard } from "../../../components/student-dashboard/StatsCard";
import { StatusBadge } from "../../../components/student-dashboard/StatusBadge";
import { Pagination } from "../../../components/student-dashboard/Pagination";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";

const tickets = [
  {
    id: "Ticket#001",
    date: "March 12, 2024",
    subject: "Need a freelancer software",
    priority: "Low",
    category: "Mailing Issues",
    status: "Opened",
  },
  {
    id: "Ticket#002",
    date: "March 18, 2024",
    subject: "I have a problem",
    priority: "High",
    category: "Language Issues",
    status: "Inprogress",
  },
  // Add more tickets as shown in the image...
];

export default function SupportPage() {
  const [filter, setFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { title: "Total Tickets", value: 50 },
    { title: "Opened Tickets", value: 30 },
    { title: "Closed Tickets", value: 20 },
  ];

  const filters = [
    { label: "All", value: "All", count: 30 },
    { label: "Open", value: "Open", count: 10 },
    { label: "Inprogress", value: "Inprogress", count: 10 },
    { label: "Closed", value: "Closed", count: 10 },
  ];

  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8 ">Support Tickets</div>
        <hr />
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Tickets Section */}
        <div className="bg-white rounded-lg  m-4 mx-8  ">
          <div className=" my-4 ">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-dark">
                Support Tickets
              </h2>
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
                onClick={() => {
                  // Add new ticket functionality
                  console.log("Add new ticket");
                }}
              >
                Add New Ticket
              </button>
            </div>
            <p className="text-gray-500 mb-6">
              You can find all of your order Invoices.
            </p>

            {/* Filter Tabs */}
            <div className="flex gap-3">
              {filters.map((filterItem) => (
                <button
                  key={filterItem.value}
                  onClick={() => setFilter(filterItem.value)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors
                  ${
                    filter === filterItem.value
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filterItem.label}({filterItem.count})
                </button>
              ))}
            </div>
          </div>

          {/* Tickets Table */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Ticket ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge type="priority" value={ticket.priority} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {ticket.category}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge type="status" value={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 ">
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
