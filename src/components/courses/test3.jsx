import React, { useState, useEffect } from "react";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/store/slices/coursesSlice";

const CoursesFilterCards = ({ clearTrigger }) => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.courses);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    setSelectedOptions({});
    setExpandedCategories({});
  }, [clearTrigger]);

  // Toggle category dropdown
  const handleCategoryClick = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category.name]: !prev[category.name],
    }));
  };

  // Toggle subcategory selection
  const handleSubcategoryClick = (categoryName, subCategoryName) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[categoryName] || [];
      return {
        ...prev,
        [categoryName]: currentOptions.includes(subCategoryName)
          ? currentOptions.filter((opt) => opt !== subCategoryName)
          : [...currentOptions, subCategoryName],
      };
    });
  };

  return (
    <div className="lg:w-64 border bg-white border-gray-300 rounded-md p-4 w-full">
      <h5 className="text-xl font-bold mb-3">Course Categories</h5>
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
                checked={selectedOptions[category.name]?.length === category.courseSubCategory?.length}
                readOnly
              />
              {selectedOptions[category.name]?.length === category.courseSubCategory?.length && (
                <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
              )}
            </div>
            <label htmlFor={category.name} className="ml-2 text-[#8C8598] text-sm leading-8 cursor-pointer">
              {category.name} ({category.courseSubCategory?.length || 0})
            </label>
          </div>

          {/* Subcategories (Same UI, Just Nested) */}
          {expandedCategories[category.name] && category.courseSubCategory?.length > 0 && (
            <div className="ml-6 mt-2 p-2 rounded shadow-sm bg-gray-50">
              <ul className="space-y-2">
                {category.courseSubCategory.map((subCategory, idx) => (
                  <li
                    key={idx}
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSubcategoryClick(category.name, subCategory.name)}
                  >
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id={`${category.name}-${subCategory.name}`}
                        className="h-4 w-4 cursor-pointer appearance-none border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                        checked={selectedOptions[category.name]?.includes(subCategory.name)}
                        readOnly
                      />
                      {selectedOptions[category.name]?.includes(subCategory.name) && (
                        <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
                      )}
                    </div>
                    <label
                      htmlFor={`${category.name}-${subCategory.name}`}
                      className="ml-2 text-gray-600 text-sm cursor-pointer"
                    >
                      {subCategory.name}
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
