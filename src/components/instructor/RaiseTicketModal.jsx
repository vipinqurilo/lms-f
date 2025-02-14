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

const ticketCategories = [
  "Account & Access",
  "Course Enrollment",
  "Technical Issues",
  "Content & Media",
  "Assessment & Grading",
  "Billing & Payments",
  "Communication & Integration",
  "Feature Requests",
  "General Support",
];

const RaiseTicketModal = ({ toggleIsAdd }) => {
  const dispatch = useDispatch();
  const imageLoading = useSelector(
    (state) => state.upload.isLoading.uploadImage
  );
  const { subjects } = useSelector((state) => state.category);
  const loading = useSelector((state) => state.support.isLoading.raiseTicket);
  const [attachment, setattachment] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const OnSubmit = (data) => {
    console.log(data);
    const formData = attachment?.length > 0
      ? {
          ...data,
          attachment,
          messages: [],
        }
      : {
        ...data,
        messages: []
      };
    dispatch(raiseTicket(formData))
      .unwrap()
      .then(() => {
        toggleIsAdd();
      });
  };

  const handleUploadAttachment = (e) => {
    const file = e.target.files[0];
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      setattachment((prevAttachments) => [
        ...prevAttachments,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }

    // if (file) {
    //   const formData = new FormData();
    //   formData.append("courseImage", file);
    //   dispatch(uploadImage(formData))
    //     .unwrap()
    //     .then((res) => {
    //       setattachment(res?.data);
    //     });
    // }
  };

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
            <div className="col-span-3">
              <label className="block text-sm font-medium text-light mb-2">
                Category
              </label>
              <select
                {...register("category", { required: "category is required" })}
                className="mt-1 block text-sm resize-none px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
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
                className="mt-1 block h-20 text-sm resize-none px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
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
                onChange={(e) => handleUploadAttachment(e)}
                className="block w-full text-sm text-gray-500
                  file:cursor-pointer cursor-pointer disabled:file:cursor-not-allowed disabled:cursor-not-allowed disabled:opacity-60"
                disabled={imageLoading}
                multiple
                maxLength={5}
              />

              {attachment?.length > 0 && (
                <div
                  className="w-full flex items-center flex-nowrap overflow-y-auto gap-5"
                  style={{
                    scrollbarWidth: "thin",
                  }}
                >
                  {attachment?.map((att, index) => (
                    <div
                      key={index}
                      className="w-32 h-32 flex-shrink-0 mt-4 bg-gray-400 rounded-lg bg-center bg-no-repeat bg-cover"
                      style={{
                        backgroundImage: `url(${att})`,
                      }}
                    ></div>
                  ))}
                </div>
              )}
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
