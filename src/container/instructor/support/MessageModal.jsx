"use client";
import CommonButton from "@/components/common/CommonButton";
import {
  updateAdminConversation,
  updateConversation,
  updateTicketStatus,
} from "@/store/slices/supportSlice";
import {
  EllipsisVertical,
  Maximize2,
  Minimize2,
  SendHorizontal,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { VscTriangleUp } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import dateFormat from "dateformat";
import Loader from "@/components/common/Loader";

const MessageModal = ({ ticket, setMessages }) => {
  const { authUser } = useSelector((state) => state.user);
  const [newMessage, setNewMessage] = useState("");
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDropDown, setisDropDown] = useState(false);
  const toggleIsDropDown = () => setisDropDown(!isDropDown);
  const toggleMaximize = () => setIsMaximized(!isMaximized);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.support.isLoading.updateConversation
  );
  const adminLoading = useSelector(
    (state) => state.support.isLoading.updateAdminConversation
  );
  const statusUpdateLoading = useSelector(
    (state) => state.support.isLoading.updateTicketStatus
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

  useEffect(() => {
    setIsMaximized(true);
  }, [ticket]);

  const handleMarkAsRead = (id) => {
    const data = { id, status: "close" };
    dispatch(updateTicketStatus(data))
      .unwrap()
      .then(() => {
        toggleIsDropDown();
      });
  };

  return (
    <div
      className={`w-80 fixed flex flex-col border border-black/10 rounded-lg drop-shadow bg-white ${
        isMaximized
          ? "lg:w-[25%] h-[calc(100vh-160px)] top-24 z-[12] right-10"
          : "lg:w-[25%] h-fit !bottom-20 !rounded-lg overflow-hidden z-[12] right-10"
      }`}
    >
      <div className="bg-gray-200 text-black p-3 font-semibold rounded-t-lg flex items-center justify-between">
        <h2>Conversations</h2>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleMaximize}
            className="text-light hover:text-gray-600"
          >
            {isMaximized ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button
            onClick={() => setMessages(null)}
            className="text-light hover:text-gray-600"
          >
            <IoClose size={24} />
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
                        onClick={() => handleMarkAsRead(ticket?._id)}
                        className={`text-black group-hover:!text-secondary transition-custom w-full text-sm md:w-fit disabled:opacity-60 disabled:cursor-not-allowed`}
                        disabled={ticket?.status === "close"}
                      >
                        {statusUpdateLoading ? <Loader /> : "Mark AS Resolved"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {isMaximized && (
        <div className="bg-gray-100 text-black px-3 py-2 text-sm font-medium">
          <span>Subject</span>: {ticket?.subject}
        </div>
      )}

      {/* Messages List */}
      {isMaximized && (
        <>
          <div
            className="flex-1 overflow-y-auto p-3 space-y-4 bg-white"
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
                    isSender
                      ? "justify-end items-end"
                      : "justify-start items-start"
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

          {ticket?.status === "close" ? (
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
        </>
      )}
    </div>
  );
};

export default MessageModal;
