"use client";

import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";

export default function UnlimitedAccess() {
  const { data: statsData } = useSelector(
    (state) => state.admin.adminDashboard
  );
  const data = {
    stats: [
      {
        id: 1,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-07.svg",
        number: statsData?.totalStudents || 10,
        desc: "students enrolled",
      },
      {
        id: 2,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-08.svg",
        number: statsData?.totalCourses || 10,
        desc: "total courses",
      },
      {
        id: 3,
        img: "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-09.svg",
        number: statsData?.totalTeachers || 10,
        desc: "total instructors",
      },
    ],
    heading: `Unlimited access to 360+ courses and 1,600+ hands-on labs`,
    logos: [
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-10.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-16.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-12.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-13.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-14.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-15.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-16.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-17.svg",
      "https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-18.svg",
    ],
  };

  return (
    <div
      data-aos="fade-up"
      className="bg-gradient-to-r from-primary/5 via-secondary/5 to-secondary/10 custom-container"
    >
      {/* Statistics Section */}
      <div data-aos="fade-up">
        <div className="flex md:flex-row flex-col md:justify-evenly py-2 bg-gradient-to-r from-blue-100 rounded-2xl to-blue-100 mb-10">
          {data.stats.map((state) => (
            <div
              key={state.id}
              className="flex items-center space-x-4 p-5 rounded-lg text-left"
            >
              <div className="bg-white md:p-3 p-1 rounded-md">
                {/* Icon */}
                <div className="font-bold text-orange-500">
                  <img src={state.img} alt={state.desc} />
                </div>
              </div>
              <div>
                <p className="md:text-3xl text-2xl font-extrabold text-[#002058]">
                  <CountUp start={0} end={state.number} duration={2.5} />
                </p>
                <p className="md:text-xl text-base font-medium text-black md:mt-6 uppercase bold">
                  {state.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Information Section */}
      <div className="text-center flex flex-col items-center gap-10">
        <p className="md:text-4xl text-2xl leading-10 font-bold text-gray-900">
          Unlimited access to <span className="">360+ courses</span> <br />
          and <span className="">1,600+ hands-on labs</span>
        </p>
        <div className="flex justify-center flex-wrap gap-6 w-full">
          {/* Logos */}
          {data.logos.map((logo, index) => (
            <span
              key={index}
              className="bg-white p-4 !py-2 rounded hover:-translate-y-5 transition-custom hover:cursor-pointer"
            >
              <Image
                src={logo}
                alt={`icon${index + 1}`}
                width={50}
                height={50}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
