import { addReviewAsync } from "@/store/slices/tutorsSlice";
import { Star } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ReviewModal = ({ onClose, tutorId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addReviewAsync({ 
        data: { rating, review, message, tutorId }
      })).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-[500px] max-w-[90vw]">
      <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer ${
                  (hoveredRating || rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block mb-2 font-medium">Title</label>
          <input
            type="text"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="Write a title for your review"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">Review</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 min-h-[100px]"
            placeholder="Share your experience with this tutor"
            required
          />
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80"
          >
            Submit Review
          </button>[]
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
