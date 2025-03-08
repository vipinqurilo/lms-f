import React from "react";

const SubCourseTableForEarning = ({ course }) => {
  return (
    <tr className="bg-white">
      <td colSpan={5} className="p-4">
        <h3 className="text-lg font-semibold text-gray-700">Course Details:</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr className="border border-gray-300">
                <th className="p-2 text-left border border-gray-300">Image</th>
                <th className="p-2 text-left border border-gray-300">
                  Course Name
                </th>
                <th className="p-2 text-left border border-gray-300">
                  Enrollments
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
              {course?.courses?.map((c, idx) => (
                <tr key={idx} className="border border-gray-300">
                  <td className="p-2 border border-gray-300">
                    <div className="w-16 h-16 relative">
                      <Image
                        src={c?.courseImage}
                        alt={c?.courseName}
                        fill={true}
                        className="rounded object-cover"
                      />
                    </div>
                  </td>
                  <td className="p-2 border border-gray-300 font-semibold">
                    {c?.courseName}
                  </td>
                  <td className="p-2 border border-gray-300 text-gray-600">
                    {c?.enrollments || 0}
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
  );
};

export default SubCourseTableForEarning;
