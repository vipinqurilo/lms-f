import React from "react";
import { FaRegHeart } from "react-icons/fa";
import Ok from "./ok";

const FeaturedCard = () => {
  // Array of data for the 6 cards
  const cardsData = [
    {
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
      title: "Mastering React for Beginners",
      instructor: "Jane D",
      price: "$250",
      originalPrice: "$120.00",
      lessons: "15+ Lessons",
      duration: "10hr 45min",
      rating: "4.5 (20)",
      image: "/images/course-11.jpg",
      instructorImage: "/images/user2.jpg",
    },
    {
      title: "Introduction to Graphic Design",
      instructor: "Mark S",
      price: "$200",
      originalPrice: "$80.00",
      lessons: "10+ Lessons",
      duration: "8hr 20min",
      rating: "4.8 (30)",
      image: "/images/course-12.jpg",
      instructorImage: "/images/user3.jpg",
    },
    {
      title: "Learn Python Programming",
      instructor: "Chris T",
      price: "$150",
      originalPrice: "$70.00",
      lessons: "20+ Lessons",
      duration: "12hr 15min",
      rating: "4.7 (40)",
      image: "/images/course-13.jpg",
      instructorImage: "/images/user4.jpg",
    },
    {
      title: "Advanced JavaScript Concepts",
      instructor: "Emily P",
      price: "$180",
      originalPrice: "$90.00",
      lessons: "18+ Lessons",
      duration: "11hr 10min",
      rating: "4.6 (25)",
      image: "/images/course-14.jpg",
      instructorImage: "/images/user5.jpg",
    },
    {
      title: "Digital Marketing Essentials",
      instructor: "Sarah K",
      price: "$220",
      originalPrice: "$100.00",
      lessons: "25+ Lessons",
      duration: "13hr 30min",
      rating: "4.9 (50)",
      image: "/images/course-15.jpg",
      instructorImage: "/images/user6.jpg",
    },
  ];

  return (
    <div className="flex">
      <div className="lg:flex lg:flex-wrap gap-4  justify-between w-full ">
        {cardsData.map((data, index) => (
          <div
            key={index}
            className="w-full lg:w-[260px] group   cursor-pointer  hover:bg-[#413655] transition-colors duration-300 rounded-lg shadow-lg p-4 overflow-hidden relative"
          >
            {/* Image Section */}
            <div className="relative overflow-hidden rounded-md lg:h-auto   ">
              <img
                src={data.image}
                alt={data.title}
                className="w-full  lg:h-48  object-cover transform transition-transform duration-300 hover:scale-110"
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
                      {data.instructor}
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
                  📚 {data.lessons}
                </span>
                <span className="text-sm text-gray-600 group-hover:text-white">
                  ⏱ {data.duration}
                </span>
              </div>

              <div className="flex items-center justify-between mt-6 border-t pt-4 border-gray-300">
                <div className="flex items-center">
                  {/* Rating */}
                  <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
                  <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                    {data.rating}
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







// import React from "react";
// import { FaRegHeart } from "react-icons/fa";

// export default function FeaturedCard({data}) {
//   return (
//     <div className="flex gap-6 md:p-6 p-2">
//       <div className="w-96 group cursor-pointer hover:bg-[#413655] bg-white transition-colors duration-300 rounded-lg shadow-lg p-4 overflow-hidden relative">
//         {/* Image Section */}
//         <div className="relative overflow-hidden rounded-md">
//           <img
//             src={data?.img}
//             alt="UX/UI Design"
//             className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
//           />
//         </div>
//         {/* Content Section */}
//         <div className="mt-4">
//           <div className="flex items-center justify-between">
//             {/* Instructor Image */}
//             <div className="flex">
//               <img
//                 src={data?.img}
//                 alt="Instructor"
//                 className="w-12 h-12 rounded-full mr-3"
//               />
//               <div>
//                 <h3 className="text-lg font-semibold group-hover:text-white">
//                   {data?.author}
//                 </h3>
//                 <span className="text-sm group-hover:text-white font-medium text-gray-500">
//                   Instructor
//                 </span>
//               </div>
//             </div>

//             <div>
//               <button className="  text-red-500 group-hover:text-white">
//                 <FaRegHeart className="text-xl" />
//               </button>
//             </div>
//           </div>
//           <p className="mt-2 text-xl group-hover:text-white text-gray-700">
//             {data?.heading}
//           </p>
//           <div className="flex items-center justify-between gap-4 mt-4">
//             <span className="text-sm text-gray-600 group-hover:text-white">
//               📚 {data?.lesson}
//             </span>
//             <span className="text-sm text-gray-600 group-hover:text-white">
//               ⏱ {data?.time}
//             </span>
//           </div>

//           <div className="flex items-center justify-between mt-6 border-t pt-6 border-gray-300">
//             <div className="flex items-center">
//               {/* Rating */}
//               <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
//               <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
//                 {" "}
//                 <span>4.</span> (15)
//               </span>
//             </div>
//             <button className="px-8 py-2 text-[#413655] bg-white group-hover:bg-[#413655] group-hover:text-white rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6] ">
//               BUY NOW
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
