"use client";

import React, { useState } from "react";
import { IoLogoPaypal } from "react-icons/io5";
import dateFormat from "dateformat";
import TableHeader from "@/components/instructor/TableHeader";
import { FaCircleInfo } from "react-icons/fa6";
import Image from "next/image";
import { useSelector } from "react-redux";
import RejectReasonPopup from "@/components/instructor/RejectReasonPopup";

const WithdrawalsTable = ({ headingsData, withdrawals }) => {
  const { authUser } = useSelector((state) => state.user);

  const getStatusCss = (status) => {
    let css = "";
    switch (status) {
      case "pending":
        css = "text-yellow-500 bg-yellow-100";
        break;
      case "approved":
        css = "text-green-500 bg-green-100";
        break;
      default:
        css = "text-red-500 bg-red-100";
    }

    return css;
  };
  const getPayoutStatusCss = (status) => {
    let css = "";
    switch (status) {
      case "not_initiated":
        css = "text-orange-500 bg-orange-100";
        break;
      case "success":
        css = "text-green-600 bg-green-100";
        break;
      case "processing":
        css = "text-blue-500 bg-blue-100";
        break;
      default:
        css = "text-red-500 bg-red-100";
    }

    return css;
  };
  return (
    <table className="w-full border-l border-r border-black/10 !rounded-lg">
      <TableHeader headingsData={headingsData} />
      <tbody>
        {withdrawals?.length === 0 ? (
          <tr className="border-b border-black/10">
            <td
              colSpan={headingsData?.length - 1}
              className="px-6 py-8 text-sm text-gray-600 text-center"
            >
              No Withdrawals
            </td>
          </tr>
        ) : (
          withdrawals?.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-black/10 ${
                index === withdrawals?.length - 1 && "!rounded-lg"
              }`}
            >
              <td className="px-6 py-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-10 h-10 rounded border border-black/10 flex items-center justify-center text-blue-500">
                    {row?.paymentMethod === "paypal" ? (
                      <IoLogoPaypal size={25} />
                    ) : (
                      <span>{row?.paymentMethod?.split("")[0]}</span>
                    )}
                  </div>
                  <div className="">
                    <h6 className="font-semibold capitalize">
                      {row?.paymentMethod}
                    </h6>
                    <p className="text-light text-sm">{row?.paypalEmail}</p>
                  </div>
                </div>
              </td>

              {authUser?.role === "admin" && (
                <td className="px-6 py-4">
                  <div className="w-full flex items-center gap-2">
                    <div className="w-10 h-10 relative rounded-full border border-black/10 flex items-center justify-center text-blue-500">
                      <Image
                        src={row?.user?.profilePhoto}
                        alt={row?.user?.firstName}
                        fill={true}
                        className="w-full object-cover rounded-full"
                      />
                    </div>
                    <div className="">
                      <h6 className="font-semibold capitalize">
                        {row?.user?.firstName} {row?.user?.lastName}
                      </h6>
                      <p className="text-light text-sm">{row?.user?.email}</p>
                    </div>
                  </div>
                </td>
              )}

              <td className="px-6 py-4">
                <div className="">
                  <h6 className="font-semibold">
                    {dateFormat(row?.createdAt, "dd mmm yyyy")}
                  </h6>
                  <p className="text-light text-sm">
                    {dateFormat(row?.createdAt, "hh:MM TT")}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">₹{row?.amount}</td>
              <td className={`px-6 py-4 font-medium`}>
                <span
                  className={`${getStatusCss(
                    row?.approvalStatus
                  )} px-3 py-2 rounded-lg text-sm font-medium capitalize flex items-center gap-2 w-fit relative`}
                >
                  {row?.approvalStatus}
                  {row?.approvalStatus === "rejected" && (
                    <RejectReasonPopup data={row?.rejectionReason} />
                  )}
                </span>
              </td>
              <td className={`px-6 py-4 font-medium`}>
                <span
                  className={`${
                    row?.payoutStatus && getPayoutStatusCss(row?.payoutStatus)
                  } px-3 py-2 rounded-lg text-sm font-medium capitalize flex items-center gap-2 w-fit relative`}
                >
                  {row?.payoutStatus || "--"}
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default WithdrawalsTable;
