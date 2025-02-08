import TableHeader from "@/components/instructor/TableHeader";
import { StatusBadge } from "@/components/student-dashboard/StatusBadge";
import React from "react";

const SupportTable = ({ tickets, setMessages }) => {
  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full ">
        <TableHeader
          headingsData={[
            "Ticket ID",
            "Date",
            "Subject",
            "Priority",
            "Category",
            "Status",
          ]}
        />

        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => setMessages(ticket?.messages)}
            >
              <td className="px-6 py-4 text-sm text-gray-600">{ticket.id}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{ticket.date}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {ticket.subject}
              </td>
              <td className="px-6 py-4">
                <StatusBadge type="priority" value={ticket.priority} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {ticket.category}
              </td>
              <td className="px-6 py-4">
                <StatusBadge type="status" value={ticket.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTable;
