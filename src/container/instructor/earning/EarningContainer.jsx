"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import EarningsChart from "./EarningsChart";
import EarningTable from "./EarningTable";
import { Pagination } from "@/components/student-dashboard/Pagination";
import UserFilter from "@/components/admin-dashboard/user/UserFilter";
import TitleComp from "@/components/instructor/TitleComp";

export const earningsData = {
  title: "Earnings Report",
  headingsData: ["Course Name", "Earnings", "Status"],

  // Bookings Data (Earnings from Bookings)
  bookingsData: [
    { title: "Yoga Retreat", amount: "500", date: "2025-02-12" },
    { title: "Cooking Masterclass", amount: "300", date: "2025-02-10" },
    { title: "Digital Marketing Workshop", amount: "450", date: "2025-02-08" },
    { title: "Photography Mastery", amount: "700", date: "2025-02-05" },
  ],

  // Courses Data (Earnings from Courses)
  coursesData: [
    {
      title: "ReactJS Advanced Course",
      earnings: 1500,
      sales: 70,
      status: "publish",
      image:
        "http://res.cloudinary.com/daprkakyk/image/upload/v1739189204/luxe/ebj26romwar9k2ch84o5.jpg",
    },
    {
      title: "Python Full-Stack Development",
      earnings: 1200,
      sales: 60,
      status: "publish",
      image:
        "http://res.cloudinary.com/daprkakyk/image/upload/v1739189204/luxe/ebj26romwar9k2ch84o5.jpg",
    },
    {
      title: "UI/UX Design Principles",
      earnings: 900,
      sales: 50,
      status: "publish",
      image:
        "http://res.cloudinary.com/daprkakyk/image/upload/v1739189204/luxe/ebj26romwar9k2ch84o5.jpg",
    },
    {
      title: "SEO & Content Strategy",
      earnings: 400,
      sales: 15,
      status: "Draft",
      image:
        "http://res.cloudinary.com/daprkakyk/image/upload/v1739189204/luxe/ebj26romwar9k2ch84o5.jpg",
    },
    {
      title: "Graphic Design Essentials",
      earnings: 300,
      sales: 10,
      status: "pending",
      image:
        "http://res.cloudinary.com/daprkakyk/image/upload/v1739189204/luxe/ebj26romwar9k2ch84o5.jpg",
    },
    {
      title: "Email Marketing Masterclass",
      earnings: 200,
      sales: 5,
      status: "pending",
      image:
        "http://res.cloudinary.com/daprkakyk/image/upload/v1739189204/luxe/ebj26romwar9k2ch84o5.jpg",
    },
  ],
};

const EarningContainer = () => {
  // const { courses } = useSelector((state) => state.instructor.course);;
  const [filters, setfilters] = useState({});
  const [activeTab, setactiveTab] = useState("Courses");
  // const filteredData = courses?.map((course) => ({
  //   image: course?.thumbnail,
  //   title: course?.title,
  //   des: course?.description,
  //   value1: course?.originalPrice,
  //   value2: 50,
  // }));
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
            <EarningTable
              title={earningsData.title}
              headingsData={earningsData.headingsData}
              bookingsData={earningsData.bookingsData}
              coursesData={earningsData.coursesData}
              activeTab={activeTab}
            />
          </div>
        </div>
      </main>
      <Pagination totalPages={5} currentPage={1} />
    </>
  );
};

export default EarningContainer;
