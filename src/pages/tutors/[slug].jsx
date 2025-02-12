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
import LoginModel from "@/container/login/LoginModel";
import { BookingModal } from "@/container/booking/BookingModal";
import { Loader } from "lucide-react";

export default function TeacherProfile() {
  const [activeTab, setActiveTab] = useState("newest");
  const [showBooking, setShowBooking] = useState(false);

  const dispatch = useDispatch();
  const { tutorId } = useSelector((state) => state.tutors);
  const { authUser } = useSelector((state) => state.user);
  // Get tutor profile from Redux store
  const { tutorProfile, isLoading, error } = useSelector(
    (state) => state.tutors
  );
  useEffect(() => {
    dispatch(fetchTutorProfileAsync(tutorId));
  }, [dispatch, tutorId]);

  if (isLoading["fetchTutorProfileAsync"]) {
    return (
      <div className="text-center w-full h-screen custion-margin-top">
        <Loader text="Loading..." />
      </div>
    ); // You can replace with a loading spinner or message
  }

  if (error["fetchTutorProfileAsync"]) {
    return (
      <div className="text-center w-full h-screen custion-margin-top">
        Error loading tutor profile
      </div>
    ); // Handle error scenario
  }
  return (
    <div className="block lg:flex  min-h-screen px-2 lg:px-10 py-8 w-full custom-margin-top">
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
          <AvailabilityCalendar calendar={tutorProfile?.calendar} />
        </div>
        {/* <TeachingExpertiseSection /> */}
        <TeachingQualificationsSection />
        <ExperienceSection />
        <ReviewsSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="hidden lg:block">
        <SidebarActions setShowBooking={setShowBooking} />
      </div>
      <div className="p-4">
        {showBooking &&
          (authUser?.role !== "student" ? (
            <LoginModel onClose={() => setShowBooking(false)} />
          ) : (
            <BookingModal
              tutor={tutorProfile}
              onClose={() => setShowBooking(false)}
            />
          ))}
      </div>
    </div>
  );
}
