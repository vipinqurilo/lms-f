"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleComp from "@/components/instructor/TitleComp";
import {
  fetchAllCourseEarning,
  fetchAllTutionEarning,
} from "@/store/slices/instructor/earningSlice";
import Loader from "@/components/common/Loader";
import dateFormat from "dateformat";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import { DollarSign, BookOpen } from "lucide-react";
import EarningCourseTable from "./EarningCourseTable";
import EarningTutionTable from "./EarningTutionTable";
import {
  fetchAllCourseEarningForAdmin,
  fetchAllTutionEarningForAdmin,
} from "@/store/slices/admin-dashboard/adminEarningSlice";
import CourseSalesTable from "@/container/admin-dashboard/CourseSalesTable";
import { Pagination } from "@/components/student-dashboard/Pagination";
import AdminTutorsSalesEarning from "@/container/admin-dashboard/AdminTutorsSalesEarning";

const EarningContainer = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const { isLoading, courseEarning, tutionEarning } = useSelector(
    (state) => state.instructor.earning
  );
  const {
    isLoading: adminLoading,
    adminCourseEarning,
    adminTutionEarning,
    totalPages,
  } = useSelector((state) => state.admin.adminEarning);

  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const formattedFirstDay = dateFormat(firstDayOfMonth, "yyyy-mm-dd");
  const formattedLastDay = dateFormat(lastDayOfMonth, "yyyy-mm-dd");

  const [startDate, setStartDate] = useState(formattedFirstDay);
  const [endDate, setEndDate] = useState(formattedLastDay);
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    const requestData = {
      startDate,
      endDate,
    };
    if (authUser?.role === "admin") {
      requestData.currentPage = currentPage;
      dispatch(fetchAllCourseEarningForAdmin(requestData));
      dispatch(fetchAllTutionEarningForAdmin(requestData));
    } else {
      dispatch(fetchAllCourseEarning(requestData));
      dispatch(fetchAllTutionEarning(requestData));
    }
  }, [dispatch, startDate, endDate, currentPage]);

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num.toFixed(2);
  };

  const cardsData = [
    {
      title: "Course Earning",
      earning:
        authUser?.role === "admin"
          ? formatNumber(
              adminCourseEarning
                ? adminCourseEarning.reduce(
                    (acc, item) => acc + item?.totalSalesAmount,
                    0
                  )
                : 0
            )
          : formatNumber(
              courseEarning
                ? courseEarning.reduce((acc, item) => acc + item.earnings, 0)
                : 0
            ),
      icon: <BookOpen size={24} className="text-blue-800" />,
      bgColor: "bg-blue-100",
    },
    {
      title: "Tution Sessions Earning",
      earning: formatNumber(
        tutionEarning
          ? tutionEarning.reduce((acc, item) => acc + item.earnings, 0)
          : 0
      ),
      icon: <DollarSign size={24} className="text-green-800" />,
      bgColor: "bg-green-100",
    },
  ];

  const teacherEarningLoading =
    isLoading["fetchAllCourseEarning"] || isLoading["fetchAllTutionEarning"];
  const adminEarningLoading =
    adminLoading["fetchAllCourseEarningForAdmin"] ||
    adminLoading["fetchAllTutionEarningForAdmin"];

  return (
    <>
      <main className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Earnings"}
            des={
              "Track your income, view breakdowns, and monitor financial progress."
            }
          />
          <div className="w-full flex flex-col gap-6 pt-5">
            <div className="w-full flex items-center justify-between">
              <div className="w-[60%] grid grid-cols-2 gap-5 px-5">
                {cardsData?.map((card, index) => (
                  <StatsCard
                    key={index}
                    Icon={card?.icon}
                    color={card?.bgColor}
                    title={card?.title}
                    isIcon={true}
                    value={card?.earning}
                  />
                ))}
              </div>
              <div className="px-5 flex items-center justify-end gap-5">
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
              </div>
            </div>

            {teacherEarningLoading || adminEarningLoading ? (
              <div className="w-full flex items-center justify-center py-10">
                <Loader isBig={true} color={"text-secondary"} />
              </div>
            ) : (
              <div className="w-full flex flex-col gap-8">
                {authUser?.role === "admin" ? (
                  <>
                    <CourseSalesTable />
                    <AdminTutorsSalesEarning />
                  </>
                ) : (
                  <>
                    <EarningCourseTable />
                    <EarningTutionTable />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      {authUser?.role === "admin" && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(val) => setcurrentPage(val)}
        />
      )}
    </>
  );
};

export default EarningContainer;
