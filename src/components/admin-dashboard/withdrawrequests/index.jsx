import React, { useState } from "react";
import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi";
import TableHeader from "@/components/instructor/TableHeader";
import { RxCross2 } from "react-icons/rx";
import { FaRegCalendarCheck } from "react-icons/fa6";
const withdrawals = [
  {
    id: "#0000001",
    user: "Lydia Deckow",
    email: "lydia.deckow@dummyid.com",
    txnFee: "$10.00",
    amount: "$120.00",
    accountDetails: [
      { label: "Bank name", value: "My Money Bank" },
      { label: "Account name", value: "Lydia" },
      { label: "Account number", value: "202386987" },
      { label: "IFSC/Swift Code", value: "MMB20238" },
    ],
    date: "Sep 16, 2023 17:34",
    status: "Pending",
  },
];

const columns = [
  "ID",
  "User",
  "Txn Fee",
  "Amount",
  "Account",
  "Date",
  "Status",
  "Action",
];

const WithdrawRequests = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="bg-white  rounded-lg p-6 w-full max-w-6xl mx-auto ">
      {/* Search Filters */}
      <div className="border rounded-lg bg-gray-50">
        <div
          className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 rounded-t-lg"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          <h2 className="text-lg font-semibold text-gray-700">Search</h2>
          <span
            className="text-gray-600 transition-transform duration-500"
            style={{
              transform: isSearchOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </div>
        <div
          className={`transition-all duration-700 ease-in-out ${
            isSearchOpen ? "max-h-[500px] opacity-700" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="p-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                Keyword
                </span>
                <input type="text" className="border h-9 rounded w-full" />
              </div>
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                Keyword
                </span>
                <input type="text" className="border h-9 rounded w-full" />
              </div>
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">
                Keyword
                </span>
                <input type="text" className="border h-9 rounded w-full" />
              </div>
              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">Reg date from</span>
                <input type="date" className="border  h-9 rounded w-full" />
              </div>

              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">Start from</span>
                <input type="date" className="border  h-9 rounded w-full" />
              </div>
              <div className="leading-9">
                <span className="text-sm font-medium text-gray-700">End to</span>
                <input type="date" className="border h-9 rounded w-full" />
              </div>
              <div className="flex gap-3 mt-9">
                <button className="bg-blue-600 text-white px-4 py-1 rounded">
                  Search
                </button>
                <button className="bg-gray-500 text-white px-4 py-1 rounded">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody>
            {withdrawals.map((withdrawal, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700">{withdrawal.id}</td>
                <td className="py-4 px-4 text-gray-700">
                  <p className="font-medium">{withdrawal.user}</p>
                  <p className="text-sm text-gray-500">{withdrawal.email}</p>
                </td>
                <td className="py-4 px-4 text-gray-700">{withdrawal.txnFee}</td>
                <td className="py-4 px-4 text-gray-700">{withdrawal.amount}</td>
                <td className="py-1 px- text-gray-700 whitespace-pre-wrap">
                  {withdrawal.accountDetails.map((detail, i) => (
                    <p key={i}>
                      <span className="font-bold text-sm ">
                        {detail.label}:
                      </span>{" "}
                      <span className="text-sm">{detail.value}</span>
                     </p>
                  ))}
                </td>
                <td className="py-4 px-4 text-gray-700">{withdrawal.date}</td>
                <td className="py-4 px-4 text-center text-gray-700">
                  {withdrawal.status}
                </td>
                <td className="py-4 px-4 text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <button className="text-gray-600 hover:text-blue-500">
                      <FaRegCalendarCheck size={18} />
                    </button>
                    <button className="text-gray-600 hover:text-yellow-500">
                      <RxCross2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawRequests;
