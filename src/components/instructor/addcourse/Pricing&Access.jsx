"use client";

import React from "react";
import { useForm } from "react-hook-form";
import SettingsInputField from "../SettingsInputField";
import SubmitButtonsComp from "./SubmitButtonsComp";
import { useDispatch, useSelector } from "react-redux";
import { createCourse, updateCourseAddDataState, updateStep } from "@/store/slices/instructor/courseSlice";
import { useRouter } from "next/navigation";

const PricingAccess = ({ media }) => {
  const router = useRouter()
  const { courseAddData } = useSelector((state) => state.instructor.course);
  const loading = useSelector((state) => state.instructor.course.isLoading.createCourse);
  const { image, video } = useSelector((state) => state.upload);

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const formData = new FormData();

    // Basic Course Details
    formData.append("courseTitle", courseAddData?.basic?.title || "");
    formData.append(
      "courseDescription",
      courseAddData?.basic?.description || ""
    );
    formData.append("courseCategory", "67947a79e3e4521f62c0046c");
    // formData.append("courseCategory", courseAddData?.basic?.category || "");
    formData.append("courseSubCategory", "67947b29e3e4521f62c0046e");
    // formData.append("courseSubCategory", courseAddData?.basic?.subCategory || "");
    formData.append("courseLevel", courseAddData?.basic?.level || "");
    formData.append("coursePrice", data.price || "");

    // Features, Learning Outcomes, and Requirements (Convert Arrays to Strings)
    formData.append(
      "courseFeatures",
      JSON.stringify(courseAddData?.basic?.features || [])
    );
    formData.append(
      "courseLearning",
      JSON.stringify(courseAddData?.basic?.whatYouWillLearn || [])
    );
    formData.append(
      "courseRequirements",
      JSON.stringify(courseAddData?.basic?.requirements || [])
    );

    // Curriculum (Convert Curriculum Array to JSON String)
    formData.append(
      "courseContent",
      JSON.stringify(courseAddData?.curriculum || [])
    );

    // Instructor Details
    formData.append("courseInstructor", "Arjun Nagar");
    // formData.append("courseInstructor", courseAddData?.instructor || "");

    // Course Media (Check If Files Exist Before Appending)
      formData.append("courseImage", image);
      formData.append("courseVideo", video);
    

    // Debugging: Check FormData Entries
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("formData", formData);

    dispatch(createCourse(formData))
    .unwrap()
    .then(() => {
      dispatch(updateCourseAddDataState({}))
      router.push("/instructor-dashboard")
    })
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <SettingsInputField
        errors={errors}
        register={register}
        label={"Course Price"}
        name={"price"}
        placeholder={"Enter Course Price"}
      />

      <div className="w-full flex items-center justify-between">
        <SubmitButtonsComp
          cancelText={"Go Back"}
          onCancel={() => dispatch(updateStep(3))}
          saveText={"Create Course"}
          handleClick={handleSubmit((data) => submitHandler(data))}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PricingAccess;
