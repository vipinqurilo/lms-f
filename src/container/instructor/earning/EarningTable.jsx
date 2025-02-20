import React from "react";
import Image from "next/image";
import TableHeader from "@/components/instructor/TableHeader";
import CreatedCourses from "../dashboard/CreatedCourses";

const EarningTable = ({
  title = "Earnings Overview",
  headingsData,
  bookingsData,
  coursesData,
  activeTab,
}) => {

  return (
    <div className=" px-5">
      <h2 className="text-2xl font-bold text-dark mb-6">{title}</h2>

      {activeTab === "Courses" ? (
        <>
          {/* <CreatedCourses headingsData={["Courses", "Earning", ]} data={coursesData} /> */}
          {/* Best-Selling Courses Section */}
          <div className="bg-green-100 rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              🏆 Best Selling Courses
            </h3>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full rounded-lg">
                <TableHeader
                  headingsData={["Course Name", "Total Sales", "Earnings"]}
                />
                <tbody className="divide-y divide-gray-100">
                  {coursesData
                    ?.sort((a, b) => b.sales - a.sales)
                    .slice(0, 3)
                    .map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{course?.title}</td>
                        <td className="px-6 py-4">
                          {course?.sales || "0"} Sales
                        </td>
                        <td className="px-6 py-4">
                          ${course?.earnings || "0"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Least-Selling Courses Section */}
          <div className="bg-red-100 rounded-lg shadow-md p-4 mb-6">
            <h3 className="text-xl font-semibold text-red-800 mb-4">
              📉 Least Selling Courses
            </h3>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full rounded-lg">
                <TableHeader
                  headingsData={["Course Name", "Total Sales", "Earnings"]}
                />
                <tbody className="divide-y divide-gray-100">
                  {coursesData
                    ?.sort((a, b) => a.sales - b.sales)
                    .slice(0, 3)
                    .map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4">{course?.title}</td>
                        <td className="px-6 py-4">
                          {course?.sales || "0"} Sales
                        </td>
                        <td className="px-6 py-4">
                          ${course?.earnings || "0"}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg border border-black/10 p-4 mb-6">
          <h3 className="text-xl font-semibold text-dark mb-4">
            📅 Earnings from Bookings
          </h3>
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full rounded-lg">
              <TableHeader headingsData={headingsData} />
              <tbody className="divide-y divide-gray-100">
                {bookingsData?.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 w-[40%]">
                      {booking?.title || "No Title"}
                    </td>
                    <td className="px-6 py-4">
                      {booking?.amount ? `$${booking?.amount}` : "-"}
                    </td>
                    <td className="px-6 py-4">{booking?.date || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default EarningTable;
