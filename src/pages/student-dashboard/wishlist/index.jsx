"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { CourseCard } from "../../../components/student-dashboard/CourseCard";

import { fetchWishlistAsync, removeFromWishlistAsync } from "@/store/slices/student-dashboard/wishlistSlice";


export default function WishlistPage() {
  const dispatch = useDispatch();
  const { wishlist, isLoading } = useSelector((state) => state.student.wishlist);

  useEffect(() => {
    dispatch(fetchWishlistAsync());
  }, [dispatch]);

  const handleRemoveFromWishlist = (courseId) => {
    dispatch(removeFromWishlistAsync(courseId));
  };

  return (
    <StudentDashboardLayout className="space-y-8 ">
      <div className="bg-white rounded-lg border ">
        <div className="text-2xl font-semibold p-4 px-8 ">Wishlist</div>
        <hr />

        {/* Loading State */}
        {isLoading["fetchWishlistAsync"] ? (
          <div className="text-center py-12 m-4 mx-8 text-gray-600">
            Loading your wishlist...
          </div>
        ) : (
          <>
            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 mx-8">
              {wishlist?.map((item) => (
                <CourseCard
                  key={item._id}
                  course={{
                    id: item.course._id,
                    title: item.course.courseTitle,
                    instructor: {
                      name: item.course?.courseInstructor?.name,
                      image: item.course.courseImage,
                    },
                    thumbnail: item.course.courseImage,
                    lessons: item.course.courseContent.length,
                    duration: "70hr 30min",
                    rating: 4.0, 
                    price: item.course.coursePrice,
                  }}
                  onWishlist={true}
                  onWishlistClick={() => handleRemoveFromWishlist(item._id)}
                />
              ))}
            </div>
            {/* Empty State */}
            {wishlist?.length === 0 && (
              <div className="text-center py-12 m-4 mx-8">
                <h3 className="text-xl font-semibold text-gray-600">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-500 mt-2">
                  Browse courses and add some to your wishlist!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </StudentDashboardLayout>
  );
}
