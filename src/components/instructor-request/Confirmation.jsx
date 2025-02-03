"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import CommonButton from "../common/CommonButton";

const Confirmation = () => {
  const { processData } = useSelector((state) => state.tutors);
  return (
    <div className="w-full flex-col flex gap-5 items-center text-center">
      <h5 className="font-semibold lg:text-xl">Your application is in review, please wait for admin approval.</h5>
      <div className="w-full h-60 md:h-96 relative">
        <Image
          src={"/assets/common/confirmation.jpg"}
          alt="thank you"
          fill={true}
          className="object-cover md:object-contain object-center"
        />
      </div>
      <h2 className="text-xl lg:text-2xl font-bold">Hello {processData?.profile?.userName || "UserName"}</h2>
      <p>Thank you for submitting your application</p>
      <Link href={"/"}>
        <CommonButton label={"Back to Home"} variant="secondary" />
      </Link>
    </div>
  );
};

export default Confirmation;
