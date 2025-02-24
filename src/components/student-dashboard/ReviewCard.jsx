import { StarRating } from "./StarRating";

export function ReviewCard({ review, onEdit, onDelete }) {
  return (
    <div className="py-6 first:pt-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={review.avatar || "/placeholder.svg"}
            alt={review.author}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-dark">{review.courseTitle}  </h3>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>

      <div className="mt-4 text-gray-600 leading-relaxed">{review.content}</div>

      <div className="mt-4 space-x-4">
        <button
          onClick={() => onEdit(review.id)}
          className="text-gray-500 hover:text-primary text-sm"
        >
          Edit
        </button>
       
      </div>
    </div>
  );
}
