"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingReminder from "./BookingReminder";
import BookingView from "./BookingView";
import BookingTabs from "./BookingTabs";
import BookingsFilter from "./BookingsFilter";
import BookingList from "../../../components/bookings/BookingList";
import { fetchBookingsAsync } from "@/store/slices/bookingSlice";
import TutorAvailabilityCalendar from "@/components/instructor/TutorAvailabilityCalendar";
import { fetchAvailabilityAsync } from "@/store/slices/instructor/availabilitySlice";
import { Pagination } from "@/components/student-dashboard/Pagination";

const BookingsDashboard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("All lessons");
  const [activeTab2, setActiveTab2] = useState("listing");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { availability, isLoading: availabilityLoading } = useSelector(
    (state) => state.instructor.availability
  );
  
  // Redux state - updated to use unified booking slice
  const { bookings, isLoading, totalPages } = useSelector(
    (state) => state.booking
  );

  // Fetch bookings on mount & when filters change
  useEffect(() => {
    const status = activeTab === "All lessons" ? undefined : activeTab;
    // Initialize the request data object
    const requestData = {
      page: currentPage,
      status: status,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      search: debouncedKeyword,
    };

    dispatch(fetchBookingsAsync(requestData));
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
    <>
      <div className="px-5  flex flex-col   !p-10">
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
          <BookingList bookings={bookings} isLoading={isLoading} />
        ) : (
          <TutorAvailabilityCalendar calendar={availability.availability} />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default BookingsDashboard;
