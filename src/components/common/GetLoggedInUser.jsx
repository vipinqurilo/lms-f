"use client";

import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getWallet } from "@/store/slices/withdrawalSlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { verifyLoggedInUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistAsync } from "@/store/slices/student-dashboard/wishlistSlice";
import { fetchEnrolledCoursesAsync } from "@/store/slices/student-dashboard/enrolledCoursesSlice";
import { fetchAllTutorProfileAsync } from "@/store/slices/tutorsSlice";
import { getAllEnrolledCourses } from "@/store/slices/coursesSlice";

const GetLoggedInUser = () => {
  const dispatch = useDispatch();
  const { authUser, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyLoggedInUser());
    dispatch(getSubjects());
    dispatch(getSubSubjects());
    dispatch(getLanguages());
    dispatch(fetchAllTutorProfileAsync({ search: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (
        authUser &&
        authUser?.role === "teacher" &&
        authUser?.userStatus === "active"
      ) {
        dispatch(getWallet());
      } else if (authUser?.role === "student") {
        dispatch(fetchWishlistAsync());
        dispatch(getAllEnrolledCourses());
      }
    }
  }, [dispatch, authUser, isAuthenticated]);

  return null;
};

export default GetLoggedInUser;
