"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@/components/student-dashboard/Pagination";
import InstructorButton from "@/components/instructor/InstructorButton";
import { PiHandWithdraw } from "react-icons/pi";
import RequestWithdrawal from "./RequestWithdrawal";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { getWithDrawals } from "@/store/slices/withdrawalSlice";
import UserFilter from "@/components/admin-dashboard/user/UserFilter";
import Loader from "@/components/common/Loader";
import WithdrawalsTable from "./WithdrawalsTable";

const headingsData = [
  "Withdrawal Method",
  "Requested On",
  "Reason",
  "Amount",
  "Status",
];

const WithdrawalContainer = () => {
  const dispatch = useDispatch();
  const { withdrawals, balance, totalPages } = useSelector(
    (state) => state.withdrawal
  );
  const [isWithdrawal, setisWithdrawal] = useState(false);
  const [filtersData, setfiltersData] = useState({});
  const [currentPage, setcurrentPage] = useState(1);
  const loading = useSelector(
    (state) => state.withdrawal.isLoading.getWithDrawals
  );

  useEffect(() => {
    const data = {};
    if (filtersData?.startDate) data.startDate = filtersData.startDate;
    if (filtersData?.endDate) data.endDate = filtersData.endDate;
    if (filtersData?.search) data.search = filtersData.search;
    if (filtersData?.status) data.approvalStatus = filtersData.status;
    if (currentPage) data.page = currentPage;

    dispatch(getWithDrawals(data));
  }, [filtersData, currentPage]);

  return (
    <div className="w-full flex flex-col items-start gap-6 py-5">
      <h3 className="text-lg px-5 font-semibold">Withdrawal History</h3>
      <div className="w-full px-5 flex items-center justify-between">
        <div className="w-full flex items-center gap-2">
          <MdOutlineAccountBalanceWallet size={40} className="text-primary" />

          <div className="">
            <p>Current Balance</p>
            <p className=" font-medium">
              You have{" "}
              <span className="font-semibold text-background">₹{balance}</span>{" "}
              ready to withdraw now
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
      <div className="w-full px-5 !sticky !-top-12 bg-white">
        <UserFilter onApplyFilters={(data) => setfiltersData(data)} />
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center py-10">
          <Loader color={"text-primary"} isBig={true} />
        </div>
      ) : (
        <WithdrawalsTable
          headingsData={headingsData}
          withdrawals={withdrawals}
        />
      )}

      <div className="w-full px-5">
        <Pagination
          currentPage={1}
          totalPages={totalPages}
          onPageChange={(value) => setcurrentPage(value)}
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
