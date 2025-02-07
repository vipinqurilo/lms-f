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
import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";

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
  }, [profile, languages]);

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
    dispatch(getSubSubjects());
    dispatch(getSubjects());
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
        // <div className="space-y-2">
        //   <label className="block text-sm font-medium text-gray-700">
        //     Languages
        //   </label>

        //   <select
        //     value={languageSelect}
        //     onChange={(e) =>
        //       setlanguageSelect((prev) => [...prev, e.target.value])
        //     }
        //     className="w-full border border-black"
        //     multiple
        //   >
        //     {languages?.map((lan, index) => (
        //       <option value={lan?._id} key={index}>
        //         {lan?.name}
        //       </option>
        //     ))}
        //   </select>
        // </div>
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

// "use client";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
// import {
//   updateLanguages,
//   updateSubjects,
// } from "@/store/slices/instructor/settingsSlice";
// import { getLanguages } from "@/store/slices/languageSlice";
// import { getSubjects, getSubSubjects } from "@/store/slices/categorySlice";
// import CommonButton from "../common/CommonButton";

// const SubjectAndLanguage = () => {
//   const dispatch = useDispatch();

//   // Fetch data from Redux store
//   const { profile } = useSelector((state) => state.instructor.setting);
//   const { languages } = useSelector((state) => state.languages);
//   const { subjects } = useSelector((state) => state.category);
//   const { subSubjects } = useSelector((state) => state.category);

//   // Local states
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [selectedLanguages, setSelectedLanguages] = useState([]);
//   const [filteredSubSubjects, setFilteredSubSubjects] = useState([]);
//   const [selectedSubSubjects, setSelectedSubSubjects] = useState([]);

//   // Fetch languages, subjects, and sub-subjects from API when the component mounts
//   useEffect(() => {
//     dispatch(getLanguages());
//     dispatch(getSubjects());
//     dispatch(getSubSubjects());
//   }, []);

//   // Load existing profile data if available
//   useEffect(() => {
//     if (profile) {
//       setSelectedLanguages(
//         profile?.languagesSpoken?.map((lang) => ({
//           label: languages?.find((l) => l._id === lang)?.name || "Unknown",
//           value: lang,
//         })) || []
//       );

//       setSelectedSubjects(
//         profile?.subjectsTaught?.map((sub) => ({
//           label: subjects?.find((s) => s._id === sub)?.name || "Unknown",
//           value: sub,
//         })) || []
//       );
//     }
//   }, [profile, languages, subjects]);

//   // Update sub-subjects when subjects change
//   useEffect(() => {
//     const updatedSubSubjects = subSubjects.filter((sub) =>
//       selectedSubjects.some((s) => s.value === sub.courseCategory._id)
//     );
//     setFilteredSubSubjects(updatedSubSubjects);
//     setSelectedSubSubjects([]); // Reset sub-subjects when changing subjects
//   }, [selectedSubjects, subSubjects]);

//   // Handle subject selection
//   const handleSubjectChange = (selectedOptions) => {
//     setSelectedSubjects(selectedOptions || []);
//   };

//   // Handle language selection
//   const handleLanguageChange = (selectedOptions) => {
//     setSelectedLanguages(selectedOptions || []);
//   };

//   // Handle sub-subject selection
//   const handleSubSubjectChange = (selectedOptions) => {
//     setSelectedSubSubjects(selectedOptions || []);
//   };

//   // Update subjects in the backend
//   const handleUpdateSubjects = () => {
//     dispatch(
//       updateSubjects({
//         subjectsTaught: selectedSubjects.map((s) => s.value),
//         subSubjectsTaught: selectedSubSubjects.map((s) => s.value),
//       })
//     );
//   };

//   // Update languages in the backend
//   const handleUpdateLanguages = () => {
//     dispatch(
//       updateLanguages({
//         languagesSpoken: selectedLanguages.map((l) => l.value),
//       })
//     );
//   };

//   return (
//     <div className="w-full space-y-6">
//       {/* Subjects Selection */}
//       <div className="w-full">
//         <h2 className="text-light text-sm">Subjects</h2>
//         <Select
//           isMulti
//           options={subjects?.map((sub) => ({
//             label: sub.name,
//             value: sub._id,
//           }))}
//           value={selectedSubjects}
//           onChange={handleSubjectChange}
//           className="w-full"
//         />
//       </div>

//       {/* Sub-Subjects Selection */}
//       {filteredSubSubjects.length > 0 && (
//         <div className="w-full">
//           <h2 className="text-light text-sm">Sub-Subjects</h2>
//           <Select
//             isMulti
//             options={filteredSubSubjects?.map((sub) => ({
//               label: sub.name,
//               value: sub._id,
//             }))}
//             value={selectedSubSubjects}
//             onChange={handleSubSubjectChange}
//             className="w-full"
//           />
//         </div>
//       )}

//       {/* Languages Selection */}
//       <div className="w-full">
//         <h2 className="text-light text-sm">Languages</h2>
//         <Select
//           isMulti
//           options={languages?.map((lang) => ({
//             label: lang.name,
//             value: lang._id,
//           }))}
//           value={selectedLanguages}
//           onChange={handleLanguageChange}
//           className="w-full"
//         />
//       </div>

//       {/* Update Buttons */}
//       <div className="flex items-center gap-4 justify-end">
//         <CommonButton
//           label={"Update Subjects"}
//           onClick={handleUpdateSubjects}
//         />
//         <CommonButton
//           label={"Update Languages"}
//           onClick={handleUpdateLanguages}
//         />
//       </div>
//     </div>
//   );
// };

// export default SubjectAndLanguage;
