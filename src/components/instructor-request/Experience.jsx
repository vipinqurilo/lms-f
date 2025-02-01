"use client";
import React, { useState } from "react";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";
import { updateProcessStep } from "@/store/slices/tutorsSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SettingsInputField from "../instructor/SettingsInputField";
import AddExperience from "./AddExperience";
import TableHeader from "../instructor/TableHeader";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const Experience = () => {
  const dispatch = useDispatch();
  const [experience, setExperience] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  const addExperience = (data) => {
    setExperience((prev) => [...prev, data]);
    reset();
  };

  const handleNext = () => {
    if (experience.length > 0) {
      dispatch(updateProcessStep({ field: "experience", data: experience }));
      dispatch(updateProcessStep(5));
    } else {
      toast.error("Add Experience");
    }
  };

  console.log("experience", experience);

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 w-full">
        <h1>Experience</h1>

        <div className="w-full !overflow-x-auto">
          <table className="w-full text-nowrap">
            <TableHeader
              headingsData={[
                "Experience information",
                "Start-End",
                "Document",
                "Actions",
              ]}
            />
            <tbody>
              {experience?.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-5 items-center justify-center text-light"
                  >
                    No Experience Added
                  </td>
                </tr>
              ) : (
                experience?.map((data) => (
                  <tr className="text-left ">
                    <td className="px-6 py-4 text-left"> 
                      <div className="w-full space-y-0.5">
                        <h2>{data?.title}</h2>
                        <p>{data?.institution}, {data?.location}</p>
                        <p></p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {data?.startyear}-{data?.endyear}
                    </td>
                    <td className="px-6 py-4">
                      {data?.certificate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full flex items-center gap-2">
                        <button className="w-8 h-8 border border-black/10 flex items-center justify-center hover:bg-gray-100 rounded">
                          <AiOutlineEdit size={20} />
                        </button>
                        <button className="w-8 h-8 border border-black/10 flex items-center justify-center hover:bg-gray-100 rounded hover:text-red-500 transition-custom">
                          <MdOutlineDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddExperience
        addExperience={addExperience}
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
      />

      <div className="w-full flex items-center justify-between">
        <SubmitButtonsComp
          cancelText={"Go Back"}
          onCancel={() => dispatch(updateProcessStep(3))}
          saveText={"Save and Continue"}
          handleClick={() => handleNext()}
        />
      </div>
    </div>
  );
};

export default Experience;
