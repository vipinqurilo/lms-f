"use client";

import React from "react";
import EarningStats from "./EarningStats";
import CreatedCourses from "../dashboard/CreatedCourses";
import { useSelector } from "react-redux";
import EarningsChart from "./EarningsChart";

const stats = [
  {
    title: "Revenue",
    amount: "$1,250",
    label: "Earning this month",
  },
  {
    title: "Students Enrollments",
    amount: "15,300",
    label: "New this month",
  },
  {
    title: "Courses Ratings",
    amount: "4.9",
    label: "Rating this month",
  },
  {
    title: "Total Courses",
    amount: "35",
    label: "Active courses",
  },
];

const headingsData = ["Courses", "Sales", "Amount"];

const EarningContainer = () => {
  const { courses } = useSelector((state) => state.instructor.course);
  const filteredData = courses?.map((course) => ({
    image: course?.thumbnail,
    title: course?.title,
    des: course?.description,
    value1: course?.originalPrice,
    value2: 50,
  }));
  return (
    <div className="w-full flex flex-col gap-6 py-5 px-5">
      <EarningStats data={stats} />
      <EarningsChart />
      <CreatedCourses
        title="Best Selling Courses"
        data={filteredData}
        headingsData={headingsData}
      />
    </div>
  );
};

export default EarningContainer;
