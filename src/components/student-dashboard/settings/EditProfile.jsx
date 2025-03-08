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
  updatePersonalInfoAsync,
  fetchProfileAsync,
} from "@/store/slices/student-dashboard/profileSlice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export function EditProfile({ isInstructorRequest = null }) {
  const { authUser } = useSelector(state => state.user);
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
  // console.log(profile,localProfile,'localProfile------>')


  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [idProof, setIdProof] = useState("");

  useEffect(() => {
    if (isInstructorRequest && processData) {
      if (Object.keys(processData).length > 0) {
        setLocalProfile({
          firstName: processData?.profile?.firstName || "",
          lastName: processData?.profile?.lastName || "",
          phoneNumber: processData?.profile?.phone?.number || "",
          countryCode: processData?.profile?.phone?.countryCode || "",
          gender: processData?.profile?.gender?.toLowerCase() || "",
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
        setLocalProfile({
          firstName: instructorProfile?.firstName || "",
          lastName: instructorProfile?.lastName || "",
          userName: instructorProfile?.userName || "",
          email: instructorProfile?.email || "",
          phoneNumber: instructorProfile?.phone?.number || "",
          countryCode: instructorProfile?.phone?.countryCode || "",
          gender: instructorProfile?.gender?.toLowerCase() || "",
          country: instructorProfile?.country || "",
          bio: instructorProfile?.bio || "",
        });
      }  
    } else {
      console.log(profile,'profile')
      if (profile) {
        setLocalProfile({
          firstName: profile?.firstName || "",
          lastName: profile?.lastName || "",
          userName: profile?.userName || "",
          email: profile?.email || "",
          phoneNumber: profile?.phone?.number || "",
          countryCode: profile?.phone?.countryCode || "",
          gender: profile?.gender || "",
          country: profile?.country || "",
          bio: profile?.bio || "",
        });
      }
    }
  }, [profileState, instructorProfile,path]);

  useEffect(() => {
    if (!isInstructorRequest && !path.startsWith("/instructor-request")) {
      dispatch(fetchProfileAsync());
    }
  }, [dispatch]);

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

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-6 ${isInstructorRequest ? "" : "lg:p-4 lg:px-8"}`}
    >
      {!isInstructorRequest && (
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
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
            value={localProfile.firstName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, firstName: e.target.value })
            }
            disabled={isInstructorRequest && authUser?.role === "admin"}
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
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
            value={localProfile.lastName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, lastName: e.target.value })
            }
            disabled={isInstructorRequest && authUser?.role === "admin"}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {!isInstructorRequest ? (
          <div className="space-y-2">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              id="userName"
              className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
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
              className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
              value={localProfile.gender}
              onChange={(e) =>
                setLocalProfile({ ...localProfile, gender: e.target.value })
              }
              disabled={isInstructorRequest && authUser?.role === "admin"}

            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
          <div className="flex">
            <PhoneInput
              country={"in"} // Default country (India)
              value={localProfile.phoneNumber} // Store only the phone number, not the country code
              onChange={(value, country) => {
                const phoneWithoutCountryCode = value
                  .replace(`+${country.dialCode}`, "")
                  .trim(); // Remove country code
                setLocalProfile({
                  ...localProfile,
                  countryCode: `+${country.dialCode}`, // Store only the country code separately
                  phoneNumber: phoneWithoutCountryCode, // Store only the number part
                });
              }}
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              inputStyle={{
                width: "100%",
                borderRadius: "6px",
                border: "1px solid #ccc",
                paddingLeft: "60px", // Space for country flag
              }}
              disabled={isInstructorRequest && authUser?.role === "admin"}
            />
          </div>
        </div>
      </div>

      {!isInstructorRequest && (
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
              className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
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
          {!isInstructorRequest && (
            <div className="space-y-2">
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <input
                id="country"
                className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
                value={localProfile.country}
                onChange={(e) =>
                  setLocalProfile({ ...localProfile, country: e.target.value })
                }
              />
            </div>
          )}
        </div>
      )}
      {isInstructorRequest && (
        <div className="space-y-2">
          <label
            htmlFor="designation"
            className="block text-sm font-medium text-gray-700"
          >
            Id Proof (Link of ID Proof)
          </label>
          <input
            id="designation"
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary      focus:ring focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
            value={idProof}
            onChange={(e) => setIdProof(e.target.value)}
            disabled={isInstructorRequest && authUser?.role === "admin"}

          />
        </div>
      )}

      {!isInstructorRequest && (
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <textarea
            id="bio"
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none resize-none"
            value={localProfile.bio}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, bio: e.target.value })
            }
            rows={4}
          />
        </div>
      )}

      {isInstructorRequest ? (
        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Cancel"}
            onCancel={handleReset}
            handleClick={() => handleNext()}
            saveText={authUser?.role === "admin" ? "Next" : "Save and Continue"}
          />
        </div>
      ) : (
        <>
          <button
            type="submit"
            className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-secondary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
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
