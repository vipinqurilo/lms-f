"use client";

import React, { useState } from "react";
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
  const [media, setMedia] = useState({
    video: null,
    image: null,
  });
  const imageLoader = useSelector(
    (state) => state.upload.isLoading.uploadImage
  );
  const videoLoading = useSelector(
    (state) => state.upload.isLoading.uploadVideo
  );

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
    <form className="w-full grid grid-cols-2 gap-10">
      <div>
        <label className="block text-sm font-medium text-light mb-2">
          Choose Cover Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageUpload(e);
          }}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={imageLoader}
        />
        {media.imagePreview && (
          <div
            className="w-full h-80 bg-no-repeat bg-cover bg-center mt-5 rounded-lg"
            style={{ backgroundImage: `url(${media.image})` }}
          ></div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-light mb-2">
          Course Video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => {
            handleVideoUpload(e);
          }}
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm p-2 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={videoLoading}
        />
        {media.videoPreview && (
          <div className="w-full h-80 rounded-lg">
            <video
              src={media.video}
              className="w-full h-full rounded-lg mt-5"
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
          saveText={"Save and Continue"}
        />
      </div>
    </form>
  );
};

export default CourseMedia;
