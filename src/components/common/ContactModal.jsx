import React from "react";
import { MdEmail } from "react-icons/md";
import Phone from "./Phone";
import { Mail, PhoneCall } from "lucide-react";
import toast from "react-hot-toast";

const ContactModal = ({ onClose, tutor }) => {
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${type} copied to clipboard!`);
    });
  };

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
          <h2 className="text-xl font-semibold">Contact Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 ">
            <span className="text-sm text-gray-500">
              <PhoneCall />
            </span>
            <span
              className="text-sm text-gray-500 ml-4 cursor-pointer"
              onClick={() =>
                copyToClipboard(
                  tutor?.user?.phone?.countryCode + tutor?.user?.phone?.number,
                  "Phone number"
                )
              }
            >
              {tutor?.user?.phone?.countryCode} {tutor?.user?.phone?.number}
            </span>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="text-sm text-gray-500">
              <Mail />
            </span>
            <span
              className="text-sm text-gray-500 ml-4 cursor-pointer"
              onClick={() => copyToClipboard(tutor?.user?.email, "Email")}
            >
              {tutor?.user?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
