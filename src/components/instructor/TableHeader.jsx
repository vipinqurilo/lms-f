import React from "react";

const TableHeader = ({ headingsData }) => {
  return (
    <div className="bg-gray-100 w-full rounded-lg border-b ">
      <div className="grid grid-cols-12 ">
        {headingsData?.map((heading, index) => (
          <th
            key={index}
            className="col-span-2 px-6 py-4 text-[15px] text-center font-semibold text-black"
          >
            {heading}
          </th>
        ))}
      </div>
    </div>
  );
};

export default TableHeader;
