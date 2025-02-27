import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ReviewsSection = ({ activeTab, setActiveTab }) => {
  const { tutorReviews, isLoading, error } = useSelector((state) => state.tutors);
  console.log(tutorReviews,'tutorReviews')
  return (
    <div>
      {/* Reviews Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Review</h2>
        <div className="flex items-baseline gap-4 mb-8">
          <div className="text-5xl font-bold">4.00</div>
          <div className="text-gray-600">Overall ratings</div>
        </div>
        <div className="flex justify-end mb-6">
          <select
            className="border rounded-lg px-4 py-2"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="newest">Sort by newest</option>
            <option value="oldest">Sort by oldest</option>
          </select>
        </div>
        <div className="space-y-6">
          {tutorReviews.map((review) => (
            <div className="flex gap-4" key={review._id}>
              <Image
                width={40}
                height={40}
                src={review.student.profilePhoto}
                alt="classes"
                className=" object-cover rounded-lg h-[47px] w-[47px]"
              />
              <div>
                <div className="font-medium">{review.student.userName}</div>
                <div className="text-gray-600 text-sm">{review.createdAt}</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="font-medium">Rating: {review.rating}</div>
                </div>
                <p className="mt-2">{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
