import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    {
      id: "1",
      title: "WordPress for Beginners - Master WordPress Quickly",
      description:
        "Learn to build and manage your own WordPress website from scratch. This course covers everything from installation and theme customization to creating content and adding plugins. Perfect for beginners with no prior experience.",
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
      status: "Publish",
    },
    {
      id: "2",
      title: "Sketch from A to Z (2024): Become an app designer",
      description:
        "Master Sketch and become a professional app designer. This comprehensive course covers all the essential tools and techniques, from basic UI design principles to creating complex prototypes. Learn by doing with real-world projects.",
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
      status: "Draft",
    },
    {
      id: "3",
      title: "Learn Angular Fundamentals From Beginning to Advanced",
      description:
        "Become proficient in Angular, one of the most popular JavaScript frameworks. This course takes you from the basics to advanced concepts, teaching you how to build dynamic and scalable web applications. Ideal for those with some JavaScript experience.",
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
      status: "Pending",
    },
    {
      id: "4",
      title: "Mastering UI/UX Design with Figma & Adobe XD",
      description:
        "Learn the fundamentals of UI/UX design using industry-standard tools like Figma and Adobe XD. This course covers user research, wireframing, prototyping, and visual design. Create stunning and user-friendly interfaces for web and mobile applications.",
      instructor: {
        name: "Emily Davis",
        image: "/assets/student-dashboard/user/user4.jpg",
      },
      thumbnail: "/assets/student-dashboard/course/course-05.jpg",
      lessons: 18,
      duration: "14hr 10min",
      rating: 4.5,
      reviews: 15,
      price: 85,
      originalPrice: 100,
      status: "Publish",
    },
    {
      id: "5",
      title: "Full-Stack JavaScript Development with React & Node.js",
      description:
        "Become a full-stack developer by mastering React for front-end development and Node.js for back-end development. This course teaches you how to build complete web applications, from designing the user interface to creating APIs and managing databases.",
      instructor: {
        name: "David Wilson",
        image: "/assets/student-dashboard/user/user5.jpg",
      },
      thumbnail: "/assets/student-dashboard/course/course-02.jpg",
      lessons: 30,
      duration: "25hr 50min",
      rating: 4.2,
      reviews: 22,
      price: 90,
      originalPrice: 120,
      status: "Pending",
    },
    {
      id: "6",
      title: "Digital Marketing Mastery: SEO, PPC & Social Media",
      description:
        "Learn the essential strategies of digital marketing, including SEO, PPC advertising, and social media marketing. This course will equip you with the skills to create effective campaigns and drive traffic to your website or business.",
      instructor: {
        name: "Sophia Martinez",
        image: "/assets/student-dashboard/user/user6.jpg",
      },
      thumbnail: "/assets/student-dashboard/course/course-07.jpg",
      lessons: 22,
      duration: "17hr 15min",
      rating: 3.8,
      reviews: 14,
      price: 70,
      originalPrice: 85,
      status: "Draft",
    },
    {
      id: "7",
      title: "Cybersecurity Fundamentals: Ethical Hacking & Pen Testing",
      description:
        "Gain a foundational understanding of cybersecurity principles and practices. This course introduces you to ethical hacking and penetration testing, covering topics like network security, vulnerability assessment, and incident response.",
      instructor: {
        name: "James Brown",
        image: "/assets/student-dashboard/user/user7.jpg",
      },
      thumbnail: "/assets/student-dashboard/course/course-08.jpg",
      lessons: 28,
      duration: "20hr 35min",
      rating: 4.7,
      reviews: 30,
      price: 110,
      originalPrice: 140,
      status: "Publish",
    },
  ],
  courseAddData: {},
  step: 1,
  isLoading: {},
  error: {},
};

export const getAllIntructorCourses = CreateApiAsyncThunk(
  "GET/course/getAllIntructorCourses",
  () => api.get(`/course/instructor/get`)
);

export const createCourse = CreateApiAsyncThunk("course/createCourse", (data) =>
  api.post(`/course`, data)
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    updateStep: (state, action) => {
      state.step = action.payload;
    },
    updateCourseAddDataState: (state, action) => {
      const { field, data } = action.payload;
      state.courseAddData = {
        ...state.courseAddData,
        [field]: data,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIntructorCourses.pending, (state) => {
        state.isLoading["getAllIntructorCourses"] = true;
      })
      .addCase(getAllIntructorCourses.fulfilled, (state, action) => {
        state.isLoading["getAllIntructorCourses"] = false;
        // state.courses = action.payload.data;
      })
      .addCase(getAllIntructorCourses.rejected, (state, action) => {
        state.isLoading["getAllIntructorCourses"] = false;
        state.error = action.payload;
      })
      .addCase(createCourse.pending, (state) => {
        state.isLoading["createCourse"] = true;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.isLoading["createCourse"] = false;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.isLoading["createCourse"] = false;
        state.error = action.payload;
      });
  },
});

export const { updateCourseAddDataState, updateStep } = courseSlice.actions;
export default courseSlice.reducer;
