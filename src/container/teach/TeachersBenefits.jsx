import React from "react";
import {
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserGraduate,
  FaSearch,
  FaShieldAlt,
} from "react-icons/fa"; // Import icons

const features = [
  {
    icon: <FaMoneyBillWave />,
    label: "Make money online",
    description: "Online Classes",
    color: "#60a5fa", // Indigo-500
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Work anywhere, anytime",
    description: "Expert Tutors",
    color: "#facc15", // Yellow-400
  },
  {
    icon: <FaCalendarAlt />,
    label: "Mark on your schedule",
    description: "Certified Courses",
    color: "#4ade80", // Green-400
  },
  {
    icon: <FaUserGraduate />,
    label: "Manage your Students",
    description: "Online Classes",
    color: "#a855f7", // Purple-500
  },
  {
    icon: <FaSearch />,
    label: "Find more Students",
    description: "Expert Tutors",
    color: "#f87171", // Red-500
  },
  {
    icon: <FaShieldAlt />,
    label: "Safety & Security",
    description: "Certified Courses",
    color: "#3b82f6", // Blue-500
  },
];

const hexToRGBA = (hex, opacity) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const TeachersBenefits = () => {
  return (
    <div className="custom-container flex flex-col gap-8 lg:gap-10">
      <h2 className="text-center text-xl md:text-3xl font-bold">
        Benefits of Becoming a Teacher
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12 gap-4">
        {" "}
        {/* Responsive grid */}
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md flex gap-3 items-start"
          >
            <div
              className="text-3xl mb-2 w-14 h-14 flex items-center justify-center rounded-lg !bg-opacity-40"
              style={{
                color: feature.color,
                backgroundColor: hexToRGBA(feature?.color, 0.4),
              }}
            >
              {feature.icon}
            </div>
            <div className="">
              <h3 className="font-bold text-lg mb-1">{feature.label}</h3>
              <p className="">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeachersBenefits;
