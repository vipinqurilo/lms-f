import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ReviewsSection = ({ activeTab, setActiveTab }) => {
  const { tutorReviews, isLoading, error } = useSelector(
    (state) => state.tutors
  );
  console.log(tutorReviews, "tutorReviews");
  return (
    <div>
      {/* Reviews Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Review</h2>
        <div className="flex items-baseline gap-4 mb-8">
          <div className="text-5xl font-bold">
            {tutorReviews.length > 0 ? (
              Number(
                (tutorReviews.reduce((acc, curr) => acc + curr.rating, 0) /
                  tutorReviews.length)
                .toFixed(2)
              ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            ) : (
              0.00
            )}
          </div>
          <div className="text-gray-600">Overall ratings</div>
        </div>
        <div className={`flex justify-end mb-6 ${tutorReviews.length > 0 ? "" : "hidden"}`}>
          <select
            className="border rounded-lg px-4 py-2"
            value={activeTab}
            onChange={(e) => setActiveTab(e.target.value)}
          >
            <option value="newest">Sort by newest</option>
            <option value="oldest">Sort by oldest</option>
          </select>
        </div>
        {/* reviews */}
        <div className="space-y-6">
          {tutorReviews.map((review) => (
            <div
              key={review._id}
              className="flex gap-4 justify-between items-center "
            >
              <div className="flex justify-between items-center gap-4">
                <Image
                  width={40}
                  height={40}
                  src={review.student.profilePhoto}
                  alt="classes"
                  className=" object-cover rounded-lg h-[47px] w-[47px]"
                />
                <div className="flex justify-center items-center gap-10">
                  <div className="flex flex-col justify-between">
                    <div className="font-medium">{review.student.userName}</div>
                    <div className="text-gray-600 text-sm">
                      {new Date(review.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="">
                    <div className="flex items-center gap-2 ">
                      <div className="font-medium">{review.review}</div>
                    </div>
                    <p className="">{review.message}</p>
                  </div>
                </div>
              </div>
              <div className="">
                {[...Array(review.rating)].map((_, i) => (
                  <Star size={20} key={i} className="inline-block text-yellow-500" />
                ))}
                {[...Array(5 - review.rating)].map((_, i) => (
                  <Star size={20} key={i} className="inline-block text-gray-300" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewsSection;
