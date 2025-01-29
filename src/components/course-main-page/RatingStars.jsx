import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const RatingStars = ({ rating }) => {
  const maxStars = 5;
  const fullStars = Math.floor(rating); // Full stars
  const hasHalfStar = rating % 1 !== 0; // Check for half star
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <FaStar key={`full-${index}`} className="text-yellow-500" />
          ))}

        {/* Half Star */}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}

        {/* Empty Stars */}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} className="text-yellow-500" />
          ))}
      </div>
      {rating}
    </div>
  );
};
