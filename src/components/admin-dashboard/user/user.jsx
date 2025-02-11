import TableHeader from "@/components/instructor/TableHeader";
import React, { useState } from "react";
import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi"; // Importing icons
import EditModal from "./EditModel";
import { Pagination } from "@/components/student-dashboard/Pagination";

const initialWithdrawals = [
  {
    image: "https://via.placeholder.com/40",
    method: "Landen Mosciski",
    email: "landen.mosciski194@dummyid.com",
    phone: "+599 28571271",
    userId: "109",
    type: "Affiliate",
    registered: "Sep 11, 2022 16:40",
    featured: "No",
    verified: "Yes",
    status: true, // Default status
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Larissa Mosciski",
    email: "larissa.mosciski974@dummyid.com",
    phone: "+855 13253244",
    userId: "108",
    type: "Affiliate",
    registered: "Oct 02, 2022 01:02",
    featured: "No",
    verified: "Yes",
    status: false,
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Vaughn Rowe",
    email: "vaughn.rowe476@dummyid.com",
    phone: "+39 69147863",
    userId: "107",
    type: "Affiliate",
    registered: "Oct 14, 2022 14:59",
    featured: "No",
    verified: "Yes",
    status: true,
  },
];

const columns = [
  "ID",
  "Image",
  "Name/ID",
  "Email/Phone",
  "Type",
  "Registered",
   "Verified",
  "Status", // Added status column
  "Action",
];

const WithdrawalHistory = () => {
  const [withdrawals, setWithdrawals] = useState(initialWithdrawals); // Set the withdrawals data in state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  const openModal = (withdrawal) => {
    setSelectedWithdrawal(withdrawal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWithdrawal(null);
  };

  const toggleStatus = (index) => {
    const updatedWithdrawals = [...withdrawals];
    updatedWithdrawals[index].status = !updatedWithdrawals[index].status;
    setWithdrawals(updatedWithdrawals); // Update withdrawals state
  };

  return (
    <div className="rounded-lg p-6 w-full max-w-6xl mx-auto">
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />

          <tbody>
            {withdrawals.map((withdrawal, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>
                <td className="py-4 px-4">
                  <img
                    src={withdrawal.image}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p className="font-medium text-sm">{withdrawal.method}</p>
                  <p className="text-sm text-gray-500">
                    User ID: {withdrawal.userId}
                  </p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  <p>{withdrawal.email}</p>
                  <p className="text-sm text-gray-500">{withdrawal.phone}</p>
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {withdrawal.type}
                </td>
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {withdrawal.registered}
                </td>
                
                <td className="py-4 px-4 text-gray-700 text-sm">
                  {withdrawal.verified}
                </td>

                {/* Status Toggle */}
                <td className="py-4 px-3 text-center text-sm">
                  <button
                    className={`py-2 px-4 rounded-full ${
                      withdrawal.status
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-700"
                    }`}
                    onClick={() => toggleStatus(index)}
                  >
                    {withdrawal.status ? "Active" : "Inactive"}
                  </button>
                </td>

                <td className="py-4 px-4 text-center text-sm">
                  <div className="flex items-center justify-center space-x-3">
                    <button className="text-gray-600 hover:text-blue-500">
                      <FiEye size={15} />
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-yellow-500">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          checked={withdrawal.status}
                          onChange={() => toggleStatus(index)} // Toggle status when clicked
                        />
                        <div className="relative w-9 h-4 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.6 after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                      </label>
                    </button>

                    <button className="text-gray-600 hover:text-gray-500">
                      <FiMoreVertical size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination
      <div className="px-6 py-4 ">
            <Pagination
              currentPage={currentPage}
              totalPages={2}
              onPageChange={setCurrentPage}
            />
          </div> */}



      <EditModal
        isOpen={isModalOpen}
        onClose={closeModal}
        withdrawal={selectedWithdrawal}
      />
    </div>
  );
};

export default WithdrawalHistory;
