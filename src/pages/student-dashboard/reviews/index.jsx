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
import InstructorButton from "@/components/instructor/InstructorButton";
import Loader from "@/components/common/Loader";

export default function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("review");
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    data,
    isLoading,
    error,
    totalPages,
    currentPage: currentPageFromStore,
  } = useSelector((state) => state.student.review);
  const [currentPage, setcurrentPage] = useState(currentPageFromStore);
  console.log(data, "reviews data");
  const filters = [
    { label: "Course Reviews", value: "review" },
    { label: "Teacher Reviews", value: "tutorReview" },
  ];
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
      message:updatedReview.content,
      review: updatedReview.title,
      rating: updatedReview.rating,
    };
    dispatch(editReviewAsync({tab:activeTab, id:updatedReview?.id,data}));
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(fetchReviewAsync(activeTab));
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (data) {
      const formattedReviews = data.map((item) => ({
        id: item._id,
        ...(activeTab === 'review' 
          ? { courseId: item?.course?._id ,
            name: item?.course?.courseTitle,
            avatar: item?.course?.courseImage,
        date: new Date(item?.course?.createdAt).toLocaleDateString(),

          }
          : { tutorId: item?.tutorId?._id ,
            name: item?.tutorId?.firstName, 
            avatar: item?.tutorId?.profilePhoto,
            date: new Date(item?.tutorId?.createdAt).toLocaleDateString(),
          }
        ),
        author: item?.user?.name,
        rating: item.rating,
        title:item.review,
        content: item.message,
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
          />
          <div className=" my-4 sticky top-0 bg-white z-10 px-4" >
              <div className="flex gap-3">
                {filters.map((filterItem, index) => (
                  <>
                    <InstructorButton
                      condition={
                        activeTab === filterItem.value
                          ? "bg-secondary text-white"
                          : "bg-none"
                      }
                      handleClick={() => setActiveTab(filterItem.value)}
                      tab={`${filterItem.label}`}
                      key={index}
                    />
                  </>
                ))}
              </div>
            </div>
          {/* <div className="flex gap-4 mb-6 border-b border-gray-200 px-6 py-1">
            <div
              onClick={() => setActiveTab('review')}
              className={`flex items-center gap-2 px-4 py-1 text-sm rounded cursor-pointer transition-colors ${
                activeTab === 'review'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            > 
              Course Reviews
            </div>
            <div
              onClick={() => setActiveTab('tutorReview')} 
              className={`flex items-center gap-2 px-4 py-1 text-sm rounded cursor-pointer transition-colors ${
                activeTab === 'tutorReview'
                  ? 'bg-secondary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Teacher Reviews
            </div>
          </div> */}

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
        totalPages={totalPages}
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
