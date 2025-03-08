import React from "react";
import CourseCard from "./CourseCard";
import IncludesListRed from "./IncludesListRed";
import {
  FaUsers,
  FaClock,
  FaBook,
  FaPlay,
  FaChartBar,
  FaFilePdf,
} from "react-icons/fa";
// import { formatDuration } from "@/utils/TimeFormat";

const CourseHighLights = ({ data, enrollNowRef, isEnrolled }) => {
  // const totalSeconds = data?.course?.courseContent?.reduce((total, module) => {
  //   return (
  //     total +
  //     module.lessons.reduce((sum, lesson) => {
  //       return sum + parseInt(lesson?.duration);
  //     }, 0)
  //   );
  // }, 0);

  const listItemsPurple = [
    {
      Icon: FaUsers,
      text: "Enrolled",
      value: `${data?.totalStudents} students`,
    },
    {
      Icon: FaFilePdf,
      text: "Attachments",
      value: data?.course?.courseContent?.reduce(
        (acc, module) =>
          acc +
          (module.lessons?.reduce(
            (lessonAcc, lesson) =>
              lessonAcc + (lesson.attachements?.length || 0),
            0
          ) || 0),
        0
      ),
    },
    // {
    //   Icon: FaClock,
    //   text: "Duration",
    //   value: formatDuration(totalSeconds),
    // },
    {
      Icon: FaBook,
      text: "Chapters",
      value: data?.course?.courseContent?.reduce(
        (acc, item) => acc + (item?.lessons?.length || 0),
        0
      ),
    },
    // {
    //   Icon: FaPlay,
    //   text: "Video",
    //   value: data?.course?.courseContent?.reduce(
    //     (acc, item) => acc + (item?.lessons?.length || 0),
    //     0
    //   ),
    // },
    // {
    //   Icon: FaChartBar,
    //   text: "Level",
    //   value: "Beginner",
    // },
  ];

  return (
    <div className="w-full space-y-5 font-nunito">
      <CourseCard enrollNowRef={enrollNowRef} data={data?.course} isEnrolled={isEnrolled} />
      <IncludesListRed
        list={data?.course?.courseFeatures}
        type="red"
        heading={"Features"}
      />
      <IncludesListRed list={listItemsPurple} heading={"Includes"} />
    </div>
  );
};

export default CourseHighLights;
