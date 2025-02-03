import TableHeader from "@/components/instructor/TableHeader";
import Image from "next/image";
import React from "react";

const CreatedCourses = ({
  title = "Recently Created Courses",
  headingsData,
  data,
}) => {
  const getStatusCss = (status) => {
    return status === "Draft"
      ? "bg-gray-200 text-gray-800"
      : status === "Publish"
      ? "bg-green-200 text-green-800"
      : status === "Pending"
      ? "bg-yellow-200 text-yellow-800"
      : "bg-red-200 text-red-800";
  };
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-dark mb-6">{title}</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hiddenp-4 ">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TableHeader headingsData={headingsData} />
            <tbody className="divide-y divide-gray-200">
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
                  <td key={index} className="px-6 py-4 ">
                    <button className="text-light/60 hover:text-primary">
                      {course?.value1 ? course?.value1 : "-"}
                    </button>
                  </td>
                  <td key={index} className="px-6 py-4">
                    <button
                      className={`text-light/60 hover:text-primary px-4 py-2 font-semibold rounded-full text-sm ${
                        headingsData[2] !== "Amount" && getStatusCss(course?.value2)
                      }`}
                    >
                      {course?.value2}
                    </button>
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
