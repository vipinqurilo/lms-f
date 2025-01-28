import React, { useState } from "react";

const CoursesFilterCards = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  const categories = [
    { name: "Backend", count: 3, options: ["Node.js", "Django", "Spring"] },
    { name: "CSS", count: 2, options: ["Tailwind", "Bootstrap"] },
    { name: "Frontend", count: 2, options: ["React", "Vue.js"] },
    { name: "General", count: 2, options: ["Agile", "Scrum"] },
    { name: "IT & Software", count: 2, options: ["Networking", "Cybersecurity"] },
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
      [categoryName]: !prev[categoryName], // Toggle the state of the selected category
    }));
  };

  return (
    <div className="w-64 border bg-[#FFFFFF] border-gray-300 rounded-md p-4  ">
      {/* Course Categories */}
      <div>
        <h5 className="text-xl font-bold mb-3">Course categories</h5>
        {categories.map((category, index) => (
          <div key={index} className="mb-2">
            {/* Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id={category.name}
                className="h-4 w-4 text-blue-600 border-orange-600 rounded focus:ring-blue-500"
                onChange={() => toggleCategory(category.name)}
                checked={!!expandedCategories[category.name]}
              />
              <label
                htmlFor={category.name}
                className="ml-2 text-[#8C8598] text-sm leading-8"
              >
                {category.name} ({category.count})
              </label>
            </div>

            {/* Dropdown with checkboxes */}
            {expandedCategories[category.name] && (
              <div className="ml-6 mt-2 p-2 border rounded bg-gray-50 shadow-sm">
                <p className="text-sm text-gray-700 mb-2">
                  Options for {category.name}
                </p>
                <ul className="space-y-2">
                  {category.options.map((option, idx) => (
                    <li key={idx} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${category.name}-${option}`}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={`${category.name}-${option}`}
                        className="ml-2 text-gray-600 text-sm"
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
    </div>
  );
};

export default CoursesFilterCards;
