"use client";
import { useState } from "react";
import ProfileHeader from "../../components/tutor/single-page/ProfileHeader";
import AboutSection from "../../components/tutor/single-page/AboutSection";
import SpeaksSection from "../../components/tutor/single-page/SpeaksSection";
import PricingSection from "../../components/tutor/single-page/PricingSection";
import GroupClassesSection from "../../components/tutor/single-page/GroupClassesSection";
import TeachingExpertiseSection from "../../components/tutor/single-page/TeachingExpertiseSection";
import TeachingQualificationsSection from "../../components/tutor/single-page/TeachingQualificationsSection";
import ReviewsSection from "../../components/tutor/single-page/ReviewsSection";
import SidebarActions from "../../components/tutor/single-page/SidebarActions";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("newest");
  const { isAvailableModelOpen, isContactModelOpen } = useSelector(
    (state) => state.ui
  );
  return (
    <div className="block lg:flex   px-2 lg:px-10 py-8 w-full ">
      {/* Left side */}
      <div className="w-full lg:max-w-7xl mx-auto px-2 lg:px-4 py-8">
        <ProfileHeader />
        <div className="block lg:hidden">
          <SidebarActions />
        </div>
        <AboutSection />
        <SpeaksSection />
        <PricingSection />
        <h2 className="text-2xl font-semibold my-4">Schedule</h2>
        <h2 className="text-base font-bold my-4">Marlene Reilly's Calendar</h2>
        <div className="h-[600px] border">
          <AvailabilityCalendar />
        </div>
        <TeachingExpertiseSection />
        <TeachingQualificationsSection />
        <ReviewsSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="hidden lg:block">
        <SidebarActions />
      </div>
    </div>
  );
}
