"use client";

import { useState, useEffect } from "react";
import { Clock, User } from "lucide-react";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import AvailabilityCalendar from "@/components/tutor/AvailabilityCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsAsync } from "@/store/slices/student-dashboard/bookingSlice";
import BookingView from "@/container/instructor/bookings/BookingView";
import BookingTabs from "@/container/instructor/bookings/BookingTabs";
import BookingsFilter from "@/container/instructor/bookings/BookingsFilter";
import BookingList from "@/container/instructor/bookings/BookingList";
import BookingReminder from "@/container/instructor/bookings/BookingReminder";
import { Pagination } from "@/components/student-dashboard/Pagination";

export default function BookingsPage() {
  const dispatch = useDispatch();
  const { bookings, isLoading, totalPages } = useSelector(
    (state) => state.student.booking
  );

  const [activeTab, setActiveTab] = useState("All lessons");
  const [activeTab2, setActiveTab2] = useState("listing");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek;
  });
  const [endDateError, setEndDateError] = useState(false);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(1);
  // Validate end date whenever start date or end date changes
  useEffect(() => {
    if (endDate < startDate) {
      setEndDateError(true);
    } else {
      setEndDateError(false);
    }
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
      setEndDateError(false);
    } else {
      setEndDateError(true);
    }
  };

  // Debounce the keyword input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  // Fetch bookings when component mounts or filters change
  useEffect(() => {
    const status = activeTab === "All lessons" ? undefined : activeTab;
    dispatch(
      fetchBookingsAsync({
        status: activeTab === "All lessons" ? undefined : activeTab,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        search: debouncedKeyword, // Use debounced keyword
        page: currentPage, // Add page parameter
      })
    );
  }, [dispatch, activeTab, startDate, endDate, debouncedKeyword, currentPage]);

  return (
    <StudentDashboardLayout className="container mx-auto p-6 max-w-5xl">
      <div className="flex flex-col p-10">
        {/* Reminder Banner */}
        {bookings.length > 0 && <BookingReminder bookings={bookings} />}

        {/* Main Content */}
        <BookingView activeTab2={activeTab2} setActiveTab2={setActiveTab2} />

        {/* Custom Tabs */}
        <BookingTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <BookingsFilter
          keyword={keyword}
          setKeyword={setKeyword}
          endDateError={endDateError}
          endDate={endDate}
          startDate={startDate}
          handleEndDateChange={handleEndDateChange}
          handleStartDateChange={handleStartDateChange}
        />

        {/* Bookings Content */}
        {activeTab2 === "listing" ? (
          <BookingList
            bookings={bookings}
            currentPage={currentPage}
            isLoading={isLoading?.fetchBookingsAsync}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        ) : (
          <AvailabilityCalendar />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </StudentDashboardLayout>
  );
}
