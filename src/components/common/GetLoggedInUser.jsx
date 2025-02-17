"use client";

import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
import { getWallet } from "@/store/slices/withdrawalSlice";
import { getLanguages } from "@/store/slices/languageSlice";
import { verifyLoggedInUser } from "@/store/slices/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const GetLoggedInUser = () => {
  const dispatch = useDispatch();
  const { authUser, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(verifyLoggedInUser());
    dispatch(getSubjects());
    dispatch(getSubSubjects());
    dispatch(getLanguages());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (
        authUser &&
        authUser?.role === "teacher" &&
        authUser?.userStatus === "active"
      ) {
        dispatch(getWallet());
      }
    }
  }, [dispatch, authUser]);

  return null;
};

export default GetLoggedInUser;
