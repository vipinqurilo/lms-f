"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import BookingItem from "@/components/bookings/BookingItem";
import BookingModals from "@/components/bookings/BookingModals";
import Loader from "@/components/common/Loader";
import { rescheduleResponseAsync } from "@/store/slices/bookingSlice";

const BookingList = ({ bookings, isLoading }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathSegment = router.pathname.split("/")[1];
  const isAdmin = pathSegment === "admin-dashboard";
  const [booking, setBooking] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState("");
  const [loadingState, setLoadingState] = useState({
    rescheduleResponseAsync: false,
    activeBookingId: null
  });
  const { authUser } = useSelector((state) => state.user);

  // Combine application loading state with our local state
  const combinedLoadingState = {
    ...isLoading,
    ...loadingState
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update local loading state when Redux loading state changes
  useEffect(() => {
    if (!isLoading?.rescheduleResponseAsync) {
      setLoadingState(prev => ({
        ...prev,
        rescheduleResponseAsync: false,
        activeBookingId: null
      }));
    }
  }, [isLoading?.rescheduleResponseAsync]);

  // Group bookings by date
  const groupBookingsByDate = (bookings) => {
    const grouped = bookings.reduce((acc, booking) => {
      const date = new Date(booking.sessionStartTime).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "long", year: "numeric" }
      );

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(booking);
      return acc;
    }, {});

    // Sort dates in ascending order
    return Object.entries(grouped).sort(
      (a, b) => new Date(a[0]) - new Date(b[0])
    );
  };

  const handleActionClick = (bookingData, action) => {
    setBooking(bookingData);
    setIsOpen(action);
  };

  const handleRescheduleResponse = (bookingId, action, reason) => {
    // Set local loading state first for immediate UI feedback
    setLoadingState({
      rescheduleResponseAsync: true,
      activeBookingId: bookingId
    });
    
    // Dispatch the action to Redux
    dispatch(
      rescheduleResponseAsync({
        bookingId,
        action,
        reason: reason || undefined
      })
    );
  };

  const closeModal = () => setIsOpen("");

  return (
    <>
      <div className="space-y-6">
        {isLoading?.["fetchBookingsAsync"] ? (
          <div className="text-center py-12">
            <Loader color={"text-secondary"} isBig={true} />
          </div>
        ) : bookings.length > 0 ? (
          <>
            {groupBookingsByDate(bookings).map(([date, dateBookings]) => (
              <div key={date} className="space-y-4">
                <div className="sticky top-[125px] z-10 bg-gray-50 p-3">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {date}
                  </h3>
                </div>
                {dateBookings.map((bookingItem) => (
                  <BookingItem
                    key={bookingItem._id}
                    booking={bookingItem}
                    currentTime={currentTime}
                    isAdmin={isAdmin}
                    authUser={authUser}
                    onActionClick={handleActionClick}
                    onRescheduleResponse={handleRescheduleResponse}
                    isLoading={combinedLoadingState}
                  />
                ))}
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No booking found
          </div>
        )}
      </div>

      {/* Modals */}
      <BookingModals
        isOpen={isOpen}
        booking={booking}
        bookings={bookings}
        onClose={closeModal}
      />
    </>
  );
};

export default BookingList;
