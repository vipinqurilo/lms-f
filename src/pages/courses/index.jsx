import React from "react";
import { AiOutlineAppstore } from "react-icons/ai"; // Import React Icon

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      instructor: "Rolands R",
      price: "$300",
      originalPrice: "$99.00",
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      rating: "4.0 (15)",
      image: "/images/course-10.jpg",
      instructorImage: "https://via.placeholder.com/40",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 flex justify-center  min-h-screen">
      <div className="w-8/12 bg-rose-500">
        <div className="flex justify-between items-center mb-6">
          {/* Added Icon Next to Text */}
          <div className="flex items-center space-x-2">
            <AiOutlineAppstore className="text-xl text-gray-700" />
            <h2 className="text-xl font-semibold">Showing 1-9 of 50 results</h2>
          </div>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search our courses"
              className="border rounded-lg px-4 py-2 w-64"
            />
            <select className="border rounded-lg px-4 py-2">
              <option>Newly published</option>
              <option>Most popular</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative"
            >
              <div
                className="relative bg-cover bg-center h-40   "
                style={{ backgroundImage: `url(${course.image})` }}
              >
                <div className="bg-rose-400  w-36 ">
                <div className="top-2 left-2 flex justify-end items-center  text-white px-3 py-1 rounded">
                  <div className="text-2xl text-black">{course.price}</div>
                  <div className="text-gray-800 line-through px-3">
                    {course.originalPrice}
                  </div>
                </div>
                </div>
              
              </div> 

              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={course.instructorImage}
                    alt="Instructor"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-700">
                      {course.instructor}
                    </h3>
                    <p className="text-sm text-gray-500">Instructor</p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <p className="  text-base">{course.lessons}</p>
                  <p className="  text-base">{course.duration}</p>
                </div>

                <div className="flex items-center mt-3 py-3 border-t-2">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="ml-1 text-gray-600">{course.rating}</span>
                </div>

                <div>
                  <button className="  rounded-full text-black py-3 px-4 text-base border border-purple-500  font-semibold w-40 hover:bg-purple-300 transition">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
