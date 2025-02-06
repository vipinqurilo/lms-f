"use client";

import Loader from "@/components/common/Loader";
import SettingsInputField from "@/components/instructor/SettingsInputField";
import { updatePaymentInfo } from "@/store/slices/instructor/settingsSlice";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const methods = ["bank transfer", "paypal"];

const WithdrawalTabProfile = () => {
  const { profile } = useSelector((state) => state.instructor.setting);
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.instructor.setting.isLoading.updatePaymentInfo
  );
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (profile) {
      // Reset the form with profile data based on the selected method
      if (selectedMethod === methods[0]) {
        reset({
          name: profile?.paymentInfo?.accountHolderName || "",
          accountnumber: profile?.paymentInfo?.accountNumber || "",
          bankname: profile?.paymentInfo?.bankName || "",
          ifscCode: profile?.paymentInfo?.ifscCode || "",
          paypalemailaddress: profile?.paymentInfo?.paypalEmail || "",
        });
      }
    }
  }, [profile, selectedMethod, reset]);

  const submitHandler = (data) => {
    const formdata = {
      paymentInfo: data,
    };
    dispatch(updatePaymentInfo(formdata));
  };

  return (
    <div className="w-full p-4 px-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          Select a withdraw method{" "}
          <span className="text-sm text-light">(Minimum withdraw ₹80)</span>
        </h3>

        <div className="w-full grid grid-cols-3 gap-5">
          {methods.map((method, index) => (
            <div
              key={index}
              onClick={() => setSelectedMethod(method)}
              className="w-full flex items-center gap-2 cursor-pointer px-4 py-2 border border-black/10 rounded-lg"
            >
              <span className="w-4 h-4 border border-black/10 rounded-full flex items-center justify-center">
                <span
                  className={`w-2 h-2 rounded-full block transition-all ${
                    selectedMethod === method ? "scale-100 bg-black" : "scale-0"
                  }`}
                ></span>
              </span>
              <p className="font-medium capitalize">{method}</p>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="w-full p-5 py-6 border border-black/10 space-y-8 !mt-10 rounded-lg"
        >
          {selectedMethod === methods[0] ? (
            <div className="w-full grid grid-cols-2 gap-8">
              <SettingsInputField
                label={"Account Name"}
                name={"name"}
                placeholder={"Enter Account Name"}
                register={register}
                errors={errors}
              />
              <SettingsInputField
                label={"Account Number"}
                name={"accountnumber"}
                placeholder={"Enter Account Number"}
                register={register}
                errors={errors}
              />
              <SettingsInputField
                label={"Bank Name"}
                name={"bankname"}
                placeholder={"Enter Bank Name"}
                register={register}
                errors={errors}
              />
              <SettingsInputField
                label={"IFSC Code"}
                name={"ifscCode"}
                placeholder={"Enter IFSC Code"}
                register={register}
                errors={errors}
              />
              {/* <SettingsInputField
                label={"BIC / SWIFT"}
                name={"bic"}
                placeholder={"Enter BIC / SWIFT"}
                register={register}
                errors={errors}
              /> */}
            </div>
          ) : selectedMethod === methods[1] ? (
            <div>
              <SettingsInputField
                label={"PayPal Email Address"}
                name={"paypalemailaddress"}
                placeholder={"Enter PayPal Email Address"}
                register={register}
                errors={errors}
              />
              <p className="text-light mt-2">
                We will use this email address to send the money to your Paypal
                account
              </p>
            </div>
          ) : undefined}

          <button
            type="submit"
            className="w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary capitalize disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Loader /> : "Save withdrawal account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WithdrawalTabProfile;
