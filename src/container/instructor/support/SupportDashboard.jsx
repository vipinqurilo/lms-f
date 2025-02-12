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
import SupportTable from "./SupportTable";
import MessageModal from "./MessageModal";
import { getFilteredInstrcutorCourses } from "@/store/slices/instructor/courseSlice";
import { getSubjects } from "@/store/slices/categorySlice";

const SupportDashboard = () => {
  const dispatch = useDispatch();
  const getInstrcutorLoading = useSelector(
    (state) => state.support.isLoading.getInstructorTickets
  );
  const { instructorTickets: tickets } = useSelector((state) => state.support);
  const { authUser } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("All");
  const [isAdd, setisAdd] = useState(false);
  const toggleIsAdd = () => setisAdd(!isAdd);
  const [messages, setMessages] = useState(null);

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
    { label: "All", value: "All" },
    { label: "Open", value: "open" },
    { label: "Inprogress", value: "processing" },
    { label: "Completed", value: "completed" },
  ];

  useEffect(() => {
    if (filter.toLowerCase() !== "all") {
      dispatch(getFilteredInstrcutorCourses(filter?.toLowerCase()));
    } else {
      dispatch(getInstructorTickets());
    }
  }, [filter]);

  useEffect(() => {
    dispatch(getSubjects());
  }, []);

  return (
    <div className="w-full flex items-start justify-between gap-10">
      <div className="w-full flex flex-col items-start gap-8 dashboard-container p-5">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-2xl text-background font-bold">
              Support Tickets
            </h2>
            <p className="max-w-4xl text-light">
              Raise and manage tickets for quick resolution of your issues.
            </p>
          </div>
          {authUser !== null && authUser?.role === "admin" ? null : (
            <CommonButton label={"Raise New Ticket"} onClick={toggleIsAdd} />
          )}
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full ${
            messages && "!grid-cols-2"
          }`}
        >
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
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
                    tab={`${filterItem.label}`}
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
            <SupportTable
              tickets={tickets}
              setMessages={setMessages}
              messages={messages}
            />
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
      </div>
      {isAdd && <RaiseTicketModal toggleIsAdd={toggleIsAdd} />}
      {messages && <MessageModal ticket={messages} setMessages={setMessages} />}
    </div>
  );
};

export default SupportDashboard;
