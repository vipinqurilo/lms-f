"use client";

import Loader from "@/components/common/Loader";
import TeacherRegistrationContainer from "@/container/instructor-request/TeacherRegistrationContainer";
import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { getTutorRequestData } from "@/store/slices/tutorsSlice";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const TeacherRequestPageViewByAdmin = () => {
  const { authUser } = useSelector((state) => state.user);
  const loading = useSelector(
    (state) => state.tutors.isLoading.getTutorRequestData
  );

  const router = useRouter();
  const params = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?.role !== "admin") {
      router.push("/");
    }
  }, [authUser]);

  useEffect(() => {
    if (params?.id) {
      dispatch(getTutorRequestData(params.id));
    }
  }, [dispatch, params?.id]);

  if (!params?.id) {
    return <p>Loading...</p>;
  }

  return (
    <main className="font-nunito custom-margin-top">
      {loading ? (
        <Loader color={"text-primary"} isBig={true} />
      ) : (
        <TeacherRegistrationContainer />
      )}
    </main>
  );
};

export default TeacherRequestPageViewByAdmin;
