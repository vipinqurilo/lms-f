"use client";

import {
  fetchProfileAsync,
  updatePersonalInfoAsync,
} from "@/store/slices/student-dashboard/ProfileSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function EditProfile() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.student?.profile);
  const profile = profileState?.profile;
  const isLoading = profileState?.isLoading;
  const error = profileState?.error;
  console.log(profileState, "profileState");
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

  // Sync local state with profile data from Redux store
  useEffect(() => {
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
  }, [profile]);

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

  if (!profileState) {
    return <div>Loading...</div>;
  }

  if (isLoading?.fetchProfileAsync) {
    return <div>Loading profile...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 px-8">
      <div className="flex flex-col">
        <div className="text-lg font-semibold">Personal Details</div>
        <div className="text-gray-800">Edit your personal information</div>
      </div>
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
        <div className="space-y-2">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700"
          >
            User Name
          </label>
          <input
            id="userName"
            className="mt-1 block px-4 py-2 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
            value={localProfile.userName}
            onChange={(e) =>
              setLocalProfile({ ...localProfile, userName: e.target.value })
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

      <div className="grid md:grid-cols-2 gap-6">
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
      </div>

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
    </form>
  );
}
