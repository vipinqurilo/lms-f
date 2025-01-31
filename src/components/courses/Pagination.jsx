import React from 'react';

const Pagination = () => {
  return (
    <div className="flex   space-x-3 mt-4 ">
      {/* Previous Button */}
      <button
        className="w-10 h-10 flex items-center text-lg font-bold bg-white justify-center border  border-red-200 rounded text-black  hover:bg-gray-100"
        disabled
      >
        &lt;
      </button>

      {/* Page Numbers */}
      {[1, 2, 3, 4, 5].map((page, index) => (
        <button
          key={index}
          className={`w-10 h-10   bg-white   text-base text-black flex items-center justify-center border  rounded-lg ${
            page === 1
              ? 'bg-red-500 text-white border-red-500'
              : 'text-gray-500 border-red-300 hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className="w-10 h-10 flex items-center justify-center  text-lg  font-bold border border-red-200 bg-white rounded-lg text-black  hover:bg-gray-100"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
