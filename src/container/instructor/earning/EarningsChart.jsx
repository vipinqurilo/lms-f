"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { startOfMonth, endOfMonth, eachWeekOfInterval } from "date-fns";

const EarningsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [weekLabels, setWeekLabels] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    const start = startOfMonth(new Date());
    const end = endOfMonth(new Date());
    const weeks = eachWeekOfInterval({ start, end }).map(
      (weekStart, index) => `Week ${index + 1}`
    );

    setWeekLabels(weeks);

    // Example static earnings data for 4 weeks
    setEarningsData({
      courses: [12, 18, 22, 30], // Replace with actual data
      bookings: [10, 15, 20, 25], // Replace with actual data
    });
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (weekLabels.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: "Courses Earnings",
            data: earningsData.courses,
            backgroundColor: "#acfcaf",
          },
          {
            label: "Bookings Earnings",
            data: earningsData.bookings,
            backgroundColor: "#ffd28a",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                return ` Earnings: ${context.raw}K`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return value + "K";
              },
            },
            grid: {
              color: "#ddd",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }, [weekLabels, earningsData]);

  return (
    <div className="w-full mx-auto bg-white rounded-lg p-5">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Sales (Weekly Basis)</h2>
      </div>
      <div className="relative h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EarningsChart;
