"use client";

import HeroSection from "@/components/home/HeroSection";
import MasterSkill from "@/components/home/MasterSkill";
import Mentor from "@/components/home/Mentor";
import UnlimitedAccess from "@/components/home/UnlimitedAccess";
import FeaturedCourses from "@/container/home/FeaturedCourses";
import FeaturedInstructor from "@/container/home/FeaturedInstructor";
import UserLove from "@/container/home/UserLove";
import Become from "@/components/home/Become";
import BlogSection from "@/container/common/BlogSection";
import LogoSlider from "@/components/common/LogoSlider";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoursesAsync } from "@/store/slices/coursesSlice";

const Home = () => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state?.courses?.courses);

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
        <div className="md:mt-0 mt-8"></div>
        <FeaturedCourses cardData={courses} />
        <FeaturedInstructor />
        <LogoSlider />
        <Mentor />
        <MasterSkill />
        <UserLove />
        <Become />
        <BlogSection />
        <UnlimitedAccess />
      </main>
    </>
  );
};

export default Home;
