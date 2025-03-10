import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ReviewsSection = ({ activeTab, setActiveTab }) => {
  const { tutorProfile, isLoading, error } = useSelector(
    (state) => state.tutors
  );

  return (
    <div>
      <section className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Reviews</h2>
          {tutorProfile?.reviews?.length > 0 && (
            <select
              className="border rounded-lg px-4 py-2"
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
            >
              <option value="newest">Sort by newest</option>
              <option value="oldest">Sort by oldest</option>
            </select>
          )}
        </div>

        <div className="flex items-center gap-8 mb-8">
          <div>
            <div className="text-5xl font-bold mb-2">
              {tutorProfile?.reviews?.length > 0
                ? Number(
                    (
                      tutorProfile?.reviews.reduce(
                        (acc, curr) => acc + curr.rating,
                        0
                      ) / tutorProfile?.reviews.length
                    ).toFixed(2)
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : "0.00"}
            </div>
            <div className="text-gray-600">Overall ratings</div>
          </div>
        </div>
        <div className="space-y-8">
          {tutorProfile?.reviews?.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg p-6 shadow-sm border"
            >
              <div className="flex items-start gap-4">
                <Image
                  width={48}
                  height={48}
                  src={review.student.profilePhoto}
                  alt={review.student.userName}
                  className="rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {review.student.userName}
                      </h3>
                      <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    </div>
                      <div className="flex items-center gap-2 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-gray-200 text-gray-200"
                          />
                        ))}
                      </div>
                    
                  </div>
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">{review.review}</h4>
                    <p className="text-gray-600">{review.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
