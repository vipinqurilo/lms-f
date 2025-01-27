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
    <div className="flex px-10 py-8">
      {/* Left side */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProfileHeader />
        <AboutSection />
        <SpeaksSection />
        <PricingSection />
        <div className="h-[600px] border">
          <AvailabilityCalendar />
        </div>
        <GroupClassesSection />
        <TeachingExpertiseSection />
        <TeachingQualificationsSection />
        <ReviewsSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

    </div>
  );
}
