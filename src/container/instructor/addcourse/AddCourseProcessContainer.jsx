"use client";

import AddCourseProcess from "@/components/instructor/addcourse/AddCourseProcess";
import BasicDetails from "@/components/instructor/addcourse/BasicDetails";
import CourseMedia from "@/components/instructor/addcourse/CourseMedia";
import Curriculum from "@/components/instructor/addcourse/Curriculum";
import PricingAccess from "@/components/instructor/addcourse/Pricing&Access";
import React from "react";
import { useSelector } from "react-redux";

const AddCourseProcessContainer = () => {
  const { step } = useSelector((state) => state.instructor.course);

  return (
    <div className="space-y-4">
      <AddCourseProcess />
      <div className="px-10 py-5 w-full">
        {step === 1 ? (
          <BasicDetails />
        ) : step === 2 ? (
          <CourseMedia />
        ) : step === 3 ? (
          <Curriculum />
        ) : step === 4 ? (
          <PricingAccess />
        ) : undefined}
      </div>
    </div>
  );
};

export default AddCourseProcessContainer;
