import { Star } from "lucide-react";

export function StarRating({ rating, size = "sm" }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`
            ${size === "sm" ? "w-4 h-4" : "w-5 h-5"}
            ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}
          `}
        />
      ))}
    </div>
  );
}
