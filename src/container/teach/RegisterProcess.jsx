import React from "react";
import {
  FaUser,
  FaIdCard,
  FaBook,
  FaBriefcase,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUser />,
    label: "Personal info",
    color: "#6366f1", // Indigo-500
  },
  {
    icon: <FaIdCard />,
    label: "Identity",
    color: "#ef4444", // Red-500
  },
  {
    icon: <FaBook />,
    label: "Subject & Language",
    color: "#facc15", // Yellow-400
  },
  {
    icon: <FaBriefcase />,
    label: "Experience",
    color: "#10b981", // Green-500
  },
  {
    icon: <FaCheckCircle />,
    label: "Confirmation",
    color: "#3b82f6", // Blue-500
  },
];

const hexToRGBA = (hex, opacity) => {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const RegisterProcess = () => {
  return (
    <div className="custom-container bg-[#F2F6FC] flex flex-col gap-8 lg:gap-10">
      <h2 className="text-center text-xl md:text-3xl font-bold">
        How you'll become successful instructor
      </h2>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 md:gap-y-10 gap-5">
        {steps?.map((step, index) => (
          <div
            key={index}
            className="w-full h-full bg-white flex flex-col gap-2 items-center justify-center p-4 rounded"
            style={{
              clipPath: `polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%)`,
            }}
          >
            <h4 className="text-lg font-bold ">{step?.label}</h4>
            <div
              className="text-3xl mb-2 w-14 h-14 flex items-center justify-center rounded-lg !bg-opacity-40"
              style={{
                color: step.color,
                backgroundColor: hexToRGBA(step?.color, 0.4),
              }}
            >
              {step.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegisterProcess;
