"use client";

import Loader from "@/components/common/Loader";
import { BookingsTable } from "@/components/instructor/bookings/BookingsTable";
import { Filters } from "@/components/instructor/bookings/Filters";
import { Header } from "@/components/instructor/bookings/Header";
import { StatsCard } from "@/components/student-dashboard/StatsCard";
import { getBookigs } from "@/store/slices/instructor/bookingsSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const timeSlots = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

const BookingsDashboard = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const { bookings } = useSelector((state) => state.instructor.booking);
  const getloading = useSelector(
    (state) => state.instructor.booking.isLoading.getBookigs
  );

  const statsData = [
    { title: "Total Bookings", value: "120", percentage: "+5%" },
    { title: "Completed Sessions", value: "98", percentage: "+3%" },
    { title: "Upcoming Sessions", value: "45", percentage: "+7%" },
    { title: "Canceled Sessions", value: "10", percentage: "-2%" },
    { title: "New Students", value: "25", percentage: "+4%" },
    { title: "Total Earnings", value: "$12,500", percentage: "+8%" },
    { title: "Active Instructors", value: "20", percentage: "+6%" },
    { title: "Average Rating", value: "4.8", percentage: "+1%" },
  ];

  useEffect(() => {
    dispatch(getBookigs());
  }, []);

  return (
    <div className="px-5 py-6 flex flex-col gap-6">
      {/* <Header /> */}
      {getloading ? (
        <div className="w-full py-20 flex items-center justify-center">
          <Loader isBig={true} color={"text-secondary"} />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-4 gap-6 ">
            {statsData?.map((stat) => (
              <StatsCard
                title={stat?.title}
                value={stat?.value}
                percentage={stat?.percentage}
              />
            ))}
          </div>
          <main className="">
            <Filters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedSlot={selectedSlot}
              setSelectedSlot={setSelectedSlot}
              timeSlots={timeSlots}
            />
            <BookingsTable
              bookings={bookings}
              searchQuery={searchQuery}
              selectedSlot={selectedSlot}
            />
          </main>
        </>
      )}
    </div>
  );
};

export default BookingsDashboard;
