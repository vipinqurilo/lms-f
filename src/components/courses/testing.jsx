// import React, { useState, useEffect } from "react";
// import { TiTick } from "react-icons/ti";

// const CoursesFilterCards = ({ clearTrigger }) => {
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [selectedOptions, setSelectedOptions] = useState({});

//   // Reset selected options and expanded categories when clearTrigger changes
//   useEffect(() => {
//     setSelectedOptions({});
//     setExpandedCategories({});
//   }, [clearTrigger]);

//   const categories = [
//     { name: "Backend", count: 3, options: ["Node.js", "Django", "Spring"] },
//     { name: "CSS", count: 2, options: ["Tailwind", "Bootstrap"] },
//     { name: "Frontend", count: 2, options: ["React", "Vue.js"] },
//     { name: "General", count: 2, options: ["Agile", "Scrum"] },
//     { name: "IT & Software", count: 2, options: ["Networking", "Cybersecurity"] },
//     { name: "Photography", count: 2, options: ["Editing", "Lighting"] },
//     { name: "Programming Language", count: 3, options: ["Python", "Java", "C++"] },
//     { name: "Technology", count: 2, options: ["AI", "Blockchain"] },
//   ];

//   // Category select/unselect + dropdown toggle
//   const handleCategoryClick = (category) => {
//     const isAllSelected = selectedOptions[category.name]?.length === category.options.length;
    
//     if (isAllSelected) {
//       // Unselect all options and close dropdown
//       setSelectedOptions((prev) => ({ ...prev, [category.name]: [] }));
//       setExpandedCategories((prev) => ({ ...prev, [category.name]: false }));
//     } else {
//       // Select all options and open dropdown
//       setSelectedOptions((prev) => ({ ...prev, [category.name]: category.options }));
//       setExpandedCategories((prev) => ({ ...prev, [category.name]: true }));
//     }
//   };

//   // Toggle single option inside sub-dropdown
//   const handleOptionClick = (categoryName, option) => {
//     setSelectedOptions((prev) => {
//       const currentOptions = prev[categoryName] || [];
//       const isOptionSelected = currentOptions.includes(option);

//       return {
//         ...prev,
//         [categoryName]: isOptionSelected
//           ? currentOptions.filter((opt) => opt !== option)
//           : [...currentOptions, option],
//       };
//     });
//   };

//   return (
//     <div className="lg:w-64 border bg-white border-gray-300 rounded-md p-4 w-full">
//       <h5 className="text-xl font-bold mb-3">Course categories</h5>
//       {categories.map((category, index) => (
//         <div key={index} className="mb-2">
//           {/* Main Category */}
//           <div 
//             className="flex items-center cursor-pointer"
//             onClick={() => handleCategoryClick(category)}
//           >
//             <div className="relative">
//               <input
//                 type="checkbox"
//                 id={category.name}
//                 className="h-4 w-4 appearance-none border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 checked={selectedOptions[category.name]?.length === category.options.length}
//                 readOnly
//               />
//               {/* Checkmark icon */}
//               {selectedOptions[category.name]?.length === category.options.length && (
//                 <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
//               )}
//             </div>
//             <label htmlFor={category.name} className="ml-2 text-[#8C8598] text-sm leading-8 cursor-pointer">
//               {category.name} ({category.count})
//             </label>
//           </div>

//           {/* Sub Dropdown with checkboxes */}
//           {expandedCategories[category.name] && (
//             <div className="ml-6 mt-2 p-2 rounded shadow-sm">
//               <ul className="space-y-2">
//                 {category.options.map((option, idx) => (
//                   <li 
//                     key={idx} 
//                     className="flex items-center cursor-pointer"
//                     onClick={() => handleOptionClick(category.name, option)}
//                   >
//                     <div className="relative flex items-center">
//                       <input
//                         type="checkbox"
//                         id={`${category.name}-${option}`}
//                         className="h-4 w-4 cursor-pointer appearance-none border border-gray-300 rounded-sm relative flex items-center justify-center checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                         checked={selectedOptions[category.name]?.includes(option)}
//                         readOnly
//                       />
//                       {/* Conditionally render the TiTick icon */}
//                       {selectedOptions[category.name]?.includes(option) && (
//                         <TiTick className="absolute inset-0 m-auto text-white w-4 h-4" />
//                       )}
//                     </div>
//                     <label htmlFor={`${category.name}-${option}`} className="ml-2 text-gray-600 text-sm cursor-pointer">
//                       {option}
//                     </label>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CoursesFilterCards;



import { fetchCoursesByCategory } from "@/store/slices/coursesSlice";
import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
 
const FeaturedCard = ({ categoryId }) => {
  const dispatch = useDispatch();

  // Get courses and loading state from Redux
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCoursesByCategory(categoryId));
    }
  }, [categoryId, dispatch]);

  return (
    <div className="flex">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && courses.length === 0 && <p>No courses available.</p>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {courses.map((data, index) => (
          <div
            key={index}
            className="w-full group bg-white cursor-pointer hover:bg-[#413655] transition-colors duration-300 rounded-xl shadow-lg p-4 overflow-hidden relative"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-md lg:h-auto">
              <img
                src={data.image || "/images/default-course.jpg"} // Default image if not available
                alt={data.title}
                className="w-full lg:h-48 object-cover transform transition-transform duration-300 hover:scale-110"
              />
            </div>
            {/* Content Section */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                {/* Instructor Image */}
                <div className="flex">
                  <img
                    src={data.instructorImage || "/images/default-user.jpg"}
                    alt="Instructor"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-gray-300">
                      {data.instructor || "Unknown Instructor"}
                    </h3>
                    <span className="text-sm group-hover:text-gray-300 font-medium text-gray-500">
                      Instructor
                    </span>
                  </div>
                </div>

                <div>
                  <button className="text-red-500 group-hover:text-white">
                    <FaRegHeart className="text-xl" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xl group-hover:text-gray-300 text-gray-700">
                {data.title}
              </p>
              <div className="flex items-center justify-between gap-4 mt-4">
                <span className="text-sm text-gray-600 group-hover:text-white">
                  📚 {data.lessons || "N/A"} Lessons
                </span>
                <span className="text-sm text-gray-600 group-hover:text-white">
                  ⏱ {data.duration || "N/A"}
                </span>
              </div>

              <div className="flex items-center justify-between mt-6 border-t pt-4 border-gray-300">
                <div className="flex items-center">
                  {/* Rating */}
                  <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
                  <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                    {data.rating || "N/A"}
                  </span>
                </div>
              </div>
              <button className="px-8 py-2 text-[#413655] bg-white mt-7 group-hover:text-gray-300 rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6]">
                BUY NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCard;

 
