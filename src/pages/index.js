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
import Blog from "@/components/common/BlogCard";
import BlogSection from "@/container/common/BlogSection";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className=" font-nunito">
        <HeroSection />
        <div className="md:mt-0 mt-8">
        <FeaturedCourses />
        </div>
        <FeaturedInstructor />
        <Mentor />
        <MasterSkill />
        <UserLove />
        <Become/>
       <BlogSection/>
        <UnlimitedAccess />
    
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Home;