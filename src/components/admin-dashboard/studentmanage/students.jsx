import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TableHeader from "@/components/instructor/TableHeader";
import TeacherFilter from "../teachers/teacherFilter";
import { Pagination } from "@/components/student-dashboard/Pagination";
import { GrView } from "react-icons/gr";
import { getStudent } from "@/store/slices/admin-dashboard/studentSlice";

const StudentsTable = () => {
  const dispatch = useDispatch();
  const { students, totalPages, currentPage } = useSelector(
    (state) => state.admin.student
  ); // Adjust the path to your state
  const [hoveredRow, setHoveredRow] = useState(null);
  const [page, setPage] = useState(1); // Current page state
  const columns = ["S.No.", "Name", "Email ID", "Mobile no", "Registered No", "Action"];

  // Fetch student data on component mount or page change
  useEffect(() => {
    dispatch(getStudent({ search: "", limit: 10, page }));
  }, [dispatch, page]); // Fetch students when page changes

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the page number
  };

  return (
    <div className="rounded-lg p-1 w-11/12 mx-auto">
      <TeacherFilter />
      <div className="overflow-x-auto mt-4">
        <table className="w-full border border-gray-200 rounded-lg">
          <TableHeader headingsData={columns} />
          <tbody className="text-center">
            {students?.map((item, index) => (
              <tr
                key={item._id}
                className="bg-[#F9FAFB] rounded-lg transition-all duration-300 relative border-t border-gray-200"
                onMouseEnter={() => setHoveredRow(item._id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4 text-sm">{(page - 1) * 2 + index + 1}</td> {/* Serial Number */}
                <td className="p-4 flex items-center gap-5 justify-center">
                  <img
                    src={item?.user?.profilePhoto || "/placeholder.svg"}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p>{item?.user?.firstName}</p>
                  </div>
                </td>
                <td className="p-4 text-sm">{item?.user?.email}</td>
                <td className="p-4 text-sm">{item?.user?.phone?.number}</td>
                <td className="p-4 text-sm">{item.requestedOn}</td>
                <td className="p-4 relative">
                  <button className="text-gray-600">
                    <GrView className="text-base" />
                  </button>
                </td>
                {hoveredRow === item._id && (
                  <td
                    colSpan={6}
                    className="absolute left-0 right-0 top-[110%] p-2 bg-white shadow-lg rounded-lg z-10 transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 animate-fadeDown"
                  >
                    <div className="grid grid-cols-6 gap-2 text-center">
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Total Students</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Active Enrollment</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Completed Enrollment</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">No. of Booking Sessions</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">No. of Learners</p>
                      </div>
                      <div>
                        <p className="text-base font-bold">02</p>
                        <p className="text-sm">Bookings Cancelled</p>
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages} // Pass totalPages from the API response
        onPageChange={handlePageChange} // Pass page change handler
      />
    </div>
  );
};

export default StudentsTable;
