export function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {currentPage} of {totalPages}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
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
        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
}
