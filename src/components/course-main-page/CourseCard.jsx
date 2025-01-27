import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaPlayCircle, FaShareAlt } from "react-icons/fa";

const CourseCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="w-full bg-white mx-auto border rounded-lg shadow p-4 relative">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={"/assets/common/courseImage.jpg"} // Replace with your image source
          alt="Course"
          width={100}
          height={100}
          layout="responsive"
          className="w-full rounded-lg"
        />
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-t-lg">
          <button
            onClick={openModal}
            className="text-secondary hover:text-white"
          >
            <FaPlayCircle size={50} />{" "}
            {/* Replace with a custom icon if needed */}
          </button>
        </div>
      </div>
      <div className=" py-4 ">
        <h3 className="text-xl font-bold pb-2">
          The Complete Web Developer Course 2.0
        </h3>
        <div className="w-full flex justify-between items-center">
          <h3 className="text-green-500 text-2xl font-bold">₹1000</h3>
          <p className="text-gray-500">
            <span className="line-through">₹1999.00</span> <span>50% off</span>
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <button className="flex items-center text-red-500 border border-red-500 rounded-lg px-4 py-1">
            <FaHeart className="mr-2" />
            Add to Wishlist
          </button>
          <button className="flex items-center text-gray-500 border border-gray-500 rounded-lg px-4 py-1">
            <FaShareAlt className="mr-2" />
            Share
          </button>
        </div>
        <button className="bg-secondary hover:bg-black transition-custom text-white rounded-lg w-full py-2 mt-4">
          Enroll Now
        </button>
      </div>

      {isModalOpen && (
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
                src={"https://youtu.be/iuJDhFRDx9M?si=RHBQ6IqseBGzyYhL"}
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
    </div>
  );
};

export default CourseCard;
