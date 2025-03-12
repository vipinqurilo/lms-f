import RejectReasonPopup from "@/components/instructor/RejectReasonPopup";
import TableHeader from "@/components/instructor/TableHeader";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const CreatedCourses = ({
  title = "Recently Created Courses",
  headingsData,
  data,
  status,
  link = null,
  isCols = false,
}) => {
  const isAdmin = useSelector(
    (state) => state.user?.authUser?.role === "admin" || null
  );

  const getStatusCss = (status) => {
    return status === "unpublished"
      ? "bg-red-200 text-red-800"
      : status === "published"
      ? "bg-green-200 text-green-800"
      : status === "pending"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-gray-200 text-gray-800";
  };

  console.log(data, "data");

  return (
    <div className="w-full">
      {title !== "" && (
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark mb-6">{title}</h2>
          {link !== null && (
            <Link
              href={link}
              prefetch={false}
              className="hover:text-secondary font-medium transition-custom"
            >
              View All →
            </Link>
          )}
        </div>
      )}
      <div className="bg-white !rounded-b-lg shadow-md w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full rounded-lg">
            <TableHeader headingsData={headingsData} />
            <tbody className="divide-y divide-gray-100 bg-white w-full">
              {data?.length === 0 ? (
                <tr>
                  <td
                    className="p-6 text-center"
                    colSpan={headingsData?.length}
                  >
                    No Course Created
                  </td>
                </tr>
              ) : (
                data?.map((course, index) => (
                  <tr key={index} className="">
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
                          <Link href={`/courses/${course?.id}`}>
                            {course?.title}
                          </Link>
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreatedCourses;
