"use client";

import React, { useEffect, useState } from "react";
import SubmitButtonsComp from "./SubmitButtonsComp";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCourseAddDataState,
  updateStep,
} from "@/store/slices/instructor/courseSlice";
import toast from "react-hot-toast";
import { uploadImage, uploadVideo } from "@/store/slices/uploadSlice";

const CourseMedia = () => {
  const dispatch = useDispatch();
  const { courseAddData } = useSelector((state) => state.instructor.course);
  const [media, setMedia] = useState({
    video: "",
    image: "",
  });
  const imageLoader = useSelector(
    (state) => state.upload.isLoading.uploadImage
  );
  const videoLoading = useSelector(
    (state) => state.upload.isLoading.uploadVideo
  );

  useEffect(() => {
    if (courseAddData && courseAddData?.media) {
      setMedia({
        video: courseAddData?.media?.video || "",
        image: courseAddData?.media?.image || "",
      });
    }
  }, [courseAddData]);

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("courseImage", selectedFile);
    dispatch(uploadImage(formData))
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setMedia((prev) => ({
            ...prev,
            image: res?.data,
          }));
        }
      });
  };

  const handleVideoUpload = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("video", selectedFile);
    dispatch(uploadVideo(formData))
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setMedia((prev) => ({
            ...prev,
            video: res?.data,
          }));
        }
      });
  };

  const submitHandler = () => {
    if (!media.image || !media.video) {
      toast.error("Cover Image and Preview Video, Both are required");
      return;
    } else {
      dispatch(updateCourseAddDataState({ field: "media", data: media }));
      dispatch(updateStep(3));
    }
  };

  return (
    <form className="w-full grid grid-cols-2 gap-6">
      {/* Cover Image Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Choose Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer hover:border-primary transition-all disabled:cursor-not-allowed disabled:opacity-60"
          disabled={imageLoader}
        />
        {media.image && (
          <div
            className="w-full h-64 bg-no-repeat bg-cover bg-center rounded-lg shadow-md border overflow-hidden"
            style={{ backgroundImage: `url(${media.image})` }}
          ></div>
        )}
      </div>

      {/* Course Video Upload */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Course Video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoUpload}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 cursor-pointer hover:border-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={videoLoading}
        />
        {media.video && (
          <div className="w-full h-64 rounded-lg shadow-md border overflow-hidden">
            <video
              src={media.video}
              className="w-full h-full rounded-lg"
              controls
            />
          </div>
        )}
      </div>

      <div className="w-full col-span-3">
        <SubmitButtonsComp
          cancelText={"Cancel"}
          handleClick={() => submitHandler()}
          onCancel={(e) => {
            e.preventDefault();
            dispatch(updateStep(1));
          }}
          loading={imageLoader || videoLoading}
          saveText={"Save and Continue"}
        />
      </div>
    </form>
  );
};

export default CourseMedia;
