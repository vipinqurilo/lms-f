import CommonButton from "@/components/common/CommonButton";
import { SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const MessageModal = ({ messages, setMessages }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = () => {
    setMessages((prev) => [
      ...prev,
      { sender: messages[0]?.sender, message: newMessage },
    ]);
    setNewMessage("");
  };

  return (
    <div className="w-80 lg:w-[40%] h-[calc(100vh-120px)] sticky top-0 flex flex-col border border-black/10 rounded-lg drop-shadow bg-white">
      <div className="bg-secondary text-white p-3 font-semibold rounded-t-lg flex items-center justify-between">
        <h2>Conversations</h2>
        <button
          onClick={() => setMessages(null)}
          className="border border-black/10 rounded-full p-1 bg-background text-white transition-custom "
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* Messages List */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-4"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #f1f1f1",
        }}
      >
        {messages.map((msg, index) => {
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
    </div>
  );
};

export default MessageModal;
