import Loader from "@/components/common/Loader";

const RescheduleApproval = ({ 
  booking, 
  authUser, 
  onRescheduleResponse,
  isLoading 
}) => {
  const formatDateTime = (dateTimeString) => {
    return {
      date: new Date(dateTimeString).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      time: new Date(dateTimeString).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    };
  };

  // Check if this specific booking is in loading state
  const isLoadingThisBooking = 
    isLoading?.["rescheduleResponseAsync"] && 
    isLoading?.["activeBookingId"] === booking._id;

  // If there is no booking or it's cancelled, don't render anything
  if (!booking || booking.status === "cancelled") {
    return null;
  }

  // Party (student/teacher) approval section
  if (
    booking.rescheduleRequest?.status === "pending" && 
    booking.rescheduleRequest?.rescheduleByUser?.role !== authUser?.role
  ) {
    const { date, time } = formatDateTime(booking.rescheduleRequest.newTime);
    
    return (
      <div className="flex items-center gap-2 w-full justify-between pt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Reschedule to</h2>
          {date} at {time}
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => 
              onRescheduleResponse(
                booking._id,
                "deny",
                "Request denied by other party"
              )
            }
            disabled={isLoadingThisBooking}
            className={`px-3 py-1 text-sm rounded-full ${
              isLoadingThisBooking 
                ? "bg-red-100 text-red-400 cursor-not-allowed" 
                : "text-red-50 bg-red-600"
            }`}
          >
            Deny
          </button>
          <button
            onClick={() => 
              onRescheduleResponse(
                booking._id,
                "accept"
              )
            }
            disabled={isLoadingThisBooking}
            className={`px-3 py-1 text-sm rounded-full ${
              isLoadingThisBooking 
                ? "bg-green-100 text-green-400 cursor-not-allowed" 
                : "text-green-50 bg-green-600"
            }`}
          >
            {isLoadingThisBooking ? (
              <Loader text={"Accepting..."} />
            ) : (
              "Accept"
            )}
          </button>
        </div>
      </div>
    );
  }

  // Admin approval section
  if (
    booking.rescheduleRequest?.status === "accepted_by_party" && 
    authUser?.role === "admin"
  ) {
    const { date: oldDate, time: oldTime } = formatDateTime(booking.sessionStartTime);
    const { date: newDate, time: newTime } = formatDateTime(booking.rescheduleRequest.newTime);
    
    return (
      <div className="flex items-center gap-2 w-full justify-between pt-4 border-t mt-3">
        <div>
          <h2 className="text-lg font-semibold">Admin Approval Required</h2>
          <p className="text-sm text-gray-600">
            Reschedule from {oldDate} at {oldTime}
          </p>
          <p className="text-sm text-gray-600">
            To {newDate} at {newTime}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>Reason:</strong> {booking.rescheduleRequest.reason}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => 
              onRescheduleResponse(
                booking._id,
                "deny",
                "Request denied by admin"
              )
            }
            disabled={isLoadingThisBooking}
            className={`px-3 py-1 text-sm rounded-full ${
              isLoadingThisBooking 
                ? "bg-red-100 text-red-400 cursor-not-allowed" 
                : "text-red-50 bg-red-600"
            }`}
          >
            Deny
          </button>
          <button
            onClick={() => 
              onRescheduleResponse(
                booking._id,
                "accept"
              )
            }
            disabled={isLoadingThisBooking}
            className={`px-3 py-1 text-sm rounded-full ${
              isLoadingThisBooking 
                ? "bg-green-100 text-green-400 cursor-not-allowed" 
                : "text-green-50 bg-green-600"
            }`}
          >
            {isLoadingThisBooking ? 
              <Loader text={"Accepting..."} /> : 
              "Approve"
            }
          </button>
        </div>
      </div>
    );
  }

  // Info for users who requested the reschedule
  if (
    booking.rescheduleRequest?.status === "pending" && 
    booking.rescheduleRequest?.rescheduleByUser?.role === authUser?.role
  ) {
    const { date, time } = formatDateTime(booking.rescheduleRequest.newTime);
    
    return (
      <div className="pt-4 border-t mt-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Reschedule requested to:</span> {date} at {time}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Status:</span> Waiting for {
            authUser?.role === "teacher" ? "student" : "teacher"
          } approval
        </p>
      </div>
    );
  }

  // Accepted by other party, waiting for admin approval
  if (
    booking.rescheduleRequest?.status === "accepted_by_party" && 
    authUser?.role !== "admin"
  ) {
    const { date, time } = formatDateTime(booking.rescheduleRequest.newTime);
    
    return (
      <div className="pt-4 border-t mt-3">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Reschedule request to:</span> {date} at {time}
        </p>
        <p className="text-sm text-blue-600 font-medium">
          Approved by {
            booking.rescheduleRequest.rescheduleByUser?.role === "teacher" ? 
              "student" : "teacher"
          } - Waiting for admin approval
        </p>
      </div>
    );
  }

  // Already rescheduled note
  if (
    booking.hasBeenRescheduled && 
    booking.rescheduleRequest?.status === "completed"
  ) {
    return (
      <div className="pt-2 mt-2">
        <p className="text-xs text-gray-500 italic">
          This booking has been rescheduled and cannot be rescheduled again.
        </p>
      </div>
    );
  }

  return null;
};

export default RescheduleApproval; 