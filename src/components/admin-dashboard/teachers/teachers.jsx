"use client";

import { getAllTeachers } from "@/store/slices/admin-dashboard/teachersSlice";
import { useState, useEffect } from "react";
import { GrView } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import TeacherFilter from "./teacherFilter";
import Loader from "@/components/common/Loader";
import TitleComp from "@/components/instructor/TitleComp";
import { Pagination } from "@/components/student-dashboard/Pagination";

const TeachersTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  const { teachers, isLoading, error , totalPages,} = useSelector(
    (state) => state.admin.teachers
  );


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    dispatch(getAllTeachers({ page, limit: 2 })); // Set the limit as needed
  }, [dispatch, page]);
  
  const columns = [
    "S. No.",
    "Name",
    "Email ID",
    "Mobile no",
    "Registered No",
    "Action",
  ];

  if (isLoading["getAllTeachers"]) {
    return (
      <div className="w-full h-[80%] flex items-center justify-center">
        <Loader isBig={true} color={"text-secondary"} />
      </div>
    );
  }

  // if (error["getAllTeachers"]) {
  //   return <div>Error fetching teachers: {error["getAllTeachers"]}</div>;
  // }

  return (
    <div className="p-10">
      <div className="dashboard-container">
        <TitleComp
          heading={"Teachers List"}
          des={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis, ad!"
          }
        />
        <div className="w-full sticky top-0 py-4 px-5 bg-white">
          <TeacherFilter />
        </div>
        <div className="overflow-x-auto mt-4 rounded-b-lg">
          <div className="w-full grid grid-cols-6 gap-4 bg-gray-200 font-semibold py-4">
            {columns?.map((column, index) => (
              <p key={index} className="text-center">
                {column}
              </p>
            ))}
          </div>
          <div className="text-center ">
            {teachers?.map((item, index) => {
              const { user } = item;
              return (
                <div
                  key={item._id}
                  className={`w-full bg-white border-b border-black/10 overflow-hidden ${
                    hoveredRow === item?._id && "!bg-gray-100 cursor-pointer "
                  }`}
                  onMouseEnter={() => setHoveredRow(item._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Main Row */}
                  <div className="bg-white  grid grid-cols-12 items-center">
                    <div className="col-span-2 text-sm py-4   ">
                      {index + 1}
                    </div>
                    <div className="col-span-2 p-4 flex items-center gap-5">
                      <img
                        src={user?.profilePhoto || "/assets/common/profile.png"}
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-sm">
                        <p>
                          {user?.firstName} {user?.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 p-4 text-sm">{user?.email}</div>
                    <div className="col-span-2 p-4 text-sm">
                      {user?.phone?.number || "N/A"}
                    </div>
                    <div className="col-span-2 p-4 text-sm">
                      {item.requestedOn || "N/A"}
                    </div>
                    <div className="col-span-2 p-4">
                      <button className="text-gray-600">
                        <GrView className="text-base" />
                      </button>
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <div
                    className={`transition-all duration-300 origin-top ${
                      hoveredRow === item._id
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {/* Session Details */}
                    <div className="bg-white relative border-gray-200 p-7">
                      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[93%] h-[1px] bg-gray-200"></div>
                      <div className="flex items-center space-x-9 ml-11">
                        <h3 className="text-sm font-semibold">
                          Session Details :
                        </h3>
                        <div className="flex space-x-8">
                          {/* Session item boxes */}
                          {[
                            {
                              label: "Total Sessions",
                              value: item.totalSessions,
                            },
                            {
                              label: "Scheduled",
                              value: item.scheduledSessions,
                            },
                            {
                              label: "Confirmed",
                              value: item.confirmedSessions,
                            },
                            {
                              label: "Completed",
                              value: item.completedSessions,
                            },
                            {
                              label: "Cancelled",
                              value: item.cancelledSessions,
                            },
                            {
                              label: "Rescheduled",
                              value: item.rescheduledSessions,
                            },
                          ].map((stat, idx) => (
                            <div
                              key={idx}
                              className="border rounded-lg px-4 h-9 flex w-32 items-center justify-center space-x-1 shadow-sm"
                            >
                              <p className="text-sm text-gray-600 text-nowrap">
                                {stat?.label}
                              </p>
                              <p className="text-base font-bold">
                                {stat?.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="bg-white relative border-gray-200 p-4">
                      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[93%] h-[1px] bg-gray-200"></div>

                      <div className="flex items-center gap-4 p-4 ml-2">
                        <h3 className="text-sm font-semibold w-36">
                          Course Details :
                        </h3>
                        <div className="flex gap-4 flex-wrap">
                          {[
                            { label: "Pending", value: item.pendingCourses },
                            {
                              label: "Published",
                              value: item.publishedCourses,
                            },
                            {
                              label: "Unpublished",
                              value: item.unpublishedCourses,
                            },
                          ].map((status, idx) => (
                            <div
                              key={idx}
                              className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm"
                            >
                              <p className="text-sm text-gray-600">
                                {status?.label}
                              </p>
                              <p className="text-base font-bold">
                                {status?.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
        <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
    </div>
  );
};

export default TeachersTable;
