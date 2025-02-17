"use client";

import CommonButton from "@/components/common/CommonButton";
import ModalHeading from "@/components/common/ModalHeading";
import BackgroundModal from "@/components/instructor/BackgroundModal";
import { CgCopyright } from "react-icons/cg";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { requestWithdrawal } from "@/store/slices/withdrawalSlice";

const RequestWithdrawal = ({ handleClose, balance }) => {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.withdrawal.isLoading.requestWithdrawal
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = (data) => {
    dispatch(requestWithdrawal(data))
      .unwrap()
      .then(() => {
        handleClose();
      });
  };
  return (
    <BackgroundModal
      PropComponent={
        <div
          data-aos="fade-up"
          className="bg-white border border-black/10 rounded-lg"
        >
          <ModalHeading title={"Withdrawal Request"} onClose={handleClose} />
          <div className="px-10 pb-6 flex flex-col gap-4">
            <h4>
              Please check your transaction notification on your connected
              withdrawal method
            </h4>

            <div className="grid grid-cols-2 mb-4 text-background">
              <div>
                <p className="text-light text-sm">Withdrawal Balance</p>
                <p className="text-lg font-semibold ">₹{balance}</p>
              </div>
              <div>
                <p className="text-light text-sm">Selected</p>
                <select
                  {...register("paymentMethod", {
                    required: "paymentMethod is required",
                  })}
                  className="w-full focus:outline-none cursor-pointer border border-black/10 text-sm p-2 py-1 rounded-lg"
                >
                  <option value="paypal">Paypal</option>
                  <option value="account">Bank Account</option>
                </select>
              </div>
              {errors?.paymentMethod && (
                <p className="text-xs text-red-500">
                  *{errors.paymentMethod.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-light text-sm mb-1">Amount</label>
              <div className="relative px-3 border flex items-center gap-3 py-2 rounded-lg">
                <span className=" text-gray-500">₹</span>
                <input
                  type="number"
                  className="w-full focus:outline-none"
                  placeholder="Enter amount"
                  {...register("amount", {
                    required: "Amount is required",
                    validate: (value) => {
                      if (parseFloat(value) > balance) {
                        return `Amount cannot be greater than ₹${balance}`;
                      }
                      return true;
                    },
                  })}
                />
              </div>
              {errors?.amount && (
                <p className="text-xs text-red-500">*{errors.amount.message}</p>
              )}
              <p className="text-gray-500 text-sm flex items-center">
                <span className="mr-1">
                  {" "}
                  <CgCopyright size={20} />{" "}
                </span>{" "}
                Minimum withdrawal amount is <b className="ml-1"> ₹1000</b>
              </p>
            </div>

            <div className="w-full flex items-center gap-5">
              <CommonButton
                label="Submit Request"
                onClick={handleSubmit((data) => submitHandler(data))}
                variant="primary"
                loading={loading}
              />
              <CommonButton
                label="Cancel"
                onClick={handleClose}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export default RequestWithdrawal;
