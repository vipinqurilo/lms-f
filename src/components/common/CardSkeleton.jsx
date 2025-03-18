import React from "react";

const CardSkeleton = () => {
  return (
    <div className="w-full h-96 lg:w-full bg-gray-200 animate-pulse p-4 rounded-lg">
      <div className="h-40 bg-gray-300 rounded-md"></div>
      <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default CardSkeleton;
