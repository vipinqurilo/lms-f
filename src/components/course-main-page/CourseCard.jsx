"use client";

import {
  generateCertificate,
  getAllEnrolledCourses,
} from "@/store/slices/coursesSlice";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaHeart,
  FaPlayCircle,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaCopy,
  FaRegHeart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { createPaymentCourse, createPayfastCourseCheckout, clearPayfastCheckoutData } from "@/store/slices/paymentSlice";
import CourseByModal from "./CourseByModal";
import { addToWishlistAsync } from "@/store/slices/student-dashboard/wishlistSlice";
import { CoursePaymentModal } from "../../components/courses/CoursePaymentModal";
import PayfastCheckout from "../../components/payment/PayfastCheckout";

const CourseCard = ({ data, enrollNowRef, isEnrolled, enrolledCourseData }) => {
  const [isVideoModalOpen, setisVideoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  // const [isCertificateDownload, setisCertificateDownload] = useState(false);
  const { isLoading } = useSelector((state) => state.courses);
  const { wishlist, isLoading: wishlistLoading } = useSelector(
    (state) => state.student.wishlist
  );
  const payment = useSelector((state) => state.payment);
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const openModal = () => setisVideoModalOpen(true);
  const closeModal = () => setisVideoModalOpen(false);
  const toggleIsShareModalOpen = () => setIsShareModalOpen(!isShareModalOpen);
  // const toggleisCertificateDowmnload = () =>
  //   setisCertificateDownload(!isCertificateDownload);

  const courseLink = `https://yourwebsite.com/course/${data?._id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(courseLink);
    alert("Course link copied!");
  };

  const [isModalOpen, setisModalOpen] = useState(false);
  const [selectedMethod, setselectedMethod] = useState("payfast");
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [isPaymentModal, setisPaymentModal] = useState(false);

  const handlePayment = () => {
    if (!selectedMethod) {
      alert("Please select a payment method");
      return;
    }

    if (authUser?.role !== "teacher" && data) {
      // Handle PayFast payment
      if (selectedMethod === "payfast") {
        const paymentData = {
          courseId: data?._id,
          userId: authUser?._id,
          amount: data?.coursePrice,
          courseTitle: data?.courseTitle,
          email: authUser?.email,
          name: `${authUser?.firstName} ${authUser?.lastName}`,
          returnUrl: `${window.location.origin}/courses/payment-success`,
          cancelUrl: `${window.location.origin}/courses/payment-failed`,
          notifyUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"}/api/payment/payfast/notify`
        };
        
        dispatch(createPayfastCourseCheckout(paymentData));
      } 
      // Handle Stripe payment
      else if (selectedMethod === "stripe") {
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
      // Handle other payment methods as needed
    }
  };

  const handlegenerateCertificate = () => {
    dispatch(generateCertificate(data?._id))
      .unwrap()
      .then(() => {
        dispatch(getAllEnrolledCourses());
      });
  };

  return (
    <div className="w-full bg-white mx-auto border rounded-xl shadow p-4 relative">
      <div className="relative w-full h-60 rounded-lg overflow-hidden">
        <Image
          src={data?.courseImage || "/assets/common/courseImage.jpg"} // Replace with your image source
          alt="Course"
          // width={100}
          // height={100}
          layout="fill"
          className="w-full rounded-lg object-cover"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-t-lg">
          <button
            onClick={openModal}
            className="text-secondary hover:text-white"
          >
            <FaPlayCircle size={50} />{" "}
          </button>
        </div>
      </div>
      <div className=" py-4 ">
        <h3 className="text-xl font-bold pb-2">
          {data?.courseTitle || "Course Title"}
        </h3>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-green-500 text-2xl font-bold">
            {data?.coursePrice || "--"} ZAR
          </h3>
          {/* <p className="text-gray-500">
            <span className="line-through">₹1999.00</span> <span>50% off</span>
          </p> */}
          <div className="flex gap-5">
            <button
              onClick={() =>
                dispatch(addToWishlistAsync({ course: data?._id }))
              }
              className={`text-red-500`}
            >
              {wishlistLoading["addToWishlistAsync"] ? (
                <Loader />
              ) : wishlist?.some((item) => item?.course?._id === data?._id) ? (
                <FaHeart className="text-xl" />
              ) : (
                <FaRegHeart className="text-xl" />
              )}
            </button>
            <button
              onClick={toggleIsShareModalOpen}
              className="flex items-center text-green-500 hover:text-green-700  transition-custom"
            >
              <FaShareAlt className="text-xl" />
            </button>
          </div>
        </div>
        {isLoading["generateCertificate"] && (
          <div className="relative w-full h-2 mt-4">
            <span className="block h-1 bg-green-500 rounded-full progress-bar"></span>
          </div>
        )}

        {!isEnrolled ? (
          <button
            ref={enrollNowRef}
            onClick={() => setisModalOpen(!isModalOpen)}
            className="bg-secondary hover:bg-black transition-custom text-white rounded-full w-full py-2 mt-4"
          >
            Enroll Now
          </button>
        ) : (
          <>
            {enrolledCourseData?.certificate &&
            enrolledCourseData?.certificate?.certificateUrl ? (
              <a
                href={enrolledCourseData?.certificate?.certificateUrl}
                download={enrolledCourseData?.certificate?.studentName}
              >
                <p
                  className={`bg-green-500 hover:bg-green-800 transition-custom text-white rounded-full w-full py-2 disabled:cursor-not-allowed disabled:opacity-60 mt-4 text-center`}
                >
                  Download
                </p>
              </a>
            ) : (
              <button
                disabled={
                  (!enrolledCourseData?.isCompleted &&
                    enrolledCourseData?.progress !== 100) ||
                  isLoading["generateCertificate"]
                }
                className="bg-green-500 hover:bg-green-800 transition-custom text-white rounded-full w-full py-2 disabled:cursor-not-allowed disabled:opacity-60 mt-4"
                onClick={handlegenerateCertificate}
              >
                {/* {isLoading["generateCertificate"] ? (
                  <Loader />
                ) : ( */}
                Generate Certificate
                {/* )} */}
              </button>
            )}
          </>
        )}
      </div>

      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-[90%] max-w-2xl bg-black p-4 rounded-lg">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-lg"
            >
              ✕
            </button>

            {/* YouTube Video */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="660"
                height="415"
                src={
                  data?.courseVideo ||
                  "https://youtu.be/iuJDhFRDx9M?si=RHBQ6IqseBGzyYhL"
                }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-[90%] max-w-md bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={toggleIsShareModalOpen}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-center mb-4">
              Share This Course
            </h3>
            <div className="flex justify-center space-x-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${courseLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-blue-600 text-3xl hover:scale-110 transition" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${courseLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-blue-400 text-3xl hover:scale-110 transition" />
              </a>
              <a
                href={`https://wa.me/?text=${courseLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="text-green-500 text-3xl hover:scale-110 transition" />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${courseLink}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-700 text-3xl hover:scale-110 transition" />
              </a>
              <button
                onClick={handleCopyLink}
                className="text-gray-700 text-3xl hover:scale-110 transition"
              >
                <FaCopy />
              </button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Click on an icon to share the course
            </p>
          </div>
        </div>
      )}

      {/* {isCertificateDownload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-[90%] max-w-md bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={toggleisCertificateDowmnload}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold text-center mb-4">
              View Certificate
            </h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="660"
                height="415"
                src={enrolledCourseData?.certificate?.certificateUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )} */}

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

      {/* Course Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-[90%] max-w-2xl bg-white rounded-lg shadow-lg">
            <button
              onClick={() => setisModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              ✕
            </button>
            
            <CoursePaymentModal
              selected={selectedMethod}
              onSelect={setselectedMethod}
              course={data}
              applyCoupon={() => console.log('Apply coupon')}
              handlePayment={handlePayment}
            />
          </div>
        </div>
      )}

      {/* Stripe Checkout Modal */}
      {isPaymentModal && checkoutUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <button
              onClick={() => setisPaymentModal(false)}
              className="absolute top-2 right-2 text-gray-600 text-lg"
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4">Complete Your Payment</h3>
            <p className="mb-4">You are being redirected to our secure payment gateway.</p>
            <div className="flex justify-center">
              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
              >
                Go to Payment
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* PayFast Checkout Modal */}
      {payment?.payfastCheckoutData && (
        <PayfastCheckout 
          paymentData={payment.payfastCheckoutData?.data?.paymentData}
          paymentUrl={payment.payfastCheckoutData?.data?.paymentUrl}
          fullPaymentUrl={payment.payfastCheckoutData?.data?.fullPaymentUrl}
        />
      )}
    </div>
  );
};

export default CourseCard;
