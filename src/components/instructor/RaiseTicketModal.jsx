"use client";

import React, { useState } from "react";
import BackgroundModal from "./BackgroundModal";
import ModalHeading from "../common/ModalHeading";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { raiseTicket } from "@/store/slices/supportSlice";
import SettingsInputField from "./SettingsInputField";
import CommonButton from "../common/CommonButton";
import { uploadImage } from "@/store/slices/uploadSlice";
import { MdDelete } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import Loader from "../common/Loader";
import toast from "react-hot-toast";

const RaiseTicketModal = ({ toggleIsAdd }) => {
  const dispatch = useDispatch();
  const { subjects } = useSelector((state) => state.category);
  const loading = useSelector((state) => state.support.isLoading.raiseTicket);
  const [attachment, setattachment] = useState([]);
  const [isImageUpload, setisImageUpload] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = (data) => {
    console.log(data);
    const formData =
      attachment?.length > 0
        ? {
            ...data,
            attachments: attachment,
            messages: [],
          }
        : {
            ...data,
            messages: [],
          };
    dispatch(raiseTicket(formData))
      .unwrap()
      .then(() => {
        toggleIsAdd();
      });
  };

  const handleAttachment = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error("You can only upload up to 4 files.");
      e.target.value = "";
      return;
    }

    if (files.length > 0) {
      setattachment(files);
    }
  };

  const handleUploadAttachment = (index) => {
    const selectedFile = attachment[index];
    setisImageUpload(index);
    const formData = new FormData();
    formData.append("courseImage", selectedFile);
    dispatch(uploadImage(formData))
      .unwrap()
      .then((res) => {
        if (res?.data) {
          setattachment((prev) =>
            prev.map((item, i) => (i === index ? res?.data : item))
          );
        }
      })
      .finally(() => setisImageUpload(null));
  };

  console.log(attachment, "attachment");

  return (
    <BackgroundModal
      PropComponent={
        <div data-aos="fade-up" className="w-[40%] pb-10 rounded-lg bg-white">
          <ModalHeading title={"Raise New Ticket"} onClose={toggleIsAdd} />
          <p className="px-10 text-sm text-light pb-4">
            <span className="text-red-500">*</span>If you're facing any issues,
            please raise a ticket by selecting the appropriate category and
            providing a detailed description. Our support team will review your
            request and respond as soon as possible.
          </p>
          <form className="flex flex-col gap-5 px-10">
            <div className="flex flex-col gap-5 px-1 w-full max-h-[60vh] overflow-y-auto">
              <div className="col-span-3">
                <label className="block text-sm font-medium text-light mb-2">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "category is required",
                  })}
                  className="mt-1 block text-sm resize-none px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
                >
                  <option value="">Select Category</option>
                  {subjects?.map((sub, i) => (
                    <option key={i} value={sub?._id}>
                      {sub?.name}
                    </option>
                  ))}
                </select>
              </div>
              <SettingsInputField
                errors={errors}
                label={"Subject"}
                name={"subject"}
                register={register}
              />
              <div className="col-span-3">
                <label className="block text-sm font-medium text-light mb-2">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is reuired",
                  })}
                  className="mt-1 block h-20 text-sm resize-none px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-secondary ring-[1px] ring-gray-200 outline-none"
                  placeholder="Enter Short description of problem"
                />

                {errors.description && (
                  <span className="text-sm text-red-500">
                    *{errors.description?.message}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-light mb-2">
                  Attachments (Optional)
                </label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => handleAttachment(e)}
                  className="block w-full text-sm text-gray-500
                  file:cursor-pointer cursor-pointer disabled:file:cursor-not-allowed disabled:cursor-not-allowed disabled:opacity-60"
                  multiple
                  maxLength={4}
                />

                {attachment?.length > 0 && (
                  <div className="w-full grid grid-cols-4 gap-5 mt-4">
                    {attachment?.map((att, index) => (
                      <div className="w-full">
                        <div
                          key={index}
                          className="w-auto h-20 flex-shrink-0 bg-gray-400 rounded-lg bg-center bg-no-repeat bg-cover flex items-center justify-center !relative"
                          style={{
                            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 100%), url(${
                              typeof att === "string"
                                ? att
                                : URL.createObjectURL(att)
                            })`,
                          }}
                        ></div>
                        <div className="w-full flex items-center justify-between py-1">
                          {typeof att !== "string" && (
                            <button
                              type="button"
                              onClick={() => handleUploadAttachment(index)}
                              className="flex items-center justify-center p-1 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            >
                              {isImageUpload === index ? (
                                <Loader color={"text-white"} />
                              ) : (
                                <FaCloudUploadAlt size={20} />
                              )}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => {
                              setattachment((prev) =>
                                prev.filter((item, i) => i !== index)
                              );
                            }}
                            className="flex items-center justify-center p-1 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <CommonButton
              label={"Submit"}
              loading={loading}
              onClick={handleSubmit((data) => OnSubmit(data))}
            />
          </form>
        </div>
      }
    />
  );
};

export default RaiseTicketModal;
