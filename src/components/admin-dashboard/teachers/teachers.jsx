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
    <div className="rounded-lg w- mx-auto p-10">
      <TeacherFilter />
      <div className="overflow-x-auto mt-4 flex flex-col gap-4">
          <TableHeader headingsData={columns} />
          <div className="text-center ">
            {teachers?.map((item, index) => {
              const { user } = item;
              
              return (
                <div 
                  key={item._id}
                  className="w-full bg-white border border-gray-200 rounded-md overflow-hidden mb-2 "
                  onMouseEnter={() => setHoveredRow(item._id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Main Row */}
                  <div className="bg-white  grid grid-cols-12 items-center">
                    <div className="col-span-2 text-sm py-4   ">{index + 1}</div>
                    <div className="col-span-2 p-4 flex items-center gap-5">
                      <img
                        src={user?.profilePhoto || "/placeholder.svg"}
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="text-sm">
                        <p>{user?.firstName} {user?.lastName}</p>
                      </div>
                    </div>
                    <div className="col-span-2 p-4 text-sm">{user?.email}</div>
                    <div className="col-span-2 p-4 text-sm">{user?.phone?.number}</div>
                    <div className="col-span-2 p-4 text-sm">{item.requestedOn || "N/A"}</div>
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
                        ? 'max-h-[500px] opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    {/* Session Details */}
                    <div className="bg-white relative border-gray-200 p-4">
                      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[93%] h-[1px] bg-gray-200"></div>
                      <div className="flex items-center space-x-9 ml-11">
                        <h3 className="text-sm font-semibold">Session Details :</h3>
                        <div className="flex space-x-8">
                          {/* Session stats boxes */}
                          {[
                            { label: "Pending", value: "02" },
                            { label: "Published", value: "02" },
                            { label: "Unpublished", value: "02" },
                            { label: "Total Enrolled", value: "02" }
                          ].map((stat, idx) => (
                            <div key={idx} className="border rounded-lg px-4 h-9 flex w-32 items-center justify-center space-x-1 shadow-sm">
                              <p className="text-sm text-gray-600 text-nowrap">{stat.label}</p>
                              <p className="text-base font-bold">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Course Details */}
                    <div className="bg-white relative border-gray-200 p-4">
                    <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[93%] h-[1px] bg-gray-200"></div>

                      <div className="flex items-center gap-4 p-4 ml-2">
                        <h3 className="text-sm font-semibold w-36">Course Details :</h3>
                        <div className="flex gap-4 flex-wrap">
                          {[
                            "Cancelled", "Complete", "Total", 
                            "Scheduled", "Confirmed", "Rescheduled"
                          ].map((status, idx) => (
                            <div key={idx} className="border rounded-lg px-6 h-9 flex items-center justify-center space-x-2 shadow-sm">
                              <p className="text-sm text-gray-600">{status}</p>
                              <p className="text-base font-bold">02</p>
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
  );
};

export default TeachersTable;
