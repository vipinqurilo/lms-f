import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import dateFormat from "dateformat";

const WalletList = ({ txn }) => {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-lg rounded-l-none shadow-sm ${
        txn.type === "deposit"
          ? "bg-green-50 border-l-4 border-green-500"
          : "bg-red-50 border-l-4 border-red-500"
      }`}
    >
      <div className="flex items-start gap-3">
        {txn.type === "deposit" ? (
          <FaArrowUp className="text-green-500 text-lg" />
        ) : (
          <FaArrowDown className="text-red-500 text-lg" />
        )}
        <div className="-mt-1.5">
          <p className="font-semibold first-letter:capitalize">{txn.description}</p>
          <p className="text-sm text-gray-500">
            {dateFormat(txn.createdAt, "mmm dd, yyyy")}
          </p>
        </div>
      </div>

      <p
        className={`font-semibold text-lg ${
          txn.type === "deposit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {txn.type === "deposit" ? "+" : "-"} ₹{txn.amount}
      </p>
    </div>
  );
};

export default WalletList;
