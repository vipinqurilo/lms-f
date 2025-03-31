"use client";

import Experience from "@/components/instructor-request/Experience";
import SubjectAndLanguage from "@/components/instructor-request/SubjectAndLanguage";
import TitleComp from "@/components/instructor/TitleComp";
import { AvatarUpload } from "@/components/student-dashboard/settings/AvatarUpload";
import { ChangePassword } from "@/components/student-dashboard/settings/ChangePassword";
import { EditProfile } from "@/components/student-dashboard/settings/EditProfile";
import FooterSettings from "@/components/student-dashboard/settings/FrontendSettings";
import PriceTab from "@/components/student-dashboard/settings/PriceTab";
import { SettingsTabs } from "@/components/student-dashboard/settings/SettingsTabs";
import { SocialProfiles } from "@/components/student-dashboard/settings/SocialProfiles";
import WithdrawalTabProfile from "@/components/student-dashboard/settings/WithdrawalTabProfile";
import { getProfile } from "@/store/slices/instructor/settingsSlice";
import { uploadImage } from "@/store/slices/uploadSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
  import {
    LuUser,
    LuLock,
    LuShare2,
    LuDollarSign,
    LuBook,
    LuBriefcase,
    LuBanknote,
  } from "react-icons/lu";
  import { Settings2 } from "lucide-react";

const DashboardProfileSettingsContainer = () => {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const [avatarUrl, setAvatarUrl] = useState("/assets/tutor/Marlenereilly.jpg");
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.student?.profile);
  const { profile: instructorProfile } = useSelector(
    (state) => state.instructor.setting
  );

  const profile = profileState?.profile;

  useEffect(() => {
    if (instructorProfile) {
      setAvatarUrl(instructorProfile?.profilePhoto);
    } else {
      setAvatarUrl(profile?.profilePhoto);
    }
  }, [profile, instructorProfile]);

  const handleImageValidation = (imageFile) => {
    const formData = new FormData();
    formData.append("courseImage", imageFile);

    if (imageFile) {
      if (imageFile.size > 1 * 1024 * 1024) {
        toast.error("File size must be less than 1MB");
        return;
      }
      dispatch(uploadImage(formData))
        .unwrap()
        .then((res) => {
          if (res?.data) {
            setAvatarUrl(res.data);
          } else {
            toast.error("Invalid image response", res);
          }
        })
        .catch((error) => {
          toast.error("Image upload failed:", error);
        });
    }
  };

  const handleAvatarDelete = () => {
    setAvatarUrl("/placeholder.svg");
  };

  const tabs = [
    {
      id: "edit-profile",
      label: "Edit Profile",
      Icon: LuUser,
    },
    {
      id: "change-password",
      label: "Change Password",
      Icon: LuLock,
    },
    {
      id: "social-profiles",
      label: "Social Profiles",
      Icon: LuShare2,
    },
    {
      id: "withdrawal",
      label: "Withdrawal",
      Icon: LuDollarSign,
    },
    {
      id: "subject-language",
      label: "Subject & Language",
      Icon: LuBook,
    },
    {
      id: "experience",
      label: "Experience",
      Icon: LuBriefcase,
    },
    {
      id: "price",
      label: "Price",
      Icon: LuBanknote,
    },
  ];

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="p-10">
      <div className="bg-white rounded-lg border">
        <TitleComp
          heading={"Profile Settings"}
          des={"You have full control to manage your own account settings"}
        />

        {/* Tabs */}
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

        {/* Content */}
        <div className="">
          {activeTab === "edit-profile" && (
            <div className="space-y-8">
              <AvatarUpload
                avatarUrl={avatarUrl}
                onUpload={handleImageValidation}
                onDelete={handleAvatarDelete}
              />
              <EditProfile profilePhoto={avatarUrl} />
            </div>
          )}

          {activeTab === "change-password" && <ChangePassword />}

          {activeTab === "social-profiles" && <SocialProfiles />}
          {activeTab === "footer-settings" && <FooterSettings />}

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
    </div>
  );
};

export default DashboardProfileSettingsContainer;
