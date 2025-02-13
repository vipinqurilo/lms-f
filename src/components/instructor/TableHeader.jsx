import React from "react";

const TableHeader = ({ headingsData }) => {
  return (
    <thead className="bg-gray-100 w-full  border-b border-black/10">
      <tr>
        {headingsData?.map((heading, index) => (
          <th
            key={index}
            className="px-6 py-4 text-[15px] text-left font-semibold text-black"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
