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
import { RiUploadCloud2Line } from "react-icons/ri";
import UploadLecture from "./UploadLecture";
import { FiEdit, FiCheck, FiTrash } from "react-icons/fi";

const Curriculum = () => {
  const { courseAddData } = useSelector((state) => state.instructor.course);
  const dispatch = useDispatch();

  const [lecture, setLecture] = useState({
    lessonTitle: "",
    video: "",
    duration: "",
  });

  const [modules, setModules] = useState([{ moduleTitle: "", lessons: [] }]);

  const [editingLecture, setEditingLecture] = useState({
    moduleIndex: null,
    lectureIndex: null,
    data: { lessonTitle: "", video: "", duration: "" },
  });

  const [isEditModule, setisEditModule] = useState(null);
  const [isEditLecture, setisEditLecture] = useState(null);
  const [isChooseFile, setisChooseFile] = useState(null);

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
      lecture?.video.trim() !== "" &&
      lecture?.duration.trim() !== ""
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
                },
              ],
            };
          }
          return module;
        });

        return updatedModules;
      });

      setLecture({ lessonTitle: "", video: "", duration: "" });
    } else {
      toast.error("All fields are required");
    }
  };

  // ✅ Remove Lecture
  const handleRemoveLecture = (moduleIndex, lectureIndex) => {
    if (window.confirm(`Are you sure you want to delete this Lecture?`)) {
      if (modules?.length > 0 && modules[moduleIndex]?.lessons?.length > 0) {
        setModules((prevModules) => {
          const updatedModules = [...prevModules];
          if (
            updatedModules[moduleIndex] &&
            updatedModules[moduleIndex].lessons
          ) {
            updatedModules[moduleIndex].lessons = updatedModules[
              moduleIndex
            ].lessons.filter((_, i) => i !== lectureIndex);
          }
          return updatedModules;
        });
      }
    }
  };

  // ✅ Edit Lecture
  const handleEditLecture = (moduleIndex, lectureIndex) => {
    const lectureToEdit = modules[moduleIndex].lessons[lectureIndex];

    setEditingLecture({
      moduleIndex,
      lectureIndex,
      data: {
        lessonTitle: lectureToEdit.title,
        video: lectureToEdit.video,
        duration: lectureToEdit.duration,
      },
    });

    setisEditLecture(lectureIndex);
  };

  // ✅ Save Edited Lecture
  const handleSaveEditedLecture = () => {
    if (
      editingLecture.moduleIndex !== null &&
      editingLecture.lectureIndex !== null
    ) {
      setModules((prevModules) => {
        const updatedModules = [...prevModules];
        updatedModules[editingLecture.moduleIndex].lessons[
          editingLecture.lectureIndex
        ] = {
          lessonTitle: editingLecture.data.lessonTitle,
          video: editingLecture.data.video,
          duration: editingLecture.data.duration,
        };
        return updatedModules;
      });

      setEditingLecture({
        moduleIndex: null,
        lectureIndex: null,
        data: { lessonTitle: "", video: "", duration: "" },
      });

      setisEditLecture(null);
    }
  };

  const handleEditLectureChange = (e) => {
    const { name, value } = e.target;
    setEditingLecture((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]: value,
      },
    }));
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
                "Untitled Module"
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
            </div>
          </div>

          <div className="w-full grid grid-cols-4 gap-10 py-2">
            {/* Add Inputs for New Lecture */}
            <input
              type="text"
              placeholder="Lesson Title"
              value={lecture.lessonTitle}
              onChange={(e) =>
                setLecture({ ...lecture, lessonTitle: e.target.value })
              }
              className="px-2 py-0.5 focus:outline-none border border-black/10 rounded text-sm"
            />
            <button
              onClick={() =>
                setisChooseFile({
                  lectureIndex: modules?.findIndex((module, i) => i === index),
                  moduleIndex: index,
                })
              }
              className="col-span-2 border border-primary/10 justify-center text-primary rounded-lg flex items-center gap-2 bg-primary/10 "
            >
              <RiUploadCloud2Line size={20} />
              {lecture?.video !== ""
                ? "Video uploaded successfully"
                : "Choose File"}
            </button>
            <CommonButton
              label={"Add Lecture"}
              variant="secondary"
              onClick={() => handleAddLecture(index)} // Pass module index
            />
          </div>

          {item?.lessons?.map((lecture, i) => (
            <div
              className="w-full bg-white p-4 rounded-lg border border-black/10"
              key={i}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <GiHamburgerMenu size={18} />
                  {isEditLecture === i ? (
                    <div className="flex items-center gap-1 text-sm">
                      Lecture {index + 1}.{i + 1}
                      <input
                        type="text"
                        value={editingLecture.data.lessonTitle}
                        onChange={handleEditLectureChange}
                        name="lessonTitle"
                        className="px-2 py-0.5 focus:outline-none border border-black/10 rounded"
                      />
                    </div>
                  ) : (
                    <a
                      href={lecture?.video}
                      className="hover:text-primary"
                      target="_blank"
                    >
                      <h3 className="font-medium text-sm">
                        Lecture {index + 1}.{i + 1} {lecture?.lessonTitle}
                      </h3>
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xl">
                  {isEditLecture === i ? (
                    <CommonButton
                      label="Save"
                      onClick={handleSaveEditedLecture}
                    />
                  ) : (
                    <AiTwotoneEdit
                      onClick={() => handleEditLecture(index, i)}
                      className="cursor-pointer"
                    />
                  )}
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

      {isChooseFile !== null && (
        <UploadLecture
          handleCancel={() => setisChooseFile(null)}
          moduleInfo={isChooseFile}
          setLecture={setLecture}
        />
      )}
    </div>
  );
};

export default Curriculum;
