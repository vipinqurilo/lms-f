"use client";

import TeacherRegistrationContainer from "@/container/instructor-request/TeacherRegistrationContainer";
import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { GetLoggedInTutorRequestData } from "@/store/slices/tutorsSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetLoggedInTutorRequestData());
    dispatch(getSubjects());
    dispatch(getSubSubjects());
    dispatch(getLanguages());
  }, []);

  return (
    <main className="font-nunito custom-margin-top">
      <TeacherRegistrationContainer />
    </main>
  );
}
