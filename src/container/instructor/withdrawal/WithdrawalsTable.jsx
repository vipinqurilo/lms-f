"use client";

import React, { useState } from "react";
import { IoLogoPaypal } from "react-icons/io5";
import dateFormat from "dateformat";
import TableHeader from "@/components/instructor/TableHeader";
import { FaCircleInfo } from "react-icons/fa6";
import { updateWithdrawalStatus } from "@/store/slices/withdrawalSlice";
import { useDispatch } from "react-redux";
import RejectModal from "@/components/admin-dashboard/teacherrequests/rejectModel";

const WithdrawalsTable = ({ headingsData, withdrawals }) => {
  const [isEdit, setIsEdited] = useState(null);
  const dispatch = useDispatch();

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

  const handleEdit = (id) => {
    setIsEdited(id);
  };

  const handleApproval = (id, status) => {
    dispatch(updateWithdrawalStatus({ id, data: status }));
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
              <td className="px-6 py-4 font-medium">{row?.user?.firstName}</td>
              <td className="px-6 py-4 font-medium">₹{row?.amount}</td>
              {isEdit === row?._id ? (
                <td className="px-6 py-4 font-medium">
                  <div className="flex gap-2">
                    <button
                      className="text-green-500 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-lg text-sm font-medium"
                      onClick={() => handleApproval(row?.id, "approve")}
                    >
                      Approve
                    </button>
                    <button
                      className="text-red-500 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-medium"
                      onClick={() => handleApproval(row?.id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              ) : (
                <td className={`px-6 py-4 font-medium`}>
                  <button
                    onClick={() => handleEdit(row?._id)}
                    className={`${getStatusCss(
                      row?.approvalStatus
                    )} px-3 py-2 rounded-lg text-sm font-medium capitalize flex items-center gap-2 w-fit relative`}
                  >
                    {row?.approvalStatus}
                    {row?.approvalStatus === "rejected" && (
                      <div className="group relative">
                        <FaCircleInfo
                          size={16}
                          className="cursor-pointer text-gray-500 group-hover:text-gray-700"
                        />
                        {/* Tooltip */}
                        <div className="absolute -left-1/2 -translate-x-1/2 mt-4 top-full w-40 p-2 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                          {row?.rejectionReason || "No reason provided"}
                        </div>
                      </div>
                    )}
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default WithdrawalsTable;
