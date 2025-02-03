import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, fetchCoursesByCategory } from "@/store/slices/coursesSlice";

const CoursesFilterCards = ({ clearTrigger }) => {
  const dispatch = useDispatch();
  const { categories, loading, error, courses } = useSelector((state) => state.courses);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories when the component mounts
  }, [dispatch]);

  // Reset selected options and expanded categories when clearTrigger changes
  useEffect(() => {
    setSelectedOptions({});
    setExpandedCategories({});
  }, [clearTrigger]);

  // Category select/unselect + dropdown toggle
  const handleCategoryClick = (category) => {
    // Log the category's _id
    console.log("Category _id:", category._id);

    const isAllSelected =
      selectedOptions[category.name]?.length === category.options?.length;

    if (isAllSelected) {
      // Unselect all options and close dropdown
      setSelectedOptions((prev) => ({ ...prev, [category.name]: [] }));
      setExpandedCategories((prev) => ({ ...prev, [category.name]: false }));
    } else {
      // Select all options and open dropdown
      setSelectedOptions((prev) => ({
        ...prev,
        [category.name]: category.options,
      }));
      setExpandedCategories((prev) => ({ ...prev, [category.name]: true }));

      // Dispatch the fetchCoursesByCategory action
      dispatch(fetchCoursesByCategory(category._id));  // Use category._id to fetch courses
    }
  };

  // Toggle single option inside sub-dropdown
  const handleOptionClick = (categoryName, option) => {
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
    <div className="lg:w-64 border bg-white border-gray-300 rounded-md p-4 w-full">
      <h5 className="text-xl font-bold mb-3">Course categories</h5>
      {categories.map((category, index) => (
        <div key={index} className="mb-2">
          {/* Main Category */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <div className="relative">
              <input
                type="checkbox"
                id={category.name}
                className="h-4 w-4 appearance-none border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                checked={
                  (selectedOptions[category.name]?.length || 0) === category.options?.length
                }
                readOnly
              />
              {/* Checkmark icon */}
              {selectedOptions[category.name]?.length ===
                category.options?.length && (
                <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
              )}
            </div>
            <label
              htmlFor={category.name}
              className="ml-2 text-[#8C8598] text-sm leading-8 cursor-pointer"
            >
              {category.name} ({category.count})
            </label>
          </div>

          {expandedCategories[category.name] && (
            <div className="ml-6 mt-2 p-2 rounded shadow-sm">
              <ul className="space-y-2">
                {category?.options?.map((option, idx) => (
                  <li
                    key={idx}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleOptionClick(category.name, option)}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id={`${category.name}-${option}`}
                        className="h-4 w-4 cursor-pointer appearance-none border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        checked={selectedOptions[category.name]?.includes(option)}
                        readOnly
                      />
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

      {/* Display Courses */}
      {courses.length > 0 && (
        <div className="mt-6">
          <h5 className="text-lg font-bold mb-3">Courses</h5>
          <ul>
            {courses.map((course, index) => (
              <li key={index} className="py-2 border-b border-gray-200">
                {course.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Loading and Error Handling */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default CoursesFilterCards;
