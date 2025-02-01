"use client";
import React from "react";
import data from "@/data/subjectsAndLanguageData.json";
import { useForm } from "react-hook-form";
import SettingsInputField from "../instructor/SettingsInputField";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";
import { useDispatch } from "react-redux";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";

const SubjectAndLanguage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();
  const selectedSubjects = watch("subjects");

  const submitForm = (data) => {
    console.log(data);
    dispatch(updateProcessData({ field: "subject&language", data }));
    dispatch(updateProcessStep(4));
  };

  const languageOptions = data?.languages?.map((language) => ({
    label: language.name,
    value: language.code,
  }));

  const subjectsData = data?.subjects?.map((subject) => ({
    label: subject?.subject,
    value: subject?.subject,
    subSubjects: subject?.subSubjects,
  }));

  return (
    <div className="w-full space-y-6">
      <div className="">
        <SettingsInputField
          control={control}
          errors={errors}
          label={"Subjects"}
          isSelect={true}
          name={"subjects"}
          options={subjectsData}
          register={register}
          isMulti={true}
        />
      </div>

      <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {selectedSubjects?.map((subject) => {
          const filteredSubjects = subjectsData?.filter(
            (mainSubject) => mainSubject?.value === subject?.value
          );
          return (
            <div className="space-y-4" key={subject?.value}>
              {filteredSubjects?.map((subsubject) => {
                const subSubjectsArray = subsubject?.subSubjects?.map(
                  (data) => ({
                    label: data,
                    value: data,
                  })
                );

                console.log("subSubjectsArray", subSubjectsArray);

                return (
                  <div key={subsubject?.value}>
                    <SettingsInputField
                      control={control}
                      errors={errors}
                      label={subsubject?.label}
                      name={subsubject?.label?.toLowerCase()}
                      options={subSubjectsArray}
                      register={register}
                      isMulti={true}
                      isSelect={true}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <SettingsInputField
        control={control}
        errors={errors}
        label={"Languages"}
        isSelect={true}
        name={"language"}
        options={languageOptions}
        register={register}
        isMulti={true}
      />

      <div className="w-full flex items-center justify-between">
        <SubmitButtonsComp
          cancelText={"Go Back"}
          onCancel={() => dispatch(updateProcessStep(2))}
          saveText={"Save and Continue"}
          handleClick={handleSubmit((data) => submitForm(data))}
        />
      </div>
    </div>
  );
};

export default SubjectAndLanguage;
