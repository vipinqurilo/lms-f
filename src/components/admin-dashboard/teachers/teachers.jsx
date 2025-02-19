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
    <div className="rounded-lg p-1 w-11/12 mx-auto">
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
                    className="transition-all duration-300 border-t border-gray-200 bg-white hover:bg-white hover:shadow-lg cursor-pointer"
                    onMouseEnter={() => setHoveredRow(item._id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td className="text-sm py-4">{index + 1}</td>
                    <td className="p-4 flex items-center gap-5 justify-center">
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
                      <tr className="transition-all duration-300 ease-in-out border-b-2 ">
                        <td
                          colSpan={6}
                          className="p-4 bg-white shadow-lg animate-fadeDown"
                        >
                          <div className="flex justify-start items-start mb-4">
                            <h3 className="text-base font-semibold">
                              Instructor Details
                            </h3>
                          </div>
                          <div className="grid grid-cols-6 gap-2 text-center">
                            <div>
                              <p className="text-base font-bold">
                                {totalEnrolledStudents || 0}
                              </p>
                              <p className="text-sm">Total Students</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {confirmedSessions || 0}
                              </p>
                              <p className="text-sm">Active Enrollment</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {completedSessions || 0}
                              </p>
                              <p className="text-sm">Completed Enrollment</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {totalSessions || 0}
                              </p>
                              <p className="text-sm">No. of Booking Sessions</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {totalEnrolledStudents || 0}
                              </p>
                              <p className="text-sm">No. of Learners</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {cancelledSessions || 0}
                              </p>
                              <p className="text-sm">Bookings Cancelled</p>
                            </div>
                          </div>
                        </td>
                      </tr>
 
                       <tr className="transition-all duration-300 ease-in-out border-b-2">
                        <td
                          colSpan={6}
                          className="p-4 bg-white shadow-lg animate-fadeDown"
                        >
                          <div className="flex justify-start items-start mb-4">
                            <h3 className="text-base font-semibold">
                              Course Details
                            </h3>
                          </div>

                          <div className="grid grid-cols-6 gap-2 text-center">
                            <div>
                              <p className="text-base font-bold">
                                {item.pendingCourses || 0}
                              </p>
                              <p className="text-sm">Pending Courses</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {item.publishedCourses || 0}
                              </p>
                              <p className="text-sm">Published Courses</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {item.unpublishedCourses || 0}
                              </p>
                              <p className="text-sm">Unpublished Courses</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {item.scheduledSessions || 0}
                              </p>
                              <p className="text-sm">Scheduled Sessions</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {item.rescheduledSessions || 0}
                              </p>
                              <p className="text-sm">Rescheduled Sessions</p>
                            </div>
                            <div>
                              <p className="text-base font-bold">
                                {item.confirmedSessions || 0}
                              </p>
                              <p className="text-sm">Confirmed Sessions</p>
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
