import React from "react";
import Loveclients from "./loveclients";
 const AboutHeroSection = () => {
  return (
    <div>
      <div className="bg-[#F2F2F2] w-full ">
        <div className="text-center     py-14">
          <h1 className="text-base font-semibold text-orange-500">About Us</h1>
          <p className="text-3xl text-black mt-2">
            We build an organization to help people to learn online.
          </p>
        </div>
      </div>



      <div className="  px-7"> 
  <div className="  w-full flex flex-wrap    justify-between items-center border-b-4 border-black shadow-lg">
    <img 
      src={ "/images/LARGE (4).jpg"} 
      alt="Descriptive Alt Text" 
      className=" object-cover rounded-lg "
    />
  </div>
</div>

<div className="container mx-auto py-16 px-4">
    <div className="flex flex-col md:flex-row items-start gap-8">
       <div className="w-full md:w-1/3">
        <h1 className="text-3xl  mb-4">It starts with</h1>
        <h2 className="text-2xl font-semibold text-gray-700">Who We Are.</h2>
      </div>
       <div className="w-full md:w-2/3">
        <h3 className="text-xl font-semibold mb-4 text-gray-800  px-12">
          We build an organization to help people to learn online.
        </h3>
        <div className="  mt-10 space-y-20  ">    
        <p className="text-black mb-6   leading-9 text-base px-12">
          Platform is a self-hosted solution that helps entrepreneurs to launch
          online tutoring and consultation platforms where multiple tutors or consultants can
          register and deliver one-to-one or group online sessions to learners. It is a highly scalable
          and fully customizable solution to meet the business requirements of the users. The solution
          is pre-integrated with Cometchat, Lesson Space, and Zoom to support features such as video chat,
          Whiteboard, Textpad, code editor, multiple screen sharing, etc., which improves the interaction between tutor and learner during an online session.
        </p>
        <p className="text-black leading-9 text-base  px-12">
          For seamless payment transactions, Platform is integrated with secured payment gateways
          like Paypal, Authorize.net, Stripe, Paystack, PayGate, 2Checkout/2CO. It is a complete solution with
          robust functionalities and essential features that guarantee high performance and consistent results.
          In addition to this, Platform is also available as PWA.
        </p>
        </div>
      </div>
    </div>
  </div>
   
   <Loveclients/>


    </div>
  );
};

export default AboutHeroSection;
