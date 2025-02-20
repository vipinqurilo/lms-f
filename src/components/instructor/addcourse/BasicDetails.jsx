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
import toast from "react-hot-toast";

const BasicDetails = () => {
  const dispatch = useDispatch();
  const { courseAddData } = useSelector((state) => state.instructor.course);
  const { subjects: category, subSubjects: subCategory } = useSelector(
    (state) => state.category
  );

  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedSubSubject, setSelectedSubSubject] = useState("");

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
    if (selectedSubSubject === "" || selectedSubject === "") {
      return toast.error("Select Category and SubCategory first");
    } else {
      const formData = {
        ...data,
        courseCategory: selectedSubject,
        courseSubCategory: selectedSubSubject,
      };
      dispatch(updateCourseAddDataState({ field: "basic", data: formData }));
      dispatch(updateStep(2));
    }
  };

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
    setSelectedSubject(courseAddData.basic.courseCategory || "");
    setSelectedSubSubject(courseAddData.basic.courseSubCategory || "");
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
    <div className="w-full grid grid-cols-3 gap-8">
      <SettingsInputField
        errors={errors}
        label={"Course Title"}
        name={"title"}
        placeholder={"Enter Course Title"}
        register={register}
      />
      {/* <SettingsInputField
        errors={errors}
        label={"Course Category"}
        options={courseCategories}
        name={"category"}
        register={register}
        isSelect={true}
        control={control}
      /> */}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none text-black"
          >
            <option value="">Select Category</option>
            {category?.map((cat, index) => (
              <option key={index} value={cat?._id}>
                {cat?.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Sub Category
        </label>
        <div className="">
          <select
            value={selectedSubSubject}
            onChange={(e) => setSelectedSubSubject(e.target.value)}
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none text-black"
          >
            <option value="">Select Sub Category</option>

            {subCategory
              ?.filter((sub) => sub?.courseCategory?._id === selectedSubject)
              ?.map((sub, index) => (
                <option key={index} value={sub?._id}>
                  {sub?.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Course Level (optional)
        </label>
        <div className="">
          <select
            {...register("level")}
            className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary    focus:ring-[1px] focus:ring-primary ring-[1px] ring-gray-200 outline-none text-black"
          >
            {courseLevels?.map((sub, index) => (
              <option key={index} value={sub?.value}>
                {sub?.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <SettingsInputField
        errors={errors}
        label={"Course Level"}
        options={courseLevels}
        name={"level"}
        register={register}
        isSelect={true}
        control={control}
      /> */}

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
    </div>
  );
};

export default BasicDetails;
