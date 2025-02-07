"use client";

import CommonButton from "@/components/common/CommonButton";
import Loader from "@/components/common/Loader";
import InstructorButton from "@/components/instructor/InstructorButton";
import RaiseTicketModal from "@/components/instructor/RaiseTicketModal";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import { StatusBadge } from "@/components/student-dashboard/StatusBadge";
import { getInstructorTickets } from "@/store/slices/supportSlice";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegHourglass, FaTicketAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

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

const SupportDashboard = () => {
  const dispatch = useDispatch();
  const getInstrcutorLoading = useSelector(
    (state) => state.support.isLoading.getInstructorTickets
  );
  const [filter, setFilter] = useState("All");
  const [isAdd, setisAdd] = useState(false);
  const toggleIsAdd = () => setisAdd(!isAdd);

  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    {
      title: "Total Tickets",
      value: 50,
      icon: <FaTicketAlt size={22} className="text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Opened Tickets",
      value: 30,
      icon: <FaRegHourglass size={22} className="text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      title: "Closed Tickets",
      value: 10,
      icon: <FaCheckCircle size={22} className="text-green-500" />,
      color: "bg-green-100",
    },
  ];

  const filters = [
    { label: "All", value: "All", count: 30 },
    { label: "Open", value: "Open", count: 10 },
    { label: "Inprogress", value: "Inprogress", count: 10 },
    { label: "Closed", value: "Closed", count: 10 },
  ];

  useEffect(() => {
    if (filter.toLowerCase() !== "all") {
      dispatch(getInstructorTickets(filter?.toLowerCase()));
    } else {
      dispatch(getInstructorTickets(""));
    }
  }, [filter]);

  return (
    <div className="w-full flex flex-col items-start gap-8 py-5 px-5">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <h2 className="text-2xl text-background font-bold">
            Support Tickets
          </h2>
          <p className="max-w-4xl text-light">
            Raise and manage tickets for quick resolution of your issues.
          </p>
        </div>
        <CommonButton label={"Raise New Ticket"} onClick={toggleIsAdd} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            Icon={stat.icon}
            color={stat?.color}
            isIcon={true}
          />
        ))}
      </div>

      {/* Tickets Section */}
      <div className="bg-white rounded-lg w-full">
        <div className=" my-4 ">
          {/* Filter Tabs */}
          <div className="flex gap-3">
            {filters.map((filterItem, index) => (
              <>
                <InstructorButton
                  condition={
                    filter === filterItem.value
                      ? "bg-secondary text-white"
                      : "bg-none"
                  }
                  handleClick={() => setFilter(filterItem.value)}
                  tab={`${filterItem.label} (${filterItem.count})`}
                  key={index}
                />
              </>
            ))}
          </div>
        </div>

        {getInstrcutorLoading ? (
          <div className="w-full flex items-center justify-center py-16">
            <Loader color={"text-primary"} isBig={true} />
          </div>
        ) : (
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
        )}

        {/* Pagination */}
        <div className="px-6 py-4 ">
          <Pagination
            currentPage={currentPage}
            totalPages={2}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {isAdd && <RaiseTicketModal toggleIsAdd={toggleIsAdd} />}
    </div>
  );
};

export default SupportDashboard;
