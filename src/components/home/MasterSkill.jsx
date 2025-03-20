import React from "react";
import Image from "next/image";
import Heading from "../common/Heading";

export default function MasterSkill() {
  const masterskillData = {
    heading: "Master In-Demand Skills to Elevate Your Career",
    desc: `Gain certifications, enhance your expertise, and stay ahead in the industry. 95% of learners report that our hands-on courses have significantly boosted their careers.`,
    img: `/assets/home/IMAGE01.png`,
    features: [
      {
        id: 1,
        img: `/assets/home/icon.svg`,
        text: `Learn from industry-leading experts and real-world projects.`,
      },
      {
        id: 2,
        img: `/assets/home/icon.svg`,
        text: `Develop practical skills with interactive lessons and exercises.`,
      },
      {
        id: 3,
        img: `/assets/home/icon.svg`,
        text: `Stay ahead with the latest tools and technologies.`,
      },
      {
        id: 4,
        img: `/assets/home/icon.svg`,
        text: `Boost your career with recognized certifications and courses.`,
      },
    ],
  };

  return (
    <div className="bg-white custom-container !pb-0 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div data-aos="fade-up" className="!pb-10 lg:pb-16">
          <h2 className="text-red-500 text-base font-extrabold mb-2">
            What's New
          </h2>
          <Heading
            heading={masterskillData.heading}
            desc={masterskillData.desc}
            position="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-6 gap-2 mt-4">
            {masterskillData.features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-start space-x-3 border rounded-xl border-gray-300 py-8 px-6"
              >
                <Image
                  src={feature.img}
                  alt={feature.text}
                  width={40}
                  height={40}
                />
                <h4 className="text-[14px] font-medium text-[#685f78]">
                  {feature.text}
                </h4>
              </div>
            ))}
          </div>
        </div>

        <div data-aos="fade-up" className="flex justify-center lg:hidden">
          <Image
            src={masterskillData.img}
            alt="Master Skills"
            width={600}
            height={400}
            className="max-w-full h-auto"
            priority
          />
        </div>
        <div
          data-aos="fade-up"
          className="relative h-full w-full lg:block hidden"
        >
          <Image
            src={masterskillData.img}
            alt="Master Skills"
            fill={true}
            className="object-center object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
