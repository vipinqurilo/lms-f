import React, { useRef, useState } from "react";
import BackgroundModal from "../BackgroundModal";
import ModalHeading from "@/components/common/ModalHeading";
import { RiUploadCloud2Line } from "react-icons/ri";
import toast from "react-hot-toast";

const UploadLecture = ({ handleCancel, moduleInfo, handleUploadedVideoDataSet }) => {
  const [video, setvideo] = useState("");
  const videoRef = useRef(null);

  const handleUpload = (e) => {
    const reply = confirm("Are you sure? you want to upload this file");
    if (reply) {
      const file = e.target.files?.[0];
      console.log(file);
      console.log(moduleInfo);
    } else {
      toast.error("Denied");
    }
  };
  return (
    <BackgroundModal
      PropComponent={
        <div className="w-[40%] pb-10 rounded-lg bg-white">
          <ModalHeading title={"Upload Lecture"} onClose={handleCancel} />
          <div className="w-full px-10">
            <div
              onClick={() => videoRef?.current?.click()}
              className="w-full h-60 border-4 border-primary rounded-lg font-bold text-primary flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <RiUploadCloud2Line size={60} className="text-primary" />
              <p>Choose a Video and <br /> Unlock the Power of Visual Learning!</p>
              <input
                type="file"
                ref={videoRef}
                onChange={(e) => handleUpload(e)}
                hidden
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default UploadLecture;
