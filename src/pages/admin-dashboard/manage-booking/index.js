"use client";

import { useState, useEffect } from "react";
import { Clock, User } from "lucide-react";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import AvailabilityCalendar from "@/components/tutor/AvailabilityCalendar";
import { useDispatch, useSelector } from "react-redux";
import BookingView from "@/container/instructor/bookings/BookingView";
import BookingTabs from "@/container/instructor/bookings/BookingTabs";
import BookingsFilter from "@/container/instructor/bookings/BookingsFilter";
import BookingList from "@/container/instructor/bookings/BookingList";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { getAllTeachers } from "@/store/slices/admin-dashboard/teachersSlice";
import { fetchBookingsAsync } from "@/store/slices/admin-dashboard/bookingSlice";

export default function index() {
  const dispatch = useDispatch();
  const { bookings, isLoading, totalPages } = useSelector(
    (state) => state.admin.booking
  );

  const [activeTab, setActiveTab] = useState("All lessons");
  const [activeTab2, setActiveTab2] = useState("listing");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endDateError, setEndDateError] = useState(false);
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);
  const [currentPage, setCurrentPage] = useState(1);
  const [teacherId, setTeacherId] = useState("all");

  console.log(teacherId, "= teacher admin");

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

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

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
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        keyword: debouncedKeyword, // Use debounced keyword
        page: currentPage,
        // teacherId, 
      })
    );
  }, [dispatch, activeTab, startDate, endDate, debouncedKeyword, currentPage]);

  return (
    <StudentDashboardLayout className="">
      <div className="w-full p-10">
        {/* Reminder Banner */}
        {bookings.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm mb-8">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    Reminder:{" "}
                    {bookings[0]?.courseName ||
                      bookings[0]?.subject?.name ||
                      bookings[0]?.title ||
                      "Your lesson"}
                  </p>
                  <h3 className="font-semibold">{bookings[0].title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      by {bookings[0].teacher.firstName}{" "}
                      {bookings[0].teacher.lastName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm">
                  Available at{" "}
                  {new Date(bookings[0].sessionStartTime)?.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
                <span className="text-sm text-gray-500">
                  {bookings[0].countdown}
                </span>
              </div>
            </div>
          </div>
        )}

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
          // teacher={teacherId}
          // setTeacher={setTeacherId}
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

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(val) => setCurrentPage(val)}
        />
      </div>
    </StudentDashboardLayout>
  );
}
