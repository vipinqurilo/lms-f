"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingReminder from "./BookingReminder";
import BookingView from "./BookingView";
import BookingTabs from "./BookingTabs";
import BookingsFilter from "./BookingsFilter";
import BookingList from "./BookingList";
import { getBookings } from "@/store/slices/instructor/bookingsSlice";
import TutorAvailabilityCalendar from "@/components/instructor/TutorAvailabilityCalendar";
import { fetchAvailabilityAsync } from "@/store/slices/instructor/availabilitySlice";

const BookingsDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All lessons");
  const [activeTab2, setActiveTab2] = useState("listing");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { availability, isLoading: availabilityLoading } = useSelector(
    (state) => state.instructor.availability
  );
  // Redux state
  const { bookings, isLoading, totalPages } = useSelector((state) => ({
    bookings: state.instructor.booking.bookings || [],
    isLoading: state.instructor.booking.isLoading?.getBookings || false,
    totalPages: state.instructor.booking.totalPages || 1,
  }));

  // Fetch bookings on mount & when fi  lters change
  useEffect(() => {
    const status = activeTab === "All lessons" ? undefined : activeTab;

    // Initialize the request data object
    const requestData = {
      page: currentPage,
    };
    if (status) {
      requestData.status = status;
    }
    if (startDate) {
      requestData.startDate = startDate.toISOString();
    }
    if (endDate) {
      requestData.endDate = endDate.toISOString();
    }
    if (debouncedKeyword) {
      requestData.keyword = debouncedKeyword;
    }

    dispatch(getBookings(requestData));
  }, [dispatch, activeTab, startDate, endDate, debouncedKeyword, currentPage]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    if (endDate < startDate) setEndDate(startDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    // If end date is less than new start date, update end date
    if (endDate < date) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (date >= startDate) {
      setEndDate(date);
    }
  };
  useEffect(() => {
    dispatch(fetchAvailabilityAsync());
  }, []);
  return (
    <div className="px-5 py-0 flex flex-col gap-6">
      {bookings.length > 0 && <BookingReminder bookings={bookings} />}
      <BookingView activeTab2={activeTab2} setActiveTab2={setActiveTab2} />

      {/* Custom Tabs */}
      <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Filters */}
      <BookingsFilter
        keyword={keyword}
        setKeyword={setKeyword}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        handleEndDateChange={handleEndDateChange}
        handleStartDateChange={handleStartDateChange}
      />

      {/* Bookings Content */}
      {activeTab2 === "listing" ? (
        <BookingList
          bookings={bookings}
          currentPage={currentPage}
          isLoading={isLoading}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      ) : (
        <TutorAvailabilityCalendar calendar={availability.availability} />
      )}
    </div>
  );
};

export default BookingsDashboard;
