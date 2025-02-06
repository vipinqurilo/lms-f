"use client";

import { useEffect, useState } from "react";

import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { SettingsTabs } from "../../../components/student-dashboard/settings/SettingsTabs";
import { AvatarUpload } from "../../../components/student-dashboard/settings/AvatarUpload";
import { EditProfile } from "../../../components/student-dashboard/settings/EditProfile";
import { ChangePassword } from "../../../components/student-dashboard/settings/ChangePassword";
import { SocialProfiles } from "../../../components/student-dashboard/settings/SocialProfiles";
import { fetchProfileAsync } from "@/store/slices/student-dashboard/ProfileSlice";
import { useDispatch } from "react-redux";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [avatarUrl, setAvatarUrl] = useState("/assets/tutor/Marlenereilly.jpg");
  const dispatch = useDispatch();

  const handleAvatarUpload = (file) => {
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
  };

  const handleAvatarDelete = () => {
    setAvatarUrl("/placeholder.svg");
  };

  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg border">
        {/* Header */}
        <div className="p-4 px-8 border-b">
          <h1 className="text-2xl font-semibold text-dark mb-2">Settings</h1>
          <p className="text-gray-500">
            You have full control to manage your own account settings
          </p>
        </div>

        {/* Tabs */}
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Content */}
        <div className="">
          {activeTab === "edit-profile" && (
            <div className="space-y-8">
              <AvatarUpload
                avatarUrl={avatarUrl}
                onUpload={handleAvatarUpload}
                onDelete={handleAvatarDelete}
              />
              <EditProfile />
            </div>
          )}

          {activeTab === "change-password" && <ChangePassword />}

          {activeTab === "social-profiles" && <SocialProfiles />}

          {activeTab === "linked-accounts" && (
            <div className="text-gray-500">
              Linked Accounts settings coming soon...
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="text-gray-500">
              Notification settings coming soon...
            </div>
          )}
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
