import TableHeader from "@/components/instructor/TableHeader";
import { StatusBadge } from "@/components/student-dashboard/StatusBadge";
import dateFormat from "dateformat";
import React from "react";

const SupportTable = ({ tickets, setMessages, messages }) => {
  const headingsData = ["S.No","Ticket ID", "Date", "Subject", "Category", "Status"]

  return (
    <div
      className="overflow-x-auto border rounded-lg"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer/Edge
      }}
    >
      <table className="w-full">
        <TableHeader
          headingsData={headingsData}
        />
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
                <td className="px-6 py-4 text-sm text-gray-600">
                  {index+1}
                </td>
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
                  {ticket.category}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge type="status" value={ticket.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTable;
