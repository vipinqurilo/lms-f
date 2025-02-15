"use client";

import React from "react";
import { IoLogoPaypal } from "react-icons/io5";
import dateFormat from "dateformat";
import TableHeader from "@/components/instructor/TableHeader";

const WithdrawalsTable = ({ headingsData, withdrawals }) => {
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
              <td className={`px-6 py-4 font-medium`}>
                <span
                  className={`${getStatusCss(
                    row?.approvalStatus
                  )} px-3 py-2 rounded-lg text-sm font-medium capitalize`}
                >
                  {row?.approvalStatus}
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
