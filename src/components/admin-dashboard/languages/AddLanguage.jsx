"use client";

import ModalHeading from "@/components/common/ModalHeading";
import BackgroundModal from "@/components/instructor/BackgroundModal";
import InputField from "@/components/login/InputField";
import SubmitButton from "@/components/login/SubmitButton";
import { addLanguage, editLanguage } from "@/store/slices/languageSlice";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const AddLanguage = ({ handleClose, isEdit = null }) => {
  const { languages, isLoading } = useSelector((state) => state.languages);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit !== null) {
      const language = languages.find((item) => item._id === isEdit);
      if (language) {
        reset({
          name: language?.name,
        });
      }
    }
  }, [isEdit]);

  const onSubmit = (data) => {
    if (isEdit !== null) {
      dispatch(editLanguage({ id: isEdit, data }))
        .unwrap()
        .then(() => {
          handleClose();
        });
    } else {
      dispatch(addLanguage(data))
        .unwrap()
        .then(() => {
          handleClose();
        });
    }
  };
  return (
    <BackgroundModal
      PropComponent={
        <div className="w-[40%] p-5 rounded-lg bg-white">
          <ModalHeading
            title={isEdit !== null ? "Edit Language" : "Add Language"}
            onClose={handleClose}
            PaddingAdd={true}
          />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-5 pt-8"
          >
            <InputField
              type={"text"}
              errors={errors}
              label={"Language Name"}
              name={"name"}
              placeHolder={"Enter Language Name"}
              register={register}
            />
            <SubmitButton
              text={"Submit"}
              loading={isLoading["addLanguage"] || isLoading["editLanguage"]}
            />
          </form>
        </div>
      }
    />
  );
};

export default AddLanguage;
