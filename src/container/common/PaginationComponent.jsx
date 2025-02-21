import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";

const PaginationComponent = ({ currentPage, setcurrentPage, totalPages }) => {
  const handleNext = () => {
    if (currentPage !== totalPages) {
      setcurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      setcurrentPage(currentPage - 1);
    }
  };

  const handleCurrentPage = (pageNo) => {
    setcurrentPage(pageNo);
  };

  return (
    <div className="w-fit mx-auto py-5 pb-16 flex items-center gap-3">
      <button
        className="w-8 h-8 flex items-center justify-center bg-gray-200 disabled:cursor-not-allowed rounded-md"
        disabled={currentPage === 1}
        onClick={handlePrev}
      >
        <GrPrevious
          className={`${currentPage !== 1 ? "text-black" : "text-gray-500"}`}
        />
      </button>
      <div className="flex items-center justify-between gap-2">
        {totalPages <= 3 ? (
          // If total pages are 3 or less, show all page buttons directly
          Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`${
                  currentPage === page
                    ? "w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-md"
                    : "text-black"
                }`}
                onClick={() => handleCurrentPage(page)}
              >
                {page}
              </button>
            );
          })
        ) : (
          // Original logic for cases where totalPages > 3
          <>
            {currentPage > 3 && (
              <>
                <button
                  className={`${
                    currentPage === 1
                      ? "w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-md"
                      : "text-black"
                  }`}
                  onClick={() => handleCurrentPage(1)}
                >
                  1
                </button>
                <span>...</span>
              </>
            )}
            {Array.from({ length: 3 }, (_, index) => {
              const page = currentPage - 1 + index;
              if (page > 0 && page <= totalPages) {
                return (
                  <button
                    key={page}
                    className={`${
                      currentPage === page
                        ? "w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-md"
                        : "text-black"
                    }`}
                    onClick={() => handleCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              }
              return null;
            })}
            {currentPage < totalPages - 2 && (
              <>
                <span>...</span>
                <button
                  className={`${
                    currentPage === totalPages
                      ? "w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-md"
                      : "text-black"
                  }`}
                  onClick={() => handleCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </>
            )}
          </>
        )}
      </div>
      <button
        className="w-8 h-8 flex items-center justify-center bg-gray-200 disabled:cursor-not-allowed rounded-md"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <GrNext
          className={`${
            currentPage !== totalPages ? "text-black" : "text-gray-500"
          }`}
        />
      </button>
    </div>
  );
};

export default PaginationComponent;
