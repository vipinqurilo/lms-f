import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import TableHeader from "../instructor/TableHeader";

const TableComponent = ({ title, data, setData, toggleIsAdd, setIsEdit }) => {
  return (
    <div className="space-y-2 w-full !rounded-lg">
      <div className="w-full !overflow-x-auto rounded-lg border border-black/10">
        <table className="w-full text-nowrap rounded-lg">
          <TableHeader
            headingsData={[
              "Title",
              "Institution",
              "Start Date",
              "End Date",
              "Document",
              "Actions",
            ]}
          />
          <tbody>
            {data?.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-5 text-center items-center justify-center text-light border border-t-0 border-black/10"
                >
                  No {title} Added
                </td>
              </tr>
            ) : (
              data?.map((item, index) => (
                <tr
                  key={index}
                  className={`text-left border-b border-black/10 ${index === data?.length-1 && "!border-b-0"}`}
                >
                  <td className="px-6 py-3 text-left lg:w-96 text-wrap">
                    <h2 className="font-bold">{item?.title}</h2>
                  </td>
                  <td className="px-6 py-3">
                    <p className="font-medium text-sm">
                      {item?.institution || ""} {item?.location}
                    </p>
                  </td>
                  <td className="px-6 py-3">
                    {item?.startyear || (
                      <span className="w-full block text-center">--</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {item?.endyear || (
                      <span className="w-full block text-center">--</span>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    {item?.certificate ? (
                      <a
                        href={item.certificate}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary font-nunito text-sm hover:text-blue-700 transition-custom"
                      >
                        View Document
                      </a>
                    ) : (
                      "No certificate available"
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <div className="w-full flex items-center gap-2">
                      <button
                        onClick={() => {
                          toggleIsAdd();
                          setIsEdit(item);
                        }}
                        className="w-6 h-6 border border-black/10 hover:text-green-600 hover:border-green-600 transition-custom flex items-center justify-center hover:bg-gray-100 rounded"
                      >
                        <AiOutlineEdit size={16} />
                      </button>
                      <button
                        onClick={() =>
                          setData((prev) =>
                            prev?.filter(
                              (entry) => entry?.title !== item?.title
                            )
                          )
                        }
                        className="w-6 h-6 border border-black/10 hover:text-red-600 hover:border-red-600 flex items-center justify-center hover:bg-gray-100 rounded transition-custom"
                      >
                        <MdOutlineDelete size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
