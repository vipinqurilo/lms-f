import React from "react";
import {
  addOrderAsync,
  fetchCoursesAsync,
  wishlistAsync,
} from "@/store/slices/coursesSlice";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";

export default function FeaturedCard({ data }) {
  const dispatch = useDispatch();

  const handleAddWishlist = (id) => {
    console.log(id, "iddd");
    dispatch(wishlistAsync({ course: id }));
  };

  const handleAddOrder = (id) => {
    dispatch(addOrderAsync(id));
  };

  return (
    <div className="flex gap-6 md:p-0  p-2">
      <div className=" group cursor-pointer hover:bg-[#413655] bg-white transition-colors duration-300 rounded-lg shadow-lg p-4 overflow-hidden relative">
        <div className="relative overflow-hidden rounded-md">
          <img
            src={data?.courseImage}
            alt="UX/UI Design"
            className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="flex">
              <img
                src={data?.courseImage}
                alt="Instructor"
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="text-lg font-semibold group-hover:text-white">
                  {/* {data?.author} */} static data
                </h3>
                <span className="text-sm group-hover:text-white font-medium text-gray-500">
                  Instructor
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={() => handleAddWishlist(data?._id)}
                className="  text-red-500 group-hover:text-white"
              >
                <FaRegHeart className="text-xl" />
              </button>
            </div>
          </div>
          <p className="mt-2 text-xl group-hover:text-white text-gray-700">
            {data?.courseTitle}
          </p>
          <div className="flex items-center justify-between gap-4 mt-4">
            <span className="text-sm text-gray-600 group-hover:text-white">
              📚 {data?.lesson}
            </span>
            <span className="text-sm text-gray-600 group-hover:text-white">
              ⏱ {data?.time}
            </span>
          </div>

          <div className="flex items-center justify-between mt-6 border-t pt-6 border-gray-300">
            <div className="flex items-center">
              {/* Rating */}
              <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
              <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                {" "}
                <span>4.</span> (15)
              </span>
            </div>
            <button
              onClick={() => handleAddOrder(data?._id)}
              className="px-8 py-2 text-[#413655] bg-white group-hover:bg-[#413655] group-hover:text-white rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6] "
            >
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
