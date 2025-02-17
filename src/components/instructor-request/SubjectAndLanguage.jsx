"use client";
import { makeCategorySubCategoryArray } from "@/store/slices/categorySlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../common/CommonButton";
import {
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import {
  updateLanguages,
  updateSubjects,
} from "@/store/slices/instructor/settingsSlice";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";
import { usePathname } from "next/navigation";

export default function SubjectAndLanguage() {
  const { authUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.languages);
  const { categories } = useSelector((state) => state.category);
  const loading = useSelector(
    (state) => state.instructor.setting.isLoading.updateLanguages
  );
  const subjectsloading = useSelector(
    (state) => state.instructor.setting.isLoading.updateSubjects
  );
  const { processData } = useSelector((state) => state.tutors);
  const { profile } = useSelector((state) => state.instructor.setting);
  const path = usePathname();

  // States for holding selected data
  const [selectedLanguages, setselectedLanguages] = useState([]);
  const [selectedSubjects, setselectedSubjects] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    dispatch(makeCategorySubCategoryArray());
  }, []);

  useEffect(() => {
    if (processData) {
      setselectedLanguages(processData?.subjectAndlanguage?.language);
      setselectedSubjects(processData?.subjectAndlanguage?.subjects);
    }
  }, [processData]);

  useEffect(() => {
    if (path === "/instructor-dashboard/settings" && profile) {
      setselectedLanguages(profile?.languagesSpoken);
      setselectedSubjects(profile?.subjectsTaught);
    }
  }, [profile]);

  const toggleSection = (categoryId) => {
    setActiveCategories(
      (prev) =>
        prev.includes(categoryId)
          ? prev.filter((id) => id !== categoryId) // Collapse if already open
          : [...prev, categoryId] // Expand otherwise
    );
  };

  const handleUpdateLanguage = () => {
    const data = { languagesSpoken: selectedLanguages };
    dispatch(updateLanguages(data));
  };

  const handleUpdateSubjects = () => {
    const data = {
      subjectsTaught: selectedSubjects,
    };
    dispatch(updateSubjects(data));
  };

  const submitForm = () => {
    const formdata = {
      language: selectedLanguages,
      subjects: selectedSubjects,
    };

    console.log("formdata", formdata);

    dispatch(
      updateProcessData({ field: "subjectAndlanguage", data: formdata })
    );
    dispatch(updateProcessStep(4));
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Subjects
        </label>
        <div className="w-full grid lg:grid-cols-3 lg:gap-8">
          {categories?.length > 0 &&
            categories.map((category) => (
              <div key={category?.categoryId} className="w-full">
                <button
                  onClick={() => toggleSection(category?.categoryId)}
                  className={`flex justify-between items-center w-full font-medium text-lg text-left bg-secondary/5 p-2 px-4 rounded border border-black/10 ${
                    category?.subCategories?.some((sub) =>
                      selectedSubjects?.includes(sub?.id)
                    )
                      ? "!bg-gray-100"
                      : ""
                  }`}
                >
                  <span className="font-[700] text-base">
                    {category?.categoryName}{" "}
                    {category?.subCategories?.filter((sub) =>
                      selectedSubjects?.includes(sub?.id)
                    ).length > 0 && (
                      <span className="font-normal">
                        (
                        {
                          category?.subCategories?.filter((sub) =>
                            selectedSubjects?.includes(sub?.id)
                          ).length
                        }
                        )
                      </span>
                    )}
                  </span>
                  <svg
                    className={`transition-transform ${
                      activeCategories.includes(category?.categoryId)
                        ? "rotate-0"
                        : "-rotate-90"
                    }`}
                    fill="none"
                    height={24}
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width={24}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`transition-all ease-in-out duration-500 overflow-hidden flex flex-col gap-4 ${
                    activeCategories.includes(category?.categoryId)
                      ? "max-h-screen"
                      : "max-h-0"
                  }`}
                >
                  {category?.subCategories?.map((lecture, i) => (
                    <button
                      key={i}
                      className={`w-full border border-black/10 rounded-lg md:flex md:items-center md:justify-between px-2 py-2 md:py-2 ${
                        selectedSubjects?.includes(lecture?.id)
                          ? "bg-gray-100"
                          : "bg-white"
                      } ${i === 0 && "mt-4"}`}
                      disabled={authUser?.role === "admin"}
                      onClick={() => {
                        setselectedSubjects((prev) => {
                          if (Array.isArray(prev) && prev.length > 0) {
                            return prev.includes(lecture?.id)
                              ? prev.filter((id) => id !== lecture?.id) // Remove if already present
                              : [...prev, lecture?.id]; // Add if not present
                          } else {
                            return [lecture?.id]; // Initialize as an array
                          }
                        });
                      }}
                    >
                      <h6 className="flex items-start gap-1 ">
                        <span className="-mt-[2px] font-medium text-sm">
                          {lecture?.name}
                        </span>
                      </h6>
                      <div className="w-5 h-5 border border-black/10 rounded-full flex items-center justify-center">
                        <div
                          className={`w-3 h-3 bg-background rounded-full transition-custom ${
                            selectedSubjects?.includes(lecture?.id)
                              ? "scale-100"
                              : "scale-0"
                          }`}
                        ></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      {languages && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Languages
          </label>
          <div
            className={`transition-all ease-in-out duration-500 overflow-hidden grid lg:grid-cols-3 gap-4`}
          >
            {languages?.map((lan, i) => (
              <button
                key={i}
                className={`w-full border border-black/10 rounded-lg md:flex md:items-center md:justify-between px-2 py-2 md:py-2 ${
                  selectedLanguages?.includes(lan?._id)
                    ? "bg-gray-100"
                    : "bg-white"
                }`}
                disabled={authUser?.role === "admin"}
                onClick={() => {
                  setselectedLanguages((prev) => {
                    if (Array.isArray(prev) && prev.length > 0) {
                      return prev.includes(lan?._id)
                        ? prev.filter((id) => id !== lan?._id) // Remove if already selected
                        : [...prev, lan?._id]; // Add if not present
                    } else {
                      return [lan?._id]; // Initialize as an array
                    }
                  });
                }}
              >
                <h6 className="flex items-start gap-1">
                  <span className="-mt-[2px] font-medium text-sm">
                    {lan?.name}
                  </span>
                </h6>
                <div className="w-5 h-5 border border-black/10 rounded-full flex items-center justify-center">
                  <div
                    className={`w-3 h-3 bg-background rounded-full transition-custom ${
                      selectedLanguages?.includes(lan?._id)
                        ? "scale-100"
                        : "scale-0"
                    }`}
                  ></div>
                </div>
              </button>
            ))}
          </div>
        </div>
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
            saveText={authUser?.role === "admin" ? "Next" : "Save and Continue"}
            handleClick={submitForm}
          />
        </div>
      )}
    </div>
  );
}
