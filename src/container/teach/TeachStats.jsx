import React from "react";
import {
  FaUserGraduate,
  FaCheckCircle,
  FaGlobe,
  FaStar,
  FaBuilding,
} from "react-icons/fa";

const TeachStats = () => {
  const stats = [
    {
      icon: <FaUserGraduate />,
      label: "Students",
      value: "67.1k",
      color: "#FFB800",
    },
    {
      icon: <FaCheckCircle />,
      label: "Certified Instructor",
      value: "26k",
      color: "#3490dc",
    },
    {
      icon: <FaGlobe />,
      label: "Country Language",
      value: "72",
      color: "#f59e0b",
    },
    {
      icon: <FaStar />,
      label: "Success Rate",
      value: "99.9%",
      color: "#38a169",
    },
    {
      icon: <FaBuilding />,
      label: "Trusted Companies",
      value: "57",
      color: "#6366f1",
    },
  ];

  return (
    <div className="bg-primary/10 custom-container lg:py-10">
      <div className=" grid grid-cols-2 md:grid-cols-5 gap-5">
        {stats.map((stat, index) => (
          <div key={index} className="text-center lg:flex lg:items-start lg:justify-start lg:gap-4">
            <div
              className="text-4xl mb-2 mx-auto lg:mx-0 flex items-center justify-center"
              style={{ color: stat.color }}
            >
              {stat.icon}
            </div>
            <div className="text-start">
              <div className="font-bold text-2xl">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachStats;
