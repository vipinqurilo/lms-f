"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentDashboardLayout from "../../../layouts/student-dashboard/StudentDashboardLayout";
import { Download } from "lucide-react";
import { Pagination } from "../../../components/student-dashboard/Pagination";

import { fetchOrderHistoryAsync } from "@/store/slices/student-dashboard/ordersSlice";
import dateFormat from "dateformat";
import TableHeader from "@/components/instructor/TableHeader";
import TitleComp from "@/components/instructor/TitleComp";
import UserFilter from "@/components/admin-dashboard/user/UserFilter";
import Loader from "@/components/common/Loader";

export default function OrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { orderHistory: orders, isLoading } = useSelector(
    (state) => state.student.orders
  );
  const [filters, setfilters] = useState({});

  useEffect(() => {
    const data = {};

    if (filters?.search) data.search = filters.search;
    if (filters?.startDate) data.startDate = filters.startDate;
    if (filters?.endDate) data.endDate = filters.endDate;

    dispatch(fetchOrderHistoryAsync(data));
  }, [dispatch, filters.search, filters.startDate, filters.endDate]);

  return (
    <StudentDashboardLayout>
      <div className="p-10">
        <div className="dashboard-container">
          <TitleComp
            heading={"Order History"}
            des={
              "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, corporis."
            }
          />

          <div className="w-full !sticky !-top-0 bg-white px-5">
            <UserFilter
              isRole={false}
              isStatus={false}
              statusData={[]}
              onApplyFilters={setfilters}
            />
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-b-lg shadow-md overflow-hidden">
            {isLoading["fetchOrderHistoryAsync"] ? (
              <div className="text-center py-8">
                <Loader isBig={true} color={"text-secondary"} />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <TableHeader
                    headingsData={[
                      "S.No",
                      "Order ID",
                      "Payment ID",
                      "Course Name",
                      "Date",
                      "Price",
                    ]}
                  />
                  <tbody className="divide-y divide-gray-200">
                    {orders?.map((order, index) => (
                      <tr key={order._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          #{order?.orderId}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order?.paymentId}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {order?.courseId?.courseTitle}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {dateFormat(order?.createdAt, "mmm dd yyyy")}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                          {order?.amount} {order?.currency}
                        </td>
                        {/* <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 text-sm font-medium rounded-full
                          ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status || "Pending"}
                        </span>
                      </td> */}
                        {/* <td className="px-6 py-4">
                        <button className="text-gray-400 hover:text-primary">
                          <Download className="w-5 h-5" />
                        </button>
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={2}
        onPageChange={setCurrentPage}
      />
    </StudentDashboardLayout>
  );
}
