"use client";

import TeacherRegistrationContainer from "@/container/instructor-request/TeacherRegistrationContainer";
import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { GetLoggedInTutorRequestData } from "@/store/slices/tutorsSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    }
  }, [authUser]);

  useEffect(() => {
    dispatch(GetLoggedInTutorRequestData());
  }, []);

  return (
    <main className="font-nunito custom-margin-top">
      <TeacherRegistrationContainer />
    </main>
  );
}
