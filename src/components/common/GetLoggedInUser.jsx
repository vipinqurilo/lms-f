"use client";
import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { verifyLoggedInUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetLoggedInUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(verifyLoggedInUser());
    dispatch(getSubjects());
    dispatch(getSubSubjects());
    dispatch(getLanguages());
  }, [dispatch]);

  return null;
};

export default GetLoggedInUser;
