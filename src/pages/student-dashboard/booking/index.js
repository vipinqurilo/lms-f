"use client";

import { useState, useEffect } from "react";
import { Clock, User, Search, Video, Calendar } from "lucide-react";
import { StartEndDateSelector } from "@/components/student-dashboard/StartEndDateSelector";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import Image from "next/image";
import AvailabilityCalendar from "@/components/tutor/AvailabilityCalendar";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingsAsync } from "@/store/slices/student-dashboard/bookingSlice";

export default function BookingsPage() {
  const dispatch = useDispatch();
  const { bookings, isLoading } = useSelector((state) => state.student.booking);
  const [activeTab, setActiveTab] = useState("All lessons");
  const [activeTab2, setActiveTab2] = useState("listing");
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(new Date());
  const [endDateError, setEndDateError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
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

  // Fetch bookings when component mounts or filters change
  useEffect(() => {
    const status = activeTab === "All lessons" ? undefined : activeTab;
    // dispatch(fetchBookingsAsync({
    //   status,
    //   startDate: startDate.toISOString(),
    //   endDate: endDate.toISOString()
    // }));
    dispatch(
      fetchBookingsAsync({
        status,
        startDate: "",
        endDate: "",
      })
    );
  }, [dispatch, activeTab, startDate, endDate]);

  return (
    <StudentDashboardLayout className="container mx-auto p-6 max-w-5xl">
      {/* Reminder Banner */}
      <div className="bg-white rounded-lg shadow-sm mb-8">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Reminder : One o one course
              </p>
              <h3 className="font-semibold">
                UX-Strategy: How to Reach The Next Level
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">by Rose Poole</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm">
              Available at 7:30 AM
            </span>
            <span className="text-sm text-gray-500">00 : 06 : 23</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">My Bookings</h2>
        <div className="flex w-fit bg-white p-1 rounded-lg">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              activeTab2 === "listing"
                ? "bg-orange-500 text-white"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab2("listing")}
          >
            Listing
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-xl transition-colors ${
              activeTab2 === "calendar"
                ? "bg-orange-500 text-white"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab2("calendar")}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Custom Tabs */}
      <div className="border-b mb-6">
        <div className="flex gap-6">
          {["All lessons", "Scheduled", "Completed", "Canceled"].map(
            (item, index) => (
              <button
                onClick={() => setActiveTab(item)}
                className={`pb-4 relative ${
                  activeTab === item ? "text-emerald-600" : "text-gray-600"
                }`}
              >
                {item}
                {activeTab === item && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500" />
                )}
              </button>
            )
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <div className="relative  h-fit">
          <input
            type="text"
            placeholder="Search by keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg w-64"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>

        <div className=" flex justify-center items-center gap-4 ">
          <label className="block text-sm text-gray-600">
            Lesson start date
          </label>
          <StartEndDateSelector
            selectedDate={startDate}
            onDateSelect={handleStartDateChange}
            onClose={() => {}}
          />
        </div>

        <div className=" flex justify-center items-center gap-4 ">
          <label className="block text-sm text-gray-600">
            Lesson end date
            {endDateError && (
              <span className="text-red-500 ml-2">
                Must be after start date
              </span>
            )}
          </label>
          <StartEndDateSelector
            selectedDate={endDate}
            onDateSelect={handleEndDateChange}
            onClose={() => {}}
            minDate={startDate}
            isError={endDateError}
          />
        </div>
      </div>
      {/* Bookings Content */}
      {activeTab2 === "listing" ? (
        <div className="space-y-6">
          {isLoading.fetchBookingsAsync ? (
            <div className="text-center py-12">Loading...</div>
          ) : activeTab === "All lessons" && bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="flex gap-10 p-4">
                  {/* Tutor Image and Details */}
                  <div className="flex items-center gap-2">
                    <Image
                      width={128}
                      height={128}
                      src="/assets/tutor/Marlenereilly.jpg" // Default tutor image
                      alt="Tutor"
                      className="rounded-xl object-cover w-[50px] h-[50px]"
                    />
                    <div className="items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span>{`${booking.teacher.firstName} ${booking.teacher.lastName}`}</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-semibold">
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-l border-gray-300 mx-4"></div>

                  {/* Booking Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-2">
                      {booking?.subject?.name || "N/A"}
                    </h3>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">

                        <Clock className="h-4 w-4" />
                        <span>
                          {`${new Date(
                            booking.sessionStartTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} - ${new Date(
                            booking.sessionEndTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(booking.scheduledDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Icon */}
                  <div className="flex flex-col items-end justify-between">
                    <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-800">
                      <Video />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              No one-o-one bookings found
            </div>
          )}
        </div>
      ) : (
        <>
          <AvailabilityCalendar />
        </>
      )}
    </StudentDashboardLayout>
  );
}
