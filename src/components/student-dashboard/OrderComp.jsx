import React, { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import Loader from "../common/Loader";
import TableHeader from "../instructor/TableHeader";
import UserFilter from "../admin-dashboard/user/UserFilter";
import TitleComp from "../instructor/TitleComp";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistoryAsync } from "@/store/slices/student-dashboard/ordersSlice";
import { fetchAllOrders } from "@/store/slices/admin-dashboard/orderSlice";

const OrderComp = () => {
  const { authUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { orderHistory: orders, isLoading } = useSelector(
    (state) => state.student.orders
  );
  // const { orderHistory: adminOrder, isLoading: adminLoading } = useSelector(
  //   (state) => state.admin.order
  // );
  const [filters, setfilters] = useState({});

  useEffect(() => {
    const data = {
      page: currentPage,
      limit: 5,
    };
    if (filters?.search) data.search = filters.search;
    if (filters?.startDate) data.startDate = filters.startDate;
    if (filters?.endDate) data.endDate = filters.endDate;
    // if (authUser?.role === "admin") {
    //   dispatch(fetchAllOrders(data));
    // } else {
    dispatch(fetchOrderHistoryAsync(data));
    // }
  }, [
    dispatch,
    filters.search,
    filters.startDate,
    filters.endDate,
    currentPage,
  ]);

  return (
    <>
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
              // || adminLoading["fetchAllOrders"]
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
                      ...(authUser?.role === "admin" ? ["Student Name"] : []),
                      "Course Name",
                      "Date",
                      "Price",
                    ]}
                  />

                  <tbody className="divide-y divide-gray-200">
                    {(authUser?.role === "admin" ? adminOrder : orders)
                      ?.length === 0 ? (
                      <tr>
                        <td className=" py-4 text-center" colSpan={6}>
                          No Order History
                        </td>
                      </tr>
                    ) : (
                      <>
                        {/* {(authUser?.role === "admin"
                          ? adminOrder
                          : orders
                        )? */}
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
                            {authUser?.role === "admin" && (
                              <td className="px-6 py-4 text-sm text-gray-600">
                                {order?.paymentId}
                              </td>
                            )}
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {order?.courseId?.courseTitle}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {dateFormat(order?.createdAt, "mmm dd yyyy")}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                              {order?.amount} {order?.currency}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={52}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default OrderComp;
