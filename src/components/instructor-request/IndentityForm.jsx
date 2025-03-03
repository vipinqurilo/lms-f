"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";
import { uploadImage } from "@/store/slices/uploadSlice";
import toast from "react-hot-toast";
import Image from "next/image";

export default function IndentityForm({ isInstructorRequest = null }) {
  const { authUser } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const { processData } = useSelector((state) => state.tutors);
  const loading = useSelector((state) => state.upload.isLoading.uploadImage);

  const [profilePreview, setProfilePreview] = useState(null);

  useEffect(() => {
    if (processData) {
      if (Object.keys(processData).length > 0) {
        reset({
          introVideo: processData?.indentity?.introVideo,
          bio: processData?.indentity?.bio,
        });
        setProfilePreview(processData?.indentity?.profile);
      }
    }
  }, [processData]);

  const handleNext = (data) => {
    // if (profilePreview) {
    const formData = {
      ...data,
      profile: profilePreview,
    };
    dispatch(updateProcessStep(3));
    dispatch(updateProcessData({ field: "indentity", data: formData }));
    // } else {
    //   toast.error("Profile Photos is required");
    // }
  };

  const handleImageValidation = (e) => {
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("courseImage", imageFile);

    if (imageFile) {
      if (imageFile.size > 2 * 1024 * 1024) {
        toast.error("File size must be less than 2MB");
        return;
      }
      dispatch(uploadImage(formData))
        .unwrap()
        .then((res) => {
          if (res?.data) {
            if (profilePreview) {
              URL.revokeObjectURL(profilePreview);
            }
            setProfilePreview(res.data);
          } else {
            toast.error("Invalid image response", res);
          }
        })
        .catch((error) => {
          toast.error("Image upload failed:", error);
        });
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <div className="space-y-2">
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
            <div className="w-24 h-24 lg:h-24 rounded-lg bg-gray-200 flex items-center justify-center">
              {loading ? (
                <span className="text-gray-500 text-sm">Uploading...</span>
              ) : profilePreview ? (
                <Image
                  src={profilePreview}
                  alt="Profile preview"
                  fill={true}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </div>

            <div className="space-y-2">
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif, image/bmp"
                onChange={(e) => handleImageValidation(e)}
                disabled={
                  loading || (isInstructorRequest && authUser?.role === "admin")
                }
                className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 disabled:cursor-not-allowed disabled:opacity-60"
              />
              <p className="text-xs text-gray-500">
                Max size 2MB. Allowed formats: png, jpg, jpeg, gif, bmp.
              </p>
            </div>
          </div>
        </div>

        {/* YouTube Video Link */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Introduction Video (YouTube link) (optional)
          </label>
          <input
            type="url"
            placeholder="Enter a valid YouTube video link"
            {...register("introVideo")}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-secondary focus:outline-none"
            disabled={isInstructorRequest && authUser?.role === "admin"}
          />
          {errors?.introVideo && (
            <p className="text-xs text-red-500">*{errors.introVideo.message}</p>
          )}
        </div>

        {/* Biography */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Biography
          </label>
          <textarea
            placeholder="Write a short biography about yourself..."
            {...register("bio", { required: "Bio is required" })}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-secondary focus:outline-none resize-none min-h-[100px]"
            disabled={isInstructorRequest && authUser?.role === "admin"}
          />
          {errors?.bio && (
            <p className="text-xs text-red-500">*{errors.bio.message}</p>
          )}
        </div>

        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Cancel"}
            onCancel={() => dispatch(updateProcessStep(1))}
            handleClick={handleSubmit((data) => handleNext(data))}
            saveText={authUser?.role === "admin" ? "Next" : "Save and Continue"}
          />
        </div>
      </form>
    </div>
  );
}
