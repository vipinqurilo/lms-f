import ScheduleView from "@/components/student-dashboard/ScheduleView";
import { CourseCard } from "../../components/student-dashboard/CourseCard";
import { StatsCard } from "../../components/student-dashboard/StatsCard";
import StudentDashboardLayout from "../../layouts/student-dashboard/StudentDashboardLayout";

const stats = [
  { title: "Enrolled Courses", value: 12 },
  { title: "Active Courses", value: "03" },
  { title: "Completed Courses", value: 13 },
  { title: "Booked Courses", value: 3 },
];

const recentCourses = [
  {
    id: "1",
    title: "Wordpress for Beginners - Master Wordpress Quickly",
    instructor: {
      name: "Cooper",
      image: "/assets/student-dashboard/user/user1.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-03.jpg",
    lessons: 12,
    duration: "70hr 30min",
    rating: 5,
    reviews: 20,
    price: 80,
    originalPrice: 99,
  },
  {
    id: "2",
    title: "Sketch from A to Z (2024): Become an app designer",
    instructor: {
      name: "Jenny",
      image: "/assets/student-dashboard/user/user2.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-04.jpg",
    lessons: 10,
    duration: "40hr 10min",
    rating: 3,
    reviews: 18,
    isFree: true,
  },
  {
    id: "3",
    title: "Learn Angular Fundamentals From beginning to advance...",
    instructor: {
      name: "Nicole Brown",
      image: "/assets/student-dashboard/user/user3.jpg",
    },
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    lessons: 15,
    duration: "80hr 40min",
    rating: 4,
    reviews: 10,
    price: 65,
    originalPrice: 70,
  },
];

export default function DashboardPage() {
  return (
    <StudentDashboardLayout className="space-y-8">
      <div className="flex gap-6">
        <div className=" h-fit grid grid-cols-1 md:grid-cols-2 gap-6 w-2/3">
          {stats.map((stat, index) => (
            <StatsCard key={index} title={stat.title} value={stat.value} />
          ))}
        </div>
        <div className="w-1/3">
          <ScheduleView />
        </div>
      </div>
      <div className="py-8">
        <h2 className="text-2xl font-bold text-dark mb-6">
          Recently Enrolled Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentCourses.map((course) => (
            <CourseCard key={course.id} course={course} type="view" />
          ))}
        </div>
      </div>

    </StudentDashboardLayout>
  );
}
