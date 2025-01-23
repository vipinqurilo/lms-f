import React from "react";
import { AiOutlineAppstore } from "react-icons/ai"; // Import React Icon
import Pagination from "../../components/courses/Pagination";
import Ok from "../../components/courses/ok";

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
      instructorImage: "/images/user1.jpg",
    },

    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      instructor: "Rolands R",
      price: "$300",
      originalPrice: "$99.00",
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      rating: "4.0 (15)",
      image: "/images/course-11.jpg",
      instructorImage: "/images/user1.jpg",
    },

    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      instructor: "Rolands R",
      price: "$300",
      originalPrice: "$99.00",
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      rating: "4.0 (15)",
      image: "/images/course-12.jpg",
      instructorImage: "/images/user1.jpg",
    },

    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      instructor: "Rolands R",
      price: "$300",
      originalPrice: "$99.00",
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      rating: "4.0 (15)",
      image: "/images/course-13.jpg",
      instructorImage: "/images/user1.jpg",
    },

    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      instructor: "Rolands R",
      price: "$300",
      originalPrice: "$99.00",
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      rating: "4.0 (15)",
      image: "/images/course-16.jpg",
      instructorImage: "/images/user1.jpg",
    },

    {
      id: 1,
      title: "Information About UI/UX Design Degree",
      instructor: "Rolands R",
      price: "$300",
      originalPrice: "$99.00",
      lessons: "12+ Lessons",
      duration: "9hr 30min",
      rating: "4.0 (15)",
      image: "/images/course-13.jpg",
      instructorImage: "/images/user1.jpg",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 flex justify-center  min-h-screen">
      <div className="w-8/12  ">
        <div className="flex justify-between items-center mb-6 w-11/12 bg-slate-400">
          {/* Added Icon Next to Text */}
          <div className="flex items-center space-x-2 ">
            <div className=" bg-[#FF6575] w-10 h-10  rounded flex justify-center items-center">
              <AiOutlineAppstore className="text-2xl  text-white font-bold" />
            </div>
            <h2 className="text-lg font-semibold">Showing 1-9 of 50 results</h2>
          </div>
          <div className="flex space-x-4 ">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6  w-11/12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden relative  py-3    "
            >
              <div className=" px-2">
                <div
                  className="relative bg-none  rounded-lg  bg-no-repeat bg-center h-40  "
                  style={{ backgroundImage: `url(${course.image})` }}
                >
                  {/* Positioned at the bottom-right */}
                  <div className="absolute bottom-3 right-5 rounded bg-white w-36">
                    <div className="flex justify-end items-baseline text-white px-3 py-1 rounded">
                      <div className="text-xl text-[#F66B64] font-semibold">
                        {course.price}
                      </div>
                      <div className="  text-[#A5A5A5] line-through text-sm px-3 font-semibold">
                        {course.originalPrice}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={course.instructorImage}
                    alt="Instructor"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-lg  text-[#F0F0F3]">
                      {course.instructor}
                    </h3>
                    <p className="text-sm text-gray-500  font-semibold">
                      Instructor
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-800">
                  {course.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                  <p className=" font-semibold  text-base ">{course.lessons}</p>
                  <p className="  font-semibold text-base">{course.duration}</p>
                </div>

                <div className="flex items-center mt-3 py-3 border-t-2">
                  <div className="text-yellow-500 text-lg flex">
                    <img
                      src={"/images/star-fill.svg"}
                      alt="Instructor"
                      className="  "
                    />
                    <img
                      src={"/images/star-fill.svg"}
                      alt="Instructor"
                      className="  "
                    />
                    <img
                      src={"/images/star-fill.svg"}
                      alt="Instructor"
                      className="  "
                    />
                    <img
                      src={"/images/star-fill.svg"}
                      alt="Instructor"
                      className="  "
                    />
                    <img
                      src={"/images/star.svg"}
                      alt="Instructor"
                      className="  "
                    />
                  </div>
                  <span className="ml-1 text-gray-600">{course.rating}</span>
                </div>

                <div className="mt-2">
                  <button className="  rounded-full text-black py-3 px-4 text-base border border-purple-500  font-semibold w-40 hover:bg-purple-300 transition">
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          
          {/* <Pagination /> */}
          
        </div>
        
      </div>
      <Ok/>
    </div>
  );
};

export default Courses;
