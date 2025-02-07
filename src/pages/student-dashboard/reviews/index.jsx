"use client";

import { useEffect, useState } from "react";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { ReviewCard } from "../../../components/student-dashboard/ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReviewAsync,
  editReviewAsync,
} from "@/store/slices/student-dashboard/reviewSlice";
import EditReviewModal from "@/components/common/EditReviewModal";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.student.review
  );

  const handleEdit = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleReviewUpdate = (updatedReview) => {
    console.log(updatedReview, "updatedReview");
    const data = {
      course: updatedReview.courseId,
      review: updatedReview.content,
      rating: updatedReview.rating,
    };
    dispatch(editReviewAsync(data));
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchReviewAsync());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const formattedReviews = data.map((item) => ({
        id: item._id,
        courseId: item.course._id,
        author: "Student", // You might want to get actual student name from the student object
        avatar: "/assets/student-dashboard/course/course-03.jpg", // Default avatar or from student data
        date: new Date(item.course.createdAt).toLocaleDateString(),
        rating: item.rating,
        content: item.message,
        courseTitle: item.course.courseTitle,
      }));
      setReviews(formattedReviews);
    }
  }, [data]);

  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="text-2xl font-semibold p-4 px-8 ">Reviews</div>
        <hr />

        {isLoading["fetchReviewAsync"] ? (
          <div className="text-center py-12">Loading...</div>
        ) : error["fetchReviewAsync"] ? (
          <div className="text-center py-12 text-red-500">
            Error loading reviews
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="divide-y">
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  onEdit={() => handleEdit(review)}
                  onDelete={handleDelete}
                />
              ))}
            </div>

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
        )}
      </div>
      {isModalOpen && (
        <EditReviewModal
          review={selectedReview}
          onClose={handleModalClose}
          onSave={handleReviewUpdate}
        />
      )}
    </StudentDashboardLayout>
  );
}
