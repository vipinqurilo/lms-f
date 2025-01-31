"use client";

import BasicDetailsForm from "@/components/instructor-request/BasicDetailsForm";
import Confirmation from "@/components/instructor-request/Confirmation";
import Experience from "@/components/instructor-request/Experience";
import SubjectAndLanguage from "@/components/instructor-request/SubjectAndLanguage";
import TeacherRegistrationProcess from "@/components/instructor-request/TeacherRegistrationProcess";
import React from "react";
import { useSelector } from "react-redux";

const TeacherRegistrationContainer = () => {
  const { processStep: step } = useSelector((state) => state.tutors);

  return (
    <div className="custom-container w-full flex flex-col justify-between lg:flex-row lg:justify-between">
      <TeacherRegistrationProcess />
      <div className="w-full lg:w-[80%] ">
        {step === 1 ? (
          <BasicDetailsForm />
        ) : step === 2 ? (
          <SubjectAndLanguage />
        ) : step === 3 ? (
          <Experience />
        ) : step === 4 ? (
          <Confirmation />
        ) : undefined}
      </div>
    </div>
  );
};

export default TeacherRegistrationContainer;
