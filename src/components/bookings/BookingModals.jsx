import BackgroundModal from "@/components/instructor/BackgroundModal";
import BookingConfirmationModel from "@/components/common/BookingConfirmationModel";
import CancelBookingModel from "@/components/common/CancelBookingModel";
import RescheduleBookingModel from "@/components/common/RescheduleBookingModel";
import EditMeetingLink from "@/components/common/EditMeetingLink";

const BookingModals = ({ isOpen, booking, bookings, onClose }) => {
  if (!isOpen || !booking) return null;

  // Return the appropriate modal based on the isOpen value
  switch (isOpen) {
    case "confiramation":
      return (
        <BackgroundModal
          PropComponent={
            <BookingConfirmationModel
              type={isOpen}
              bookingId={booking._id}
              onClose={onClose}
            />
          }
        />
      );
    
    case "edit":
      return (
        <BackgroundModal
          PropComponent={
            <EditMeetingLink
              bookingId={booking._id}
              meetingLink={booking.meetingLink}
              onClose={onClose}
            />
          }
        />
      );
    
    case "cancelation":
      return (
        <BackgroundModal
          PropComponent={
            <CancelBookingModel
              booking={booking}
              date={booking.scheduledDate}
              bookingId={booking._id}
              onClose={onClose}
            />
          }
        />
      );
    
    case "reschedule":
      return (
        <BackgroundModal
          PropComponent={
            <RescheduleBookingModel
              rowBookings={bookings}
              booking={booking}
              onClose={onClose}
            />
          }
        />
      );
    
    default:
      return null;
  }
};

export default BookingModals; 