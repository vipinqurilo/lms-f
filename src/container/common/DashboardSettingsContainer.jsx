"use client";

import Experience from "@/components/instructor-request/Experience";
import SubjectAndLanguage from "@/components/instructor-request/SubjectAndLanguage";
import TitleComp from "@/components/instructor/TitleComp";
import { AvatarUpload } from "@/components/student-dashboard/settings/AvatarUpload";
import { ChangePassword } from "@/components/student-dashboard/settings/ChangePassword";
import { EditProfile } from "@/components/student-dashboard/settings/EditProfile";
import PriceTab from "@/components/student-dashboard/settings/PriceTab";
import { SettingsTabs } from "@/components/student-dashboard/settings/SettingsTabs";
import { SocialProfiles } from "@/components/student-dashboard/settings/SocialProfiles";
import WithdrawalTabProfile from "@/components/student-dashboard/settings/WithdrawalTabProfile";
import { getProfile } from "@/store/slices/instructor/settingsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const DashboardSettingsContainer = () => {
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

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="bg-white rounded-lg border">
      <TitleComp
        heading={"Settings"}
        des={"You have full control to manage your own account settings"}
      />

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

        {activeTab === "withdrawal" && <WithdrawalTabProfile />}

        {activeTab === "subject-language" && (
          <div className="p-4 px-8">
            <SubjectAndLanguage />
          </div>
        )}

        {activeTab === "experience" && (
          <div className="p-4 px-8">
            <Experience />
          </div>
        )}

        {activeTab === "price" && (
          <div className="p-4 px-8">
            <PriceTab />
          </div>
        )}

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
  );
};

export default DashboardSettingsContainer;
