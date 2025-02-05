import { api } from "@/store/api/api";
import { CreateApiAsyncThunk } from "@/store/CreateApiAsyncThunk/CreateApiAsyncThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  courseAddData: {},
  step: 1,
  isLoading: {},
  error: {},
};

export const getAllIntructorCourses = CreateApiAsyncThunk(
  "GET/course/getAllIntructorCourses",
  () => api.get(`/course/instructor/get`)
);
// export const getAllIntructorCourses = CreateApiAsyncThunk(
//   "GET/course/getAllIntructorCourses",
//   (status) => api.get(`/course/instructor/get/status=${status}`)
// );

export const createCourse = CreateApiAsyncThunk("course/createCourse", (data) =>
  api.post(`/course`, data)
);

export const deleteCourse = CreateApiAsyncThunk("course/deleteCourse", (id) =>
  api.delete(`/${id}`)
);

export const editCourse = CreateApiAsyncThunk(
  "course/editCourse",
  ({ id, data }) => api.put(`/${id}`, data)
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
      if (state.courseAddData.hasOwnProperty(field)) {
        state.courseAddData[field] = data;
      } else {
        state.courseAddData = {
          ...state.courseAddData,
          [field]: data,
        };
      }
    },
    editCourseData: (state, action) => {
      state.courseAddData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIntructorCourses.pending, (state) => {
        state.isLoading["getAllIntructorCourses"] = true;
      })
      .addCase(getAllIntructorCourses.fulfilled, (state, action) => {
        state.isLoading["getAllIntructorCourses"] = false;
        state.courses = action.payload.data;
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
      })
      // delete course
      .addCase(deleteCourse.pending, (state) => {
        state.isLoading["deleteCourse"] = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.isLoading["deleteCourse"] = false;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.isLoading["deleteCourse"] = false;
        state.error = action.payload;
      })
      // edit course
      .addCase(editCourse.pending, (state) => {
        state.isLoading["editCourse"] = true;
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        state.isLoading["editCourse"] = false;
      })
      .addCase(editCourse.rejected, (state, action) => {
        state.isLoading["editCourse"] = false;
        state.error = action.payload;
      });
  },
});

export const { updateCourseAddDataState, updateStep, editCourseData } = courseSlice.actions;
export default courseSlice.reducer;
