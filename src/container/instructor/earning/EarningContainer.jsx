"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EarningsChart from "./EarningsChart";
import EarningTable from "./EarningTable";
import { Pagination } from "@/components/student-dashboard/Pagination";
import UserFilter from "@/components/admin-dashboard/user/UserFilter";
import TitleComp from "@/components/instructor/TitleComp";
import { fetchAllEarning } from "@/store/slices/instructor/earningSlice";
import Loader from "@/components/common/Loader";

const EarningContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, earning, totalPages } = useSelector(
    (state) => state.instructor.earning
  );
  const [filters, setfilters] = useState({});
  const [activeTab, setactiveTab] = useState("Courses");
  const [currentPage, setcurrentPage] = useState(1);

  useEffect(() => {
    const requestData = {
      page: currentPage,
      limit: 5,
    };
    if (filters?.search) {
      requestData.search = filters?.search;
    }
    if (filters?.startDate) {
      requestData.startDate = filters?.startDate;
    }
    if (filters?.endDate) {
      requestData.endDate = filters?.endDate;
    }
    dispatch(fetchAllEarning(requestData));
  }, [dispatch, currentPage, filters]);

  return (
    <>
      <main className=" p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Earnings"}
            des={
              "Track your income, view breakdowns, and monitor financial progress."
            }
          />
          <div className="w-full flex flex-col gap-6 py-5">
            <EarningsChart />
            <div className="w-full !sticky !-top-0 bg-white px-5">
              <UserFilter
                isRole={false}
                isStatus={false}
                statusData={[]}
                onApplyFilters={setfilters}
              />
              <div className="border-b">
                <div className="flex gap-6">
                  {["Courses", "Bookings"].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setactiveTab(item)}
                      className={`pb-4 relative ${
                        activeTab === item
                          ? "text-emerald-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item}
                      {activeTab === item && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {isLoading["fetchAllEarning"] ? (
              <div className="w-full flex items-center justify-center py-10">
                <Loader isBig={true} color={"text-secondary"} />
              </div>
            ) : (
              <EarningTable
                title={"Earnings Overview"}
                headingsData={
                  activeTab === "Courses"
                    ? [
                        "SNO.",
                        "Type",
                        "Name",
                        "Price ($)",
                        "Enrolled",
                        "Revenue",
                      ]
                    : [
                        "SNO.",
                        "Type",
                        "Name",
                        "Price ($)",
                        "Bookings",
                        "Revenue",
                      ]
                }
                data={
                  activeTab === "Courses"
                    ? earning?.filter((earn) => earn?.type === "course")
                    : earning?.filter((earn) => earn?.type === "booking")
                }
              />
            )}
          </div>
        </div>
      </main>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(val) => setcurrentPage(val)}
      />
    </>
  );
};

export default EarningContainer;
