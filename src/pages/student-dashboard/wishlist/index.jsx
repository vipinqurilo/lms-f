"use client";

import { useState } from "react";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { CourseCard } from "../../../components/student-dashboard/CourseCard";

const wishlistCourses = [
  {
    id: "1",
    title: "Wordpress for Beginners - Master Wordpress Quickly",
    instructor: {
      name: "Cooper",
      image:
        "/assets/student-dashboard/course/course-03.jpg",
    },
    thumbnail:
      "/assets/student-dashboard/course/course-03.jpg",
    lessons: 12,
    duration: "70hr 30min",
    rating: 5.0,
    reviews: 20,
    price: 80,
    originalPrice: 99,
  },
  {
    id: "2",
    title: "Sketch from A to Z (2024): Become an app designer",
    instructor: {
      name: "Jenny",
      image:
        "/assets/student-dashboard/course/course-03.jpg",
    },
    thumbnail:
      "/assets/student-dashboard/course/course-03.jpg",
    lessons: 10,
    duration: "40hr 10min",
    rating: 3.0,
    reviews: 18,
    isFree: true,
  },
  {
    id: "3",
    title: "Learn Angular Fundamentals From beginning to advance...",
    instructor: {
      name: "Nicole Brown",
      image:
        "/assets/student-dashboard/course/course-03.jpg",
    },
    thumbnail:
      "/assets/student-dashboard/course/course-03.jpg",
    lessons: 15,
    duration: "80hr 40min",
    rating: 4.0,
    reviews: 10,
    price: 65,
    originalPrice: 70,
  },
  {
    id: "4",
    title: "Build Responsive Real World Websites with Crash Course",
    instructor: {
      name: "John Smith",
      image:
        "/assets/student-dashboard/course/course-03.jpg",
    },
    thumbnail:
      "/assets/student-dashboard/course/course-03.jpg",
    lessons: 12,
    duration: "70hr 30min",
    rating: 4.0,
    reviews: 15,
    isFree: true,
  },
  {
    id: "5",
    title: "Learn JavaScript and Express to become a Expert",
    instructor: {
      name: "Stella Johnson",
      image:
        "/assets/student-dashboard/course/course-03.jpg",
    },
    thumbnail:
      "/assets/student-dashboard/course/course-03.jpg",
    lessons: 15,
    duration: "70hr 30min",
    rating: 4.6,
    reviews: 15,
    price: 70,
    originalPrice: 80,
  },
  {
    id: "6",
    title: "Introduction to Programming- Python & Java",
    instructor: {
      name: "Nicole Brown",
      image:
        "/assets/student-dashboard/course/course-03.jpg",
    },
    thumbnail:
      "/assets/student-dashboard/course/course-03.jpg",
    lessons: 10,
    duration: "70hr 30min",
    rating: 5.0,
    reviews: 13,
    isFree: true,
  },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(wishlistCourses);

  const handleRemoveFromWishlist = (courseId) => {
    setWishlist(wishlist.filter((course) => course.id !== courseId));
  };

  return (
    <StudentDashboardLayout className="space-y-8 ">
      <div className="bg-white rounded-lg border ">
        <div className="text-2xl font-semibold p-4 px-8 ">Wishlist</div>
        <hr />

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 mx-8">
          {wishlist.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onWishlist={true}
              onWishlistClick={() => handleRemoveFromWishlist(course.id)}
            />
          ))}
        </div>
        {/* Empty State */}
        {wishlist.length === 0 && (
          <div className="text-center py-12 m-4 mx-8">
            <h3 className="text-xl font-semibold text-gray-600">
              Your wishlist is empty
            </h3>
            <p className="text-gray-500 mt-2">
              Browse courses and add some to your wishlist!
            </p>
          </div>
        )}
      </div>
    </StudentDashboardLayout>
  );
}
