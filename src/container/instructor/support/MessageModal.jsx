import CommonButton from "@/components/common/CommonButton";
import { EllipsisVertical, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { VscTriangleUp } from "react-icons/vsc";

const MessageModal = ({ ticket, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isDropDown, setisDropDown] = useState(false);
  const toggleIsDropDown = () => setisDropDown(!isDropDown);

  const handleSubmit = () => {
    setMessages((prev) => ({
      ...prev,
      messages: [
        ...prev?.messages,
        { sender: messages[0]?.sender, message: newMessage },
      ],
    }));
    setNewMessage("");
  };

  return (
    <div className="w-80 lg:w-[50%] h-[calc(100vh-120px)] sticky top-0 flex flex-col border border-black/10 rounded-lg drop-shadow bg-white">
      <div className="bg-secondary text-white p-3 font-semibold rounded-t-lg flex items-center justify-between">
        <h2>Conversations</h2>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages(null)}
            className="border border-black/10 rounded-full p-1 bg-secondary hover:bg-background text-white transition-custom "
          >
            <IoClose size={18} />
          </button>
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
        </div>
      </div>
      <div className="bg-background text-white px-3 py-2">
        <span>Subject</span>: {ticket?.subject}
      </div>

      {/* Messages List */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        {ticket?.messages?.map((msg, index) => {
          const isSender = msg.sender;
          return (
            <div
              key={index}
              className={`flex flex-col ${
                isSender ? "justify-end items-end" : "justify-start items-start"
              }`}
            >
              <div
                className={`p-2 max-w-[70%] rounded-lg text-sm ${
                  isSender
                    ? "bg-secondary/10 text-background rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
              <span className="font-medium block text-xs text-gray-400 capitalize">
                {isSender ? msg.sender : msg.receiver}
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
          />
        </div>
      )}
    </div>
  );
};

export default MessageModal;
