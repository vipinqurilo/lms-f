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
    <div className="w-full relative">
      <TopSection data={data} />
      <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-10 custom-container relative">
        <div className="lg:hidden w-full lg:!w-[35%]">
          <CourseHighLights data={data} />
        </div>
        <div className="w-full lg:w-[60%] space-y-10">
          <CourseOverview data={data?.courseOverview} />
          <LecturesOverview data={data?.courseContent} />
          <AboutInstructor data={data?.instructor} />
          <CommentForm />
          <CourseReview data={data?.reviews} />
        </div>
        <div className="lg:block hidden w-full lg:!w-[35%] lg:-mt-0 lg:sticky lg:top-20">
          <CourseHighLights data={data} />
        </div>
      </div>
      <div className="lg:hidden block">
        <div className="w-full bg-white shadow fixed bottom-0">
          <div className=" px-8 py-4 flex items-center justify-between gap-5">
            <div className="flex items-center gap-2">
              <h3 className="text-green-500 text-2xl font-bold">₹1000</h3>
            </div>
            <button className="px-4 py-2 bg-secondary hover:bg-black transition-custom w-full text-white rounded">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
