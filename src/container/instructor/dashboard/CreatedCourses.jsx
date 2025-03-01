import RejectReasonPopup from "@/components/instructor/RejectReasonPopup";
import TableHeader from "@/components/instructor/TableHeader";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const CreatedCourses = ({
  title = "Recently Created Courses",
  headingsData,
  data,
  status,
  isCols = false,
}) => {
  const isAdmin = useSelector(
    (state) => state.user?.authUser?.role === "admin" || null
  );

  console.log(isAdmin, "role");

  const getStatusCss = (status) => {
    return status === "unpublished"
      ? "bg-red-200 text-red-800"
      : status === "published"
      ? "bg-green-200 text-green-800"
      : status === "pending"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-gray-200 text-gray-800";
  };

  return (
    <div className="">
      {title !== "" && (
        <h2 className="text-2xl font-bold text-dark mb-6">{title}</h2>
      )}
      <div className="bg-white !rounded-b-lg shadow-md ">
        <div className="overflow-x-auto">
          <table className="w-full rounded-lg bg-gray-100">
            <TableHeader headingsData={headingsData} />
            <tbody className="divide-y divide-gray-100 bg-white">
              {data?.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 w-[60%]">
                    <div className="w-full grid grid-cols-4 gap-5">
                      <div className="w-full h-full relative">
                        <Image
                          src={course?.image}
                          alt={course?.title}
                          // width={1000}
                          // height={1000}
                          fill={true}
                          className="rounded-lg object-cover"
                        />
                      </div>
                      <div
                        className={`hover:text-primary ${
                          isCols ? "col-span-3" : "col-span-2"
                        }`}
                      >
                        {course?.title}
                        <p className="line-clamp-3 text-light/60 text-sm">
                          {course?.des}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="text-light/60">
                      {course?.value1 ? course?.value1 : "-"}
                    </div>
                  </td>
                  {isAdmin && (
                    <td className={`px-6 py-4 `}>
                      <div className="text-light/60">
                        {course?.firstName ? course?.firstName : "-"}
                      </div>
                    </td>
                  )}
                  {headingsData?.length > 3 && (
                    <td className="px-6 py-4">
                      <div
                        className={`text-light/60 px-4 py-2 font-semibold rounded-full text-sm !capitalize ${
                          headingsData[2] === "Status" &&
                          `${getStatusCss(
                            course?.value2
                          )} w-fit capitalize flex items-center gap-2`
                        }`}
                      >
                        {course?.value2}
                        {/* {course?.value2 === "unpublished" && (
                          <RejectReasonPopup data={course?.rejectionReason} />
                        )} */}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4">
                    <div
                      className={`text-light/60 px-4 py-2 font-semibold rounded-full text-sm !capitalize ${
                        headingsData[2] === "Status" &&
                        headingsData?.length < 4 &&
                        `${getStatusCss(
                          headingsData?.length > 3
                            ? course?.value3
                            : course?.value2
                        )} w-fit capitalize`
                      }`}
                    >
                      {headingsData?.length > 3
                        ? course?.value3
                        : course?.value2}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatedCourses;
