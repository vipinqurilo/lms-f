"use client";
import React, { useEffect, useState } from "react";
import data from "@/data/subjectsAndLanguageData.json";
import { useForm } from "react-hook-form";
import SettingsInputField from "../instructor/SettingsInputField";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import { usePathname } from "next/navigation";
import CommonButton from "../common/CommonButton";
import {
  updateLanguages,
  updateSubjects,
} from "@/store/slices/instructor/settingsSlice";
import { getLanguages } from "@/store/slices/languageSlice";

const SubjectAndLanguage = () => {
  const path = usePathname();
  const { profile } = useSelector((state) => state.instructor.setting);
  const { languages } = useSelector((state) => state.languages);
  const loading = useSelector(
    (state) => state.instructor.setting.isLoading.updateLanguages
  );
  const subjectsloading = useSelector(
    (state) => state.instructor.setting.isLoading.updateSubjects
  );

  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState([]); // sub subjects when i select any subject then i get this values
  const { processData } = useSelector((state) => state.tutors);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    reset,
  } = useForm();
  const selectedSubjects = watch("subjects");
  const selectedLanguages = watch("language");

  useEffect(() => {
    if (processData && Object.keys(processData).length > 0) {
      reset({
        subjects: processData?.subjectAndlanguage?.subjects || [],
        language: processData?.subjectAndlanguage?.language || [],
      });
      setSubjects(processData?.subjectAndlanguage?.subjects || []);
    }
  }, [processData, reset]);

  useEffect(() => {
    if (profile && path === "/instructor-dashboard/settings") {
      reset({
        language:
          profile?.languagesSpoken
            ?.map((lang) => languages?.find((l) => l?._id === lang))
            ?.map((match) => ({ label: match?.name, value: match?._id })) || [],
        subSubjects: profile?.subjectsTaught,
      });
    }
  }, [profile]);

  const submitForm = (data) => {
    const formdata = {
      language: data?.language,
      subjects: subSubjects,
    };
    dispatch(
      updateProcessData({ field: "subjectAndlanguage", data: formdata })
    );
    dispatch(updateProcessStep(4));
  };

  const languageOptions = languages?.map((language) => ({
    label: language.name,
    value: language._id,
  }));

  const subjectsData = data?.subjects?.map((subject) => ({
    label: subject?.subject,
    value: subject?.subject,
    subSubjects: subject?.subSubjects,
  }));

  const handleAddRemoveSubjects = (data) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = prevSubjects.some(
        (sub) => sub.label === data.label
      )
        ? prevSubjects.filter((sub) => sub.label !== data.label)
        : [...prevSubjects, data];

      setValue("subjects", updatedSubjects);

      return updatedSubjects;
    });
  };

  const handleUpdateLanguage = () => {
    const data = {
      languagesSpoken: selectedLanguages,
    };
    dispatch(updateLanguages(data));
  };

  const handleUpdateSubjects = () => {
    const data = {
      subjectsTaught: selectedSubjects,
    };
    dispatch(updateSubjects(data));
  };

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  useEffect(() => {
    const selectedSubSubjects = selectedSubjects?.flatMap((subject) => {
      const filteredSubjects = subjectsData?.filter(
        (mainSubject) => mainSubject?.value === subject?.value
      );

      return filteredSubjects?.flatMap(
        (subsubject) => watch(subsubject?.label?.toLowerCase()) || []
      );
    });

    setSubSubjects(selectedSubSubjects || []);
  }, [selectedSubjects]);

  console.log("subSubjects", subSubjects);

  return (
    <div className="w-full space-y-6">
      <div className="lg:hidden">
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

      <div className="w-full flex flex-col gap-4">
        <h2 className="text-light text-sm">Subjects</h2>
        <div className="lg:grid grid-cols-5 gap-5">
          {subjectsData?.map((subject, index) => (
            <button
              key={index}
              onClick={() => handleAddRemoveSubjects(subject)}
              className={`${
                subjects.some((sub) => sub.label === subject.label)
                  ? "bg-background text-white" // Subject is selected
                  : "bg-none hover:bg-background transition-custom hover:text-white" // Subject is not selected
              } px-3 py-2 text-sm border border-black/10 w-full rounded-lg`}
            >
              {subject?.label}
            </button>
          ))}
        </div>
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

      {languages && languageOptions?.length > 0 && (
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
      )}

      {path === "/instructor-dashboard/settings" ? (
        <div className="flex items-center gap-16 w-full justify-end">
          <CommonButton
            label={"Update Subjects"}
            onClick={() => handleUpdateSubjects()}
            loading={subjectsloading}
          />
          <CommonButton
            label={"Update Languages"}
            onClick={() => handleUpdateLanguage()}
            loading={loading}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Go Back"}
            onCancel={() => dispatch(updateProcessStep(2))}
            saveText={"Save and Continue"}
            handleClick={handleSubmit((data) => submitForm(data))}
          />
        </div>
      )}
    </div>
  );
};

export default SubjectAndLanguage;
