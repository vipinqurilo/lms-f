"use client";
import CommonButton from "@/components/common/CommonButton";
import {
  updateAdminConversation,
  updateConversation,
} from "@/store/slices/supportSlice";
import { EllipsisVertical, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { VscTriangleUp } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";

const MessageModal = ({ ticket, setMessages }) => {
  const { authUser } = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [isDropDown, setisDropDown] = useState(false);
  const toggleIsDropDown = () => setisDropDown(!isDropDown);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.support.isLoading.updateConversation
  );
  const adminLoading = useSelector(
    (state) => state.support.isLoading.updateAdminConversation
  );

  const handleSubmit = () => {
    const data = { receiver: ticket?._id, message: newMessage };

    if (authUser?.role === "admin") {
      dispatch(updateAdminConversation(data))
        .unwrap()
        .then(
          setMessages((prev) => ({
            ...prev,
            messages: [
              ...prev?.messages,
              {
                sender: authUser?._id,
                message: newMessage,
                createdAt: new Date(),
              },
            ],
          })),
          setNewMessage("")
        );
    } else {
      dispatch(updateConversation({ id: ticket?._id, data }))
        .unwrap()
        .then(() => {
          setMessages((prev) => ({
            ...prev,
            messages: [
              ...prev?.messages,
              {
                sender: authUser?._id,
                message: newMessage,
                createdAt: new Date(),
              },
            ],
          }));
          setNewMessage("");
        });
    }
  };

  const getRelativeTime = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) return "Just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    // If more than 7 days, show formatted date
    return dateFormat(past, "dS mmm yyyy");
  };

  return (
    <div className="w-80 lg:w-[30%] h-[calc(100vh-160px)] sticky top-5 flex flex-col border border-black/10 rounded-lg drop-shadow bg-white">
      <div className="bg-secondary text-white p-3 font-semibold rounded-t-lg flex items-center justify-between">
        <h2>Conversations</h2>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages(null)}
            className="border border-black/10 rounded-full p-1 bg-secondary hover:bg-background text-white transition-custom "
          >
            <IoClose size={18} />
          </button>

          {Object?.keys(authUser).length > 0 && authUser?.role === "admin" && (
            <div className="relative">
              <button
                onClick={toggleIsDropDown}
                className=" rounded-lg p-1 text-white hover:text-background transition-custom "
              >
                <EllipsisVertical size={20} />
              </button>
              {isDropDown && (
                <div className="absolute top-[60%] -right-1.5 pt-0">
                  <div className="-mb-3.5 w-full flex items-center justify-end text-white ">
                    <VscTriangleUp size={40} />
                  </div>
                  <ul className=" bg-white text-nowrap rounded border border-t-0 shadow">
                    <li className=" text-light group w-full text-base border-b border-black/10 px-6 py-3">
                      <button
                        onClick={() => {
                          setMessages((prev) => ({
                            ...prev,
                            status: "Resolved",
                          }));
                          toggleIsDropDown();
                        }}
                        className={`text-black group-hover:!text-secondary transition-custom w-full text-sm md:w-fit disabled:opacity-60 disabled:cursor-not-allowed`}
                        disabled={ticket?.status === "Resolved"}
                      >
                        Mark AS Resolved
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-background text-white px-3 py-2 text-sm font-medium">
        <span>Subject</span>: {ticket?.subject}
      </div>

      {/* Messages List */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-4 bg-gradient-to-b from-gray-100 via-white to-gray-50"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        {ticket?.messages?.map((msg, index) => {
          const isSender = msg?.sender?._id === authUser?._id;
          return (
            <div
              key={index}
              className={`flex flex-col ${
                isSender ? "justify-end items-end" : "justify-start items-start"
              }`}
            >
              <div
                className={`p-2 max-w-[70%] text-wrap break-words rounded-lg text-sm ${
                  isSender
                    ? "bg-secondary/10 text-background rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
              {/* <span className="font-medium block text-xs text-gray-400 capitalize">
                {isSender ? msg.sender : msg.receiver}
              </span> */}
              <span className="font-medium block text-xs text-gray-400">
                {ticket?.createdAt
                  ? getRelativeTime(ticket.createdAt)
                  : "Just now"}
              </span>
            </div>
          );
        })}
      </div>

      {ticket?.status === "Resolved" ? (
        <div className="p-3 border-t flex items-center justify-between bg-green-100 text-green-800 rounded-b-lg">
          <span className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="text-sm font-medium">
              This ticket has been resolved
            </span>
          </span>
        </div>
      ) : (
        <div className="p-2 border-t flex items-center gap-2 bg-gray-100 rounded-b-lg">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg outline-none text-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />

          <CommonButton
            label={<SendHorizontal size={20} />}
            onClick={handleSubmit}
            loading={loading || adminLoading}
          />
        </div>
      )}
    </div>
  );
};

export default MessageModal;
