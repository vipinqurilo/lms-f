"use client";

import React, { useState } from "react";
import CreatedCourses from "../dashboard/CreatedCourses";
import { useSelector } from "react-redux";
import EarningsChart from "./EarningsChart";
import EarningFiltration from "@/components/instructor/earning/EarningFiltration";
import dateFormat from "dateformat";
import EarningTable from "./EarningTable";
import { Pagination } from "@/components/student-dashboard/Pagination";

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
  const { courses } = useSelector((state) => state.instructor.course);
  const [keyword, setKeyword] = useState("");
  const [activeTab, setactiveTab] = useState("Courses");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const filteredData = courses?.map((course) => ({
    image: course?.thumbnail,
    title: course?.title,
    des: course?.description,
    value1: course?.originalPrice,
    value2: 50,
  }));
  return (
    <div className="w-full flex flex-col gap-6 py-5 px-5">
      <EarningsChart />
      <EarningFiltration
        endDate={endDate}
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        handleStartDateChange={(date) => setStartDate(date)}
        handleEndDateChange={(date) => setEndDate(date)}
        tabs={["Courses", "Bookings"]}
        isFilter={true}
        activeTab={activeTab}
        setActiveTab={setactiveTab}
      />
      <EarningTable
        title={earningsData.title}
        headingsData={earningsData.headingsData}
        bookingsData={earningsData.bookingsData}
        coursesData={earningsData.coursesData}
        activeTab={activeTab}
      />
      <Pagination totalPages={5} currentPage={1} />
    </div>
  );
};

export default EarningContainer;
