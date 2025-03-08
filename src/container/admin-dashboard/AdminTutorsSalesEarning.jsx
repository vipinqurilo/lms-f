"use client";

import Image from "next/image";
import TableHeader from "@/components/instructor/TableHeader";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AdminTutorsSalesEarning = ({}) => {
  const { adminTutionEarning } = useSelector(
    (state) => state.admin.adminEarning
  );
  const [viewMore, setViewMore] = useState(null);

  const headingsData = [
    "SNO.",
    "Teacher Details",
    "Total Subjects",
    "Total Sessions",
    "Total Sales Amount",
  ];

  return (
    <div className="overflow-x-auto rounded-b-lg">
      <h2 className="text-2xl font-bold text-dark mb-6 px-5">
        Sales By Tutions
      </h2>
      <table className="w-full border-collapse border border-gray-300">
        <TableHeader headingsData={headingsData} />
        <tbody>
          {adminTutionEarning?.length === 0 ? (
            <tr>
              <td className="py-4 text-center" colSpan={headingsData.length}>
                No Records Found
              </td>
            </tr>
          ) : (
            adminTutionEarning?.map((tution, index) => (
              <React.Fragment key={index}>
                {/* Main Row */}
                <tr
                  onClick={() =>
                    viewMore === index ? setViewMore(null) : setViewMore(index)
                  }
                  className={`border-b border-gray-200 text-sm cursor-pointer hover:bg-secondary/5 ${
                    viewMore === index ? "bg-secondary/5" : ""
                  }`}
                >
                  <td className="py-4 px-6 pl-8 text-start">{index + 1}</td>

                  <td className="py-4 px-6 pl-8 flex items-center gap-2 w-full">
                    <div className="relative w-12 h-12">
                      <Image
                        src={tution?.teacherProfilePhoto}
                        alt={tution?.teacherName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <span>{tution?.teacherName}</span>
                  </td>

                  {/* Total Courses */}
                  <td className="py-4 px-6 pl-8 text-start">
                    {tution?.subjects?.length || 0}
                  </td>

                  {/* Total Enrollments */}
                  <td className="py-4 px-6 pl-8 text-start">
                    {tution?.totalSessions || 0}
                  </td>

                  {/* Total Sales Amount */}
                  <td className="py-4 px-6 pl-8 text-start text-green-500">
                    ${tution?.totalSalesAmount || 0}
                  </td>
                </tr>

                {/* Expanded Row for Course Details */}
                {viewMore === index && (
                  <tr className="bg-white">
                    <td colSpan={5} className="p-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Subjects Taught:
                      </h3>
                      <div className="mt-2 overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead className="bg-gray-100">
                            <tr className="border border-gray-300">
                              <th className="p-2 text-left border border-gray-300">
                                Image
                              </th>
                              <th className="p-2 text-left border border-gray-300">
                                Subject Name
                              </th>
                              <th className="p-2 text-left border border-gray-300">
                                Sessions
                              </th>
                              <th className="p-2 text-left border border-gray-300">
                                Total Sales
                              </th>
                              <th className="p-2 text-left border border-gray-300">
                                Avg Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tution?.subjects?.map((c, idx) => (
                              <tr key={idx} className="border border-gray-300">
                                <td className="p-2 border border-gray-300">
                                  <div className="w-16 h-16 relative">
                                    <Image
                                      src={
                                        c?.subjectImage ||
                                        "/assets/common/profile.png"
                                      }
                                      alt={c?.subjectName}
                                      fill={true}
                                      className="rounded object-cover"
                                    />
                                  </div>
                                </td>
                                <td className="p-2 border border-gray-300 font-semibold">
                                  {c?.subjectName}
                                </td>
                                <td className="p-2 border border-gray-300 text-gray-600">
                                  {c?.sessions || 0}
                                </td>
                                <td className="p-2 border border-gray-300 text-gray-600">
                                  ${c?.totalSales || 0}
                                </td>
                                <td className="p-2 border border-gray-300 text-gray-600">
                                  ${c?.avgPrice || 0}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTutorsSalesEarning;
