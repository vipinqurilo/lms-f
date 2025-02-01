"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";

export default function IndentityForm() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const [profilePreview, setProfilePreview] = useState(null);

  // Watch profile picture for preview
  const profilePicture = watch("profilePicture");

  // File validation
  const onFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/bmp",
      ];

      if (!allowedTypes.includes(file.type)) {
        setError("profilePicture", {
          type: "manual",
          message: "Invalid file type. Allowed: png, jpg, jpeg, gif, bmp.",
        });
        return;
      } else if (file.size > 2 * 1024 * 1024) {
        setError("profilePicture", {
          type: "manual",
          message: "File size exceeds 2MB.",
        });
        return;
      }

      clearErrors("profilePicture");
      setProfilePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleNext = (data) => {
    console.log("Form Data:", data);
    dispatch(updateProcessStep(3));
    dispatch(updateProcessData({ field: "indentity", data }));
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">
          Add profile photo, video, and biography
        </h1>
        <p className="text-gray-600">
          Support your professional profile with a latest profile picture, a
          self-introduction video, and a short biography.
        </p>
      </div>

      <form className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture*
          </label>
          <div className="flex items-start space-x-4 mt-2">
            <div className="w-24 h-auto lg:h-24 rounded-lg bg-gray-200 flex items-center justify-center">
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="Profile preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.gif,.bmp"
                {...register("profilePicture")}
                onChange={onFileChange}
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2"
              />
              <p className="text-xs text-gray-500">
                Max size 2MB. Allowed formats: png, jpg, jpeg, gif, bmp.
              </p>
              {errors.profilePicture && (
                <p className="text-sm text-red-500">
                  {errors.profilePicture.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* YouTube Video Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Introduction Video (YouTube link)
          </label>
          <input
            type="url"
            placeholder="Enter a valid YouTube video link"
            {...register("youtubeLink")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-primary focus:outline-none"
          />
        </div>

        {/* Biography */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biography
          </label>
          <textarea
            placeholder="Write a short biography about yourself..."
            {...register("biography")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-primary focus:outline-none resize-none min-h-[100px]"
          />
        </div>

        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Cancel"}
            onCancel={() => dispatch(updateProcessStep(1))}
            handleClick={handleSubmit((data) => handleNext(data))}
            saveText={"Save and Continue"}
          />
        </div>
      </form>
    </div>
  );
}
