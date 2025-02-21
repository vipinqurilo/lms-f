"use client";
import React, { useRef, useState } from "react";
import BackgroundModal from "../BackgroundModal";
import ModalHeading from "@/components/common/ModalHeading";
import { RiUploadCloud2Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "@/store/slices/uploadSlice";

const UploadLecture = ({ handleCancel, setLecture }) => {
  const [videoDuration, setVideoDuration] = useState("");
  const videoRef = useRef(null);
  const dispatch = useDispatch();
  const videoLoading = useSelector(
    (state) => state.upload.isLoading.uploadVideo
  );

  const handleUpload = (e) => {
    const reply = confirm("Are you sure? you want to upload this file");
    if (reply) {
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.src = URL.createObjectURL(file);

      videoElement.onloadedmetadata = () => {
        URL.revokeObjectURL(videoElement.src);
        const duration = formatDuration(videoElement.duration);
        setVideoDuration(duration);
      };
      const file = e.target.files?.[0];
      const formData = new FormData();
      formData.append("video", file);
      dispatch(uploadVideo(formData))
        .unwrap()
        .then((res) => {
          if (res) {
            setLecture((prev) => ({
              ...prev,
              video: res?.data,
              duration: videoDuration,
            }));
          }
          handleCancel();
        });
    } else {
      toast.error("Denied");
    }
  };

  const formatDuration = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };
  return (
    <BackgroundModal
      PropComponent={
        <div className="w-[40%] pb-10 rounded-lg bg-white">
          <ModalHeading title={"Upload Lecture"} onClose={handleCancel} />
          <div className="w-full px-10">
            <button
              onClick={() => videoRef?.current?.click()}
              className="w-full h-60 border-4 border-primary rounded-lg font-bold text-primary flex flex-col items-center justify-center text-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              disabled={videoLoading}
            >
              <RiUploadCloud2Line size={60} className="text-primary" />
              <p>
                Choose a Video and <br /> Unlock the Power of Visual Learning!
              </p>
              <input
                type="file"
                accept="video/*"
                ref={videoRef}
                onChange={(e) => handleUpload(e)}
                hidden
              />
            </button>
          </div>
        </div>
      }
    />
  );
};

export default UploadLecture;
