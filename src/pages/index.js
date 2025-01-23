import FeaturedCard from "@/components/FeaturedCard";
import Footer from "@/components/Footer";
import MasterSkill from "@/components/home/MasterSkill";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="p-4 font-nunito">
        {/* <FeaturedCard /> */}
        <MasterSkill />
      </main>
      <Footer />
    </>
  );
};

export default Home;
