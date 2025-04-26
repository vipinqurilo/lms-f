"use client"

import React from "react";
import "leaflet/dist/leaflet.css";
import { useForm } from "react-hook-form";
import InputField from "../login/InputField";
import SubmitButton from "../login/SubmitButton";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { contactUs } from "../../store/slices/supportSlice";

const ContactUs = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.support);
  
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const result = await dispatch(contactUs(data)).unwrap();
      if (result) {
        toast.success('Message sent successfully!');
        reset();
      }
    } catch (error) {
      toast.error(error?.message || 'Failed to send message');
    }
  };

  return (
    <div className="bg-[#F2F2F2] flex flex-col items-center py-2 overflow-hidden font-nunito">
      {/* Title Section */}
      <div className="bg-[#F2F2F2] w-full">
        <div className="text-center mb-10 mt-16">
          <h1 className="text-base font-semibold text-orange-500">
            Contact Us
          </h1>
          <p className="text-3xl text-black mt-2">Want to get in touch?</p>
          <p className="text-3xl text-black mt-2">
            We would love to hear from you.
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="bg-gray-100 w-full lg:flex lg:px-10 justify-between items-center lg:rounded-t-xl">
        <div className="w-full p-5 lg:px-12 flex justify-center items-center">
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="space-y-6 w-full sm:w-9/12 mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                type="text"
                label="Name"
                name="name"
                register={register}
                validation={{
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name should be at least 2 characters long"
                  }
                }}
                errors={errors}
                placeHolder="Enter Your Name"
              />

              <InputField
                type="tel"
                label="Phone Number"
                name="number"
                register={register}
                validation={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d+$/,
                    message: "Please enter a valid phone number"
                  }
                }}
                errors={errors}
                placeHolder="Enter Your Phone Number"
              />
            </div>

            <InputField
              type="email"
              label="Email"
              name="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Please enter a valid email address"
                }
              }}
              errors={errors}
              placeHolder="Enter Your Email Address"
            />

            <div className="">
              <label
                htmlFor="message"
                className="text-light mb-2 block font-medium"
              >
                Message
              </label>
              <div className="relative">
                <textarea
                  rows={5}
                  id="message"
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message should be at least 10 characters long"
                    }
                  })}
                  className="w-full resize-none border border-black/10 p-3 rounded px-4 focus:outline-secondary transition-custom"
                  placeholder="Enter Your Thoughts"
                />
              </div>
              {errors?.message && (
                <span className="text-xs text-red-500">
                  {errors?.message.message}
                </span>
              )}
            </div>

            <SubmitButton text={isLoading?.contactUs ? "Sending..." : "Send Message"} disabled={isLoading?.contactUs} />
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full flex flex-wrap justify-center relative mt-12">
        <div className="w-full lg:h-[65vh] h-[65vh]">
          <iframe
            className="w-full h-[65vh] z-10"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d20341.971606782456!2d28.107744412262633!3d-25.671741686334983!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ebfd794cdf22c65%3A0x52fe3aacbeb58b0a!2sSTEAM%20Institute!5e0!3m2!1sen!2sin!4v1738130726415!5m2!1sen!2sin"
            style={{
              border: 0,
              allowFullScreen: "",
              loading: "lazy",
              referrerPolicy: "no-referrer-when-downgrade",
            }}
          ></iframe>

          <div className="bg-[#F5F5F5] lg:w-72 h-64 p-4 shadow-lg lg:flex flex-col lg:relative lg:bottom-[59vh] lg:left-4 flex justify-center items-center text-white lg:mt-auto mt-10">
            <div className="lg:space-y-1 lg:w-auto w-7/12">
              <div className="text-lg font-semibold text-black">
                STEAM Institute
              </div>
              <div className="text-base text-black mt-4">
                52 Spekboom Avenue,
              </div>
              <div className="text-base text-black">Amandasig Akasia,</div>
              <div className="text-base text-black">Pretoria, 0182,</div>
              <div className="text-base text-black">South Africa</div>
              <div className="text-base text-black">+27 82 766 8986</div>
              <a
                href="mailto:info@STEAMinstitute.online"
                className="text-orange-500 hover:text-orange-300 underline"
              >
                info@STEAMinstitute.online
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
