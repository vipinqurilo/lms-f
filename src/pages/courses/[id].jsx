import { useRouter } from 'next/router';

const CourseDetail = () => {
  const { query } = useRouter();
  const courseId = query.id;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Course Details</h1>
      <div>Details for course ID: {courseId}</div>
    </div>
  );
};

export default CourseDetail;
