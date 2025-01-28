import React from "react";

export function AvatarUpload({ avatarUrl, onUpload, onDelete }) {
  return (
    <div className="flex items-start gap-6 border-b p-4 px-8">
      <div className="relative">
        <img
          src={avatarUrl || "/placeholder.svg"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />

        <input
          id="avatar-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Your avatar</h3>
        <p className="text-sm text-gray-500">
          PNG or JPG no bigger than 800px width and height
        </p>
        <div className=" flex gap-3">
          <button
            className="w-8 h-8 rounded  text-gray-600 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            onClick={() => document.getElementById("avatar-upload")?.click()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            className="w-8 h-8 rounded bg-red-100 text-red-600 hover:bg-red-200 flex items-center justify-center"
            onClick={onDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
