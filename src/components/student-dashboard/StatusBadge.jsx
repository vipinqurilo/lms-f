export function StatusBadge({ type, value }) {
  const getStatusStyles = () => {
    if (type === "priority") {
      switch (value) {
        case "Low":
          return "bg-green-100 text-green-700";
        case "Medium":
          return "bg-yellow-100 text-yellow-700";
        case "High":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    } else {
      switch (value) {
        case "open":
          return "bg-green-100 text-green-700";
        case "processing":
          return "bg-yellow-100 text-yellow-700";
        case "completed":
          return "bg-red-100 text-red-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
    >
      {value}
    </span>
  );
}
