import { 
  Video, 
  CircleX, 
  CircleCheckBig, 
  ListRestart, 
  FilePenLine 
} from "lucide-react";
import Loader from "@/components/common/Loader";
import Tooltip from "@/container/common/Tooltip";

const BookingActions = ({ 
  booking, 
  timeUntilStart, 
  daysUntilStart, 
  authUser, 
  isLoading,
  onActionClick
}) => {
  return (
    <div className="col-span-2 flex items-center justify-center gap-4">
      <Tooltip 
        text={
          booking?.status === "cancelled" 
            ? "Booking is cancelled" 
            : (timeUntilStart <= 3600000 && timeUntilStart > 0) 
              ? "Meeting link available only before class starts" 
              : booking?.meetingLink === null 
                ? "No meeting link available" 
                : "Join meeting"
        }
        position="top"
      >
        <button
          disabled={
            booking?.status === "cancelled" ||
            (timeUntilStart <= 3600000 && timeUntilStart > 0) || 
            booking?.meetingLink === null
          }
          className={`h-5 w-5 ${
            booking?.status === "cancelled" ||
            (timeUntilStart <= 3600000 && timeUntilStart > 0) || 
            booking?.meetingLink === null
              ? "text-gray-200"
              : "text-gray-600"
          } cursor-pointer`}
          onClick={() => {
            if (booking?.meetingLink) {
              window.open(booking.meetingLink, "_blank"); 
            }
          }}
        >
          <Video />
        </button>
      </Tooltip>
      
      {authUser?.role !== "admin" && (
        <>
          <Tooltip 
            text={
              (booking?.status !== "scheduled" && booking?.status !== "confirmed")
                ? "Booking must be scheduled or confirmed"
                : (timeUntilStart <= 3600000 && timeUntilStart > 0)
                  ? "Cannot reschedule within 1 hour of start time"
                  : booking?.rescheduleRequest?.status === "pending"
                    ? "Reschedule request already pending"
                    : booking?.rescheduleRequest?.status === "accepted_by_party" || 
                      booking?.rescheduleRequest?.status === "completed" ||
                      booking?.hasBeenRescheduled
                      ? "Booking already in reschedule process"
                      : "Request reschedule"
            }
            position="top"
          >
            <button 
              disabled={
                (booking?.status !== "scheduled" && booking?.status !== "confirmed") ||
                (timeUntilStart <= 3600000 && timeUntilStart > 0) || 
                booking?.rescheduleRequest?.status === "pending" ||
                booking?.rescheduleRequest?.status === "accepted_by_party" ||
                booking?.rescheduleRequest?.status === "completed" ||
                booking?.hasBeenRescheduled
              }
              className={`h-5 w-5 ${
                (booking?.status !== "scheduled" && booking?.status !== "confirmed") ||
                (timeUntilStart <= 3600000 && timeUntilStart > 0) || 
                booking?.rescheduleRequest?.status === "pending" ||
                booking?.rescheduleRequest?.status === "accepted_by_party" ||
                booking?.rescheduleRequest?.status === "completed" ||
                booking?.hasBeenRescheduled
                  ? "text-gray-200"
                  : "text-gray-600"
              } cursor-pointer`}
              onClick={() => onActionClick(booking, "reschedule")}
            >
              {isLoading?.["rescheduleBooking"] ? (
                <Loader />
              ) : (
                <ListRestart />
              )}
            </button>
          </Tooltip>

          <Tooltip 
            text={
              booking?.status === "cancelled"
                ? "Booking is already cancelled"
                : daysUntilStart <= 0
                  ? "Cannot cancel on the day of class"
                  : booking?.status === "rescheduled"
                    ? "Rescheduled booking cannot be cancelled"
                    : (timeUntilStart <= 3600000 && timeUntilStart > 0)
                      ? "Cannot cancel within 1 hour of start time"
                      : "Cancel booking"
            }
            position="top"
          >
            <button
              disabled={
                booking?.status === "cancelled" || 
                daysUntilStart <= 0 ||
                booking?.status === "rescheduled" ||
                (timeUntilStart <= 3600000 && timeUntilStart > 0)
              }
              className={`h-5 w-5 ${
                booking?.status === "cancelled" || 
                daysUntilStart <= 0 ||
                booking?.status === "rescheduled" ||
                (timeUntilStart <= 3600000 && timeUntilStart > 0)
                  ? "text-gray-200"
                  : "text-gray-600"
              } cursor-pointer`}
              onClick={() => onActionClick(booking, "cancelation")}
            >
              {isLoading?.["cancelBookingAsync"] ? (
                <Loader />
              ) : (
                <CircleX />
              )}
            </button>
          </Tooltip>
        </>
      )}
      
      {authUser?.role === "teacher" && (
        <>
          {booking?.status === "confirmed" ? (
            <Tooltip 
              text={
                booking?.status === "cancelled"
                  ? "Cannot edit cancelled booking"
                  : (timeUntilStart <= 3600000 && timeUntilStart > 0)
                    ? "Cannot edit within 1 hour of start time"
                    : "Edit meeting link"
              }
              position="top"
            >
              <button
                disabled={
                  booking?.status === "cancelled" ||
                  (timeUntilStart <= 3600000 && timeUntilStart > 0)
                }
                onClick={() => onActionClick(booking, "edit")}
                className={`h-5 w-5 ${
                  booking?.status === "cancelled" ||
                  (timeUntilStart <= 3600000 && timeUntilStart > 0)
                    ? "text-gray-200"
                    : "text-gray-600"
                } cursor-pointer`}
              >
                {isLoading?.["updateBooking"] ? (
                  <Loader />
                ) : (
                  <FilePenLine />
                )}
              </button>
            </Tooltip>
          ) : (
            <Tooltip 
              text={
                booking?.status === "cancelled"
                  ? "Cannot confirm cancelled booking"
                  : (timeUntilStart <= 3600000 && timeUntilStart > 0)
                    ? "Cannot confirm within 1 hour of start time"
                    : "Confirm booking"
              }
              position="top"
            >
              <button
                disabled={
                  booking?.status === "cancelled" ||
                  (timeUntilStart <= 3600000 && timeUntilStart > 0)
                }
                onClick={() => onActionClick(booking, "confiramation")}
                className={`h-5 w-5 ${
                  booking?.status === "cancelled" ||
                  (timeUntilStart <= 3600000 && timeUntilStart > 0)
                    ? "text-gray-200"
                    : "text-gray-600"
                } cursor-pointer`}
              >
                {isLoading?.["confirmBooking"] ? (
                  <Loader />
                ) : (
                  <CircleCheckBig />
                )}
              </button>
            </Tooltip>
          )}
        </>
      )}
    </div>
  );
};

export default BookingActions; 