import React from "react";
import Image from "next/image";
const Rating = ({ rating, reviews }) => {
  return (  
    <div className="flex items-center space-x-1">
      <span className="flex items-center gap-1 text-sm font-semibold text-dark_text">
        <Image
          width={16}
          height={16}
          src={"/assets/icons/star-fill.svg"}
          alt="Star"
        />
        {typeof rating === "number" ? rating.toFixed(2) : "N/A"}
      </span>
      <span className="text-sm text-gray-500">
        ({reviews || 0} Review{reviews > 1 ? "s" : ""})
      </span>
    </div>
  );
};

export default Rating;
