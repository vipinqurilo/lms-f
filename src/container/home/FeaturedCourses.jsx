import FeaturedCard from "@/components/common/FeaturedCard";
import Heading from "@/components/common/Heading";
import { useSelector } from "react-redux";
import NavigationLink from "@/components/home/NavigationLink";
import CardSkeleton from "@/components/common/CardSkeleton";

export default function FeaturedCourses({ cardData = [] }) {
  const isLoading = useSelector(
    (state) => state.courses.isLoading.fetchCoursesAsync
  );

  return (
    <>
      <div className="bg-no-repeat custom-container bg-cover bg-center bg-gradient-to-r from-primary/5 via-secondary/5 to-secondary/10">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 md:gap-10 lg:gap-16 mt-16 md:mt-8">
            {[...Array(6)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="">
            <div data-aos="fade-up" className="pt-8">
              <p className="text-xl font-bold text-orange-600">What's New</p>
            </div>
            <div data-aos="fade-up" className="flex justify-between md:mt-4">
              <Heading
                heading={"Featured Courses"}
                position={"text-left"}
                desc={` Explore our expertly curated courses designed to enhance your skills and knowledge. Gain practical experience and industry insights through interactive lessons and real-world applications.`}
                descWidth={"md:!w-2/3"}
              />
              <div className="md:block hidden">
                <NavigationLink path={"/courses"} text={"All Courses"} />
              </div>
            </div>

            {/* Render Paginated Courses */}
            <div
              data-aos="fade-up"
              className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5 md:gap-10 lg:gap-16 md:mt-8"
            >
              {cardData?.length > 0 ? (
                cardData
                  ?.slice(cardData?.length - 6, cardData?.length)
                  ?.reverse()
                  ?.map((card, index) => (
                    <FeaturedCard data={card} isFull={true} key={index} />
                  ))
              ) : (
                <p className="text-center col-span-3">No courses available</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
