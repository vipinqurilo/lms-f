import Image from "next/image";
import React, { useEffect, useState } from "react";
import TutorDetails from "./TutorDetails";
import AvailabilityCalendar from "../../components/tutor/AvailabilityCalendar";
import AvlbaleCalendar from "./AvailabilityCalendar";
import Step1SelectSubject from "../booking/Step1SelectSubject";
import Step2SelectTimeslot from "../booking/Step2SelectTimeslot";
import Step3Payment from "../booking/Step3Payment";

const TutorCard = () => {
  const [activeTab, setActiveTab] = useState("Availability");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvailableModelOpen, setIsAvailableModelOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  useEffect(() => {
    if (isModalOpen) {
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
  }, [isModalOpen, isAvailableModelOpen]);

  const handleNextStep = () => {
    setBookingStep((prev) => prev + 1);
  };
  const handleBackStep = () => {
    setBookingStep((prev) => prev - 1);
  };
  const handleConfirmPayment = () => {
    // Handle payment confirmation logic
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="bg-white group shadow-lg h-[354px] transition-all duration-500 hover:shadow-2xl hover:scale-[100.1%] hover:-translate-y-[2px] rounded-lg max-w-[85%] mx-auto flex">
        {/* Price & Buttons */}
        <div className="w-2/3 flex ">
          <div className="flex flex-col items-center py-6 px-8">
            <div className="">
              <Image
                width={140}
                height={140}
                src="/assets/tutor/Marlenereilly.jpg"
                alt="Tutor"
                className="rounded-xl object-cover"
              />
            </div>
            <div className="text-[12px] font-bold text-gray-700 my-2">
              $2.50 - $20.00
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-secondary text-white px-8 flex justify-center items-center text-nowrap text-md rounded-lg hover:bg-opacity-80 w-[140px] h-[40px]"
            >
              Book now
            </button>
            <button className="border border-secondary text-secondary px-4 flex justify-center items-center rounded-lg mt-4 hover:bg-orange-50 w-[140px] h-[40px]">
              Contact
            </button>
          </div>
          {/* Mid Section */}
          <TutorDetails />
        </div>
        {/* Right Section */}
        <div className="flex-1 border-l border-gray-200 max-w-1/3">
          <div className="flex items-center divide-x-1 border-b px-10">
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
          {activeTab === "Availability" && <AvlbaleCalendar />}
          <div className="h-6 relative">
            <div
              onClick={() => setIsModalOpen(true)}
              className="text-primary cursor-pointer absolute left-[50%] -translate-y-3 -translate-x-[50%] hidden group-hover:inline-block text-sm underline"
            >
              View full availability
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isAvailableModelOpen && (
        <div className="fixed w-screen h-screen top-0 left-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="h-[80%] w-full">
            <AvailabilityCalendar
              setIsAvailableModelOpen={setIsAvailableModelOpen}
            />
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed w-screen h-screen top-0 left-0 inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
          <div className="bg-white p-6 rounded-lg w-4/5">
            {bookingStep === 1 && (
              <Step1SelectSubject
                onNext={handleNextStep}
                onBack={() => setIsModalOpen(false)}
              />
            )}
            {bookingStep === 2 && (
              <Step2SelectTimeslot
                onNext={handleNextStep}
                onBack={handleBackStep}
              />
            )}
            {bookingStep === 3 && (
              <Step3Payment
                onConfirm={handleConfirmPayment}
                onBack={handleBackStep}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorCard;
