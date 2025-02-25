"use client";

import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EarningSummary = ({ type }) => {
  const [isVisible, setIsVisible] = useState(false);
  const year = 2024;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const earnings = [
    5000, 7000, 6500, 8000, 7200, 9000, 8500, 8800, 9200, 9700, 10000, 9500,
  ];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Earnings",
        data: earnings,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { usePointStyle: true },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `$${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        max: 12000,
        ticks: {
          stepSize: 2000,
          callback: (value) => `$${(value / 1000).toLocaleString()}K`,
        },
      },
    },
  };

  return (
    <div
      className={`bg-white border rounded p-6 my-6 font-inter transition-transform duration-1000 ${
        isVisible ? "scale-100" : "scale-0"
      } ${type === "dashboard" ? "!w-[46%]" : "w-full"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary rounded-full"></div>
          <h2 className="text-base font-medium text-textColor">
            Earning Summary
          </h2>
        </div>
        <div className="flex items-center gap-1 font-poppins">
          <p>{year}</p>
        </div>
      </div>
      <div
        className={`${
          type === "dashboard" ? "h-[46vh] !w-full" : "h-[40vh]"
        } w-full`}
      >
        {type === "dashboard" ? (
          <Bar data={chartData} options={options} className="w-full h-full" />
        ) : (
          <Line data={chartData} options={options} className="w-full h-full " />
        )}
      </div>
    </div>
  );
};

export default EarningSummary;
