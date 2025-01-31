"use client";

import React from "react";
import { useForm } from "react-hook-form";
import SettingsInputField from "../SettingsInputField";
import SubmitButtonsComp from "./SubmitButtonsComp";
import { useDispatch } from "react-redux";
import { updateStep } from "@/store/slices/instructor/courseSlice";

const PricingAccess = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);
  };
  return (
    <div className="flex w-full flex-col gap-10">
      <SettingsInputField
        errors={errors}
        register={register}
        label={"Course Price"}
        name={"price"}
        placeholder={"Enter Course Price"}
      />

      <div className="w-full flex items-center justify-between">
        <SubmitButtonsComp
          cancelText={"Go Back"}
          onCancel={() => dispatch(updateStep(3))}
          saveText={"Create Course"}
          handleClick={handleSubmit((data) => submitHandler(data))}
        />
      </div>
    </div>
  );
};

export default PricingAccess;
