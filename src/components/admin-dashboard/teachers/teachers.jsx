"use client";

import TableHeader from "@/components/instructor/TableHeader";
import { getAllTeachers } from "@/store/slices/admin-dashboard/teachersSlice";
import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import TeacherFilter from "./teacherFilter";

const TeachersTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const dispatch = useDispatch();

  const { teachers, isLoading, error } = useSelector(
    (state) => state.admin.teachers
  );

  useEffect(() => {
    dispatch(getAllTeachers());
  }, [dispatch]);

  const columns = [
    "S. No.",
    "Name",
    "Email ID",
    "Mobile no",
    "Registered No",
    "Action",
  ];

  if (isLoading["getAllTeachers"]) {
    return <div>Loading...</div>;
  }

  if (error["getAllTeachers"]) {
    return <div>Error fetching teachers: {error["getAllTeachers"]}</div>;
  }

  return (
    <div className="rounded-lg p-1 w- mx-auto">
      <TeacherFilter />
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg ">
          <TableHeader headingsData={columns} />
          <tbody className="text-center">
            {teachers?.map((item, index) => {
              const {
                user,
                totalEnrolledStudents,
                totalSessions,
                confirmedSessions,
                completedSessions,
                cancelledSessions,
              } = item;

              return (
                <>
                  {/* Main Row */}
                  <tr
                    key={item._id}
                    className="transition-all duration-300 border-t border-gray-200 bg-white hover:bg-white hover:shadow-lg hover:rounded-md cursor-pointer"
                    onMouseEnter={() => setHoveredRow(item._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="text-sm py-4">{index + 1}</td>
                    <td className="p-4 flex items-center gap-5 justify-center ">
                      <img
                        src={user?.profilePhoto || "/placeholder.svg"}
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-sm">
                        <p>
                          {user?.firstName} {user?.lastName}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{user?.email}</td>
                    <td className="p-4 text-sm">{user?.phone?.number}</td>
                    <td className="p-4 text-sm">{item.requestedOn || "N/A"}</td>
                    <td className="p-4">
                      <button className="text-gray-600">
                        <GrView className="text-base" />
                      </button>
                    </td>
                  </tr>

                  {/* Spacer Row (Only render when hovered) */}
                  {hoveredRow === item._id ? (
                    <tr className=""></tr>
                  ) : (
                    <tr className="h-2"></tr>
                  )}

                  {hoveredRow === item._id && (
                    <>
                      <tr className="transition-all duration-300 ease-in-out border-b-2">
                        <td
                          colSpan={6}
                          className="p-4 bg-white   animate-fadeDow border-t border-gray-200 py-7"
                        >
                          <div className="flex items-center space-x-9 ml-11">
                            <h3 className="text-sm font-semibold">
                              Session Details :
                            </h3>
                            <div className="flex space-x-8">
                              {/* Pending Courses */}
                              <div className="border rounded-lg px-4 h-9 flex w-32 items-center justify-center space-x-1 shadow-sm">
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Published Courses */}
                              <div className="border rounded-lg px-4 h-9 flex w-32 items-center justify-center space-x-1 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Published
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Unpublished Courses */}
                              <div className="border rounded-lg px-4 h-9 flex w-36 items-center justify-center space-x-1 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Unpublished
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Total Enrolled Students */}
                              <div className="border rounded-lg px-4 h-9 flex w-40 items-center justify-center space-x-1 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Total Enrolled
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Horizontal Line */}
   



                      {/* Course Details */}
                      <tr className="transition-all duration-300 ease-in-out border-b-2">
                        <td
                          colSpan={6}
                          className="p-4 bg-white shadow-lg animate-fadeDown"
                        >
                          <div className="flex items-center gap-4 p-4 ml-2 rounded-lg">
                            <div>
                              <h3 className="text-sm font-semibold w-36">
                                Courses Details :
                              </h3>
                            </div>
                            <div className="flex grid-cols-6 gap-4">
                              {/* Cancelled */}
                              <div className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Cancelled
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Complete */}
                              <div className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Complete
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Total */}
                              <div className="border rounded-lg px-6 h-9 flex w-fit items-center justify-center space-x-2 shadow-sm">
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Scheduled */}
                              <div className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Scheduled
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Confirmed */}
                              <div className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Confirmed
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>

                              {/* Rescheduled */}
                              <div className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm">
                                <p className="text-sm text-gray-600">
                                  Rescheduled
                                </p>
                                <p className="text-base font-bold">02</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>

                      {/* Spacer Row */}
                      <tr className="h-2"></tr>
                    </>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersTable;
