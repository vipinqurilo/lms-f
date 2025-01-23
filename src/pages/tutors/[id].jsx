import { useRouter } from 'next/router';

const TutorDetail = () => {
  const { query } = useRouter();
  const tutorId = query.id;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Tutor Profile</h1>
      <p>Details for tutor ID: {tutorId}</p>
    </div>
  );
};

export default TutorDetail;
