"use client";

import React, { useEffect, useState } from "react";
import SettingsInputField from "../SettingsInputField";
import { useForm } from "react-hook-form";
import {
  updateCourseAddDataState,
  updateStep,
} from "@/store/slices/instructor/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import SubmitButtonsComp from "./SubmitButtonsComp";
import AddRemoveInput from "./AddRemoveInput";

const BasicDetails = () => {
  const dispatch = useDispatch();
  const { courseAddData } = useSelector((state) => state.instructor.course);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm();

  const [features, setFeatures] = useState([]);
  const [whatYouWillLearn, setWhatYouWillLearn] = useState([]);
  const [requirements, setRequirements] = useState([]);
  // const [description, setDescription] = useState([]);

  const submitHandler = (data) => {
    dispatch(updateCourseAddDataState({ field: "basic", data }));
    dispatch(updateStep(2));
  };

  const courseCategories = [
    { value: "", label: "Select Course Category" },
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "graphic-design", label: "Graphic Design" },
    { value: "digital-marketing", label: "Digital Marketing" },
    { value: "business", label: "Business & Management" },
    { value: "personal-development", label: "Personal Development" },
    { value: "photography", label: "Photography & Video Editing" },
    { value: "language-learning", label: "Language Learning" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "cybersecurity", label: "Cybersecurity" },
  ];

  const courseLevels = [
    { value: "", label: "Select Course Level" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "all-levels", label: "All Levels" },
  ];

  // const handleAddDescription = () => {
  //   setDescription((prev) => {
  //     const updatedDescription = [...prev, ""];
  //     setValue("description", updatedDescription);
  //     return updatedDescription;
  //   });
  // };

  // const handleRemoveDescription = (index) => {
  //   setDescription((prev) => {
  //     const updatedDescription = prev.filter((_, i) => i !== index);
  //     setValue("description", updatedDescription);
  //     return updatedDescription;
  //   });
  // };

  const handleReset = () => {
    // Reset dynamic fields to initial state
    setFeatures(courseAddData.basic.features || [""]);
    setWhatYouWillLearn(courseAddData.basic.whatYouWillLearn || [""]);
    setRequirements(courseAddData.basic.requirements || [""]);
    // setDescription(courseAddData.basic.description || [""]);

    // Reset the form values to match the initial state
    reset({
      title: courseAddData.basic.title || "",
      category: courseAddData.basic.category || "",
      level: courseAddData.basic.level || "",
      features: courseAddData.basic.features || [""],
      requirements: courseAddData.basic.requirements || [""],
      whatYouWillLearn: courseAddData.basic.whatYouWillLearn || [""],
      description: courseAddData?.basic?.description || "",
      // description: courseAddData.basic.description || [""],
    });
  };

  useEffect(() => {
    if (Object.keys(courseAddData).length > 0) {
      handleReset();
    }
  }, [courseAddData]);

  return (
    <form className="w-full grid grid-cols-3 gap-8">
      <SettingsInputField
        errors={errors}
        label={"Course Title"}
        name={"title"}
        placeholder={"Enter Course Title"}
        register={register}
      />
      <SettingsInputField
        errors={errors}
        label={"Course Category"}
        options={courseCategories}
        name={"category"}
        register={register}
        isSelect={true}
        control={control}
      />
      <SettingsInputField
        errors={errors}
        label={"Course Level"}
        options={courseLevels}
        name={"level"}
        register={register}
        isSelect={true}
        control={control}
      />

      {/* Features */}
      <AddRemoveInput
        label={"Features"}
        valueArray={features}
        setValueArray={setFeatures}
        formValueName="features"
        setFormValue={setValue}
        placeholder="Enter feature"
      />

      {/* Requirements */}
      <AddRemoveInput
        label={"Requirements"}
        valueArray={requirements}
        setValueArray={setRequirements}
        formValueName="requirements"
        setFormValue={setValue}
        placeholder="Enter requirement"
      />

      {/* What You Will Learn */}
      <AddRemoveInput
        label={"What You Will Learn"}
        valueArray={whatYouWillLearn}
        setValueArray={setWhatYouWillLearn}
        formValueName="whatYouWillLearn"
        setFormValue={setValue}
        placeholder="Enter learning outcome"
      />

      {/* Description */}
      <div className="col-span-3">
        <label className="block text-sm font-medium text-light mb-2">
          Description
        </label>
        <textarea
          {...register("description", { required: "Description is reuired" })}
          className="mt-1 block h-20 resize-none px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
          placeholder="Enter Course Description"
        />
        {/* {description.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <textarea
              value={item}
              onChange={(e) => {
                const updatedDescription = [...description];
                updatedDescription[index] = e.target.value;
                setDescription(updatedDescription);
                setValue("description", updatedDescription); // Update the form value
              }}
              className="mt-1 h-16 resize-none block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none"
              placeholder="Enter Description"
            />
            <CommonButton
              label={"X"}
              onClick={() => handleRemoveDescription(index)}
              variant="secondary"
            />
          </div>
        ))} */}
        {/* <CommonButton
          label={"Add Description"}
          variant="secondary"
          onClick={handleAddDescription}
        /> */}
        {errors.description && (
          <span className="text-sm text-red-500">
            *{errors.description?.message}
          </span>
        )}
      </div>

      <div className="w-full col-span-3">
        <SubmitButtonsComp
          cancelText={"Cancel"}
          handleClick={handleSubmit((data) => submitHandler(data))}
          onCancel={(e) => {
            e.preventDefault();
            reset();
          }}
          saveText={"Save and Continue"}
        />
      </div>
    </form>
  );
};

export default BasicDetails;
