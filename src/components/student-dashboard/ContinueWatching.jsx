"use client"

import { Heart, ChevronLeft, ChevronRight, CirclePause, Play } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import Link from "next/link"
import { useRouter } from "next/router"

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
      avatar: "/assets/student-dashboard/course/course-02.jpg",
    },
    progress: 65,
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
      avatar: "/assets/student-dashboard/course/course-02.jpg",
    },
    progress: 45,
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
      avatar: "/assets/student-dashboard/course/course-02.jpg",
    },
    progress: 80,
  },
  {
    id: 4,
    category: {
      name: "FRONT END",
      color: "bg-blue-100 text-blue-600",
    },
    title: "Beginner's Guide to Becoming a Professional Front-End Developer",
    thumbnail: "/assets/student-dashboard/course/course-02.jpg",
    mentor: {
      name: "Leonardo samual",
      avatar: "/assets/student-dashboard/course/course-02.jpg",
    },
    progress: 30,
  },
]

export default function ContinueWatching() {
  const swiperRef = useRef(null)
  const router = useRouter()
  return (
    <div className="w-full py-6">
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-xl font-semibold text-gray-900">Continue Watching</h2>
          <button
            className="text-sm font-medium text-secondary hover:text-primary underline"
            onClick={() => router.push("/student-dashboard/enrolled-courses")}
          >
            Go to all courses
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-secondary text-gray-400 hover:text-white "

            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-secondary text-gray-400 hover:text-white "
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
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 2.5,
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
    <div className="bg-white rounded-2xl overflow-hidden  border border-gray-100 ">
      <div className="relative w-full h-48">
        <Image
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          fill
          className="object-cover filter brightness-75" // Added black filter
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white z-10"
        >
          <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
        </button>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-10 h-10 bg-black/30 rounded-full flex items-center justify-center">
            <Play className="w-6 h-6 text-gray-200" />
          </div>
        </div>
        {/* Progress overlay at the bottom of the image */}
        <div className="absolute bottom-0 left-0  right-0 h-1 bg-gray-200 z-10">
          <div className="h-full bg-secondary transition-all duration-300" style={{ width: `${course.progress}%` }} />
        </div>
        {/* Progress percentage */}
        <div className="absolute bottom-2 right-2 px-2 py-1 text-xs font-medium bg-black/60 text-white rounded-md z-10">
          {course.progress}%
        </div>
      </div>
      <div className="p-5">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${course.category.color}`}>
          {course.category.name}
        </div>
        <h3 className="text-gray-900 font-semibold mb-4 line-clamp-2">{course.title}</h3>
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8">
            <Image
              src={course.mentor.avatar || "/placeholder.svg"}
              alt={course.mentor.name}
              fill
              className="rounded-full object-cover"
              sizes="32px"
            />
          </div>
          <div className="text-sm text-gray-600">{course.mentor.name}</div>
        </div>
      </div>
    </div>
  )
}

