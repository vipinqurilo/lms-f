import React, { useState } from "react";

const ContactModal = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = () => {
    // Add your send logic here
    console.log({ message, file });
    onClose();
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
          <h2 className="text-xl font-semibold">Start Conversation</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <hr className="my-4" />
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="message">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows="4"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-secondary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2" htmlFor="file">
            Choose a file
          </label>
          <input
            id="file"
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-white hover:file:bg-secondary"
            onChange={handleFileChange}
          />
          <p className="text-xs text-gray-500 mt-2">
            File size should be less than 2.00 MB & Supported file formats are
            png, jpeg, jpg, gif, pdf, doc, docx, zip, txt, rtf, mp3
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={handleSend}
            className="bg-secondary hover:bg-opacity-90 text-white py-2 px-4 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
