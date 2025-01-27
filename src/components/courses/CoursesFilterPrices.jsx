import React, { useState } from "react";

const CoursesFilterPrices = () => {
  const [selectedOption, setSelectedOption] = useState("All");

  const categories = [
    { name: "All", count: 18 },
    { name: "Free", count: 3 },
    { name: "Paid", count: 15 },
  ];

  return (
    <div className=" border border-gray-300 rounded-md p-4 bg-white shadow-sm mt-11">
      {/* Title */}
      <div>
        <h5 className="text-xl font-bold mb-3">Price</h5>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={category.name}
              name="priceFilter"
              value={category.name}
              checked={selectedOption === category.name}
              onChange={() => setSelectedOption(category.name)}
              className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300"
            />
            <label
              htmlFor={category.name}
              className={`ml-2 text-base ${
                selectedOption === category.name
                  ? "text-red-500 font-medium"
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
