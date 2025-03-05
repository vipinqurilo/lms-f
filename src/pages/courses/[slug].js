"use client";

import React, { useEffect } from "react";
// import path from "path";
// import fs from "fs";
import CourseDetails from "@/container/courses/CourseDetails";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCourse } from "@/store/slices/coursesSlice";
import Loader from "@/components/common/Loader";

// export default function CourseDetailsPage({ pageData }) {
export default function CourseDetailsPage() {
  const params = useParams();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.courses);

  useEffect(() => {
    if (params?.slug) {
      dispatch(fetchSingleCourse(params?.slug));
    }
  }, [dispatch, params?.slug]);

  if (!params?.slug) {
    return <p>Loading...</p>;
  }
  return (
    <main className="font-nunito custom-margin-top">
      {isLoading["fetchSingleCourse"] ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader isBig={true} color={"text-secondary"} />
        </div>
      ) : (
        <CourseDetails />
      )}
    </main>
  );
}

// export async function getStaticPaths() {
//   const dataDir = path.join(process.cwd(), "src/data/courses");
//   console.log("dataDir", dataDir);
//   const files = fs.readdirSync(dataDir);
//   console.log("files", files);
//   const paths = files.map((filename) => ({
//     params: { slug: filename.replace(/\.json$/, "") },
//   }));
//   console.log("paths", paths);

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const { slug } = params;
//   const dataFilePath = path.join(
//     process.cwd(),
//     "src/data/courses",
//     `${slug}.json`
//   );
//   console.log("dataFilePath", dataFilePath);
//   const rawData = fs.readFileSync(dataFilePath, "utf-8");
//   console.log("rawData", rawData);
//   const pageData = JSON.parse(rawData);
//   return {
//     props: {
//       pageData,
//     },
//   };
// }
