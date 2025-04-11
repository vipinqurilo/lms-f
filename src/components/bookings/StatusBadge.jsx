const StatusBadge = ({ booking }) => {
  return (
    <div className="absolute top-4 right-4">
      {booking?.rescheduleRequest?.status === "pending" &&
      booking?.status !== "cancelled" && (
        <span className="px-3 py-1 text-sm rounded-full text-yellow-600 bg-yellow-50 mr-2">
          Reschedule requested by{" "}
          {booking?.rescheduleRequest?.rescheduleByUser?.role}
        </span>
      )}
      
      {booking?.rescheduleRequest?.status === "accepted_by_party" &&
      booking?.status !== "cancelled" && (
        <span className="px-3 py-1 text-sm rounded-full text-blue-600 bg-blue-50 mr-2">
          Awaiting admin approval
        </span>
      )}
      
      <span
        className={`px-3 py-1 text-sm rounded-full ${
          booking.status.toLowerCase() === "confirmed"
            ? "text-green-600 bg-green-50"
            : booking.status.toLowerCase() === "scheduled" || 
              booking.status.toLowerCase() === "rescheduled" ||
              (booking?.rescheduleRequest?.status === "pending" && 
                booking.status.toLowerCase() !== "cancelled") ||
              (booking?.rescheduleRequest?.status === "accepted_by_party" && 
                booking.status.toLowerCase() !== "cancelled") ||
              (booking?.rescheduleRequest?.status === "rescheduled" && 
                booking.status.toLowerCase() !== "cancelled")
              ? "text-yellow-600 bg-yellow-50"
              : "text-red-600 bg-red-50"
        }`}
      >
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
      </span>
    </div>
  );
};

export default StatusBadge; 