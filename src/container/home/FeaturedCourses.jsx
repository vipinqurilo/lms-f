import React from "react";
import FeaturedCard from "@/components/common/FeaturedCard";
import Heading from "@/components/common/Heading";

export default function FeaturedCourses() {
  const data = {
    heading: "Featured Courses",
    desc: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.`,
    card: [
      {
        id: 1,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-01.jpg`,
        author: `Nicole Brown`,
        heading: "Information About UI/UX Design Degree",
        lesson: "12+ Lesson",
        time: "9hr 30min",
      },
      {
        id: 2,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-02.jpg`,
        author: `Jenis R.`,
        heading: "Wordpress for Beginners - Master Wordpress Quickly",
        lesson: "11+ Lesson",
        time: "6hr 30min",
      },
      {
        id: 3,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-03.jpg`,
        author: `Jesse Stevens`,
        heading: "Sketch from A to Z (2024): Become an app designer",
        lesson: "16+ Lesson",
        time: "12hr 30min",
      },
      {
        id: 4,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-04.jpg`,
        author: `Emily Davis`,
        heading: "Mastering Photoshop: From Basics to Advanced",
        lesson: "15+ Lesson",
        time: "10hr 45min",
      },
      {
        id: 5,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-05.jpg`,
        author: `Liam Turner`,
        heading: "ReactJS Fundamentals and Advanced Concepts",
        lesson: "18+ Lesson",
        time: "14hr 20min",
      },
      {
        id: 6,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/course/course-06.jpg`,
        author: `Sophia Lee`,
        heading: "Digital Marketing Essentials - Grow Your Brand",
        lesson: "10+ Lesson",
        time: "7hr 15min",
      },
    ],
  };

  return (
    <div
      className="bg-no-repeat h-full md:px-20 px-4 "
      style={{
        backgroundImage: `url('https://dreamslms.dreamstechnologies.com/html/assets/img/banner.png')`,
      }}
    >
      <div className="md:py-20 ">
        <div  data-aos="fade-up" className="pt-8">
          <p className="text-xl font-bold text-orange-600">What's New</p>
        </div>
        <div  data-aos="fade-up" className="flex justify-between md:mt-4">
          <Heading
            heading={"Featured Courses"}
            position={"text-left"}
            desc={` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean
        accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse
        imperdiet.`}
            descWidth={"md:!w-2/3"}
          />
          <div className="md:block hidden">
            <button>All Courses</button>
          </div>
        </div>

        <div  data-aos="fade-up" className="grid md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10 md:mt-8 ">
          {data.card.map((card, index) => (
            <FeaturedCard data={card} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
