import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import Ok from "./CoursesFilter";
import { fetchCoursesByCategory } from "@/store/slices/coursesSlice";
import { useDispatch, useSelector } from "react-redux";

const FeaturedCard = ({ categoryId }) => {
 
 const dispatch = useDispatch();
 
    const { courses, loading, error } = useSelector((state) => state.courses);
 
    console.log(courses,"pppp")

   useEffect(() => {
     if (categoryId) {
       dispatch(fetchCoursesByCategory(categoryId));
     }
   }, [categoryId, dispatch]);
 
 




  // const cardsData = [
  //   {
  //     title: "Information About UI/UX Design Degree",
  //     instructor: "Rolands R",
  //     price: "$300",
  //     originalPrice: "$99.00",
  //     lessons: "12+ Lessons",
  //     duration: "9hr 30min",
  //     rating: "4.0 (15)",
  //     image: "/images/course-10.jpg",
  //     instructorImage: "/images/user1.jpg",
  //   },
  //   {
  //     title: "Mastering React for Beginners",
  //     instructor: "Jane D",
  //     price: "$250",
  //     originalPrice: "$120.00",
  //     lessons: "15+ Lessons",
  //     duration: "10hr 45min",
  //     rating: "4.5 (20)",
  //     image: "/images/course-11.jpg",
  //     instructorImage: "/images/user2.jpg",
  //   },
  //   {
  //     title: "Introduction to Graphic Design",
  //     instructor: "Mark S",
  //     price: "$200",
  //     originalPrice: "$80.00",
  //     lessons: "10+ Lessons",
  //     duration: "8hr 20min",
  //     rating: "4.8 (30)",
  //     image: "/images/course-12.jpg",
  //     instructorImage: "/images/user3.jpg",
  //   },
  //   {
  //     title: "Learn Python Programming",
  //     instructor: "Chris T",
  //     price: "$150",
  //     originalPrice: "$70.00",
  //     lessons: "20+ Lessons",
  //     duration: "12hr 15min",
  //     rating: "4.7 (40)",
  //     image: "/images/course-13.jpg",
  //     instructorImage: "/images/user4.jpg",
  //   },
  //   {
  //     title: "Advanced JavaScript Concepts",
  //     instructor: "Emily P",
  //     price: "$180",
  //     originalPrice: "$90.00",
  //     lessons: "18+ Lessons",
  //     duration: "11hr 10min",
  //     rating: "4.6 (25)",
  //     image: "/images/course-14.jpg",
  //     instructorImage: "/images/user5.jpg",
  //   },
  //   {
  //     title: "Digital Marketing Essentials",
  //     instructor: "Sarah K",
  //     price: "$220",
  //     originalPrice: "$100.00",
  //     lessons: "25+ Lessons",
  //     duration: "13hr 30min",
  //     rating: "4.9 (50)",
  //     image: "/images/course-15.jpg",
  //     instructorImage: "/images/user6.jpg",
  //   },

  //   {
  //     title: "Digital Marketing Essentials",
  //     instructor: "Sarah K",
  //     price: "$220",
  //     originalPrice: "$100.00",
  //     lessons: "25+ Lessons",
  //     duration: "13hr 30min",
  //     rating: "4.9 (50)",
  //     image: "/images/course-15.jpg",
  //     instructorImage: "/images/user6.jpg",
  //   },

  //   {
  //     title: "Digital Marketing Essentials",
  //     instructor: "Sarah K",
  //     price: "$220",
  //     originalPrice: "$100.00",
  //     lessons: "25+ Lessons",
  //     duration: "13hr 30min",
  //     rating: "4.9 (50)",
  //     image: "/images/course-15.jpg",
  //     instructorImage: "/images/user6.jpg",
  //   },

  //   {
  //     title: "Digital Marketing Essentials",
  //     instructor: "Sarah K",
  //     price: "$220",
  //     originalPrice: "$100.00",
  //     lessons: "25+ Lessons",
  //     duration: "13hr 30min",
  //     rating: "4.9 (50)",
  //     image: "/images/course-15.jpg",
  //     instructorImage: "/images/user6.jpg",
  //   },
  // ];

  
  return (
    <div className="flex">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full ">
        {courses.map((data, index) => (
          <div
            key={index}
            className="w-full group bg-white   cursor-pointer  hover:bg-[#413655] transition-colors duration-300 rounded-xl shadow-lg p-4 overflow-hidden relative"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-md lg:h-auto">
  <img
    src={data.courseImage || "/default-image.jpg"} // Default image in case courseImage is not available
    alt={data.courseContent && data.courseContent[0] ? data.courseContent[0].title : "Course Image"}
    className="w-full lg:h-48 object-cover transform transition-transform duration-300 hover:scale-110"
  />
</div>
            {/* Content Section */}
            <div className="mt-4">
              <div className="flex items-center justify-between">
                {/* Instructor Image */}
                <div className="flex">
                  <img
                    src={data.instructorImage}
                    alt="Instructor"
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                  <h3 className="text-lg font-semibold group-hover:text-gray-300">
        {data.courseContent && data.courseContent[0] ? data.courseContent[0].title : "No Course Title"}
      </h3>
                    <span className="text-sm group-hover:text-gray-300 font-medium text-gray-500">
                    {data.courseContent && data.courseContent[0] ? data.courseContent[0].description : "No Course Title"}
                    </span>
                  </div>
                </div>

                <div>
                  <button className="text-red-500 group-hover:text-white">
                    <FaRegHeart className="text-xl" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xl  group-hover:text-gray-300 text-gray-700">
                {data.courseTitle}
              </p>
              <div className="flex items-center justify-between gap-4 mt-4">
                <span className="text-sm text-gray-600 group-hover:text-white">
                  📚 {data.lessons}25+ Lessons
                </span>
                <span className="text-sm text-gray-600 group-hover:text-white">
                  ⏱ {data.duration} 13hr 30min
                </span>
              </div>

              <div className="flex items-center justify-between mt-6 border-t pt-4 border-gray-300">
                <div className="flex items-center">
                  {/* Rating */}
                  <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
                  <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                    {data.rating}4.5
                  </span>
                </div>
              </div>
              <button className="px-8 py-2 text-[#413655] bg-white mt-7   group-hover:text-gray-300  rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6]">
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





 
