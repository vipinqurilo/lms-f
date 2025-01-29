import React from "react";
import CoursesFilterCards from "./CoursesFilterCards";
import CoursesFilterPrices from "./CoursesFilterPrices";

const CoursesFilter = () => {
  return (
    <div className="mt-7">
      <CoursesFilterCards />
      <CoursesFilterPrices />
    </div>
  );
};

export default CoursesFilter;
