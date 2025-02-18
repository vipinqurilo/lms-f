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
      } z-[1000] px-10 bg-white py-2 flex items-center justify-between`}
    >
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
          disabled={currentPage === 1}
        >
          ←
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${
                  page === currentPage
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
}
