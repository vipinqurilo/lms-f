import React from "react";

const AboutCard = ({ data, index }) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-14">
      <div
        className={`w-full h-[40vh] lg:h-full rounded-xl bg-no-repeat bg-center bg-cover flex items-end justify-center ${index % 2 !== 0 && "lg:order-2"}`}
        style={{
          backgroundImage: `url(${data?.image?.src})`,
        }}
      >
        <div className="bg-white rounded-xl px-5 py-4 w-[80%] flex items-center justify-center flex-col shadow-lg -mb-10">
          <h4 className="">{data?.quote?.text}</h4>
          <p>{data?.quote?.author}</p>
        </div>
      </div>

      <div className="w-full lg:col-span-2 flex flex-col items-start gap-4">
        <h2 className="text-2xl lg:text-3xl font-bold">{data?.heading}</h2>
        <p className="text-light">{data?.description}</p>
        <div className="italic font-semibold bg-white drop-shadow-md p-4 border-l-4 border-secondary">
          "{data?.highlightedText}"
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
