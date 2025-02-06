"use client";

import { useDispatch, useSelector } from "react-redux";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { useEffect } from "react";
import { fetchProfileAsync } from "@/store/slices/student-dashboard/profileSlice";

export default function ProfilePage() {
  const { profile } = useSelector((state) => state.student.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAsync());
  }, [dispatch]);
  return (
    <StudentDashboardLayout className="space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8">My Profile</div>
        <hr />
        {/* Profile Info */}
        <div className="p-4 px-8">
          {/* Profile Details */}
          <div className="space-y-6">
            {/* Name Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  First Name
                </label>
                <div className="text-gray-600">{profile?.firstName}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Last Name
                </label>
                <div className="text-gray-600">{profile?.lastName}</div>
              </div>
            </div>

            {/* Username & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  User Name
                </label>
                <div className="text-gray-600">{profile?.userName}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Email
                </label>
                <div className="text-gray-600">{profile?.email}</div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Phone Number
              </label>
              <div className="text-gray-600">
                {profile?.phone?.countryCode} {profile?.phone?.number}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Bio
              </label>
              <div className="text-gray-600">{profile?.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
