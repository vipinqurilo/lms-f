import Image from "next/image";
import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { SlLocationPin } from "react-icons/sl";
import { useRouter } from "next/router";
import Rating from "./Rating";
import { setTutorId, setUserID } from "@/store/slices/tutorsSlice";
import { useDispatch } from "react-redux";

const TutorDetails = ({ tutor }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col py-6 w-full">
      {/* Profile Info */}
      <div className="flex justify-between items-center">
        <h2
          onClick={() => {
            dispatch(setTutorId(tutor._id));
            dispatch(setUserID(tutor.user._id));
            router.push(
              `/tutors/${tutor.user?.firstName?.toLowerCase()}-${tutor.user?.lastName?.toLowerCase()}`
            );
          }}
          data-tip={"Tip Here"}
          data-for={"mytip"}
          className="text-xl font-bold cursor-pointer"
        >
          {tutor.user.firstName} {tutor.user.lastName}
        </h2>
      </div>
      <div className="flex mt-4 flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-500">
          <SlLocationPin className="mr-1" />
          {tutor.user.country || "Unknown Location"}
        </div>
        {tutor.rating && (
          <Rating rating={tutor.rating} reviews={tutor.reviews} />
        )}
        {/* Learners and Sessions */}
        <div className="text-sm text-gray-500">
          <span className="font-bold">{tutor.learners || 0}</span> Learners ·{" "}
          <span className="font-bold">{tutor.sessions || 0}</span> Sessions
        </div>
      </div>

      {/* Subjects */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">Teaches</h3>
        <div className="text-gray-600 text-sm">
          {tutor?.subjectsTaught?.map((subject) => subject.name).join(", ") ||
            "N/A"}
        </div>
      </div>

      {/* Languages */}
      <div className="mt-2">
        <h3 className="font-semibold text-gray-700">Speaks</h3>
        <div className="text-gray-600 text-sm">
          {tutor?.languagesSpoken
            ?.map((language) => language.name)
            .join(", ") || "N/A"}
        </div>
      </div>

      {/* About */}
      <div className="mt-4">
        <h3 className="font-semibold text-gray-700">About</h3>
        <div className="text-gray-600 text-sm line-clamp-2">
          {tutor.user.bio || "No information available."}
        </div>
        <button
          onClick={() => {
            dispatch(setTutorId(tutor._id));
            dispatch(setUserID(tutor.user._id));
            router.push(
              `/tutors/${tutor.user?.firstName?.toLowerCase()}-${tutor.user?.lastName?.toLowerCase()}`
            );
          }}
          className="text-orange-500 text-sm underline mt-1 inline-block"
        >
          View profile
        </button>
      </div>
    </div>
  );
};

export default TutorDetails;
