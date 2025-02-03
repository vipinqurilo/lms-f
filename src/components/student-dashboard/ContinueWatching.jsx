"use client"

import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"

const courses = [
  {
    id: 1,
    category: {
      name: "FRONT END",
      color: "bg-blue-100 text-blue-600",
    },
    title: "Beginner's Guide to Becoming a Professional Front-End Developer",
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    mentor: {
      name: "Leonardo samual",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 2,
    category: {
      name: "UI/UX DESIGN",
      color: "bg-purple-100 text-purple-600",
    },
    title: "Optimizing User Experience with the Best UI/UX Design",
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    mentor: {
      name: "Bayu Saito",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: 3,
    category: {
      name: "BRANDING",
      color: "bg-pink-100 text-pink-600",
    },
    title: "Reviving and Refresh Company Image",
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    mentor: {
      name: "Padhang Satrio",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  },
]

export default function ContinueWatching() {
  const swiperRef = useRef(null)

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Continue Watching</h2>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={2.5}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {courses.map((course) => (
          <SwiperSlide key={course.id}>
            <CourseCard course={course} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

function CourseCard({ course }) {
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="relative">
        <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </button>
      </div>
      <div className="p-5">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${course.category.color}`}>
          {course.category.name}
        </div>
        <h3 className="text-gray-900 font-semibold mb-4 line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-3">
          <img
            src={course.mentor.avatar || "/placeholder.svg"}
            alt={course.mentor.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="text-sm text-gray-600">{course.mentor.name}</div>
        </div>
      </div>
    </div>
  )
}

