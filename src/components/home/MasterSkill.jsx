import React from "react";
import Image from "next/image";
import Heading from "../common/Heading";

export default function MasterSkill() {
  const masterskillData = {
    heading: "Master the skills to drive your career",
    desc: `Get certified, master modern tech skills, and level up your career — whether you’re starting out or a seasoned pro. 95% of eLearning learners report our hands-on content directly helped their careers.`,
    img: `https://dreamslms.dreamstechnologies.com/html/assets/img/join.png`,
    features: [
      {
        id: 1,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-1.svg`,
        text: `Stay motivated with engaging instructors`,
      },
      {
        id: 2,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-2.svg`,
        text: `Stay motivated with engaging instructors`,
      },
      {
        id: 3,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-3.svg`,
        text: `Stay motivated with engaging instructors`,
      },
      {
        id: 4,
        img: `https://dreamslms.dreamstechnologies.com/html/assets/img/icon/icon-4.svg`,
        text: `Stay motivated with engaging instructors`,
      },
    ],
  };

  return (
    <div className="bg-white custom-container w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div data-aos="fade-up">
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
        <div data-aos="fade-up" className="relative h-full w-full lg:block hidden">
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
