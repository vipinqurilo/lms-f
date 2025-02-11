import TableHeader from "@/components/instructor/TableHeader";
import Image from "next/image";
import React from "react";

const CreatedCourses = ({
  title = "Recently Created Courses",
  headingsData,
  data,
  status,
}) => {
  const getStatusCss = (status) => {
    return status === "Draft"
      ? "bg-gray-200 text-gray-800"
      : status === "publish"
      ? "bg-green-200 text-green-800"
      : status === "pending"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-red-200 text-red-800";
  };
  return (
    <div className="pt-8">
      <h2 className="text-2xl font-bold text-dark mb-6">{title}</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hiddenp-4 ">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full rounded-lg">
            <TableHeader headingsData={headingsData} />
            <tbody className="divide-y divide-gray-100">
              {data?.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 w-[60%]">
                    <div className="w-full grid grid-cols-4 gap-5">
                      <Image
                        src={course?.image}
                        alt={course?.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full rounded-lg object-cover"
                      />
                      <div className=" hover:text-primary col-span-2">
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
                  <td className="px-6 py-4">
                    <div
                      className={`text-light/60 px-4 py-2 font-semibold rounded-full text-sm ${
                        headingsData[2] === "Status" &&
                        `${getStatusCss(course?.value2)} w-fit capitalize`
                      }`}
                    >
                      {course?.value2}
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
