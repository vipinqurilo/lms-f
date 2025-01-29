import React, { useState } from "react";

const CoursesFilterCards = () => {
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  const categories = [
    { name: "Backend", count: 3, options: ["Node.js", "Django", "Spring"] },
    { name: "CSS", count: 2, options: ["Tailwind", "Bootstrap"] },
    { name: "Frontend", count: 2, options: ["React", "Vue.js"] },
    { name: "General", count: 2, options: ["Agile", "Scrum"] },
    { name: "IT & Software", count: 2, options: ["Networking", "Cybersecurity"] },
    { name: "Photography", count: 2, options: ["Editing", "Lighting"] },
    { name: "Programming Language", count: 3, options: ["Python", "Java", "C++"] },
    { name: "Technology", count: 2, options: ["AI", "Blockchain"] },
  ];

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryName]: !prev[categoryName],
    }));
  };

  const toggleCategorySelection = (category) => {
    const isSelected = selectedOptions[category.name]?.length === category.options.length;

    setSelectedOptions((prev) => ({
      ...prev,
      [category.name]: isSelected ? [] : category.options, // Select or deselect all options
    }));
  };

  const toggleOption = (categoryName, option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[categoryName] || [];
      const isOptionSelected = currentOptions.includes(option);

      return {
        ...prev,
        [categoryName]: isOptionSelected
          ? currentOptions.filter((opt) => opt !== option) // Deselect option
          : [...currentOptions, option], // Select option
      };
    });
  };

  return (
    <div className="w-64 border bg-white border-gray-300 rounded-md p-4">
      <h5 className="text-xl font-bold mb-3">Course categories</h5>
      {categories.map((category, index) => (
        <div key={index} className="mb-2">
          {/* Main Category Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id={category.name}
              className="h-4 w-4 appearance-none border border-gray-300 rounded-sm checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
              onChange={() => toggleCategorySelection(category)}
              checked={selectedOptions[category.name]?.length === category.options.length}
            />
            <label
              htmlFor={category.name}
              className="ml-2 text-[#8C8598] text-sm leading-8 cursor-pointer"
              onClick={() => {
                toggleCategory(category.name);
                toggleCategorySelection(category);
              }}
            >
              {category.name} ({category.count})
            </label>
          </div>

          {/* Dropdown with checkboxes */}
          {expandedCategories[category.name] && (
            <div className="ml-6 mt-2 p-2 border rounded bg-gray-50 shadow-sm">
              <p className="text-sm text-gray-700 mb-2">Options for {category.name}</p>
              <ul className="space-y-2">
                {category.options.map((option, idx) => (
                  <li key={idx} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${category.name}-${option}`}
                      className="h-4 w-4 appearance-none border border-gray-300 rounded-sm checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500"
                      onChange={() => toggleOption(category.name, option)}
                      checked={selectedOptions[category.name]?.includes(option)}
                    />
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
