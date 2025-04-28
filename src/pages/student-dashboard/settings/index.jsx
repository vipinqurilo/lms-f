"use client";

import { useEffect, useState } from "react";

import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { SettingsTabs } from "../../../components/student-dashboard/settings/SettingsTabs";
import { AvatarUpload } from "../../../components/student-dashboard/settings/AvatarUpload";
import { EditProfile } from "../../../components/student-dashboard/settings/EditProfile";
import { ChangePassword } from "../../../components/student-dashboard/settings/ChangePassword";
import { SocialProfiles } from "../../../components/student-dashboard/settings/SocialProfiles";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "@/store/slices/uploadSlice";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("edit-profile");
  const {profile,isLoading} = useSelector((state) => state.student?.profile);
  const [avatarUrl, setAvatarUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  const dispatch = useDispatch(); 
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
    setAvatarUrl("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  };
  useEffect(() => {
    if(profile){
      setAvatarUrl(profile.profilePhoto)
    }
    return () => {
    }
  }, [profile])
  
  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg border m-10 shadow border-gray-200">
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
                onUpload={handleImageValidation}
                onDelete={handleAvatarDelete}
              />
              <EditProfile profilePhoto={avatarUrl} />
              
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
