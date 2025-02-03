import React from "react";
import TutorCard from "../../container/tutorCard/TutorCard";
import TutorFilter from "../../container/tutorCard/TutorFilter";
import {
  setIsAvailableModelOpen,
  setIsContactModelOpen,
} from "../../store/slices/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";
import ContactModal from "../../components/common/ContactModal";
import TutorAvailabilityCalendar from "@/components/instructor/TutorAvailabilityCalendar";

const index = () => {
  const dispatch = useDispatch();
  const { isAvailableModelOpen, isContactModelOpen } = useSelector(
    (state) => state.ui
  );

  return (
    <div className="text-lg bg-light_bg w-full h-screen p-2 md:p-10 lg:p-20 custom-margin-top">
      <TutorFilter />
      <TutorCard />
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
            <AvailabilityCalendar />
          </div>
        </div>
      )}
      {isContactModelOpen && (
        <ContactModal onClose={() => dispatch(setIsContactModelOpen(false))} />
      )}



      <TutorAvailabilityCalendar />
    </div>
  );
};

export default index;
