"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { startOfWeek, eachDayOfInterval, format } from "date-fns";

const EarningsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [weekLabels, setWeekLabels] = useState([]);

  useEffect(() => {
    const start = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekDays = eachDayOfInterval({ start, end: new Date() }).map((day) =>
      format(day, "EEE")
    );
    setWeekLabels(weekDays);
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: weekLabels,
        datasets: [
          {
            label: "Courses Earnings",
            data: [5, 10, 15, 20, 25, 30, 35, 30, 35],
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            borderWidth: 2,
          },
          {
            label: "Bookings Earnings",
            data: [8, 12, 18, 22, 28, 35, 40, 30, 35],
            backgroundColor: "#F79902",
            borderColor: "#F79902",
            borderWidth: 2,
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
  }, [weekLabels]);

  return (
    <div className="w-full mx-auto bg-white rounded-lg px-5">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Weekly Earnings</h2>
        {/* <select name="" id=""></select> */}
      </div>
      <div className="relative h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EarningsChart;
