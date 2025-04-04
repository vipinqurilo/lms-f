"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { createOrderPayfast, createPaymentCourse } from "@/store/slices/paymentSlice";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { addToWishlistAsync } from "@/store/slices/student-dashboard/wishlistSlice";
import CourseByModal from "../course-main-page/CourseByModal";
import { SlBadge } from "react-icons/sl";

export default function FeaturedCard({ data, isFull = false }) {
  const { authUser } = useSelector((state) => state.user);
  const { enrolledCourses, isLoading } = useSelector((state) => state.courses);
  const { wishlist } = useSelector((state) => state.student.wishlist);

  if (!data || typeof data !== "object") {
    return <p>Invalid course data</p>;
  }

  const isEnrolled =
    enrolledCourses &&
    enrolledCourses.some((item) => item?.courseId === data?._id);
  const enrolledCourseData =
    enrolledCourses &&
    enrolledCourses.find((item) => item?.courseId === data?._id);

  const dispatch = useDispatch();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedMethod, setselectedMethod] = useState("payfast");
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isPaymentModal, setisPaymentModal] = useState(false);
  const [wishlistLoading, setwishlistLoading] = useState(null);

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
      if (selectedMethod === "payfast") {
        dispatch(createOrderPayfast(paymentData))
          .unwrap()
          .then((res) => {
            setCheckoutUrl(res?.url);
            setisPaymentModal(true);
          });
      } else {
        dispatch(createPaymentCourse(paymentData))
        .unwrap()
        .then((res) => {
          setCheckoutUrl(res?.url);
          setisPaymentModal(true);
        });
      }
    }
  };

  // const totalSeconds = data?.courseContent?.reduce((total, module) => {
  //   return (
  //     total +
  //     module.lessons.reduce((sum, lesson) => {
  //       return sum + parseInt(lesson?.duration);
  //     }, 0)
  //   );
  // }, 0);

  return (
    <>
      <div className="group">
        <div
          className={`${
            isFull ? "w-full min-h-96" : "w-96"
          } cursor-pointer group-hover:scale-105 bg-white transition-all duration-300 rounded-lg shadow-lg overflow-hidden relative p-2 lg:p-4`}
        >
          <div className="w-full flex flex-col">
            <div
              className={`relative overflow-hidden w-full h-60 
              ${
                isEnrolled && enrolledCourseData?.progress !== 100
                  ? "!rounded-b-none rounded-t-lg !h-[14.625rem]"
                  : "rounded-lg"
              }
              `}
            >
              <Image
                src={data?.courseImage || "/assets/common/courseImage.jpg"}
                alt="Course Image"
                layout="fill"
                objectFit="cover"
                className="transform transition-transform duration-300 group-hover:!scale-110"
              />
              {isEnrolled && (
                <span
                  className="absolute top-5 -right-2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs bg-black/50 w-10 h-6 rounded flex items-center justify-center"
                  style={{
                    display: enrolledCourseData?.progress === 100 ? "none" : "",
                  }}
                >
                  {enrolledCourseData?.progress}%
                </span>
              )}
            </div>
            {isEnrolled && (
              <div
                className="w-[100%] bg-blue-200 h-1.5 relative"
                style={{
                  display:
                    enrolledCourseData?.progress === 100 ? "none" : "block",
                }}
              >
                <div
                  className={`bg-blue-600 h-full transition-all duration-1000`}
                  style={{ width: `${enrolledCourseData?.progress}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex ">
                <div className="relative w-12 h-12 mr-3">
                  <Image
                    src={
                      data?.courseInstructor?.profilePhoto ||
                      "/assets/common/profile.png"
                    }
                    alt="Instructor"
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {data?.courseInstructor?.firstName ||
                    data?.courseInstructor?.lastName ? (
                      <>
                        {data?.courseInstructor?.firstName}{" "}
                        {data?.courseInstructor?.lastName}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    {data?.courseSubCategory?.name || "N/A"}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  setwishlistLoading(data?._id);
                  dispatch(addToWishlistAsync({ course: data?._id }))
                    .unwrap()
                    .finally(() => setwishlistLoading(null));
                }}
                className="text-red-500"
              >
                {wishlistLoading === data?._id ? (
                  <Loader />
                ) : wishlist?.some(
                    (item) => item?.course?._id === data?._id
                  ) ? (
                  <FaHeart className="text-xl text-red-500 hover:text-red-500" />
                ) : (
                  <FaRegHeart className="text-xl hover:text-red-500" />
                )}
              </button>
            </div>

            <Link
              href={`/courses/${data?._id}`}
              className="!mt-2 text-lg text-gray-700 group-hover:text-secondary"
            >
              {data?.courseTitle}
            </Link>
            <p className="!mt-2 text-sm text-gray-500 line-clamp-2">
              {data?.courseDescription}
            </p>

            <div className="flex items-center justify-between gap-4 mt-4">
              <span className="text-sm text-gray-600">
                📚{" "}
                {data?.courseContent?.reduce(
                  (acc, item) => acc + (item?.lessons?.length || 0),
                  0
                )}{" "}
                Lessons
              </span>
              <span className="text-sm text-gray-600">
                📎{" "}
                {data?.courseContent?.reduce(
                  (acc, module) =>
                    acc +
                    (module.lessons?.reduce(
                      (lessonAcc, lesson) =>
                        lessonAcc + (lesson.attachements?.length || 0),
                      0
                    ) || 0),
                  0
                )}{" "}
                Attachments
              </span>
            </div>

            <div className="flex items-center justify-between mt-2 border-t pt-2 border-gray-300">
              {/* {data?.totalReviews > 0 && ( */}
              <div className="flex items-center">
                {Array.from(
                  { length: Math.floor(data?.averageRating) },
                  (_, index) => "⭐"
                )}
                <span className="ml-1 text-sm text-gray-500">
                  <span>{Math.floor(data?.averageRating) || null}</span>
                  {data?.totalReviews > 0 && ` (${data?.totalReviews})`}
                </span>
              </div>
              {/* )} */}

              {isEnrolled ? (
                <Link
                  href={`/courses/${data?._id}`}
                  className="px-8 py-2 text-background bg-white group-hover:bg-back group-hover:bg-transparent rounded-full border-2 border-secondary hover:bg-secborder-secondary hover:!text-secondary"
                >
                  View Course
                </Link>
              ) : (
                <button
                  onClick={() => setisModalOpen(!isModalOpen)}
                  className="px-8 py-2 text-background bg-white group-hover:bg-back rounded-full border-2 border-secondary group-hover:bg-secondary group-hover:text-white"
                >
                  BUY NOW
                </button>
              )}
            </div>
          </div>

          {isEnrolled && enrolledCourseData?.progress === 100 && (
            <>
              <div
                className={`absolute top-6 right-6 w-16 h-16`}
                //   className={`absolute top-6 right-6 rounded-full flex items-center justify-center w-10 h-10 shadow-lg bg-blue-600 text-white
                //       ${
                //         enrolledCourseData?.progress === 100 &&
                //         "!bg-green-600 !border-2 !border-green-800"
                //       }
                // `}
              >
                {/* <span className="text-xs font-bold">
                  {enrolledCourseData?.progress}%
                </span> */}
                <Image
                  src={"/assets/common/badge.png"}
                  alt={"Badge"}
                  fill={true}
                  className="w-full h-full object-center object-contain"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <CourseByModal
        checkoutUrl={checkoutUrl}
        data={data}
        handlePayment={handlePayment}
        isModalOpen={isModalOpen}
        isPaymentModal={isPaymentModal}
        selectedMethod={selectedMethod}
        setisModalOpen={setisModalOpen}
        setisPaymentModal={setisPaymentModal}
        setselectedMethod={setselectedMethod}
      />
    </>
  );
}
