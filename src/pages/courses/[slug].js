import React from "react";
import path from "path";
import fs from "fs";
import CourseDetails from "@/container/courses/CourseDetails";

export default function CourseDetailsPage({ pageData }) {
  return (
    <main className="font-nunito custom-margin-top">
      <CourseDetails data={pageData?.courseDetails} />
    </main>
  );
}

export async function getStaticPaths() {
  const dataDir = path.join(process.cwd(), "src/data/courses");
  console.log("dataDir", dataDir);
  const files = fs.readdirSync(dataDir);
  console.log("files", files);
  const paths = files.map((filename) => ({
    params: { slug: filename.replace(/\.json$/, "") },
  }));
  console.log("paths", paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const dataFilePath = path.join(
    process.cwd(),
    "src/data/courses",
    `${slug}.json`
  );
  console.log("dataFilePath", dataFilePath);
  const rawData = fs.readFileSync(dataFilePath, "utf-8");
  console.log("rawData", rawData);
  const pageData = JSON.parse(rawData);
  return {
    props: {
      pageData,
    },
  };
}
