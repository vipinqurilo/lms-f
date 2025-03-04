"use client";

import React from "react";
import { CoursePaymentModal } from "../courses/CoursePaymentModal";
import { IoClose } from "react-icons/io5";
import SlideShow from "@/container/login/SlideShow";
import LoginForm from "@/container/login/LoginForm";
import BackgroundModal from "../instructor/BackgroundModal";
import CheckoutForm from "../payment/CheckoutForm";
import { useSelector } from "react-redux";

const CourseByModal = ({
  isPaymentModal,
  setisModalOpen,
  checkoutUrl,
  setisPaymentModal,
  isModalOpen,
  handlePayment,
  data,
  selectedMethod,
  setselectedMethod,
}) => {
  const { authUser } = useSelector((state) => state.user);
  return (
    <>
      {isPaymentModal ? (
        <CheckoutForm
          checkoutUrl={checkoutUrl}
          setPaymentModal={setisPaymentModal}
          setisModalOpen={setisModalOpen}
        />
      ) : (
        <>
          {isModalOpen && (
            <BackgroundModal
              PropComponent={
                <>
                  {authUser && Object.keys(authUser)?.length === 0 ? (
                    <div
                      className="w-[90%] lg:w-[70vw] flex items-center font-nunito !h-[90vh] bg-white rounded-lg overflow-hidden relative"
                      style={{
                        scrollbarWidth: "thin",
                      }}
                    >
                      <SlideShow />
                      <LoginForm
                        setisModalOpen={setisModalOpen}
                        isModal={true}
                      />
                      <button
                        onClick={() => setisModalOpen(!isModalOpen)}
                        className="absolute top-2 right-2 lg:right-6 text-gray-500 border border-black/10 rounded-full p-1 hover:bg-background hover:text-white transition-custom "
                      >
                        <IoClose size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-[90%] h-[90vh] md:h-auto lg:w-[70%] bg-white overflow-y-auto lg:overflow-hidden flex flex-col gap-5 rounded-lg relative p-6">
                      <div
                        className={`w-full flex items-center justify-between -mb-5 lg:px-8`}
                      >
                        <h2 className="text-xl font-semibold font-nunito ">
                          Complete Your Purchase
                        </h2>
                        <button
                          onClick={() => setisModalOpen(!isModalOpen)}
                          className="text-gray-500 border border-black/10 rounded-full p-1 hover:bg-background hover:text-white transition-custom "
                        >
                          <IoClose size={20} />
                        </button>
                      </div>
                      <CoursePaymentModal
                        applyCoupon={() => console.log("clicked")}
                        course={data}
                        handlePayment={handlePayment}
                        selected={selectedMethod}
                        onSelect={setselectedMethod}
                      />
                    </div>
                  )}
                </>
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default CourseByModal;
