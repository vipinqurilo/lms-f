import TableHeader from "@/components/instructor/TableHeader";
import React, { useState } from "react";
import { FiEye, FiEdit2, FiMoreVertical } from "react-icons/fi"; // Importing icons
import { useSelector } from "react-redux";

const withdrawals = [
  {
    user: "Landen Mosciski",
    ordertype: "webinars",
    serviceType: "offline",
    netTotal: "20",
    payment: "Is Paid",
    status: "completed",
    date: "Sep 11, 2022 16:40",
    link: "",
  },
];

const columns = [
  "ID",
  "Course",
  "Title  ",
  "service type",
  "Net total",
  "Payment",
  "Status",
  "Date time",
  "Action",
];

const Course = () => {
  const { data: courses } = useSelector(
    (state) => state.admin?.course?.courses
  ) || { data: [] };

  console.log(courses,"admin approval")
  const [statusList, setStatusList] = useState(
    withdrawals.map((withdrawal) => withdrawal.status)
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleStatus = (index) => {
    const updatedStatus = [...statusList];
    updatedStatus[index] = !updatedStatus[index];
    setStatusList(updatedStatus);
  };

  return (
    <div className="    rounded-lg p-6 w-full max-w-6xl mx-auto ">
      {/* Search Filters */}
      <div className="border rounded-lg bg-gray-50">
        <div
          className="p-4 cursor-pointer flex justify-between items-center bg-gray-100 rounded-t-lg "
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
                  Name or email
                </span>
                <input type="text" className="border  h-9 rounded w-full" />
              </div>

              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">
                  User type
                </span>
                <select className="border h-9 rounded w-full">
                  <option>User type</option>
                  <option>Affiliate</option>
                  <option>Customer</option>
                </select>
              </div>

              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">
                  Email verified
                </span>
                <select className="border h-9 rounded w-full">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">
                  Featured
                </span>
                <select className="border h-9 rounded w-full">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">
                  Status
                </span>
                <select className="border h-9 rounded w-full">
                  <option>Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">
                  Reg date from
                </span>
                <input type="date" className="border  h-9 rounded w-full" />
              </div>

              <div className="leading-9">
                <span className="text-sm  font-medium  text-gray-700">
                  Reg date to
                </span>
                <input type="date" className="border  h-9 rounded w-full" />
              </div>
              <div className="flex gap-3 mt-9 ">
                <div>
                  <button className="bg-blue-600 text-white px-4 py-1 rounded">
                    Search
                  </button>
                </div>
                <div>
                  {" "}
                  <button className="bg-gray-500 text-white px-4 py-1 rounded">
                    Clear
                  </button>
                </div>
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
  {courses?.map((course, index) => (
    <tr key={index} className="border-t border-gray-200">
      <td className="py-4 px-4 text-gray-700 text-sm">{index + 1}</td>

      <td className="py-4 px-4 text-gray-700 text-sm">
        <p className="font-medium text-sm">{course?.courseTitle}</p>
      </td>

      <td className="py-4 px-4 text-gray-700 text-sm">
        {/* Displaying Lesson Titles */}
        {course?.courseContent?.map((lesson, i) => (
          <p key={i} className="text-sm text-gray-600">{lesson.moduleTitle}</p>
        ))}
      </td>

      <td className="py-4 px-4 text-gray-700 text-sm">
        {course.serviceType || "N/A"}
      </td>
      <td className="py-4 px-4 text-gray-700 text-sm">
        {course.coursePrice || "N/A"}
      </td>
      <td className="py-4 px-4 text-gray-700 text-sm">
        {course.payment || "N/A"}
      </td>
      <td className="py-4 px-4 text-gray-700 text-sm">
        {course.status || "N/A"}
      </td>
      <td className="py-4 px-4 text-gray-700 text-sm">
        {new Date(course.updatedAt).toLocaleDateString()}
      </td>

      <td className="py-4 px-4 text-center text-sm">
        <div className="flex items-center justify-center space-x-3">
          <button className="text-gray-600 hover:text-blue-500">
            <FiEye size={15} />
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
    </div>
  );
};

export default Course;
