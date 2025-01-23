import React from "react";

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
    <div className="bg-white py-16 px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-start gap-8">
        {/* Left Content */}
        <div>
          <h2 className="text-red-500 text-sm font-semibold uppercase mb-2">
            What's New
          </h2>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {masterskillData.heading}
          </h1>
          <p className="text-gray-600 text-lg mb-8">{masterskillData.desc}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {/* Features */}
            {masterskillData.features.map((feature) => (
              <div className="flex items-start space-x-3 mt-4 border rounded-xl border-gray-200 py-8 px-6">
                <div className="">
                  <img src={feature.img} alt={feature.text} />
                </div>
                <div>
                  <h4 className="text-[14px] font-medium  text-[#685f78]">
                    {feature.text}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://dreamslms.dreamstechnologies.com/html/assets/img/join.png"
            alt="Master Skills"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
