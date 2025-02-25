import { setPagination } from "@/store/slices/uiSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  const { isCollapsed } = useSelector((state) => state.instructor.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPagination(true));
    return () => {
      dispatch(setPagination(false));
    };
  }, []);
  return (
    <div
      className={`fixed bottom-0  ${
        isCollapsed ? "w-[calc(100vw-80px)]" : "w-[calc(100vw-240px)]"
      } z-[10] px-10 bg-white py-2 flex items-center justify-between`}
    >
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages === null ? 0 : totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-8 h-8 text-sm rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          ←
        </button>

        <div className="flex items-center justify-between gap-3">
          {totalPages <= 3 ? (
            // If total pages are 3 or less, show all page buttons directly
            Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  className={`${
                    currentPage === page
                      ? "w-8 h-8 text-sm flex items-center justify-center bg-secondary text-white rounded-md"
                      : "text-black"
                  }`}
                  onClick={() => handlePageChange(page)}
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
                        ? "w-8 h-8 text-sm flex items-center justify-center bg-secondary text-white rounded-md"
                        : "text-black"
                    }`}
                    onClick={() => handlePageChange(1)}
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
                          ? "w-8 h-8 text-sm flex items-center justify-center bg-secondary text-white rounded-md"
                          : "text-black"
                      }`}
                      onClick={() => handlePageChange(page)}
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
                        ? "w-8 h-8 text-sm flex items-center justify-center bg-secondary text-white rounded-md"
                        : "text-black"
                    }`}
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-8 h-8 text-sm rounded-lg font-medium text-gray-600 hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
}
