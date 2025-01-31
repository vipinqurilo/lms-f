import TableHeader from "@/components/instructor/TableHeader";
import React from "react";

const withdrawals = [
  {
    image: "https://via.placeholder.com/40", // Replace with actual image URL
    method: "Landen Mosciski",
    email: "landen.mosciski194@dummyid.com",
    phone: "+599 28571271",
    userId: "109",
    type: "Affiliate",
    registered: "Sep 11, 2022 16:40",
    featured: "No",
    verified: "Yes",
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
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Landen Cormier",
    email: "landen.cormier892@dummyid.com",
    phone: "+676 97956161",
    userId: "106",
    type: "Affiliate",
    registered: "Nov 14, 2022 21:18",
    featured: "No",
    verified: "Yes",
  },
  {
    image: "https://via.placeholder.com/40",
    method: "Lambert Mosciski",
    email: "lambert.mosciski568@dummyid.com",
    phone: "+55 69454191",
    userId: "105",
    type: "Affiliate",
    registered: "Jan 10, 2023 10:46",
    featured: "No",
    verified: "Yes",
  },
];

const heading_data = [
  "Sr. No.",
  "Image",
  "Name/ID",
  "Email/Phone",
  "Type",
  "Registered",
  "Featured",
  "Verified",
];

const Course = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto ">
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={heading_data} />
          <tbody className="">
            {withdrawals.map((withdrawal, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="py-4 px-4 text-gray-700">{index + 1}</td>
                <td className="py-4 px-4">
                  <img
                    src={withdrawal.image}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <p className="font-medium">{withdrawal.method}</p>
                  <p className="text-sm text-gray-500">
                    User ID: {withdrawal.userId}
                  </p>
                </td>
                <td className="py-4 px-4 text-gray-700">
                  <p>{withdrawal.email}</p>
                  <p className="text-sm text-gray-500">{withdrawal.phone}</p>
                </td>
                <td className="py-4 px-4 text-gray-700">{withdrawal.type}</td>
                <td className="py-4 px-4 text-gray-700">
                  {withdrawal.registered}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {withdrawal.featured}
                </td>
                <td className="py-4 px-4 text-gray-700">
                  {withdrawal.verified}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
