import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import Phone from "./Phone";

const ContactModal = ({ onClose, tutor }) => {
  console.log(tutor, "tutor");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-hidden"
      style={{ overflow: "hidden" }}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-xl w-96"
        style={{
          transform: "scale(1)",
          opacity: 1,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Start Conversation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Phone phone={tutor?.user?.phone} />
          </div>
          <div className="flex justify-center items-center gap-2">
            <span className="text-sm text-gray-500">
              <MdEmail />
            </span>
            <span className="text-sm text-gray-500">{tutor?.user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
