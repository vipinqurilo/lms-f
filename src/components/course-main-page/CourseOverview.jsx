import React from "react";
import Heading from "./Heading";

const CourseOverview = ({ data }) => {
  return (
    <div data-aos="fade-up" className="course-sub-container">
      <Heading data="Course Overview" />
      {/* {data?.description?.map((des, index) => (
        <p key={index} className="text-light">
          {des}
        </p>
        ))} */}
        <p className="text-light">
          {data?.courseDescription}
        </p>

      <PointsDiv
        data={data?.courseLearning}
        heading={"What Will You Learn"}
      />
      <PointsDiv data={data?.courseRequirements} heading={"What are requirements"} />
    </div>
  );
};

export default CourseOverview;

function PointsDiv({ data, heading }) {
  return (
    <div className="space-y-2 w-full">
      <h6 className=" font-semibold">{heading}:</h6>
      <div className="w-full grid grid-cols-1 gap-2">
        {data?.map((point, index) => (
          <div key={index} className="flex items-start gap-2 ml-2">
            <div className="">-</div>
            <p className="text-black">{point}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
