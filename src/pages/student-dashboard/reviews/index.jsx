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
import { Pagination } from "@/components/student-dashboard/Pagination";
import TitleComp from "@/components/instructor/TitleComp";
import { Loader } from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector(
    (state) => state.student.review
  );
  console.log(data, "reviews data");

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
        
        author: item?.user?.name,
        avatar: item?.course?.courseImage,
        date: new Date(item.course.createdAt).toLocaleDateString(),
        rating: item.rating,
        content: item.message,
        courseTitle: item.course.courseTitle,
      }));
      setReviews(formattedReviews);
    }
  }, [data]);

  return (
    <StudentDashboardLayout>
      <div className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Reviews"}
            des={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, corporis."
            }
          />

          {isLoading["fetchReviewAsync"] ? (
            <div className="w-full flex items-center justify-center py-12">
              <Loader color={"text-secondary"} isBig={true} />
            </div>
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
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={(val) => setcurrentPage(val)}
        totalPages={5}
      />

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
