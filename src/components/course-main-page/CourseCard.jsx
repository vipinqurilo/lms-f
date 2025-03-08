"use client";

import { wishlistAsync } from "@/store/slices/coursesSlice";
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
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../common/Loader";
import { createPaymentCourse } from "@/store/slices/paymentSlice";
import CourseByModal from "./CourseByModal";

const CourseCard = ({ data, enrollNowRef, isEnrolled }) => {
  const [isVideoModalOpen, setisVideoModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { isLoading } = useSelector((state) => state.courses);
  const { wishlist } = useSelector((state) => state.student.wishlist);
  const dispatch = useDispatch();

  const openModal = () => setisVideoModalOpen(true);
  const closeModal = () => setisVideoModalOpen(false);
  const toggleIsShareModalOpen = () => setIsShareModalOpen(!isShareModalOpen);

  const courseLink = `https://yourwebsite.com/course/${data?._id}`;

  const handleAddToWishList = () => {
    dispatch(wishlistAsync({ course: data?._id }));
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(courseLink);
    alert("Course link copied!");
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
            {data?.coursePrice || "--"}
          </h3>
          <p className="text-gray-500">
            <span className="line-through">₹1999.00</span> <span>50% off</span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleAddToWishList}
            className={`flex items-center text-red-500 hover:text-white hover:bg-red-500 transition-custom border border-red-500 rounded-lg px-4 py-1 ${
              wishlist?.some((item) => item?._id === data?._id) &&
              "!bg-red-500 !text-white hover:!bg-white hover:!text-red-500"
            }`}
          >
            {isLoading["wishlistAsync"] ? (
              <Loader color={"text-secondary"} />
            ) : (
              <FaHeart className="" />
            )}
          </button>
          <button
            onClick={toggleIsShareModalOpen}
            className="flex items-center text-green-500 hover:bg-green-500 hover:text-white border border-green-500 transition-custom rounded-lg px-4 py-1"
          >
            <FaShareAlt className="mr-2" />
            Share
          </button>
        </div>
        {!isEnrolled ? (
          <button
            ref={enrollNowRef}
            onClick={() => setisModalOpen(!isModalOpen)}
            className="bg-secondary hover:bg-black transition-custom text-white rounded-full w-full py-2 mt-4"
          >
            Enroll Now
          </button>
        ) : (
          <button className="bg-green-500 hover:bg-green-800 transition-custom text-white rounded-full w-full py-2 mt-4">
            Generate Certificate
          </button>
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
    </div>
  );
};

export default CourseCard;
