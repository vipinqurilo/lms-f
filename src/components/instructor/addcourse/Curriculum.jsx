"use client";

import React, { useState, useEffect, useRef } from "react";
import SubmitButtonsComp from "./SubmitButtonsComp";
import { useDispatch } from "react-redux";
import {
  updateCourseAddDataState,
  updateStep,
} from "@/store/slices/instructor/courseSlice";
import toast from "react-hot-toast";
import { FaAngleDown, FaEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import CommonButton from "@/components/common/CommonButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdEditSquare, MdOutlineDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";

const Curriculum = () => {
  const dispatch = useDispatch();
  const [lecture, setLecture] = useState({
    lectureTitle: "",
    videoUrl: "",
    des: "",
  });
  const [modules, setModules] = useState([{ moduletitle: "", lectures: [] }]);
  const [editingLecture, setEditingLecture] = useState({
    moduleIndex: null,
    lectureIndex: null,
    data: { lectureTitle: "", videoUrl: "", des: "" },
  });
  const [isEditModule, setisEditModule] = useState(null);

  // Handle Module Title Update
  const handleModuleTitleUpdate = (index, newTitle) => {
    const updatedModules = [...modules];
    updatedModules[index].moduletitle = newTitle;
    setModules(updatedModules);
  };

  // Handle Adding a New Lecture
  const handleAddLecture = (moduleIndex) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lectures.push({
      title: lecture.lectureTitle,
      videoUrl: lecture.videoUrl,
      description: lecture.des,
    });
    setModules(updatedModules);
    // Reset the lecture form after adding
    setLecture({ lectureTitle: "", videoUrl: "", des: "" });
  };
  const handleRemoveLecture = (moduleIndex, index) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].lectures.filter((lec, i) => i !== index);
    setModules(updatedModules);
  };

  const handleEditLecture = (moduleIndex, lectureIndex) => {
    const lectureToEdit = modules[moduleIndex].lectures[lectureIndex];
    setEditingLecture({
      moduleIndex,
      lectureIndex,
      data: {
        lectureTitle: lectureToEdit.title,
        videoUrl: lectureToEdit.videoUrl,
        des: lectureToEdit.description,
      },
    });
  };

  const handleSaveEditedLecture = () => {
    if (
      editingLecture.moduleIndex !== null &&
      editingLecture.lectureIndex !== null
    ) {
      const updatedModules = [...modules];
      updatedModules[editingLecture.moduleIndex].lectures[
        editingLecture.lectureIndex
      ] = {
        title: editingLecture.data.lectureTitle,
        videoUrl: editingLecture.data.videoUrl,
        description: editingLecture.data.des,
      };
      setModules(updatedModules);
      setEditingLecture({
        moduleIndex: null,
        lectureIndex: null,
        data: { lectureTitle: "", videoUrl: "", des: "" },
      });
    }
  };

  // Handle Changes in the Lecture Form
  const handleLectureChange = (e) => {
    const { name, value } = e.target;
    setLecture((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    dispatch(updateCourseAddDataState({ field: "curriculum", data: modules }));
    dispatch(updateStep(4));
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  const toggleSection = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setHeight(0);
    } else {
      setActiveIndex(index);
      setHeight(contentRef.current.scrollHeight);
    }
  };

  return (
    <div className="flex w-full flex-col gap-10">
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
                  value={item?.moduletitle}
                  onChange={(e) =>
                    handleModuleTitleUpdate(index, e.target.value)
                  }
                  className="px-3 py-1 focus:outline-none border border-black/10 rounded"
                />
              ) : (
                item?.moduletitle
              )}
            </h2>
            <div className=" flex items-center gap-2">
              <CommonButton
                label={isEditModule === index ? "Submit" : "Edit"}
                variant="secondary"
                onClick={() =>
                  isEditModule === index
                    ? setisEditModule(null)
                    : setisEditModule(index)
                }
              />
              <CommonButton
                label={"Delete"}
                variant="secondary"
                onClick={() =>
                  setModules((prev) => prev.filter((mod, j) => j !== index))
                }
              />
              <CommonButton
                label={"Add Lecture"}
                onClick={() => handleAddLecture(index)}
              />
            </div>
          </div>

          {item?.lectures?.map((lecture, i) => (
            <div
              className="w-full bg-white p-4 rounded-lg border border-black/10"
              key={i}
            >
              <div
                onClick={() => toggleSection(i)}
                className="flex items-center cursor-pointer justify-between w-full"
              >
                <div className="flex items-center gap-2">
                  <GiHamburgerMenu size={18} />
                  <h3 className="font-medium text-sm">
                    Lecture {index + 1}.{i + 1}{" "}
                    <input
                      type="text"
                      value={item?.moduletitle}
                      onChange={(e) =>
                        handleModuleTitleUpdate(index, e.target.value)
                      }
                      className="px-3 py-1 focus:outline-none border border-black/10 rounded"
                    />{" "}
                    {lecture?.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xl">
                  <AiTwotoneEdit onClick={() => handleEditLecture(index, i)} />
                  <MdOutlineDelete
                    className="hover:text-red-500 cursor-pointer transition-custom"
                    onClick={() => handleRemoveLecture(index, i)}
                  />
                  <FaAngleDown />
                </div>
              </div>
              <div
                className="transition-all ease-in-out duration-500 overflow-hidden"
                style={{
                  maxHeight: activeIndex === i ? `${height}px` : "0px",
                }}
                ref={contentRef}
              ></div>
            </div>
          ))}
        </div>
      ))}

      <button
        onClick={() => {
          setisEditModule(modules?.length);
          setModules((prev) => [...prev, { moduletitle: "", lectures: [] }]);
        }}
        className="bg-secondary/20 text-black hover:text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-95 px-4 h-fit rounded-md shadow text-lg font-semibold transition py-4"
      >
        Add Module
      </button>

      <div className="w-full flex items-center justify-between">
        <SubmitButtonsComp
          cancelText={"Go Back"}
          onCancel={() => dispatch(updateStep(2))}
          saveText={"Save and Continue"}
          handleClick={handleNext}
        />
      </div>
    </div>
  );
};

export default Curriculum;
