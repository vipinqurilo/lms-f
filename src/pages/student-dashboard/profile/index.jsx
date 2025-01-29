"use client";

import { useState } from "react";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";

export default function ProfilePage() {
  const [profile] = useState({
    firstName: "Ronald",
    lastName: "Richard",
    userName: "studentdemo",
    email: "studentdemo@example.com",
    phoneNumber: "90154-91036",
    bio: "Hello! I'm Ronald Richard. I'm passionate about developing innovative software solutions, analyzing classic literature. I aspire to become a software developer, work as an editor. In my free time, I enjoy coding, reading, hiking etc.",
  });

  return (
    <StudentDashboardLayout className="space-y-8">
      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8 ">My Profile</div>
        
        <hr />
        {/* Profile Info */}
        <div className="p-4 px-8 ">
          {/* Profile Details */}
          <div className="space-y-6">
            {/* Name Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  First Name
                </label>
                <div className="text-gray-600">{profile.firstName}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Last Name
                </label>
                <div className="text-gray-600">{profile.lastName}</div>
              </div>
            </div>

            {/* Username & Email Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  User Name
                </label>
                <div className="text-gray-600">{profile.userName}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-dark mb-2">
                  Email
                </label>
                <div className="text-gray-600">{profile.email}</div>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Phone Number
              </label>
              <div className="text-gray-600">{profile.phoneNumber}</div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-dark mb-2">
                Bio
              </label>
              <div className="text-gray-600">{profile.bio}</div>
            </div>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
