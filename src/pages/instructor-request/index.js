"use client";

import TeacherRegistrationContainer from "@/container/instructor-request/TeacherRegistrationContainer";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function index() {
  const { authUser } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!authUser) {
      router.push("/");
    }
  }, [authUser]);

  return (
    <main className="font-nunito custom-margin-top">
      <TeacherRegistrationContainer />
    </main>
  );
}
