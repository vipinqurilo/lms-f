"use client";

import BasicDetailsForm from "@/components/instructor-request/BasicDetailsForm";
import Confirmation from "@/components/instructor-request/Confirmation";
import Experience from "@/components/instructor-request/Experience";
import IndentityForm from "@/components/instructor-request/IndentityForm";
import SubjectAndLanguage from "@/components/instructor-request/SubjectAndLanguage";
import TeacherRegistrationProcess from "@/components/instructor-request/TeacherRegistrationProcess";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const TeacherRegistrationContainer = () => {
  const path = usePathname();
  const { processStep: step, requestStatus } = useSelector(
    (state) => state.tutors
  );
  const isRejected = requestStatus === "rejected";
  const isApproved = requestStatus === "approved";

  const isInstructorRequest = path.startsWith("/instructor-request");

  const h2Styles = "font-bold uppercase";
  const stepContainerCss =
    "my-8 py-5 lg:my-0 lg:py-5 border border-black/10 px-5 md:px-10 lg:px-10 shadow rounded-lg";
  return (
    <div className="custom-container w-full flex flex-col justify-between lg:flex-row lg:justify-between">
      <TeacherRegistrationProcess />
      <div className="w-full lg:w-[80%] ">
        {step === 1 ? (
          <div className={`${stepContainerCss} space-y-6`}>
            <h2 className={h2Styles}>PERSONAL INFO</h2>
            <BasicDetailsForm isInstructorRequest={isInstructorRequest} />
          </div>
        ) : step === 2 ? (
          <div className={`${stepContainerCss} space-y-6`}>
            <h2 className={h2Styles}>
              Add profile photo, video, and biography
            </h2>
            <IndentityForm isInstructorRequest={isInstructorRequest} />
          </div>
        ) : step === 3 ? (
          <div className={`${stepContainerCss} space-y-6`}>
            <h2 className={h2Styles}>Subject and Language</h2>
            <SubjectAndLanguage isInstructorRequest={isInstructorRequest} />
          </div>
        ) : step === 4 ? (
          <div className={`${stepContainerCss} space-y-6`}>
            <h2 className={h2Styles}>Experience</h2>
            <Experience isInstructorRequest={isInstructorRequest} />
          </div>
        ) : step === 5 ? (
          <div
            className={`${stepContainerCss} space-y-6 ${
              isRejected && "!bg-red-50/50"
            } ${
              isApproved && "!bg-green-50/50"
            }`}
          >
            <h2 className={h2Styles}>CONFIRMATION</h2>
            <Confirmation isInstructorRequest={isInstructorRequest} />
          </div>
        ) : undefined}
      </div>
    </div>
  );
};

export default TeacherRegistrationContainer;
