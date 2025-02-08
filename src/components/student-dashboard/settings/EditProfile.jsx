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
import {
  fetchProfileAsync,
  updatePersonalInfoAsync,
} from "@/store/slices/student-dashboard/profileSlice";

export function EditProfile() {
  const { processData } = useSelector((state) => state.tutors);
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.student?.profile);
  const { profile: instructorProfile } = useSelector(
    (state) => state.instructor.setting
  );

  const profile = profileState?.profile;
  const isLoading = profileState?.isLoading;
  const error = profileState?.error;

  const path = usePathname();

  const [localProfile, setLocalProfile] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    countryCode: "",
    gender: "",
    country: "",
    bio: "",
  });

  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [idProof, setIdProof] = useState("");

  useEffect(() => {
    if (path === "/instructor-request" && processData) {
      if (Object.keys(processData).length > 0) {
        setLocalProfile({
          firstName: processData?.profile?.firstName || "",
          lastName: processData?.profile?.lastName || "",
          phoneNumber: processData?.profile?.phone?.number || "",
          countryCode: processData?.profile?.phone?.country || "",
          gender: processData?.profile?.gender,
          bio: "",
          designation: "",
          userName: "",
        });
        setIdProof(processData?.profile?.idProof || "");
      }
    }
  }, [processData, path]);

  useEffect(() => {
    if (path === "/instructor-dashboard/settings") {
      if (instructorProfile) {
        console.log("instructorProfile from line 67", instructorProfile);
        
        setLocalProfile({
          firstName: instructorProfile?.firstName || "",
          lastName: instructorProfile?.lastName || "",
          userName: instructorProfile?.userName || "",
          email: instructorProfile?.email || "",
          phoneNumber: instructorProfile?.phone?.number || "",
          countryCode: instructorProfile?.phone?.countryCode || "",
          gender: instructorProfile?.gender || "",
          country: instructorProfile?.country || "",
          bio: instructorProfile?.bio || "",
        });
      }
    } else {
      if (profile) {
        setLocalProfile({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          userName: profile.userName || "",
          email: profile.email || "",
          phoneNumber: profile.phone?.number || "",
          countryCode: profile.phone?.countryCode || "",
          gender: profile.gender || "",
          country: profile.country || "",
          bio: profile.bio || "",
        });
      }
    }
  }, [profile, instructorProfile]);

  const handleReset = () => {
    setLocalProfile({
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
    const updatedProfile = {
      firstName: localProfile.firstName,
      lastName: localProfile.lastName,
      userName: localProfile.userName,
      phone: {
        countryCode: localProfile.countryCode,
        number: localProfile.phoneNumber,
      },
      gender: localProfile.gender,
      country: localProfile.country,
      bio: localProfile.bio,
    };
    dispatch(updatePersonalInfoAsync(updatedProfile));
  };

  const handleNext = () => {
    const requiredFields = [
      localProfile.firstName,
      localProfile.lastName,
      localProfile.gender,
      localProfile.countryCode,
      localProfile.phoneNumber,
      idProof,
    ];

    if (requiredFields.every((field) => field && field.trim() !== "")) {
      const data = {
        firstName: localProfile.firstName,
        lastName: localProfile.lastName,
        gender: localProfile?.gender,
        phone: {
          countryCode: localProfile.countryCode,
          number: localProfile.phoneNumber,
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
    const isValidPhoneNumber = /^\d{0,10}$/.test(inputValue);

    if (isValidPhoneNumber) {
      setLocalProfile({ ...localProfile, phoneNumber: inputValue });
      setPhoneNumberError("");
    } else {
      setPhoneNumberError("Please enter a valid 10-digit phone number.");
    }
  };

  if (!profileState) {
    return <div>Loading...</div>;
  }

  if (isLoading?.fetchProfileAsync) {
    return <div>Loading profile...</div>;
  }

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
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={localProfile.firstName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, firstName: e.target.value })
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
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={localProfile.lastName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, lastName: e.target.value })
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
              value={localProfile.userName}
              onChange={(e) =>
                setLocalProfile({ ...localProfile, userName: e.target.value })
              }
            />
          </div>
        ) : (
          <div className="space-y-2">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
              value={localProfile.gender}
              onChange={(e) =>
                setLocalProfile({ ...localProfile, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}

        <div className="">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number{" "}
            {phoneNumberError && (
              <span className="text-red-500 text-xs">{phoneNumberError}</span>
            )}
          </label>
          <div className="flex">
            <input
              id="countryCode"
              className={`mt-1 block px-4 py-2 w-1/4 rounded-l-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none ${
                error?.updatePersonalInfoAsync ? "border-red-500" : ""
              }`}
              value={localProfile.countryCode}
              onChange={(e) =>
                setLocalProfile({
                  ...localProfile,
                  countryCode: e.target.value,
                })
              }
            />
            <input
              id="phoneNumber"
              className="mt-1 block px-4 py-2 w-3/4 rounded-r-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
              value={localProfile.phoneNumber}
              onChange={(e) =>
                setLocalProfile({
                  ...localProfile,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>

      {path !== "/instructor-request" && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              id="gender"
              className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
              value={localProfile.gender}
              onChange={(e) =>
                setLocalProfile({ ...localProfile, gender: e.target.value })
              }
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          {path !== "/instructor-request" && (
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
                value={localProfile.country}
                onChange={(e) =>
                  setLocalProfile({ ...localProfile, country: e.target.value })
                }
              />
            </div>
          )}
        </div>
      )}
      {path === "/instructor-request" && (
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
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={localProfile.bio}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, bio: e.target.value })
            }
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
        <>
          <button
            type="submit"
            className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Update Profile
          </button>
          {error?.updatePersonalInfoAsync && (
            <div className="text-red-500 mt-4">
              Error: {error?.updatePersonalInfoAsync}
            </div>
          )}
        </>
      )}
    </form>
  );
}
