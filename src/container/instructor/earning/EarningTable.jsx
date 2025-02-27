import TableHeader from "@/components/instructor/TableHeader";
import React from "react";

const EarningTable = ({ title = "Earnings Overview", headingsData, data }) => {
  return (
    <div className=" px-5 w-full">
      <h2 className="text-2xl font-bold text-dark mb-6">{title}</h2>

      <div className="w-full rounded-lg">
        <table className="w-full border border-black/10 !rounded-lg ">
          <TableHeader headingsData={headingsData} />

          <tbody>
            {data?.length === 0 ? (
              <tr>
                <td colSpan={TableHeader?.length}>No Earnings Found</td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr>
                  <td className="border border-gray-300 px-4 py-2 ">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-start">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.type === "course"
                      ? item.courseName
                      : item.serviceName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-start">
                    ${item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-start">
                    {item.type === "course"
                      ? item.enrolledStudents
                      : item.bookings}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-start">
                    ${item.revenue.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EarningTable;
