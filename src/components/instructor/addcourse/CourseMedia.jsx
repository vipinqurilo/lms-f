"use client";

import React, { useState } from "react";
import SubmitButtonsComp from "./SubmitButtonsComp";
import { useDispatch } from "react-redux";
import {
  updateCourseAddDataState,
  updateStep,
} from "@/store/slices/instructor/courseSlice";
import toast from "react-hot-toast";

const CourseMedia = () => {
  const dispatch = useDispatch();
  const [media, setMedia] = useState({
    video: null,
    image: null,
    videoPreview: null,
    imagePreview: null,
  });

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setMedia((prevState) => {
        const updatedState = {
          ...prevState,
          [type]: selectedFile,
          [`${type}Preview`]: previewUrl,
        };
        return updatedState;
      });
    }
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
          onChange={(e) => handleFileChange(e, "image")}
          className="block w-full text-sm text-gray-500 border-gray-300  "
        />
        {media.imagePreview && (
          <div
            className="w-full h-80 bg-no-repeat bg-cover bg-center mt-5 rounded-lg"
            style={{ backgroundImage: `url(${media.imagePreview})` }}
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
          onChange={(e) => handleFileChange(e, "video")}
          className="block w-full text-sm text-gray-500 border-gray-300 "
        />
        {media.videoPreview && (
          <div className="w-full h-80 rounded-lg">
            <video
              src={media.videoPreview}
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
