"use client";

import Loader from "@/components/common/Loader";
import TutorAvailabilityCalendar from "@/components/instructor/TutorAvailabilityCalendar";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import { fetchAvailabilityAsync } from "@/store/slices/instructor/availabilitySlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AvailabilityCalendar() {
  const { availability, isLoading: availabilityLoading } = useSelector(
    (state) => state.instructor.availability
  );
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAvailabilityAsync());
  }, []);
  return (
    <StudentDashboardLayout>
      <div className="p-6">
        {availabilityLoading?.fetchAvailabilityAsync ? (
          <div className="w-full h-[80%] flex items-center justify-center">
            <Loader color={"text-secondary"} isBig={true} />
          </div>
        ) : (
          <TutorAvailabilityCalendar calendar={availability} />
        )}
      </div>
    </StudentDashboardLayout>
  );
}
