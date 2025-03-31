"use client";

import React from "react";
import { useSelector } from "react-redux";




export function SettingsTabs({ activeTab, onTabChange,tabs, noOfTabs = 3 }) {
  const { authUser } = useSelector((state) => state.user);

  const getVisibleTabs = () => {
    if (authUser?.role === "admin") {
      // For admin, show first 3 tabs plus footer settings
      return [...tabs?.slice(0, noOfTabs), tabs[7]];
    } else if (authUser?.role === "student") {
      // For student, show first 3 tabs only
      return tabs?.slice(0, 3);
    } else if (authUser?.role === "instructor") {
      // For instructor, show first 7 tabs
      return tabs?.slice(0, 7);
    } else {
      // Default case
      return tabs;
    }
  };

  return (  
    <div className="flex flex-wrap gap-2 border-b">
      {getVisibleTabs()?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
            activeTab === tab?.id
              ? "text-secondary border-b border-secondary"
              : "text-gray-500 hover:text-secondary"
          }`}
        >{tab?.Icon && <tab.Icon className="h-5 w-5" />}
          {tab?.label}
        </button>
      ))}
    </div>
  );
}
