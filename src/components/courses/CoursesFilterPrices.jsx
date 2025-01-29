import React, { useState } from "react";
import { TiTick } from "react-icons/ti";

const CoursesFilterPrices = () => {
  const [selectedOption, setSelectedOption] = useState("All");

  const categories = [
    { name: "All", count: 18 },
    { name: "Free", count: 3 },
    { name: "Paid", count: 15 },
  ];

  return (
    <div className="  w-full max-w-xs lg:max-w-sm   rounded-md p-4 bg-white shadow-sm mt-6 lg:mt-11">
      {/* Title */}
      <div>
        <h5 className="text-xl font-bold mb-3">Price</h5>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="relative">
              <input
                type="radio"
                id={category.name}
                name="priceFilter"
                value={category.name}
                checked={selectedOption === category.name}
                onChange={() => setSelectedOption(category.name)}
                className="h-4 w-4 appearance-none cursor-pointer border border-orange-300 rounded-full relative flex items-center justify-center checked:bg-orange-500 checked:border-orange-600 focus:ring-orange-500 focus:outline-none"
              />
              {selectedOption === category.name && (
                <TiTick className="absolute top-0 left-0 w-4 h-4 text-white" />
              )}
            </div>
            <label
              htmlFor={category.name}
              className={`ml-2 text-base ${
                selectedOption === category.name
                  ? "text-orange-500 font-medium"
                  : "text-gray-700"
              }`}
            >
              {category.name} ({category.count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesFilterPrices;
