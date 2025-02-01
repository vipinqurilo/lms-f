import React from "react";
import {
  FaChartBar,
  FaUsers,
  FaShoppingCart,
  FaMoneyBillWave,
} from "react-icons/fa";

const statsData = [
  {
    value: "1,20,000",
    description: "Total Revenue",
    icon: FaMoneyBillWave,
    iconColor: "#4CAF50",
  },
  {
    value: "5,000",
    description: "Total Users",
    icon: FaUsers,
    iconColor: "#2196F3",
  },
  {
    value: "1,200",
    description: "Total Orders",
    icon: FaShoppingCart,
    iconColor: "#FF9800",
  },
  {
    value: "85%",
    description: "Conversion Rate",
    icon: FaChartBar,
    iconColor: "#9C27B0",
  },
];

export default function StatesCard() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <div
          key={index}
          className="w-full h-full bg-white border border-gray-300 rounded-md px-5 py-5"
        >
          <div className="font-inter flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold">
                  {index === 0 && "₹"}
                  {stat.value}
                </h1>
                <p className="text-sm font-normal text-[#454545]">
                  {stat.description}
                </p>
              </div>
              <stat.icon size={30} style={{ color: stat.iconColor }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
