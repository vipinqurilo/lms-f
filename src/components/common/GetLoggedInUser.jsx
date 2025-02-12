"use client";
import {
  fetchCategories,
  fetchCoursesAsync,
} from "@/store/slices/coursesSlice";
import { verifyLoggedInUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetLoggedInUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(verifyLoggedInUser());
  }, [dispatch]);

  return null;
};

export default GetLoggedInUser;
