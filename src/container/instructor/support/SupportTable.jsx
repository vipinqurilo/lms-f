import ModalHeading from "@/components/common/ModalHeading";
import BackgroundModal from "@/components/instructor/BackgroundModal";
import TableHeader from "@/components/instructor/TableHeader";
import { StatusBadge } from "@/components/student-dashboard/StatusBadge";
import dateFormat from "dateformat";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { VscTriangleUp } from "react-icons/vsc";
import { useSelector } from "react-redux";

const SupportTable = ({ tickets, setMessages, messages }) => {
  const headingsData = [
    "S.No",
    "Ticket ID",
    "Date",
    "Subject",
    "Category",
    "Status",
    "Attachemnts",
  ];
  const categories = useSelector((state) => state?.category?.subjects);
  const [isAttachmentOpen, setisAttachmentOpen] = useState(null);

  return (
    <div
      className="overflow-x-auto border rounded-lg"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer/Edge
      }}
    >
      <table className="w-full">
        <TableHeader headingsData={headingsData} />
        <tbody className="divide-y divide-gray-200">
          {tickets?.length === 0 ? (
            <tr>
              <td
                colSpan={headingsData?.length}
                className="px-6 py-8 text-sm text-gray-600 text-center"
              >
                No Tickets Found
              </td>
            </tr>
          ) : (
            tickets?.map((ticket, index) => (
              <tr
                key={ticket?._id}
                className={`hover:bg-gray-50 cursor-pointer text-nowrap bg-white ${
                  messages?._id === ticket?._id && "!bg-secondary/5"
                }`}
                onClick={() => setMessages(ticket)}
              >
                <td className="px-6 py-4 text-sm text-gray-600">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {ticket?._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {dateFormat(ticket?.createdAt, "dS mmm yyyy")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 !w-[20rem] text-wrap line-clamp-2">
                  {ticket.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {
                    categories?.find(
                      (category) => category?._id === ticket?.category
                    )?.name
                  }
                  {/* {ticket.category} */}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge type="status" value={ticket.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 flex items-center justify-between">
                  {ticket?.attachments?.length}
                  <button
                    type="button"
                    className="text-gray-600 hover:text-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={(e) => {
                      e.stopPropagation();
                      setisAttachmentOpen(ticket?.attachments);
                    }}
                    disabled={!ticket?.attachments?.length}
                  >
                    <FaRegEye size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {isAttachmentOpen && (
        <BackgroundModal
          PropComponent={
            <div className="w-[40%] pb-10 rounded-lg bg-white">
              <ModalHeading
                title={"View Attachments"}
                onClose={() => setisAttachmentOpen(null)}
              />
              <div className="p-4 px-10 grid grid-cols-2 gap-6">
                {isAttachmentOpen?.map((attachment, index) => (
                  <div
                    key={index}
                    className="bg-center bg-no-repeat bg-cover rounded-lg w-full h-40"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 100%), url(${attachment})`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default SupportTable;
