"use client";
import React, { useEffect, useMemo, useState } from "react";
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
import Select from "react-select";

const SubjectAndLanguage = ({ isInstructorRequest = null }) => {
  const path = usePathname();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.instructor.setting);
  const { languages } = useSelector((state) => state.languages);
  const { subjects: category, subSubjects: subCategory } = useSelector(
    (state) => state.category
  );

  const loading = useSelector(
    (state) => state.instructor.setting.isLoading.updateLanguages
  );
  const subjectsloading = useSelector(
    (state) => state.instructor.setting.isLoading.updateSubjects
  );

  const { processData } = useSelector((state) => state.tutors);

  const [subjects, setSubjects] = useState([]);
  const [subSubjects, setSubSubjects] = useState({});
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleSubSubjectsChange = (subjectValue, selected) => {
    setSubSubjects((prev) => ({
      ...prev,
      [subjectValue]: selected, // Store selected subSubjects per subject
    }));
  };

  useEffect(() => {
    if (processData && Object.keys(processData).length > 0 && isInstructorRequest) {
      console.log("🚀 processData Loaded:", processData);

      // Extract selected subSubjects from processData
      const selectedSubSubjects = subCategory.filter((sub) =>
        processData?.subjectAndLanguage?.subjects?.includes(sub._id)
      );

      console.log("✅ selectedSubSubjects:", selectedSubSubjects);

      // Extract unique subjects from the selected subSubjects
      const selectedSubjects = [
        ...new Map(
          selectedSubSubjects.map((sub) => [
            sub.courseCategory._id,
            category.find((c) => c._id === sub.courseCategory._id),
          ])
        ).values(),
      ].filter(Boolean); // Remove undefined values

      console.log("✅ selectedSubjects:", selectedSubjects);

      // Set subjects state
      setSubjects(
        selectedSubjects.map((sub) => ({
          label: sub.name,
          value: sub._id,
          subSubjects: subCategory
            ?.filter((s) => s?.courseCategory?._id === sub?._id)
            ?.map((s) => ({ label: s?.name, value: s?._id })),
        }))
      );

      // Store subSubjects as an object mapped to their parent subject
      const subSubjectsMap = selectedSubjects.reduce((acc, subject) => {
        acc[subject._id] = selectedSubSubjects
          .filter((s) => s.courseCategory._id === subject._id)
          .map((s) => ({ label: s.name, value: s._id }));
        return acc;
      }, {});

      console.log("✅ subSubjectsMap:", subSubjectsMap);
      setSubSubjects(subSubjectsMap);

      // Set selected languages
      const selectedLanguages =
        processData?.subjectAndLanguage?.language
          ?.map((lang) => languages?.find((l) => l?._id === lang))
          ?.map((match) => ({ label: match?.name, value: match?._id })) || [];

      console.log("✅ selectedLanguages:", selectedLanguages);
      setSelectedLanguages(selectedLanguages);
    }
  }, [processData, subCategory, category, languages]);

  useEffect(() => {
    if (profile && path === "/instructor-dashboard/settings") {
      setSelectedLanguages(
        profile?.languagesSpoken
          ?.map((lang) => languages?.find((l) => l?._id === lang))
          ?.map((match) => ({ label: match?.name, value: match?._id })) || []
      );
      setSubjects(profile?.subjectsTaught || []);
    }
  }, [profile, languages]);

  const submitForm = () => {
    const formdata = {
      language: selectedLanguages,
      subjects: subSubjects,
    };

    dispatch(
      updateProcessData({ field: "subjectAndlanguage", data: formdata })
    );
    dispatch(updateProcessStep(4));
  };

  const handleAddRemoveSubjects = (data) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = prevSubjects.some(
        (sub) => sub.value === data.value
      )
        ? prevSubjects.filter((sub) => sub.value !== data.value)
        : [...prevSubjects, data];

      return updatedSubjects;
    });
  };

  const handleUpdateLanguage = () => {
    const data = { languagesSpoken: selectedLanguages };
    dispatch(updateLanguages(data));
  };

  const handleUpdateSubjects = () => {
    const data = {
      subjectsTaught: Object.values(subSubjects)
        .flat()
        .map((s) => s.value),
    };
    dispatch(updateSubjects(data));
  };

  const languageOptions = languages?.map((language) => ({
    label: language.name,
    value: language._id,
  }));

  const subjectsData = useMemo(
    () =>
      category?.map((subject) => ({
        label: subject?.name,
        value: subject?._id,
        subSubjects: subCategory
          ?.filter((sub) => sub?.courseCategory?._id === subject?._id)
          ?.map((sub) => ({ label: sub?.name, value: sub?._id })),
      })),
    [category]
  );

  useEffect(() => {
    if (profile && path === "/instructor-dashboard/settings") {
      // Extract selected subSubjects from profile
      const selectedSubSubjects = subCategory.filter((sub) =>
        profile?.subjectsTaught.includes(sub._id)
      );

      // Extract unique subjects from the subSubjects
      const selectedSubjects = [
        ...new Map(
          selectedSubSubjects.map((sub) => [
            sub.courseCategory._id,
            category.find((c) => c._id === sub.courseCategory._id),
          ])
        ).values(),
      ].filter(Boolean); // Remove undefined values

      setSubjects(
        selectedSubjects.map((sub) => ({
          label: sub.name,
          value: sub._id,
          subSubjects: subCategory
            ?.filter((s) => s?.courseCategory?._id === sub?._id)
            ?.map((s) => ({ label: s?.name, value: s?._id })),
        }))
      );

      // Store subSubjects as an object mapped to their parent subject
      const subSubjectsMap = selectedSubjects.reduce((acc, subject) => {
        acc[subject._id] = selectedSubSubjects
          .filter((s) => s.courseCategory._id === subject._id)
          .map((s) => ({ label: s.name, value: s._id }));
        return acc;
      }, {});

      setSubSubjects(subSubjectsMap);
    }
  }, [profile, subCategory, category]);

  return (
    <div className="w-full space-y-6">
      {/* <div className="lg:hidden">
        <SettingsInputField
          label={"Subjects"}
          isSelect={true}
          name={"subjects"}
          options={subjectsData}
          isMulti={true}
          value={subjects}
          onChange={(selected) => setSubjects(selected)}
        />
      </div> */}

      <div className="w-full flex flex-col gap-4">
        <h2 className="text-light text-sm">Subjects</h2>
        <div className="lg:grid grid-cols-5 gap-5">
          {subjectsData?.map((subject, index) => (
            <button
              key={index}
              onClick={() => handleAddRemoveSubjects(subject)}
              className={`${
                subjects.some((sub) => sub.label === subject.label)
                  ? "bg-background text-white"
                  : "bg-none hover:bg-background transition-custom hover:text-white"
              } px-3 py-2 text-sm border border-black/10 w-full rounded-lg`}
            >
              {subject?.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {subjects?.map((subject) => {
          return (
            <div className="space-y-4" key={subject?.value}>
              <Select
                options={subject?.subSubjects} // Dropdown options
                isMulti={true} // Allow multiple selections
                value={subSubjects[subject.value] || []} // Get subSubjects for the specific subject
                onChange={(selected) =>
                  handleSubSubjectsChange(subject.value, selected)
                } // Handle selection change
                getOptionLabel={(e) => e.label} // Ensure correct label display
                getOptionValue={(e) => e.value} // Ensure correct value selection
                className="w-full" // Optional: Adjust width as needed
              />
            </div>
          );
        })}
      </div>

      {languages && languageOptions?.length > 0 && (
        <Select
          options={languageOptions} // Dropdown options for languages
          isMulti={true} // Allow multiple selections
          value={selectedLanguages} // Selected values
          onChange={(selected) => setSelectedLanguages(selected)} // Handle selection change
          getOptionLabel={(e) => e.label} // Display correct language label
          getOptionValue={(e) => e.value} // Use correct value selection
          className="w-full" // Optional styling for width
        />
      )}

      {path === "/instructor-dashboard/settings" ? (
        <div className="flex items-center gap-16 w-full justify-end">
          <CommonButton
            label={"Update Subjects"}
            onClick={handleUpdateSubjects}
            loading={subjectsloading}
          />
          <CommonButton
            label={"Update Languages"}
            onClick={handleUpdateLanguage}
            loading={loading}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Go Back"}
            onCancel={() => dispatch(updateProcessStep(2))}
            saveText={"Save and Continue"}
            handleClick={submitForm}
          />
        </div>
      )}
    </div>
  );
};

export default SubjectAndLanguage;
