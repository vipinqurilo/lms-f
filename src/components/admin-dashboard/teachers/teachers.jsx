"use client"

import TableHeader from "@/components/instructor/TableHeader"
import { getAllTeachers, updateTeacherStatus } from "@/store/slices/admin-dashboard/teachersSlice"
import { useState, useEffect } from "react"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"
import { useDispatch, useSelector } from "react-redux"

const TeachersTable = () => {
  const [hoveredRow, setHoveredRow] = useState(null)
  const dispatch = useDispatch()

  const { teachers, isLoading, error } = useSelector((state) => state.admin.teachers)

  useEffect(() => {
    dispatch(getAllTeachers())
  }, [dispatch])

  const columns = ["Name", "Mobile no", "Email ID", "Requested on", "Status", "Action"]

  const handleStatusChange = (teacherId, status) => {
    dispatch(updateTeacherStatus({ teacherId, status }))
  }

  if (isLoading["getAllTeachers"]) {
    return <div>Loading...</div>
  }

  if (error["getAllTeachers"]) {
    return <div>Error fetching teachers: {error["getAllTeachers"]}</div>
  }

  return (
    <div className="p-4 ">
        <table className="w-11/12 border border-gray-300 rounded-lg border-separate border-spacing-y-4 h-full">
          <TableHeader headingsData={columns} />
          <tbody>
            {teachers.map((item) => (
              <tr
                key={item._id}
                className="bg-white rounded-lg max-h-fit transition-all duration-300 relative"
                onMouseEnter={() => setHoveredRow(item._id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="p-4 flex items-center gap-5">
                  <img
                    src={item?.user?.profilePhoto || "/placeholder.svg"}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-sm">
                    <p>{item?.user?.firstName}</p>
                  </div>
                </td>
                <td className="p-4 whitespace-pre text-sm">{item?.user?.email}</td>
                <td className="p-4 whitespace-pre text-sm">{item?.user?.phone?.number}</td>
                <td className="p-4 text-sm">{item.requestedOn}</td>
                <td className="p-4 text-sm">
                  <span className="bg-red-100 text-red-500 px-2 py-1 rounded-lg">{item.teacherStatus}</span>
                </td>
                <td className="p-4 relative">
                  <button className="text-gray-600">
                    <PiDotsThreeOutlineVerticalFill className="text-base" />
                  </button>
                </td>

                {hoveredRow === item._id && (
                  <td
                    colSpan={6}
                    className="absolute left-0 right-0 top-[110%] p-4 bg-white shadow-lg rounded-lg z-10 transition-all duration-300 ease-in-out transform opacity-100 translate-y-0 animate-fadeDown"
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
  )
}

export default TeachersTable

