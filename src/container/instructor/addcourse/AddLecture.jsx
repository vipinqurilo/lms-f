"use client";

import CommonButton from "@/components/common/CommonButton";
import ModalHeading from "@/components/common/ModalHeading";
import BackgroundModal from "@/components/instructor/BackgroundModal";
import { uploadDocument } from "@/store/slices/uploadSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AddLecture = ({
  handleAddLecture,
  setisAddLecture,
  moduleIndex,
  setLecture,
  lecture,
  handleSaveEditedLecture,
  isEdit,
  setisEditLecture,
}) => {
  const [loading, setloading] = useState(null);
  const dispatch = useDispatch();

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      toast.error("You can only upload up to 5 files.");
      e.target.value = ""; // Clear selected files
      return;
    }
    const validFiles = files
      .filter((file) => {
        const isValidType = ["application/pdf"].includes(file.type);
        const isValidSize = file.size <= 4 * 1024 * 1024; // 4MB limit

        if (!isValidType) {
          toast.error(
            `${file.name} is not a valid file type (Only PDF and DOC allowed)`
          );
        }
        if (!isValidSize) {
          toast.error(`${file.name} exceeds the 4MB size limit`);
        }
        return isValidType && isValidSize;
      })
      .map((file) => ({
        name: file.name, // Default file name
        url: file, // Actual file object
      }));

    if (validFiles.length > 0) {
      setLecture((prev) => ({
        ...prev,
        attachements: [...(prev.attachements || []), ...validFiles],
      }));
    }
  };

  const handleFileNameChange = (index, newName) => {
    setLecture((prev) => ({
      ...prev,
      attachements: prev.attachements.map((attachment, i) => {
        if (i === index) {
          const newFile = new File([attachment.url], newName, {
            type: attachment.url.type,
            lastModified: attachment.url.lastModified,
          });

          return { name: newName, url: newFile };
        }
        return attachment;
      }),
    }));
  };

  const removeAttachment = (index) => {
    setLecture((prev) => ({
      ...prev,
      attachements: prev.attachements.filter((_, i) => i !== index),
    }));
  };

  const handleUploadDocument = (document, index) => {
    setloading(index);
    const formData = new FormData();
    formData.append("pdf", document);
    dispatch(uploadDocument(formData))
      .unwrap()
      .then((res) => {
        if (res) {
          setLecture((prev) => ({
            ...prev,
            attachements: prev.attachements.map((attachment, i) => {
              if (i === index) {
                return { name: document?.name, url: res?.url };
              }
              return attachment;
            }),
          }));
        }
      })
      .finally(() => setloading(null));
  };

  console.log("lecture", lecture);

  return (
    <BackgroundModal
      PropComponent={
        <div className="w-[40%] bg-white flex flex-col gap-4 px-8 py-4 rounded-lg">
          <ModalHeading
            title={isEdit !== null ? "Edit Lecture" : "Add Lecture"}
            onClose={() => {
              isEdit !== null ? setisEditLecture(null) : setisAddLecture(null);
              setLecture({
                lessonTitle: "",
                video: "",
                duration: "",
                attachements: [],
              });
            }}
            PaddingAdd={true}
          />

          <input
            type="text"
            placeholder="Lesson Title"
            value={lecture.lessonTitle}
            onChange={(e) =>
              setLecture({ ...lecture, lessonTitle: e.target.value })
            }
            className="px-4 py-2 focus:outline-none border border-black/10 rounded-lg text-sm"
          />

          {/* File Upload Input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Attachments</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="border px-4 py-2 rounded-lg text-sm"
              multiple
              disabled={lecture?.attachements?.length === 5}
            />

            {/* Display Uploaded Files */}
            {lecture.attachements?.length > 0 && (
              <div className="mt-2 space-y-2">
                {lecture.attachements.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start w-full justify-between gap-2 border p-2 rounded-lg"
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <input
                        type="text"
                        value={attachment.name}
                        onChange={(e) =>
                          handleFileNameChange(index, e.target.value)
                        }
                        className="w-full text-sm focus:outline-none border border-black/10 rounded-lg p-1"
                        disabled={typeof attachment.url === "string"}
                      />

                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        Remove
                      </button>
                      {typeof attachment.url !== "string" && (
                        <CommonButton
                          label={"Upload"}
                          variant="third"
                          onClick={() =>
                            handleUploadDocument(attachment?.url, index)
                          }
                          loading={loading === index}
                        />
                      )}
                    </div>
                    {typeof attachment.url === "string" && (
                      <div className="mt-2 w-full">
                        <div className="flex gap-2 items-center">
                          <p className="text-xs text-gray-600">Uploaded:</p>
                          <a
                            href={`https://docs.google.com/gview?url=${attachment.url}&embedded=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 text-xs hover:underline"
                          >
                            View Document
                          </a>
                        </div>
                        {/* {attachment.url &&
                          typeof attachment.url === "string" && (
                            <iframe
                              src={`https://docs.google.com/gview?url=${attachment.url}&embedded=true`}
                              className="w-full h-64 border rounded overflow-y-auto"
                            ></iframe>
                          )} */}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <CommonButton
            label={isEdit !== null ? "Edit Lecture" : "Add Lecture"}
            onClick={() =>
              isEdit !== null
                ? handleSaveEditedLecture()
                : handleAddLecture(moduleIndex)
            }
          />
        </div>
      }
    />
  );
};

export default AddLecture;
