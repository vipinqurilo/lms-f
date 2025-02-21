import React from "react";

const TableHeader = ({ headingsData }) => {
  return (
    <thead className="bg-gray-200 w-full">
      <tr>
        {headingsData?.map((heading, index) => (
          <th
            key={index}
            className="px-6 py-4 text-[15px] text-start font-semibold text-black"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
