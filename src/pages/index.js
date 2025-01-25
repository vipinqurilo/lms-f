import FeaturedCard from "@/components/FeaturedCard";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import MasterSkill from "@/components/home/MasterSkill";
import Mentor from "@/components/home/Mentor";
import UnlimitedAccess from "@/components/home/UnlimitedAccess";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className=" font-nunito">
        <HeroSection />
        {/* <Mentor />
        <UnlimitedAccess />
        <FeaturedCard /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default Home;
