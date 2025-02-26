"use client";

import React, { useState } from "react";
import { addOrderAsync, wishlistAsync } from "@/store/slices/coursesSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { IoMdHeart } from "react-icons/io";
import {
  createPaymentCourse,
  createPaymentIntent,
} from "@/store/slices/paymentSlice";
import BackgroundModal from "../instructor/BackgroundModal";
import { PaymentSelection } from "@/container/booking/PaymentSelection";
import { CoursePaymentModal } from "../courses/CoursePaymentModal";
import ModalHeading from "./ModalHeading";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import SlideShow from "@/container/login/SlideShow";
import LoginForm from "@/container/login/LoginForm";
import CheckoutForm from "../payment/CheckoutForm";
import Loader from "./Loader";

export default function FeaturedCard({ data, isFull = false }) {
  const { authUser } = useSelector((state) => state.user);
  const {
    enrolledCourses,
    wishlist: recentWishList,
    isLoading,
  } = useSelector((state) => state.courses);
  const { wishlist } = useSelector((state) => state.student.wishlist);

  if (!data || typeof data !== "object") {
    return <p>Invalid course data</p>;
  }
  const dispatch = useDispatch();

  const handleAddWishlist = (id) => {
    dispatch(wishlistAsync({ course: id }));
  };

  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedMethod, setselectedMethod] = useState("stripe");
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isPaymentModal, setisPaymentModal] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) {
      toast.error("Select Payment Method");
      return;
    }

    if (authUser?.role !== "teacher" && data) {
      const paymentData = {
        amount: data?.coursePrice,
        courseId: data?._id,
      };
      dispatch(createPaymentCourse(paymentData))
        .unwrap()
        .then((res) => {
          setCheckoutUrl(res?.url);
          setisPaymentModal(true);
        });
    }
  };

  return (
    <>
      <div className="flex gap-2 md:p-0  p-2">
        <div
          className={`${
            isFull ? "w-full" : "w-96"
          } group cursor-pointer hover:bg-[#413655] bg-white transition-colors duration-300 rounded-lg shadow-lg p-4 overflow-hidden relative`}
        >
          <div className="relative overflow-hidden rounded-md">
            <img
              src={data?.courseImage}
              alt="UX/UI Design"
              className="w-full h-48 object-cover transform transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex">
                <img
                  src={data?.courseImage}
                  alt="Instructor"
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-white">
                    {/* {data?.author} */} static data
                  </h3>
                  <span className="text-sm group-hover:text-white font-medium text-gray-500">
                    Instructor
                  </span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleAddWishlist(data?._id)}
                  className="  text-red-500  group-hover:text-white"
                >
                  {isLoading["wishlistAsync"] ? (
                    <Loader />
                  ) : (
                    <>
                      {wishlist?.some(
                        (item) => item?.course?._id === data?._id
                      ) ||
                      recentWishList?.some(
                        (item) => item?.course?._id === data?._id
                      ) ? (
                        <FaHeart className="text-xl text-red-500 hover:text-red-500" />
                      ) : (
                        <FaRegHeart className="text-xl hover:text-red-500" />
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
            <Link
              href={`/courses/${data?._id}`}
              className="mt-2 text-xl group-hover:text-white text-gray-700"
            >
              {data?.courseTitle}
            </Link>
            <div className="flex items-center justify-between gap-4 mt-4">
              <span className="text-sm text-gray-600 group-hover:text-white">
                📚 {data?.lesson}
              </span>
              <span className="text-sm text-gray-600 group-hover:text-white">
                ⏱ {data?.time}
              </span>
            </div>

            <div className="flex items-center justify-between mt-6 border-t pt-6 border-gray-300">
              <div className="flex items-center">
                {/* Rating */}
                <span className="flex text-yellow-500 ">⭐⭐⭐⭐</span>
                <span className="ml-1 text-sm text-gray-500 group-hover:text-white">
                  {" "}
                  <span>4.</span> (15)
                </span>
              </div>
              {enrolledCourses?.some((item) => item === data?._id) ? (
                <Link
                  href={`/courses/${data?._id}`}
                  className="px-8 py-2 text-background bg-white group-hover:bg-back group-hover:bg-transparent group-hover:text-white rounded-full border-2 border-secondary hover:bg-secborder-secondary hover:!text-secondary "
                >
                  View Course
                </Link>
              ) : (
                <button
                  onClick={() => setisModalOpen(!isModalOpen)}
                  className="px-8 py-2 text-[#413655] bg-white group-hover:bg-[#413655] group-hover:text-white rounded-full border-2 border-[#917cf6] hover:bg-[#917cf6] "
                >
                  BUY NOW
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

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
                <div className="w-[90%] lg:w-[70%] bg-white flex flex-col gap-5 rounded-lg relative p-6">
                  {!authUser ? (
                    <div className="w-full flex items-center font-nunito !h-[90%]">
                      <SlideShow />
                      <LoginForm />
                    </div>
                  ) : (
                    <>
                      <div
                        className={`w-full flex items-center justify-between -mb-5 px-8`}
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
                    </>
                  )}
                </div>
              }
            />
          )}
        </>
      )}
    </>
  );
}
