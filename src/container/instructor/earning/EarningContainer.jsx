"use client";

import React, { useState } from "react";
import CreatedCourses from "../dashboard/CreatedCourses";
import { useSelector } from "react-redux";
import EarningsChart from "./EarningsChart";
import EarningFiltration from "@/components/instructor/earning/EarningFiltration";

const headingsData = ["Courses", "Sales", "Amount"];

const EarningContainer = () => {
  const { courses } = useSelector((state) => state.instructor.course);
  const [keyword, setKeyword] = useState("");
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
      <EarningFiltration
        endDate={endDate}
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        handleStartDateChange={(date) => setStartDate(date)}
        handleEndDateChange={(date) => setEndDate(date)}
      />
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
