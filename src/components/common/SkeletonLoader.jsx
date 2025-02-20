export function SkeletonLoader() {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="p-4 bg-white border rounded-xl flex items-center justify-between relative overflow-hidden"
        >
          <div className="space-y-2 w-full">
            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
            <div className="w-4 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
