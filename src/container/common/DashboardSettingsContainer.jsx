"use client";

import Experience from "@/components/instructor-request/Experience";
import SubjectAndLanguage from "@/components/instructor-request/SubjectAndLanguage";
import TitleComp from "@/components/instructor/TitleComp";
import { AvatarUpload } from "@/components/student-dashboard/settings/AvatarUpload";
import { ChangePassword } from "@/components/student-dashboard/settings/ChangePassword";
import { EditProfile } from "@/components/student-dashboard/settings/EditProfile";
import FrontendSettings from "@/components/student-dashboard/settings/FrontendSettings";
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
  LuMail,
  LuCreditCard,
} from "react-icons/lu";
import { Settings2 } from "lucide-react";
import EmailSettings from "@/components/student-dashboard/settings/EmailSettings";
import PaymentSettings from "@/components/student-dashboard/settings/PaymentSettings";
const DashboardSettingsContainer = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <div className="p-10">
      <div className="bg-white rounded-lg border">
        <TitleComp
          heading={"Settings"}
          des={"You have full control to manage your own account settings"}
        />

        {/* Tabs */}
        <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} noOfTabs={4} />

        {/* Content */}
        <div className="">
          {activeTab === "frontend-settings" && <FrontendSettings />}
          {activeTab === "email-settings" && <EmailSettings />}
          {activeTab === "payment-settings" && <PaymentSettings type="payment" />}
          {activeTab === "payout-settings" && <PaymentSettings type="payout" />}
        </div>
      </div>
    </div>
  );
};

export default DashboardSettingsContainer;
