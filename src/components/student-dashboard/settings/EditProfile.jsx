"use client";

import SubmitButtonsComp from "@/components/instructor/addcourse/SubmitButtonsComp";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export function EditProfile() {
  const path = usePathname();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    phoneNumber: "",
    designation: "",
    bio: "",
  });

  const handleReset = () => {
    setProfile({
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      designation: "",
      bio: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleNext = () => {
    const allFieldsFilled = Object.entries(profile).every(
      ([key, value]) => key === "bio" || value.trim() !== ""
    );
    console.log("allFieldsFilled", allFieldsFilled);

    if (allFieldsFilled) {
      console.log("profile", profile);
      dispatch(updateProcessData({ field: "profile", data: profile }));
      dispatch(updateProcessStep(2));
      console.log("Submitted!!");
    } else {
      toast.error("Please fill all the details.");
    }
  };

  console.log(path);

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${
        path === "/instructor-request" ? "" : "lg:p-4 lg:px-8"
      }`}
    >
      {path !== "/instructor-request" && (
        <div className=" flex flex-col">
          <div className="text-lg font-semibold  ">Personal Details</div>
          <div className="text-gray-800">Edit your personal information</div>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            id="firstName"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={profile.firstName}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            id="lastName"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={profile.lastName}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            id="userName"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={profile.userName}
            onChange={(e) =>
              setProfile({ ...profile, userName: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={profile.phoneNumber}
            onChange={(e) =>
              setProfile({ ...profile, phoneNumber: e.target.value })
            }
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="designation"
          className="block text-sm font-medium text-gray-700"
        >
          Designation
        </label>
        <input
          id="designation"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary      focus:ring focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          value={profile.designation}
          onChange={(e) =>
            setProfile({ ...profile, designation: e.target.value })
          }
        />
      </div>

      {path !== "/instructor-request" && (
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary      focus:ring focus:ring-primary ring-[1px] ring-gray-200 outline-none resize-none"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
          />
        </div>
      )}

      {path === "/instructor-request" ? (
        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Cancel"}
            onCancel={handleReset}
            handleClick={() => handleNext()}
            saveText={"Save and Continue"}
          />
        </div>
      ) : (
        <button
          type="submit"
          className=" w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Update Profile
        </button>
      )}
    </form>
  );
}
