"use client";

import BecomeAnInstructor from "@/container/teach/BecomeAnInstructor";
import RegisterProcess from "@/container/teach/RegisterProcess";
import TeachersBenefits from "@/container/teach/TeachersBenefits";
import TeachStats from "@/container/teach/TeachStats";
import TeachTopSecton from "@/container/teach/TeachTopSecton";
import { GetLoggedInTutorRequestData } from "@/store/slices/tutorsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetLoggedInTutorRequestData());
  }, []);
  return (
    <div className="w-full font-nunito custom-margin-top">
      <TeachTopSecton />
      <TeachStats />
      <TeachersBenefits />
      <RegisterProcess />
      <BecomeAnInstructor />
    </div>
  );
};

export default index;
