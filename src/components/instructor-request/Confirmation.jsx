"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../common/CommonButton";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import { useRouter } from "next/navigation";

const Confirmation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { processData, requestStatus, processStep } = useSelector(
    (state) => state.tutors
  );
  const isRejected = requestStatus === "rejected";
  const isApproved = requestStatus === "approved";
  const { authUser } = useSelector((state) => state.user);

  const handleBack = () => {
    dispatch(updateProcessStep(processStep - 1));
  };

  const handleApprovedAction = () => {
    dispatch(updateProcessStep(1));
    dispatch(updateProcessData({}));
    router.push("/instructor-dashboard");
  };

  const handlePendingAction = () => {
    dispatch(updateProcessStep(1));
    dispatch(updateProcessData({}));
    router.push("/");
  };

  const getMessage = () => {
    if (isRejected) {
      return {
        title: "Your application has been rejected by Admin.",
        description:
          processData?.reason ||
          "The teacher's request has been rejected by the admin due to incomplete documentation and failure to meet the eligibility criteria required for approval.",
        imageSrc: "/assets/common/rejected.png",
        imageAlt: "Rejected",
        buttonLabel: "Go Back",
        buttonAction: handleBack,
        textColor: "text-red-600",
      };
    }

    if (isApproved) {
      return {
        title: "Your application has been Approved.",
        description: "Thank you for submitting your application",
        imageSrc: "/assets/common/confirmation.png",
        imageAlt: "Approved",
        buttonLabel: "Go To Dashboard",
        buttonAction: handleApprovedAction,
        textColor: "text-green-600",
      };
    }

    return {
      title: "Your application is in review, please wait for admin approval.",
      description: "",
      imageSrc: "/assets/common/confirmation.png",
      imageAlt: "Pending",
      buttonLabel: "Back to Home",
      buttonAction: handlePendingAction,
      textColor: "text-gray-600",
    };
  };

  const {
    title,
    description,
    imageSrc,
    imageAlt,
    buttonLabel,
    buttonAction,
    textColor,
  } = getMessage();

  return (
    <div className="w-full flex-col flex gap-5 items-center text-center">
      <h5 className={`font-semibold lg:text-xl ${textColor}`}>{title}</h5>
      <div className="w-full h-60 md:h-96 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill={true}
          className="object-cover md:object-contain object-center"
        />
      </div>
      {description && <p className={`max-w-2xl ${textColor}`}>{description}</p>}
      {isRejected ? (
        <CommonButton label={buttonLabel} onClick={buttonAction} />
      ) : (
        <>
          {authUser?.role === "admin" ? (
            <CommonButton
              label={"Review Request"}
              onClick={() => dispatch(updateProcessStep(processStep - 1))}
            />
          ) : (
            <Link href={"/"}>
              <CommonButton label={buttonLabel} variant="secondary" />
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default Confirmation;
