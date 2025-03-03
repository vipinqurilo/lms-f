import React from "react";
import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";
import NavigationLink from "./NavigationLink";

export default function Mentor() {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-2 custom-container bg-gradient-to-r from-white via-pink-50 to-blue-50"
      data-aos="fade-up"
    >
      <div className="w-full h-full hidden">
        <Image
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/share.png"
          alt="Mentor Illustration"
          width={600}
          height={400}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="relative h-full w-full lg:block hidden">
        <Image
          src="https://dreamslms.dreamstechnologies.com/html/assets/img/share.png"
          alt="Mentor Illustration"
          fill={true}
          className="object-center object-cover"
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
          {["Best Courses", "Top rated Instructors"].map((item, index) => (
            <li
              key={index}
              className="flex items-center md:text-xl text-base text-black font-bold"
            >
              <IoIosCheckmarkCircle className="text-secondary text-2xl mr-2" />
              {item}
            </li>
          ))}
        </ul>

        <NavigationLink path="/teach-on-steam" text="Read More" />
      </div>
    </div>
  );
}
