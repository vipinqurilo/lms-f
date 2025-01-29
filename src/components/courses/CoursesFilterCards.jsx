import React, { useState } from "react";
import { TiTick } from "react-icons/ti";

const CoursesFilterCards = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const categories = [
    { name: "Backend", count: 3, options: ["Node.js", "Django", "Spring"] },
    { name: "CSS", count: 2, options: ["Tailwind", "Bootstrap"] },
    { name: "Frontend", count: 2, options: ["React", "Vue.js"] },
    { name: "General", count: 2, options: ["Agile", "Scrum"] },
    {
      name: "IT & Software",
      count: 2,
      options: ["Networking", "Cybersecurity"],
    },
    { name: "Photography", count: 2, options: ["Editing", "Lighting"] },
    {
      name: "Programming Language",
      count: 3,
      options: ["Python", "Java", "C++"],
    },
    { name: "Technology", count: 2, options: ["AI", "Blockchain"] },
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const toggleCategorySelection = (category) => {
    const isAllSelected =
      selectedOptions[category.name]?.length === category.options.length;

    setSelectedOptions((prev) => ({
      ...prev,
      [category.name]: isAllSelected ? [] : category.options,
    }));
  };

  const toggleOption = (categoryName, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[categoryName] || [];
      const isOptionSelected = currentOptions.includes(option);

      return {
        ...prev,
        [categoryName]: isOptionSelected
          ? currentOptions.filter((opt) => opt !== option)
          : [...currentOptions, option],
      };
    });
  };

  return (
    <div className="lg:w-64 lg:border bg-white lg:border-gray-300 rounded-md p-4 w-full">
      <h5 className="text-xl font-bold mb-3">Course categories</h5>
      {categories.map((category, index) => (
        <div key={index} className="mb-2">
          {/* Main Category Checkbox */}
          <div className="flex items-center">
            <div className="relative">
              <input
                type="checkbox"
                id={category.name}
                className="h-5 w-5 appearance-none  cursor-pointer border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                onChange={() => toggleCategorySelection(category)} // Toggle selection of all options
                checked={
                  selectedOptions[category.name]?.length === category.options.length
                }
              />
              {/* Checkmark icon */}
              {selectedOptions[category.name]?.length === category.options.length && (
                <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
              )}
            </div>
            <label
              htmlFor={category.name}
              className="ml-2 text-[#8C8598] text-sm leading-8 cursor-pointer"
              onClick={() => toggleCategory(category.name)} // Toggle category dropdown
            >
              {category.name} ({category.count})
            </label>
          </div>

          {/* Dropdown with checkboxes */}
          {expandedCategories[category.name] && (
            <div className="ml-6 mt-2 p-2 rounded shadow-sm">
              <ul className="space-y-2">
                {category.options.map((option, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id={`${category.name}-${option}`}
                        className="h-5 w-5  cursor-pointer appearance-none border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        onChange={() => toggleOption(category.name, option)}
                        checked={selectedOptions[category.name]?.includes(option)}
                      />
                      {/* Conditionally render the TiTickOutline icon */}
                      {selectedOptions[category.name]?.includes(option) && (
                        <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
                      )}
                    </div>
                    <label
                      htmlFor={`${category.name}-${option}`}
                      className="ml-2 text-gray-600 text-sm cursor-pointer"
                    >
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CoursesFilterCards;
