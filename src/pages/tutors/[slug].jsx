"use client";
import { useEffect, useState } from "react";
import ProfileHeader from "../../components/tutor/single-page/ProfileHeader";
import AboutSection from "../../components/tutor/single-page/AboutSection";
import SpeaksSection from "../../components/tutor/single-page/SpeaksSection";
import PricingSection from "../../components/tutor/single-page/PricingSection";
import GroupClassesSection from "../../components/tutor/single-page/GroupClassesSection";
import TeachingExpertiseSection from "../../components/tutor/single-page/TeachingExpertiseSection";
import {
  ExperienceSection,
  TeachingQualificationsSection,
} from "../../components/tutor/single-page/TeachingQualificationsSection";
import ReviewsSection from "../../components/tutor/single-page/ReviewsSection";
import SidebarActions from "../../components/tutor/single-page/SidebarActions";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { fetchTutorProfileAsync } from "@/store/slices/tutorsSlice";

export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("newest");
  const dispatch = useDispatch();

  // Get tutor profile from Redux store
  const { tutorProfile, isLoading, error } = useSelector(
    (state) => state.tutors
  );
  useEffect(() => {
    const tutorId = "67a1acec55d46979078eddd7"; // Replace this with dynamic tutorId if needed
    dispatch(fetchTutorProfileAsync(tutorId));
  }, [dispatch]);

  if (isLoading["fetchTutorProfileAsync"]) {
    return <div>Loading...</div>; // You can replace with a loading spinner or message
  }

  if (error["fetchTutorProfileAsync"]) {
    return <div>Error loading tutor profile</div>; // Handle error scenario
  }
  return (
    <div className="block lg:flex   px-2 lg:px-10 py-8 w-full custom-margin-top">
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
        <h2 className="text-base font-bold my-4">
          {tutorProfile?.userId?.firstName} {tutorProfile?.userId?.lastName}'s
          Calendar
        </h2>
        <div className="h-[600px] border">
          <AvailabilityCalendar />
        </div>
        {/* <TeachingExpertiseSection /> */}
        <TeachingQualificationsSection />
        <ExperienceSection />
        <ReviewsSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="hidden lg:block">
        <SidebarActions />
      </div>
    </div>
  );
}
