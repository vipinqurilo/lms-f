import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="p-4 font-nunito">
        <h1 className="text-3xl font-bold text-center">
          Welcome to Tutor Website
        </h1>
        <p className="text-center mt-4">
          Explore courses and find your perfect tutor.
        </p>
      </main>
    </>
  );
};

export default Home;
