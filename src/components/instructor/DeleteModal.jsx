import React from "react";
import BackgroundModal from "./BackgroundModal";
import ModalHeading from "../common/ModalHeading";
import CommonButton from "../common/CommonButton";

const DeleteModal = ({ onClose, text, handleDelete, loading }) => {
  return (
    <BackgroundModal
      PropComponent={
        <div data-aos="fade-up" className=" bg-white border border-black/10 rounded-lg">
          <ModalHeading title={"Are You Sure?"} onClose={onClose} />

          <div className="w-full px-10 pb-6">
            <p className="text-center font-semibold text-base  text-[#223142] mt-5 ">
              Are you certain you want to delete this {text || "record"}?
            </p>

            <div className="flex justify-center gap-10 mt-8">
              <CommonButton
                label="Yes, Delete It!"
                onClick={handleDelete}
                variant="primary"
                loading={loading}
              />
              <CommonButton
                label="Cancel"
                onClick={onClose}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default DeleteModal;
