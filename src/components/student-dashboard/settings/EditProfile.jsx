"use client";

import SubmitButtonsComp from "@/components/instructor/addcourse/SubmitButtonsComp";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export function EditProfile() {
  const { processData } = useSelector((state) => state.tutors);

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
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [gender, setGender] = useState("");
  const [idProof, setIdProof] = useState("");

  console.log(processData);
  

  useEffect(() => {
    if (path === "/instructor-request" && processData) {
      if (Object.keys(processData).length > 0) {
        setProfile({
          firstName: processData?.profile?.firstName || "",
          lastName: processData?.profile?.lastName || "",
          phoneNumber: processData?.profile?.phone?.number || "",
          bio: "",
          designation: "",
          userName: "",
        });
        setGender(processData?.profile?.gender || "");
        setIdProof(processData?.profile?.idProof || "");
      }
    }
  }, [processData, path]);

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
      ([key, value]) =>
        (key === "bio" && key === "userName" && key === "designation") ||
        value.trim() !== ""
    );

    if ((allFieldsFilled && gender !== "", idProof !== "")) {
      const data = {
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        gender,
        phone: {
          countryCode: "+91",
          number: profile?.phoneNumber,
        },
        idProof,
      };
      dispatch(updateProcessData({ field: "profile", data }));
      dispatch(updateProcessStep(2));
    } else {
      toast.error("Please fill all the details.");
    }
  };

  const handlePhoneNumberChange = (e) => {
    const inputValue = e.target.value;

    // Basic validation: Check if it's a number and has a valid length
    const isValidPhoneNumber = /^\d{0,10}$/.test(inputValue); // Allows up to 10 digits

    if (isValidPhoneNumber) {
      setProfile({ ...profile, phoneNumber: inputValue });
      setPhoneNumberError(""); // Clear any previous error
    } else {
      setPhoneNumberError("Please enter a valid 10-digit phone number.");
    }
  };

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
        {path !== "/instructor-request" ? (
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
        ) : (
          <div className="w-full flex flex-col gap-2">
            <label className="text-light text-sm">Gender</label>
            <div className="flex gap-8">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={(e) => setGender(e.target.value)}
                  className="cursor-pointer accent-primary scale-150"
                />
                Male
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={(e) => setGender(e.target.value)}
                  className="cursor-pointer scale-150 accent-primary"
                />
                Female
              </label>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number{" "}
            {phoneNumberError && (
              <span className="text-red-500 text-xs">{phoneNumberError}</span>
            )}
          </label>
          <input
            id="phoneNumber"
            type="text"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={profile.phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>

      {path !== "/instructor-request" ? (
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
      ) : (
        <div className="space-y-2">
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700"
          >
            Id Proof (Link of ID Proof)
          </label>
          <input
            id="designation"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary      focus:ring focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={idProof}
            onChange={(e) => setIdProof(e.target.value)}
          />
        </div>
      )}

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
