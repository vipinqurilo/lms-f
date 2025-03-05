"use client";

import TableHeader from "@/components/instructor/TableHeader";
import React from "react";
import { useSelector } from "react-redux";

const EarningTutionTable = () => {
  const { tutionEarning } = useSelector((state) => state.instructor.earning);

  const headingsData = [
    "SNO.",
    "Subject",
    "Sessions",
    "Amount",
    "Commission(60%)",
    "Earnings",
  ];
  return (
    <div className="overflow-x-auto rounded-b-lg">
      <h2 className="text-2xl font-bold text-dark mb-6 px-5">
        Earning By Tution Sessions
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <TableHeader headingsData={headingsData} />
        <tbody>
          {tutionEarning?.length === 0 ? (
            <tr>
              <td className="py-4 text-center" colSpan={headingsData.length}>
                No Records Found
              </td>
            </tr>
          ) : (
            tutionEarning?.map((tution, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-sm"
              >
                <td className="py-4 px-6 pl-8 text-start">{index + 1}</td>

                <td className="py-4 px-6 pl-8 flex items-center gap-2 w-full">
                  <span>{tution?.subjectName}</span>
                </td>

                {/* Enrollments */}
                <td className="py-4 px-6 pl-8 text-start">
                  {tution?.sessions || 0}
                </td>

                {/* Total Amount */}
                <td className="py-4 px-6 pl-8 text-start">
                  ${tution?.totalAmount || 0}
                </td>

                {/* Commission (40%) */}
                <td className="py-4 px-6 pl-8 text-start text-red-500">
                  -${tution?.commission || 0}
                </td>

                {/* Earnings */}
                <td className="py-4 px-6 pl-8 text-start text-green-500">
                  ${tution?.earnings || 0}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EarningTutionTable;
