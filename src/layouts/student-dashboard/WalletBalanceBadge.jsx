"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

const WalletBalanceBadge = () => {
  const { balance } = useSelector((state) => state.withdrawal);

  const getBalanceColor = () => {
    if (balance > 1000) return "bg-green-100 text-green-800 border-green-200";
    if (balance > 500) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-red-100 text-red-800 border-red-200";
  };

  return (
    <Link
      prefetch={false}
      href={"/instructor-dashboard/wallet"}
      className="flex items-center space-x-2"
    >
      <span className="text-gray-600 text-sm font-medium">Wallet Balance:</span>
      <span
        className={`px-4 py-2 rounded-full text-sm font-semibold border ${getBalanceColor()}`}
      >
        ₹{balance}
      </span>
    </Link>
  );
};

export default WalletBalanceBadge;
