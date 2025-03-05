"use client";

import Image from "next/image";
import TableHeader from "@/components/instructor/TableHeader";
import React from "react";
import { useSelector } from "react-redux";

const EarningCourseTable = () => {
  const { courseEarning } = useSelector((state) => state.instructor.earning);

  const headingsData = [
    "SNO.",
    "Course Details",
    "Enrollments",
    "Amount",
    "Commission(40%)",
    "Earnings",
  ];

  return (
    <div className="overflow-x-auto rounded-b-lg">
      <h2 className="text-2xl font-bold text-dark mb-6 px-5">Earning By Courses</h2>
      <table className="w-full border-collapse border border-gray-300">
        <TableHeader headingsData={headingsData} />
        <tbody>
          {courseEarning?.length === 0 ? (
            <tr>
              <td className="py-4 text-center" colSpan={headingsData.length}>
                No Records Found
              </td>
            </tr>
          ) : (
            courseEarning?.map((course, index) => (
              <tr
                key={course?._id}
                className="border-b border-gray-200 text-sm"
              >
                <td className="py-4 px-6 pl-8 text-start">{index + 1}</td>

                <td className="py-4 px-6 pl-8 flex items-center gap-2 w-full">
                  <div className="relative w-12 h-12">
                    <Image
                      src={course?.courseImage}
                      alt={course?.courseName}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <span>{course?.courseName}</span>
                </td>

                {/* Enrollments */}
                <td className="py-4 px-6 pl-8 text-start">
                  {course?.enrollments || 0}
                </td>

                {/* Total Amount */}
                <td className="py-4 px-6 pl-8 text-start">
                  ${course?.totalAmount || 0}
                </td>

                {/* Commission (40%) */}
                <td className="py-4 px-6 pl-8 text-start text-red-500">
                  -${course?.commission || 0}
                </td>

                {/* Earnings */}
                <td className="py-4 px-6 pl-8 text-start text-green-500">
                  ${course?.earnings || 0}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EarningCourseTable;
