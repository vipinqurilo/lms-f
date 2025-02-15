import React from "react";
import CourseCard from "./CourseCard";
import IncludesListRed from "./IncludesListRed";
import {
  FaCloudDownloadAlt,
  FaFileDownload,
  FaMobileAlt,
  FaTasks,
  FaCertificate,
} from "react-icons/fa";
import { FaUsers, FaClock, FaBook, FaPlay, FaChartBar } from "react-icons/fa";

const CourseHighLights = ({ data }) => {
  const listItemsRed = [
    {
      Icon: FaCloudDownloadAlt,
      value: 11,
      text: "hours on-demand video",
    },
    {
      Icon: FaFileDownload,
      value: 69,
      text: "downloadable resources",
    },
    {
      Icon: FaMobileAlt,
      value: 69,
      text: "Access on mobile and TV",
    },
    {
      Icon: FaTasks,
      value: 20,
      text: "Assignments",
    },
    {
      Icon: FaCertificate,
      value: "Yes",
      text: "Certificate of Completion",
    },
  ];

  const listItemsPurple = [
    {
      Icon: FaUsers,
      text: "Enrolled",
      value: "32 students",
    },
    {
      Icon: FaClock,
      text: "Duration",
      value: "20 hours",
    },
    {
      Icon: FaBook,
      text: "Chapters",
      value: "15",
    },
    {
      Icon: FaPlay,
      text: "Video",
      value: "12 hours",
    },
    {
      Icon: FaChartBar,
      text: "Level",
      value: "Beginner",
    },
  ];

  return (
    <div className="w-full space-y-5 font-nunito">
      <CourseCard />
      <IncludesListRed list={listItemsRed} type="red" heading={"Includes"} />
      <IncludesListRed list={listItemsPurple} heading={"Includes"} />
    </div>
  );
};

export default CourseHighLights;
