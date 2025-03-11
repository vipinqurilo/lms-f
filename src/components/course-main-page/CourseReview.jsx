import React, { useState } from "react";
import Heading from "./Heading";
import { RatingStars } from "./RatingStars";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

const CourseReview = ({ data }) => {
  const [isLiked, setisLiked] = useState(null);
  const [isReply, setisReply] = useState(null);
  const toggleISLikes = (index) => setisLiked(index);
  const toggleisReply = (index) => setisReply(index);

  const [replyValue, setReplyValue] = useState("");

  const handleReply = () => {
    if (replyValue === "") {
      alert("Please write a reply");
      return;
    }
    console.log(replyValue);
  };

  return (
    <div className="course-sub-container">
      <Heading data={"Students Reviews"} />
      <div className="space-y-6">
        {data?.length === 0 ? (
          <p className="text-light">No Reviews</p>
        ) : (
          <>
            {Array.isArray(data) &&
              data?.map((review, index) => (
                <div
                  key={index}
                  className="space-y-2 pb-4 border-b border-black/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between w-full">
                      <h6 className="text-dark font-semibold">
                        {`${review?.student?.firstName} ${review?.student?.lastName}`}
                      </h6>
                      {review?.rating && (
                        <RatingStars rating={review?.rating} />
                      )}
                    </div>
                  </div>
                  <p className="text-light">{review?.review}</p>
                  <p className="text-light text-sm">{review?.message}</p>
                  {/* <div className="flex items-center gap-4 w-full justify-between">
              <button
                onClick={() => toggleISLikes(index)}
                className="flex items-center gap-1 text-light"
              >
                {isLiked === index ? (
                  <AiFillLike className="text-red-500" />
                ) : (
                  <AiOutlineLike />
                )}
                <span className="text-sm">{review?.likes || 0} Likes</span>
              </button>
              {isReply === index ? (
                <button onClick={() => toggleisReply(null)}>
                  <RxCross1 className="text-light" />
                </button>
              ) : (
                <button
                  onClick={() => toggleisReply(index)}
                  className="text-light text-sm"
                >
                  Reply
                </button>
              )}
            </div> */}
                  {isReply === index && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={replyValue}
                        onChange={(e) => setReplyValue(e.target.value)}
                        placeholder="Write a reply..."
                        className="w-full p-1 px-2 text-sm border rounded"
                      />
                      <button
                        onClick={handleReply}
                        className="px-2 text-sm py-1 bg-secondary hover:bg-black transition-custom rounded text-white"
                      >
                        Reply
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CourseReview;
