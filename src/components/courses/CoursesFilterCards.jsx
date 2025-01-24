import React from "react";

const CoursesFilterCards = () => {
  
  const categories = [
    { name: "Backend", count: 3 },
    { name: "CSS", count: 2 },
    { name: "Frontend", count: 2 },
    { name: "General", count: 2 },
    { name: "IT & Software", count: 2 },
    { name: "Photography", count: 2 },
    { name: "Programming Language", count: 3 },
    { name: "Technology", count: 2 },
  ];

  return (
    <div className="w-72 border border-gray-300 rounded-md p-4 bg-white">
      {/* Course Categories */}
      <div>
        <h5 className="text-md   text-xl font-bold  mb-3">Course categories</h5>
        {categories.map((category, index) => (
          <div key={index} className="flex items-center mb-2  ">
            <input
              type="checkbox"
              id={category.name}
              className="h-4 w-4 text-blue-600     border-orange-600  rounded focus:ring-blue-500"
            />
            <label
              htmlFor={category.name}
              className="ml-2   text-[#8C8598]  text-base "
            >
              {category.name} ({category.count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesFilterCards


{/* <div className="flex justify-between items-center mb-4  bg-rose-600">
<h4 className="text-lg font-semibold">Filters</h4>
<button
  className="text-blue-600 text-sm hover:underline"
  onClick={() => console.log("Clear filters")}
>
  CLEAR
</button>   
</div> */}
