import React from "react";
import Ok from "./ok";

const CourseCards = () => {
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
      id: 5,
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
  ];

  return (
    <div className="lg:px-7   w-11/12 lg:w-11/12 justify-center flex">
      <div className="   lg:flex lg:flex-wrap gap-6    ">
        {courses.map((course) => (
          <div
            key={course.id}
            className=" shadow-lg rounded-lg overflow-hidden relative py-3 w-full    lg:w-64 "
          >
            <div className="px-2">
              <div className="relative bg-none rounded-lg bg-no-repeat bg-center lg:w-full  w-96  h-80 lg:h-40 overflow-hidden group bg-red-700 ">
                {/* Zoom effect */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform   duration-300 group-hover:scale-110"
                  style={{ backgroundImage: `url(${course.image})` 
                            
                          }}
                ></div>

                {/* Positioned at the bottom-right */}
                <div className="absolute bottom-3 right-5 rounded bg-white w-36">
                  <div className="flex justify-end items-baseline text-white px-3 py-1 rounded">
                    <div className="text-xl text-[#F66B64] font-semibold">
                      {course.price}
                    </div>
                    <div className="text-[#A5A5A5] line-through text-sm px-3 font-semibold">
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
                  <h3 className="font-medium text-lg text-gray-800">
                    {course.instructor}
                  </h3>
                  <p className="text-sm text-gray-500 font-semibold">
                    Instructor
                  </p>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800">
                {course.title}
              </h3>

              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <p className="font-semibold text-base">{course.lessons}</p>
                <p className="font-semibold text-base">{course.duration}</p>
              </div>

              <div className="flex items-center mt-3 py-3 border-t-2">
                <div className="text-yellow-500 text-lg flex">
                  <img
                    src={"/images/star-fill.svg"}
                    alt="Star"
                    className=" w-5  h-5"
                  />
                  <img
                    src={"/images/star-fill.svg"}
                    alt="Star"
                    className="w-5 h-5"
                  />
                  <img
                    src={"/images/star-fill.svg"}
                    alt="Star"
                    className="w-5 h-5"
                  />
                  <img
                    src={"/images/star-fill.svg"}
                    alt="Star"
                    className="w-5 h-5"
                  />
                  <img
                    src={"/images/star.svg"}
                    alt="Star"
                    className="w-5 h-5"
                  />
                </div>
                <span className="ml-1 text-gray-600">{course.rating}</span>
              </div>

              <div className="mt-2">
                <button className="rounded-full text-black lg:py-3 lg:px-4 py-1 px-3 text-base border border-purple-500 font-semibold lg:w-40 w-36 hover:bg-purple-300 transition">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="">
      <Ok />
      </div> */}
    </div>
  );
};

export default CourseCards;
