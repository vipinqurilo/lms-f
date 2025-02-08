"use client";
import React, { useEffect, useState } from "react";
import SubmitButtonsComp from "../instructor/addcourse/SubmitButtonsComp";
import {
  instructorRequest,
  updateProcessData,
  updateProcessStep,
} from "@/store/slices/tutorsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AddExperience from "./AddExperience";
import { usePathname } from "next/navigation";
import CommonButton from "../common/CommonButton";
import {
  updateEducation,
  updateExperience,
} from "@/store/slices/instructor/settingsSlice";
import TableComponent from "./TableComponent";
import BackgroundModal from "../instructor/BackgroundModal";
import ModalHeading from "../common/ModalHeading";

const Experience = () => {
  const { processData } = useSelector((state) => state.tutors);
  const loading = useSelector(
    (state) => state.tutors.isLoading.instructorRequest
  );
  const { profile } = useSelector((state) => state.instructor.setting);
  const experienceloading = useSelector(
    (state) => state.instructor.setting.isLoading.updateExperience
  );
  const educationloading = useSelector(
    (state) => state.instructor.setting.isLoading.updateEducation
  );
  const path = usePathname();
  const dispatch = useDispatch();
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [isAdd, setisAdd] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      reset({
        title: isEdit?.title || "",
        institution: isEdit?.institution || "",
        location: isEdit?.location || "",
        certificate: isEdit?.startyear || "",
        startyear: isEdit?.startyear || "",
        endyear: isEdit?.endyear || "",
        des: isEdit?.des || "",
      });
    }
  }, [isEdit]);

  useEffect(() => {
    if (processData && Object.keys(processData).length > 0) {
      setEducation(processData?.education || []);
      setExperience(processData?.experience || []);
    }
  }, [processData]);

  useEffect(() => {
    if (profile && path === "/instructor-dashboard/settings") {
      setExperience(profile?.experience);
      setEducation(profile?.education);
    }
  }, [profile]);

  const addExperience = (data) => {
    setExperience((prev) => [...prev, data]);
    reset();
  };
  const addEducation = (data) => {
    setEducation((prev) => [...prev, data]);
    reset();
  };

  const handleNext = () => {
    if (experience.length > 0 || education?.length > 0) {
      const formData = {
        personalInfo: processData?.profile,
        bio: processData?.indentity?.bio,
        profilePhoto: processData?.indentity?.profile,
        subjectsTaught: [],
        languagesSpoken: [],
        education: education,
        experience,
      };

      dispatch(instructorRequest(formData))
        .unwrap()
        .then(() => {
          dispatch(updateProcessStep(5));
          dispatch(updateProcessData({}));
        });
    } else {
      toast.error("Add Experience and education");
    }
  };

  const handleUpdateExperience = () => {
    const data = {
      experience,
    };
    dispatch(updateExperience(data));
  };

  const handleUpdateEducation = () => {
    const data = {
      education: education,
    };
    dispatch(updateEducation(data));
  };

  return (
    <div
      className={`w-full flex flex-col gap-6 lg:gap-10
      ${path === "/instructor-dashboard/settings" && "pt-5"}
      `}
    >
      <div className="w-full border border-black/10 rounded-lg px-5 lg:px-8 py-5 flex flex-col gap-6 lg:gap-6">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-lg font-bold">Experience</h2>
          <CommonButton
            label={"Add Experience"}
            onClick={() => setisAdd("experience")}
            variant="third"
          />
        </div>
        <TableComponent
          title="Experience"
          data={experience}
          setData={setExperience}
          toggleIsAdd={() => setisAdd("experience")}
          setIsEdit={setIsEdit}
        />
      </div>

      <div className="w-full border border-black/10 rounded-lg px-5 lg:px-8 py-5 flex flex-col gap-6 lg:gap-6">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-lg font-bold">Education</h2>
          <CommonButton
            label={"Add Education"}
            onClick={() => setisAdd("education")}
            variant="third"
          />
        </div>

        <TableComponent
          title="Education"
          data={education}
          setData={setEducation}
          toggleIsAdd={() => setisAdd("education")}
          setIsEdit={setIsEdit}
        />
      </div>

      {path === "/instructor-dashboard/settings" ? (
        <div className="flex items-center w-full justify-end gap-10">
          <CommonButton
            label={"Update Experience"}
            onClick={() => handleUpdateExperience()}
            loading={experienceloading}
          />
          <CommonButton
            label={"Update Education"}
            variant="secondary"
            onClick={() => handleUpdateEducation()}
            loading={educationloading}
          />
        </div>
      ) : (
        <div className="w-full flex items-center justify-between">
          <SubmitButtonsComp
            cancelText={"Go Back"}
            onCancel={() => dispatch(updateProcessStep(3))}
            saveText={"Save and Continue"}
            handleClick={() => handleNext()}
            loading={loading}
          />
        </div>
      )}

      {isAdd !== null && (
        <BackgroundModal
          PropComponent={
            <div className="w-[50%] border border-black/10 rounded-lg bg-white px-10 py-5 flex flex-col gap-5">
              <ModalHeading
                title={`Add ${isAdd}`}
                onClose={() => {
                  setisAdd(null);
                  setIsEdit(null);
                }}
                PaddingAdd={true}
              />
              <AddExperience addEducation={addEducation} addExperience={addExperience} errors={errors} handleSubmit={handleSubmit} register={register} type={isAdd} />
            </div>
          }
        />
      )}
    </div>
  );
};

export default Experience;
