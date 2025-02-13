"use client";

import React from "react";
import { useSelector } from "react-redux";
import {
  LuUser,
  LuLock,
  LuShare2,
  LuDollarSign,
  LuBook,
  LuBriefcase,
  LuBanknote,
} from "react-icons/lu";

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

export function SettingsTabs({ activeTab, onTabChange }) {
  const { authUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-wrap gap-2 border-b">
      {tabs
        ?.slice(
          0,
          authUser?.role === "student" || authUser?.role === "admin"
            ? 3
            : authUser?.role === "instructor"
            ? 7
            : undefined
        )
        .map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "text-primary border-b border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            <tab.Icon className="h-5 w-5" />
            {tab.label}
          </button>
        ))}
    </div>
  );
}
