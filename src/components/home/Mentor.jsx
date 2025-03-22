import React from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import NavigationLink from "./NavigationLink";

export default function Mentor() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 custom-container bg-gradient-to-r from-primary/5 via-secondary/5 to-secondary/10"
      data-aos="fade-up"
    >
      <div className="relative h-full w-full">
        <Image
          src="/assets/home/IMAGE01.png"
          alt="Mentor Illustration"
          fill={true}
          className="object-center object-contain"
          priority
        />
      </div>

      {/* Right Section - Content */}
      <div className=" text-left">
        <h2 className="text-red-500 text-base font-extrabold mb-2">
          What's New
        </h2>
        <h2 className="text-3xl md:text-4xl text-[28px] font-extrabold text-black mb-4">
          Want to share your knowledge? <br className="md:block hidden" /> Join
          us as a Mentor
        </h2>
        <p className="text-gray-600 mb-6 md:text-xl text-[15px]">
          High-definition video is video of higher resolution and quality than
          standard-definition. While there is no standardized meaning for
          high-definition, generally any video.
        </p>

        <ul className="list-none space-y-3 mb-6">
          {[
            `Best Courses for Every Skill Level – Learn, Grow, and Succeed`,
            "Top-Rated Instructors – Industry Experts Guiding Your Success",
            "Best Courses & Expert Instructors – Master New Skills Today",
            "Learn from the Best – Top Courses & Highly Rated Instructors",
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-center text-base text-light"
            >
              <IoIosCheckmarkCircle className="text-secondary text-2xl mr-2" />
              {item}
            </li>
          ))}
        </ul>

        <NavigationLink path="/teach-on-STEAM" text="Read More" />
      </div>
    </div>
  );
}
