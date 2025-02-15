import Image from "next/image";
import React, { useEffect, useState } from "react";
import TutorDetails from "./TutorDetails";
import AvlbaleCalendar from "./AvailabilityCalendar";
import { BookingModal } from "../booking/BookingModal";
import { IoHeartOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAvailableModelOpen,
  setIsContactModelOpen,
} from "../../store/slices/uiSlice";
import { useRouter } from "next/router";
import Rating from "./Rating";
import { setTutorId, setUserID } from "@/store/slices/tutorsSlice";

const TutorCard = ({ tutor, setTutor, setShowBooking }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="">
      <div
        key={tutor._id}
        className="bg-white group shadow-lg h-fit lg:h-[354px] transition-all duration-500 hover:shadow-2xl hover:scale-[100.1%] hover:-translate-y-[2px] rounded-lg mx-1  lg:min-w-[80%] lg:mx-auto flex flex-col lg:flex-row"
      >
        {/* Price & Buttons */}
        <div className="w-full  flex flex-col lg:flex-row ">
          <div className="flex flex-col items-start lg:items-center p-3 lg:py-6 lg:px-8">
            <div className=" w-full flex">
              <Image
                width={140}
                height={140}
                src={tutor.user.profilePhoto || "/assets/tutor/default.jpg"}
                alt="Tutor"
                className="rounded-xl object-cover w-[80px] lg:w-[140px] h-[80px] lg:h-[140px]"
              />
              <div className="px-2 w-full block lg:hidden">
                <div className="flex justify-between items-center">
                  <h2
                    onClick={() => {
                      dispatch(setTutorId(tutor._id));
                      dispatch(setUserID(tutor.user._id));
                      router.push(
                        `/tutors/${tutor.user?.firstName?.toLowerCase()}-${tutor.user?.lastName?.toLowerCase()}`
                      );
                    }}
                    className="text-base font-bold cursor-pointer"
                  >
                    {tutor.user.firstName} {tutor.user.lastName}
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500">
                    <SlLocationPin className="mr-1" />
                    {tutor.user.country || "Unknown Location"}
                  </div>
                  {tutor.rating && (
                    <Rating rating={tutor.rating} reviews={tutor.reviews} />
                  )}
                </div>
              </div>
            </div>
            {/* Learners and Sessions */}
            <div className="text-sm text-gray-500 mt-2 lg:hidden block">
              <span className="font-bold">16</span> Learners ·{" "}
              <span className="font-bold">45</span> Sessions
            </div>
            {/* Subjects */}
            <div className="text-xs flex lg:hidden gap-2">
              <h3 className="font-semibold text-gray-700">Teaches</h3>
              <div className="text-gray-600 text-xs line-clamp-1">
                Accounting, Biology, Geography, Literary Criticism
              </div>
            </div>
            <div className="text-[12px] font-bold text-gray-700 my-2">
              $2.50 - $20.00
            </div>
            <div className="flex lg:flex-col gap-4">
              <button
                disabled={!tutor}
                onClick={() => {
                  setShowBooking(true);
                  setTutor(tutor);
                }}
                className="bg-secondary text-white px-8 flex justify-center items-center text-nowrap text-md rounded-lg hover:bg-opacity-80 w-[140px] h-[40px]"
              >
                Book now
              </button>
              <button
                onClick={() => {
                  setTutor(tutor);
                  dispatch(setIsContactModelOpen(true));
                }}
                className="border border-secondary text-secondary px-4 flex justify-center items-center rounded-lg  hover:bg-orange-50 w-[140px] h-[40px]"
              >
                Contact
              </button>
            </div>
          </div>
          {/* Mid Section */}
          <div className="hidden md:block">
            <TutorDetails tutor={tutor} />
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 border-l border-gray-200 min-w-1/3 h-full max-w-1/3">
          <div className="items-center divide-x-1 border-b px-10 hidden md:flex">
            <div
              className={`font-medium  h-full py-4 text-center relative text-sm mx-auto w-1/2`}
            >
              <div
                className={`absolute bottom-0 h-[2px] w-[65%] translate-x-[50%] right-[50%] bg-secondary`}
              ></div>
              Availability
            </div>
          </div>
          <div className="hidden md:block">
            <AvlbaleCalendar availability={tutor?.calendar?.availability} />
          </div>
          <div className="h-6 relative hidden md:block">
            <button
              disabled={!tutor}
              onClick={() => {
                dispatch(setIsAvailableModelOpen(true));
                setTutor(tutor);
              }}
              className="text-primary cursor-pointer absolute left-[50%] -translate-y-3 -translate-x-[50%] hidden group-hover:inline-block text-sm underline"
            >
              View full availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCard;
