"use client";

import { useState } from "react";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { ReviewCard } from "../../../components/student-dashboard/ReviewCard";

const initialReviews = [
  {
    id: "1",
    author: "Ronald Richard",
    avatar:
      "/assets/student-dashboard/course/course-03.jpg",
    date: "6 months ago",
    rating: 5,
    content:
      "This is the second Photoshop course I have completed with Cristian. Worth every penny and recommend it highly. To get the most out of this course, its best to to take the Beginner to Advanced course first. The sound and video quality is of a good standard. Thank you Cristian.",
  },
  {
    id: "2",
    author: "Ronald Richard",
    avatar:
      "/assets/student-dashboard/course/course-03.jpg",
    date: "8 months ago",
    rating: 4,
    content:
      "I've been using this LMS for several months for my online courses, and it's been a game-changer. The interface is incredibly user-friendly, making it easy for both instructors and students to navigate through the courses. The variety of tools available for creating interactive and engaging content has significantly enhanced the learning experience.",
  },
  {
    id: "3",
    author: "Ronald Richard",
    avatar:
      "/assets/student-dashboard/course/course-03.jpg",
    date: "9 months ago",
    rating: 4,
    content:
      "Any time I've had a question or encountered a minor issue, the customer support team has been quick to respond and incredibly helpful. Moreover, the reliability of this LMS has impressed me—downtime is nearly non-existent, ensuring that students have access to their courses 24/7.",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log("Edit review:", id);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8 ">Reviews</div>

        <hr />
        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="divide-y">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Empty State */}
          {reviews.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600">
                No reviews yet
              </h3>
              <p className="text-gray-500 mt-2">
                Your reviews will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </StudentDashboardLayout>
  );
}
