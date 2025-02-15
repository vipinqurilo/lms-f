"use client";
import React, { useState } from "react";
import TableHeader from "@/components/instructor/TableHeader";
import { useSelector } from "react-redux";
import { IoLogoPaypal } from "react-icons/io5";
import { Pagination } from "@/components/student-dashboard/Pagination";
import InstructorButton from "@/components/instructor/InstructorButton";
import { PiHandWithdraw } from "react-icons/pi";
import RequestWithdrawal from "./RequestWithdrawal";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const headingsData = [
  "Withdrawal Method",
  "Requested On",
  "Reason",
  "Amount",
  "Status",
];

const WithdrawalContainer = () => {
  const { withdrawals, balance } = useSelector((state) => state.withdrawal);
  const [isWithdrawal, setisWithdrawal] = useState(false);

  const getStatusCss = (status) => {
    let css = "";

    switch (status) {
      case "Pending":
        css = "text-yellow-500 bg-yellow-100";
        break;
      case "Success":
        css = "text-green-500 bg-green-100";
        break;
      default:
        css = "text-red-500 bg-red-100";
    }

    return css;
  };

  return (
    <div className="w-full flex flex-col items-start gap-6 py-5">
      <h3 className="text-lg px-5 font-semibold">Withdrawal History</h3>
      <div className="w-full px-5 flex items-center justify-between">
        <div className="w-full flex items-center gap-2">
          {/* <div className="w-10 h-10 rounded border border-black/10 flex items-center justify-center text-blue-500">
            <IoLogoPaypal size={25} />
          </div> */}

          <MdOutlineAccountBalanceWallet size={40} className="text-primary" />

          <div className="">
            <p>Current Balance</p>
            <p className=" font-medium">
              You have{" "}
              <span className="font-semibold text-background">₹{balance}</span> ready
              to withdraw now
            </p>
          </div>
        </div>

        <InstructorButton
          tab={"Withdrawal Request"}
          icon={<PiHandWithdraw size={20} />}
          condition={"text-nowrap"}
          handleClick={() => setisWithdrawal(true)}
        />
      </div>
      <table className="w-full border-l border-r border-black/10 !rounded-lg">
        <TableHeader headingsData={headingsData} />
        <tbody>
          {withdrawals?.map((row, index) => (
            <tr
              key={index}
              className={`border-b border-black/10 ${
                index === withdrawals?.length - 1 && "!rounded-lg"
              }`}
            >
              <td className="px-6 py-4">
                <div className="w-full flex items-center gap-2">
                  <div className="w-10 h-10 rounded border border-black/10 flex items-center justify-center text-blue-500">
                    <IoLogoPaypal size={25} />
                  </div>
                  <div className="">
                    <h6 className="font-semibold">{row?.method}</h6>
                    <p className="text-light text-sm">{row?.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="">
                  <h6 className="font-semibold">{row?.requestedOn}</h6>
                  <p className="text-light text-sm">{row?.time}</p>
                </div>
              </td>
              <td className="px-6 py-4 font-medium">{row?.reason}</td>
              <td className="px-6 py-4 font-medium">₹{row?.amount}</td>
              <td className={`px-6 py-4 font-medium`}>
                <span
                  className={`${getStatusCss(
                    row?.status
                  )} px-3 py-2 rounded-lg text-sm font-medium`}
                >
                  {row?.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full px-5">
        <Pagination
          currentPage={1}
          totalPages={2}
          onPageChange={() => console.log(2)}
        />
      </div>

      {isWithdrawal && (
        <RequestWithdrawal
          handleClose={() => setisWithdrawal(false)}
          balance={balance}
        />
      )}
    </div>
  );
};

export default WithdrawalContainer;
