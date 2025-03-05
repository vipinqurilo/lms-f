"use client";

import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getWallet } from "@/store/slices/withdrawalSlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { verifyLoggedInUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlistAsync } from "@/store/slices/student-dashboard/wishlistSlice";
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
    if (isAuthenticated && authUser) {
      if (authUser.role === "teacher" && authUser.userStatus === "active") {
        localStorage.setItem("isAdmin", JSON.stringify(false));
        dispatch(getWallet());
      } else if (authUser.role === "student") {
        localStorage.setItem("isAdmin", JSON.stringify(false));
        dispatch(fetchWishlistAsync());
        dispatch(getAllEnrolledCourses());
      } else if (authUser.role === "admin") {
        localStorage.setItem("isAdmin", JSON.stringify(true));
      }
    }
  }, [dispatch, authUser, isAuthenticated]);

  return null;
};

export default GetLoggedInUser;
