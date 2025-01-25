import AboutInstructor from "@/components/course-main-page/AboutInstructor";
import CommentForm from "@/components/course-main-page/CommentForm";
import CourseHighLights from "@/components/course-main-page/CourseHighLights";
import CourseOverview from "@/components/course-main-page/CourseOverview";
import CourseReview from "@/components/course-main-page/CourseReview";
import LecturesOverview from "@/components/course-main-page/LecturesOverview";
import TopSection from "@/components/course-main-page/TopSection";
import React from "react";

const CourseDetails = ({ data }) => {
  return (
    <div className="w-full">
      <TopSection data={data} />
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-10 custom-container relative">
        <div className="w-full lg:w-[60%] space-y-10">
          <CourseOverview data={data?.courseOverview} />
          <LecturesOverview data={data?.courseContent} />
          <AboutInstructor data={data?.instructor} />
          <CourseReview />
          <CommentForm />
        </div>
        <CourseHighLights data={data} />
      </div>
    </div>
  );
};

export default CourseDetails;
