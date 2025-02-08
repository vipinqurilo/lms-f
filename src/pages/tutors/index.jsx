// import React from "react";
import TutorFilter from "../../container/tutorCard/TutorFilter";
import {
  setIsAvailableModelOpen,
  setIsContactModelOpen,
} from "../../store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";
import ContactModal from "../../components/common/ContactModal";
import { fetchAllTutorProfileAsync } from "../../store/slices/tutorsSlice";
import { useEffect, useState } from "react";
import TutorCard from "../../container/tutorCard/TutorCard";
import { BookingModal } from "@/container/booking/BookingModal";

const index = () => {
  const dispatch = useDispatch();
  const { isAvailableModelOpen, isContactModelOpen } = useSelector(
    (state) => state.ui
  );
  const { allTutorProfile, isLoading } = useSelector((state) => state.tutors);
  const [showBooking, setShowBooking] = useState(false);
  const [tutor, setTutor] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTutorProfileAsync());
  }, []);

  useEffect(() => {
    if (isAvailableModelOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isAvailableModelOpen]);

  return (
    <div className="text-lg bg-light_bg w-full  p-2 md:p-10 lg:px-20  custom-margin-top">
      <TutorFilter />
      {isLoading["fetchAllTutorProfileAsync"] ? (
        <div>Loading...</div>
      ) : (
        <>
          {allTutorProfile?.length > 0 ? (
            <div className="flex flex-col  gap-8 w-[95%] lg:w-[85%] mx-auto">
              {allTutorProfile?.map((tutor) => (
                <TutorCard
                  key={tutor._id}
                  tutor={tutor}
                  setTutor={setTutor}
                  setShowBooking={setShowBooking}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-2xl font-semibold">
              No tutors found
            </div>
          )}
        </>
      )}

      <div className="p-4">
        {showBooking && (
          <BookingModal tutor={tutor} onClose={() => setShowBooking(false)} />
        )}
      </div>
      {/* Modal */}
      {isAvailableModelOpen && (
        <div className="fixed w-screen h-screen top-0 left-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="h-[80%] bg-white border rounded-lg w-[80%] mx-auto">
            <div
              onClick={() => dispatch(setIsAvailableModelOpen(false))}
              className="flex items-center justify-between border-b p-4 cursor-pointer"
            >
              <h2 className="text-lg font-semibold">Availability Calendar</h2>
              <RxCross2 />
            </div>
            <AvailabilityCalendar calendar={tutor?.calendar} />
          </div>
        </div>
      )}
      {isContactModelOpen && (
        <ContactModal onClose={() => dispatch(setIsContactModelOpen(false))} />
      )}
    </div>
  );
};

export default index;
