"use client";

import CommonButton from "@/components/common/CommonButton";
import Loader from "@/components/common/Loader";
import InstructorButton from "@/components/instructor/InstructorButton";
import RaiseTicketModal from "@/components/instructor/RaiseTicketModal";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import {
  getAdminTickets,
  getAllTickets,
  getInstructorTickets,
  makeStatsData,
} from "@/store/slices/supportSlice";
import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaRegHourglass, FaTicketAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SupportTable from "./SupportTable";
import MessageModal from "./MessageModal";

const SupportDashboard = () => {
  const dispatch = useDispatch();
  const getInstrcutorLoading = useSelector(
    (state) => state.support.isLoading.getInstructorTickets
  );
  const getAdminLoading = useSelector(
    (state) => state.support.isLoading.getAdminTickets
  );

  const { tickets, totalPages, ticketStatsData } = useSelector(
    (state) => state.support
  );
  const { authUser } = useSelector((state) => state.user);
  const [filter, setFilter] = useState("All");
  const [isAdd, setisAdd] = useState(false);
  const toggleIsAdd = () => setisAdd(!isAdd);
  const [messages, setMessages] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filters = [
    { label: "All", value: "All" },
    { label: "Open", value: "open" },
    { label: "Inprogress", value: "processing" },
    { label: "Completed", value: "completed" },
  ];

  useEffect(() => {
    const status =
      filter?.toLowerCase() === "all" ? undefined : filter?.toLowerCase();
    const requestData = {
      page: currentPage,
      limit: 5,
    };
    if (status) {
      requestData.status = status.toLowerCase();
    }
    if (authUser?.role === "admin") {
      dispatch(getAdminTickets(requestData));
    } else {
      dispatch(getInstructorTickets(requestData));
    }
  }, [dispatch, currentPage, filter]);

  useEffect(() => {
    dispatch(getAllTickets(authUser?.role === "admin"));
  }, [dispatch]);

  useEffect(() => {
    if (filter?.toLowerCase() === "all") {
      dispatch(makeStatsData());
    }
  }, [tickets]);

  const stats = [
    {
      title: "Total Tickets",
      value: ticketStatsData?.[0]?.value || 0,
      icon: <FaTicketAlt size={22} className="text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "Opened Tickets",
      value: ticketStatsData?.[1]?.value || 0,
      icon: <FaRegHourglass size={22} className="text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      title: "Closed Tickets",
      value: ticketStatsData?.[2]?.value || 0,
      icon: <FaCheckCircle size={22} className="text-green-500" />,
      color: "bg-green-100",
    },
  ];

  return (
    <div className="">
      <div className="w-full flex items-start justify-between gap-10">
        <div
          className={`w-full flex flex-col items-start gap-8 dashboard-container !rounded-none pb-20 p-10 ${
            messages ? "!w-[100%]" : "w-full"
          }`}
        >
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

          <div className="bg-white rounded-lg w-full">
            <div className=" my-4 sticky top-0 bg-white z-10">
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

            {getInstrcutorLoading || getAdminLoading ? (
              <div className="w-full flex items-center justify-center py-16">
                <Loader color={"text-secondary"} isBig={true} />
              </div>
            ) : (
              <SupportTable
                tickets={tickets}
                setMessages={setMessages}
                messages={messages}
              />
            )}
          </div>
        </div>
        {messages && (
          <MessageModal ticket={messages} setMessages={setMessages} />
        )}
      </div>
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      {isAdd && <RaiseTicketModal toggleIsAdd={toggleIsAdd} />}
    </div>
  );
};

export default SupportDashboard;
