// import React, { useEffect } from "react";
// import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
// import Course from "@/components/admin-dashboard/approvals/courses/Course";
// import TitleComp from "@/components/instructor/TitleComp";
// import { useDispatch } from "react-redux";
//  import Teacher from "@/components/admin-dashboard/approvals/teachers/Teacher";

// export default function index() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllAdminTeacher());
//   }, [dispatch]);

//   return (
//     <StudentDashboardLayout>
//       <main className="dashboard-container  mt-4">
//         <TitleComp
//           heading={"Courses Approval Requests"}
//           des={"following are the approval requests for all the courses."}
//         />
//         <Teacher/>
//       </main>
//     </StudentDashboardLayout>
//   );
// }
import React, { useEffect } from "react";
import StudentDashboardLayout from "@/layouts/student-dashboard/StudentDashboardLayout";
import Course from "@/components/admin-dashboard/approvals/courses/Course";
import TitleComp from "@/components/instructor/TitleComp";
import { useDispatch } from "react-redux";
 import Teacher from "@/components/admin-dashboard/approvals/teachers/Teacher";
import TeacherRequests from "@/components/admin-dashboard/teacherrequests";

export default function index() {
  
  return (
    <StudentDashboardLayout>
      <main className="dashboard-container  mt-4">
        <TitleComp
          heading={"Courses Approval Requests"}
          des={"following are the approval requests for all the courses."}
        />
        <TeacherRequests/>
      </main>
    </StudentDashboardLayout>
  );
}
