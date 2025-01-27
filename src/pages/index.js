"use client";

import FeaturedCard from "@/components/FeaturedCard";
import Footer from "@/components/Footer";
// import FeaturedInstructor from "@/components/home/FeaturedInstructor";
import HeroSection from "@/components/home/HeroSection";
import MasterSkill from "@/components/home/MasterSkill";
import Mentor from "@/components/home/Mentor";
import UnlimitedAccess from "@/components/home/UnlimitedAccess";
import Navbar from "@/components/Navbar";
import FeaturedCourses from "@/container/home/FeaturedCourses";
import InstructorCard from "@/components/home/InstructorCard.jsx";
import FeaturedInstructor from "@/container/home/FeaturedInstructor";
import Testimonial from "../components/home/Testimonial";
import UserLove from "@/container/home/UserLove";
import Become from "@/components/home/Become";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className=" font-nunito">
        {/* <HeroSection />
        <FeaturedCourses />
        <FeaturedInstructor />
        <Mentor />
        <MasterSkill />
        <UnlimitedAccess /> */}
        <UserLove />
        <Become/>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Home;