"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const EarningsChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [date, setdate] = useState(new Date());

  useEffect(() => {
    setdate(date?.getFullYear());
  }, []);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Earnings",
            data: [20, 40, 30, 55, 25, 30, 20, 50, 20, 40, 20, 50],
            borderColor: "#F79902",
            backgroundColor: "rgba(247, 153, 2, 0.1)",
            borderWidth: 2,
            fill: true,
            pointBackgroundColor: "#F79902",
            pointBorderColor: "#fff",
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
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
  }, []);

  // const getYearsOptions = (date) => {
  //   const options = [];
  //   for (let i = 0; i < 5; i++) {
  //     options.push(date.getFullYear() - i);
  //   }
  //   return options;
  // };

  return (
    <div className="w-full mx-auto  bg-white rounded-lg px-5">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-lg font-semibold mb-4">Earnings by Year</h2>

        <select value={date} onChange={(e) => setdate(e.target.value)}>
          {/* {getYearsOptions(date)?.map((year, index) => (
            <option value={year} key={index}>
              {year}
            </option>
          ))} */}
        </select>
      </div>
      <div className="relative h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default EarningsChart;
