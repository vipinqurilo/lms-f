import { Heart } from "lucide-react";
import { Star } from "lucide-react";

export function CourseCard({
  course = {}, // Provide empty object as default
  onWishlist = false,
  onWishlistClick = () => {},
  type = "buy",
}) {
  // Destructure with default values
  const {
    title = "Untitled Course",
    instructor = { name: "Unknown Instructor", image: "/placeholder.svg" },
    thumbnail = "/placeholder.svg",
    lessons = 0,
    duration = "0h 0m",
    rating = 0,
    reviews = 0,
    price,
    originalPrice,
    isFree = false,
  } = course;

  return (
    <div className="w-full group cursor-pointer hover:bg-[#413655] bg-white transition-colors duration-300 rounded-lg shadow-lg p-4">
      {/* Thumbnail */}
      <div className="relative overflow-hidden rounded-md">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        {(price !== undefined || isFree) && (
          <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 text-sm font-semibold">
            {isFree ? (
              <span className="text-green-600">FREE</span>
            ) : (
              <span className="text-primary">
                ${price}
                {originalPrice && (
                  <span className="ml-2 line-through text-gray-400">
                    ${originalPrice}
                  </span>
                )}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={instructor.image || "/placeholder.svg"}
              alt={instructor.name}
              className="w-12 h-12 rounded-full mr-3"
            />
            <div>
              <h3 className="text-lg font-semibold group-hover:text-white">
                {instructor.name}
              </h3>
              <span className="text-sm group-hover:text-white font-medium text-gray-500">
                Instructor
              </span>
            </div>
          </div>

          <button
            onClick={onWishlistClick}
            className={`text-2xl ${
              onWishlist ? "text-primary" : "text-gray-400"
            } group-hover:text-white`}
          >
            <Heart className={`w-6 h-6 ${onWishlist ? "fill-current" : ""}`} />
          </button>
        </div>

        <h2 className="mt-2 text-xl group-hover:text-white text-gray-700">
          {title}
        </h2>

        <div className="flex items-center justify-between gap-4 mt-4">
          <span className="text-sm text-gray-600 group-hover:text-white">
            📚 {lessons} Lessons
          </span>
          <span className="text-sm text-gray-600 group-hover:text-white">
            ⏱ {duration}
          </span>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating) ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500 group-hover:text-white">
              {rating} ({reviews})
            </span>
          </div>

          <button className="px-6 py-2 text-[#413655] bg-white group-hover:bg-[#413655] group-hover:text-white rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6] transition-colors duration-300">
            {type === "buy" ? "Buy Now" : "View Course"}
          </button>
        </div>
      </div>
    </div>
  );
}
