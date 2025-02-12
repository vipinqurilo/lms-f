"use client";
import { verifyLoggedInUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const GetLoggedInUser = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(verifyLoggedInUser());
  // }, []);

  return null;
};

export default GetLoggedInUser;
