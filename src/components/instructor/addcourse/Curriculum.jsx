"use client";

import React, { useEffect, useState } from "react";
import SubmitButtonsComp from "./SubmitButtonsComp";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCourseAddDataState,
  updateStep,
} from "@/store/slices/instructor/courseSlice";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import CommonButton from "@/components/common/CommonButton";
import { FiEdit, FiCheck, FiTrash } from "react-icons/fi";
import AddLecture from "@/container/instructor/addcourse/AddLecture";

const Curriculum = () => {
  const { courseAddData } = useSelector((state) => state.instructor.course);
  const dispatch = useDispatch();

  const [isAddLecture, setisAddLecture] = useState(null);

  const [lecture, setLecture] = useState({
    lessonTitle: "",
    video: "",
    duration: "",
    attachements: [],
  });

  const [modules, setModules] = useState([{ moduleTitle: "", lessons: [] }]);

  const [isEditModule, setisEditModule] = useState(null);
  const [isEditLecture, setisEditLecture] = useState(null);

  useEffect(() => {
    if (
      Array.isArray(courseAddData?.curriculum) &&
      courseAddData.curriculum.length > 0
    ) {
      setModules(courseAddData.curriculum);
    } else {
      setModules([{ moduleTitle: "", lessons: [] }]);
    }
  }, [courseAddData]);

  const handleAddLecture = (moduleIndex) => {
    if (
      lecture?.lessonTitle.trim() !== "" &&
      lecture?.attachements?.length > 0
    ) {
      setModules((prevModules) => {
        const updatedModules = prevModules.map((module, index) => {
          if (index === moduleIndex) {
            return {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  lessonTitle: lecture.lessonTitle,
                  video: lecture.video,
                  duration: lecture.duration,
                  attachements: lecture?.attachements,
                },
              ],
            };
          }
          return module;
        });

        return updatedModules;
      });

      setLecture({
        lessonTitle: "",
        video: "",
        duration: "",
        attachements: [],
      });
      setisAddLecture(null);
    } else {
      toast.error("All fields are required");
    }
  };

  // ✅ Remove Lecture
  const handleRemoveLecture = (moduleIndex, lectureIndex) => {
    if (window.confirm(`Are you sure you want to delete this Lecture?`)) {
      setModules((prevModules) => {
        return prevModules.map((module, index) => {
          if (index === moduleIndex) {
            return {
              ...module,
              lessons: module.lessons.filter((_, i) => i !== lectureIndex),
            };
          }
          return module;
        });
      });
    }
  };

  // ✅ Save Edited Lecture
  const handleSaveEditedLecture = () => {
    if (
      isEditLecture?.moduleIndex !== null &&
      isEditLecture?.lectureIndex !== null
    ) {
      setModules((prevModules) => {
        const updatedModules = [...prevModules];
        updatedModules[isEditLecture.moduleIndex].lessons[
          isEditLecture.lectureIndex
        ] = {
          lessonTitle: lecture?.lessonTitle,
          video: lecture?.video,
          duration: lecture?.duration,
          attachements: lecture?.attachements,
        };
        return updatedModules;
      });
      setisEditLecture(null);
      setLecture({
        lessonTitle: "",
        video: "",
        duration: "",
        attachements: [],
      });
    }
  };

  const handleNext = () => {
    if (!modules || modules.length === 0) {
      toast.error("Please add at least one module before proceeding.");
    } else if (modules.some((module) => !module?.moduleTitle.trim())) {
      toast.error(
        "Module title cannot be empty. Please fill in all module titles."
      );
    } else if (
      modules.some((module) => !module?.lessons || module.lessons.length === 0)
    ) {
      toast.error("Each module must have at least one lesson.");
    } else {
      dispatch(
        updateCourseAddDataState({ field: "curriculum", data: modules })
      );
      dispatch(updateStep(4));
    }
  };

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="w-full flex items-center justify-between self-end">
        <h2 className="text-xl font-semibold">Course Curriculum</h2>
        <CommonButton
          label={"Add Module"}
          onClick={() => {
            setisEditModule(modules?.length);
            setModules((prev) => [...prev, { moduleTitle: "", lessons: [] }]);
          }}
        />
      </div>

      {modules?.map((item, index) => (
        <div
          key={index}
          className="w-full !bg-white border border-black/10 dashboard-sub-container rounded-lg flex-col flex gap-4"
        >
          <div className="w-full flex items-center justify-between">
            <h2 className="font-semibold">
              Module {index + 1}.{" "}
              {isEditModule === index ? (
                <input
                  type="text"
                  value={item?.moduleTitle}
                  placeholder="Enter Module Name"
                  onChange={(e) => {
                    const updatedModules = modules.map((mod, modIndex) =>
                      modIndex === index
                        ? { ...mod, moduleTitle: e.target.value }
                        : mod
                    );
                    setModules(updatedModules);
                  }}
                  className="px-2 py-0.5 focus:outline-none border border-black/10 rounded"
                />
              ) : item?.moduleTitle ? (
                item?.moduleTitle
              ) : (
                "Enter Module Name"
              )}
            </h2>
            <div className="flex items-center gap-2">
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-500 hover:text-white transition"
                onClick={() =>
                  setisEditModule(isEditModule === index ? null : index)
                }
              >
                {isEditModule === index ? (
                  <FiCheck size={18} />
                ) : (
                  <FiEdit size={18} />
                )}
              </button>

              <button
                className="p-2 rounded-md bg-red-100 hover:bg-red-500 hover:text-white transition"
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete this Module: ${item?.moduleTitle}?`
                    )
                  ) {
                    setModules((prev) => prev.filter((_, j) => j !== index));
                  }
                }}
              >
                <FiTrash size={18} />
              </button>

              <CommonButton
                label={"Add Lecture"}
                variant="secondary"
                onClick={() => setisAddLecture(index)} // Pass module index
              />
            </div>
          </div>

          {item?.lessons?.map((lecture, i) => (
            <div
              className="w-full bg-white p-4 rounded-lg border border-black/10"
              key={i}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <GiHamburgerMenu size={18} />
                  <a
                    href={lecture?.video}
                    className="hover:text-primary"
                    target="_blank"
                  >
                    <h3 className="font-medium text-sm">
                      Lecture {index + 1}.{i + 1} {lecture?.lessonTitle}
                    </h3>
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xl">
                  <AiTwotoneEdit
                    onClick={() => {
                      setisEditLecture({
                        moduleIndex: index,
                        lectureIndex: i,
                      });
                      setLecture(lecture);
                    }}
                    className="cursor-pointer"
                  />
                  <MdOutlineDelete
                    className="hover:text-red-500 cursor-pointer transition-custom"
                    onClick={() => handleRemoveLecture(index, i)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="w-full flex items-center justify-between">
        <SubmitButtonsComp
          cancelText={"Go Back"}
          onCancel={() => dispatch(updateStep(2))}
          saveText={"Save and Continue"}
          handleClick={handleNext}
        />
      </div>

      {(isAddLecture !== null || isEditLecture !== null) && (
        <AddLecture
          moduleIndex={isAddLecture}
          handleAddLecture={handleAddLecture}
          handleSaveEditedLecture={handleSaveEditedLecture}
          setisAddLecture={setisAddLecture}
          setisEditLecture={setisEditLecture}
          isEdit={isEditLecture}
          lecture={lecture}
          setLecture={setLecture}
        />
      )}
    </div>
  );
};

export default Curriculum;
