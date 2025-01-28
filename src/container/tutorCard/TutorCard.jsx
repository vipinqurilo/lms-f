import Image from "next/image";
import React, { useEffect, useState } from "react";
import TutorDetails from "./TutorDetails";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";
import AvlbaleCalendar from "./AvailabilityCalendar";
import { RxCross2 } from "react-icons/rx";
import { BookingModal } from "../booking/BookingModal";
import { IoHeartOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAvailableModelOpen,
  setIsContactModelOpen,
} from "../../store/slices/uiSlice";
const TutorCard = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Availability");
  const { isAvailableModelOpen } = useSelector((state) => state.ui);
  const [showBooking, setShowBooking] = useState(false);
  useEffect(() => {
    if (showBooking) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }
    if (isAvailableModelOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup when component unmounts
    };
  }, [showBooking, isAvailableModelOpen]);

  return (
    <div className="">
      <div className="bg-white group shadow-lg h-fit lg:h-[354px] transition-all duration-500 hover:shadow-2xl hover:scale-[100.1%] hover:-translate-y-[2px] rounded-lg mx-1  lg:max-w-[85%] lg:mx-auto flex flex-col lg:flex-row">
        {/* Price & Buttons */}
        <div className="w-full lg:w-2/3 flex flex-col lg:flex-row ">
          <div className="flex flex-col items-start lg:items-center p-3 lg:py-6 lg:px-8">
            <div className=" w-full flex">
              <Image
                width={140}
                height={140}
                src="/assets/tutor/Marlenereilly.jpg"
                alt="Tutor"
                className="rounded-xl object-cover w-[80px] lg:w-[140px] h-[80px] lg:h-[140px]"
              />
              <div className="px-2 w-full block lg:hidden">
                <div className="flex justify-between items-center">
                  <h2
                    onClick={() => router.push(`/tutors/marlene-reilly`)}
                    data-tip={"Tip Here"}
                    data-for={"mytip"}
                    className="text-base font-bold cursor-pointer"
                  >
                    Marlene Reilly
                  </h2>
                  <IoHeartOutline className=" cursor-pointer" />
                </div>
                <div className="flex  flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500">
                    <SlLocationPin className="mr-1" />
                    United Kingdom
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    <span className="flex items-center gap-1 text-sm font-semibold text-dark_text">
                      <Image
                        width={16}
                        height={16}
                        src={"/assets/icons/star-fill.svg"}
                        alt="Star"
                      />
                      3.50
                    </span>
                    <span className="text-sm text-gray-500">(2)</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Learners and Sessions */}
            <div className="text-sm text-gray-500 mt-2 lg:hidden  block">
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
                onClick={() => setShowBooking(true)}
                className="bg-secondary text-white px-8 flex justify-center items-center text-nowrap text-md rounded-lg hover:bg-opacity-80 w-[140px] h-[40px]"
              >
                Book now
              </button>
              <button
                onClick={() => dispatch(setIsContactModelOpen(true))}
                className="border border-secondary text-secondary px-4 flex justify-center items-center rounded-lg  hover:bg-orange-50 w-[140px] h-[40px]"
              >
                Contact
              </button>
            </div>
          </div>
          {/* Mid Section */}
          <div className="hidden  md:block">
            <TutorDetails />
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 border-l border-gray-200 max-w-1/3">
          <div className=" items-center divide-x-1 border-b px-10 hidden md:flex">
            <div
              onClick={() => setActiveTab("Availability")}
              className={`font-medium cursor-pointer h-full py-4 text-center relative ${
                activeTab === "Availability" ? "text-black" : "text-gray-500"
              } text-sm w-1/2`}
            >
              <div
                className={`absolute bottom-0 h-[2px] w-[65%] translate-x-[50%] right-[50%] bg-secondary ${
                  activeTab === "Availability" ? "block" : "hidden"
                }`}
              ></div>
              Availability
            </div>
            <div
              onClick={() => setActiveTab("Introduction")}
              className={`font-medium cursor-pointer text-center relative py-4 ${
                activeTab === "Introduction" ? "text-black" : "text-gray-500"
              } text-sm w-1/2`}
            >
              <div
                className={`absolute bottom-0 h-[2px] w-[65%] translate-x-[50%] right-[50%] bg-secondary ${
                  activeTab === "Introduction" ? "block" : "hidden"
                }`}
              ></div>
              Introduction
            </div>
          </div>
          <div className="hidden  md:block">
            {activeTab === "Availability" && <AvlbaleCalendar />}
          </div>
          <div className="h-6 relative hidden  md:block">
            <div
              onClick={() => dispatch(setIsAvailableModelOpen(true))}
              className="text-primary cursor-pointer absolute left-[50%] -translate-y-3 -translate-x-[50%] hidden group-hover:inline-block text-sm underline"
            >
              View full availability
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
      </div>
    </div>
  );
};

export default TutorCard;
