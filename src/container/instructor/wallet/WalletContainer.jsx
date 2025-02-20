"use client";

import UserFilter from "@/components/admin-dashboard/user/UserFilter";
import Loader from "@/components/common/Loader";
import TitleComp from "@/components/instructor/TitleComp";
import WalletList from "@/components/instructor/wallet/WalletList";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { getWalletDetails } from "@/store/slices/instructor/walletSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const WalletContainer = () => {
  const dispatch = useDispatch();
  const { transactions, totalPages } = useSelector(
    (state) => state.instructor.wallet
  );
  const [page, setPage] = useState(1);
  const loading = useSelector(
    (state) => state.instructor.wallet.isLoading.getWalletDetails
  );
  const [filtersData, setfiltersData] = useState({});

  useEffect(() => {
    const data = {};
    if (filtersData?.startDate) data.startDate = filtersData.startDate;
    if (filtersData?.endDate) data.endDate = filtersData.endDate;
    if (page) data.page = page;

    dispatch(getWalletDetails(data));
  }, [filtersData, page]);

  return (
    <>
      <div className="dashboard-container space-y-6">
        <TitleComp
          heading="Wallet Overview"
          des="Manage your balance, track transactions, and withdraw funds securely."
        />
        <div className="w-full flex items-center justify-between px-5">
          {["Opening Balance", "closing Balance"].map((type, index) => (
            <div className="" key={index}>
              <h3 className="capitalize font-semibold">{type}</h3>
              <p className="text-sm text-light">{index === 0 ? "₹1000" : "₹5000"}</p>
            </div>
          ))}
        </div>
        <div className="w-full !sticky !-top-12 bg-white px-5">
          <UserFilter
            onApplyFilters={(data) => setfiltersData(data)}
            statusData={[]}
            isSearch={false}
            isRole={false}
            isStatus={false}
          />
        </div>

        {loading ? (
          <div className="w-full py-10 flex items-center justify-center">
            <Loader color={"text-secondary"} isBig={true} />
          </div>
        ) : (
          <div className="flex flex-col gap-5 !mb-10 px-5">
            {transactions?.transactions?.length === 0 ? (
              <p className="w-full flex items-center justify-center">
                No Transactions
              </p>
            ) : (
              transactions?.transactions?.map((txn, index) => (
                <WalletList key={index} txn={txn} />
              ))
            )}
          </div>
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default WalletContainer;
