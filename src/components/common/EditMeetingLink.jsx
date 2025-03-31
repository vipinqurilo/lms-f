import React, { useState } from "react";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import { updateBooking } from "@/store/slices/bookingSlice";
import { useDispatch } from "react-redux";

const EditMeetingLink = ({ onClose, bookingId , meetingLink}) => {
  const dispatch = useDispatch();

  const [link, setLink] = useState(meetingLink || "");

  const handleEditMeetingLink = () => {
    if (link !== "") {
      dispatch(updateBooking({ bookingId, link }))
        .unwrap()
        .then((res) => {
          onClose();
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-[500px] relative">
        <button onClick={onClose} className="absolute right-4 top-4 z-10">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center relative">
          <h2 className="text-xl font-semibold mt-2">Edit Meet Details</h2>

          <div className="space-y-4 mb-6">
            <div className="text-left">
              <label className="block text-gray-600 mb-1">Meeting Link</label>
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="https://meet.google.com/..."
              />
            </div>
          </div>

          <button
            disabled={link === ""}
            onClick={() => handleEditMeetingLink()}
            className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMeetingLink;
