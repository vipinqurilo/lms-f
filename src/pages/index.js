"use client";

import HeroSection from "@/components/home/HeroSection";
import MasterSkill from "@/components/home/MasterSkill";
import Mentor from "@/components/home/Mentor";
import UnlimitedAccess from "@/components/home/UnlimitedAccess";
import FeaturedCourses from "@/container/home/FeaturedCourses";
import FeaturedInstructor from "@/container/home/FeaturedInstructor";
import UserLove from "@/container/home/UserLove";
import Become from "@/components/home/Become";
import LogoSlider from "@/components/common/LogoSlider";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCoursesAsync } from "@/store/slices/coursesSlice";

const Home = () => {
  const courses = useSelector((state) => state?.courses?.courses);
  const dispatch = useDispatch();

  useEffect(() => { 
    const requestData = {
      page: 1,
      status: "published",  
    };
    dispatch(fetchCoursesAsync(requestData));
  }, [dispatch]);

  return (
    <>
      <main className=" font-nunito custom-margin-top !overflow-visible">
        <HeroSection />
        <FeaturedCourses cardData={courses} />
        <FeaturedInstructor />
        <LogoSlider />
        <Mentor />
        <MasterSkill />
        <UserLove />
        <Become />
        <UnlimitedAccess />
      </main>
    </>
  );
};

export default Home;
