"use client";

import Image from "next/image";
import TableHeader from "@/components/instructor/TableHeader";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const AdminTutorsSalesEarning = ({  }) => {
  const { adminTutionEarning } = useSelector(
    (state) => state.admin.adminEarning
  );
  const [viewMore, setViewMore] = useState(null);

  const headingsData = [
    "SNO.",
    "Teacher Details",
    "Total Courses",
    "Total Enrollments",
    "Total Sales Amount",
  ];

  return (
    <div className="overflow-x-auto rounded-b-lg">
      <h2 className="text-2xl font-bold text-dark mb-6 px-5">
        Earning By Tutions
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
            adminTutionEarning?.map((course, index) => (
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
                        src={course?.teacherProfilePhoto}
                        alt={course?.teacherName}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <span>{course?.teacherName}</span>
                  </td>

                  {/* Total Courses */}
                  <td className="py-4 px-6 pl-8 text-start">
                    {course?.courses?.length || 0}
                  </td>

                  {/* Total Enrollments */}
                  <td className="py-4 px-6 pl-8 text-start">
                    {course?.totalEnrollments || 0}
                  </td>

                  {/* Total Sales Amount */}
                  <td className="py-4 px-6 pl-8 text-start text-green-500">
                    ${course?.totalSalesAmount || 0}
                  </td>
                </tr>

                {/* Expanded Row for Course Details */}
                {viewMore === index && (
                  <tr className="bg-white">
                    <td colSpan={5} className="p-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Course Details:
                      </h3>
                      <div className="mt-2 grid grid-cols-3 gap-5">
                        {course?.courses?.map((c, idx) => (
                          <div
                            key={idx}
                            className="grid grid-cols-4 gap-4 px-4 py-2 h-full border rounded-md shadow-sm bg-white"
                          >
                            <div className="w-full h-full col-span-2 relative">
                              <Image
                                src={c?.courseImage}
                                alt={c?.courseName}
                                fill={true}
                                className="rounded object-center object-cover"
                              />
                            </div>
                            <div className="col-span-2 text-sm">
                              <p className="font-semibold text-sm  line-clamp-2">
                                {c?.courseName}
                              </p>
                              <p className="text-gray-600">
                                Enrollments: {c?.enrollments || 0}
                              </p>
                              <p className="text-gray-600">
                                Total Sales: ${c?.totalSales || 0}
                              </p>
                              <p className="text-gray-600">
                                Avg Price: ${c?.avgPrice || 0}
                              </p>
                            </div>
                          </div>
                        ))}
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