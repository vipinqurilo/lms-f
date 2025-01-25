import React from "react";
import Heading from "./Heading";
import { RatingStars } from "./RatingStars";
import Image from "next/image";

const AboutInstructor = ({ data }) => {
  return (
    <div className="course-sub-container">
      <Heading data="About Instructor" />
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 relative">
            <Image
              src={data?.profileImage}
              alt={data?.name}
              fill={true}
              className="object-cover rounded-full border-4 border-black/10"
            />
          </div>
          <div className="">
            <p className="text-lg font-semibold">{data?.name}</p>
            <p className="font-medium">{data?.role}</p>
          </div>
        </div>
        <div className="flex items-center font-semibold gap-1">
          <RatingStars rating={data?.rating} /> Instructor Rating
        </div>
      </div>
      <div className="">
        <p>
          <span className="font-semibold text-lg">Skills: </span>
          {data?.skills?.map((skill, i) => (
            <span key={i}>{skill}, </span>
          ))}{" "}
        </p>
      </div>
      <div className="text-lg font-medium">
        <p className="pb-2">Available for :</p>
        {data?.availableFor?.map((skill, i) => (
          <p key={i} className="text-base font-normal">{i+1}. {skill}</p>
        ))}
      </div>
    </div>
  );
};

export default AboutInstructor;
