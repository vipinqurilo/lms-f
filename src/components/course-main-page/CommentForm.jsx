"use client";

import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import InputField from "../login/InputField";
import SubmitButton from "../login/SubmitButton";
import { useDispatch } from "react-redux";
import { addReview } from "@/store/slices/coursesSlice";
import { useSelector } from "react-redux";

const RatingInput = ({ initialRating = 0, onRatingChange }) => {
  const maxStars = 5;
  const [rating, setRating] = useState(initialRating);

  const handleStarClick = (index) => {
    const newRating = index + 1; // Stars are 1-indexed
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating); // Callback for external handling
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        {Array(maxStars)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              className="cursor-pointer"
            >
              {index < rating ? (
                <FaStar className="text-yellow-500" />
              ) : (
                <FaRegStar className="text-yellow-500" />
              )}
            </span>
          ))}
      </div>
      <span>
        {rating} / {maxStars}
      </span>
    </div>
  );
};

const CommentForm = ({ id }) => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    reset,
  } = useForm();
  const [ratings, setRatings] = useState(5);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.courses);

  const handleRatingChange = (newRating) => {
    setRatings(newRating);
  };

  useEffect(() => {
    setValue("ratings", ratings);
  }, [ratings]);

  const submitHandler = (data) => {
    const formData = {
      ...data,
      course: id,
      rating: ratings
    };
    dispatch(addReview(formData))
      .unwrap()
      .then(() => reset());
  };

  return (
    <div className="course-sub-container">
      <Heading data={"Write Review and Ratings"} />
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div className="text-2xl flex items-center justify-start">
          <RatingInput
            initialRating={ratings}
            onRatingChange={handleRatingChange}
          />
        </div>
        <InputField
          label={"Review:"}
          errors={errors}
          name={"review"}
          placeHolder={"Enter Your Review"}
          register={register}
          type={"text"}
        />
        <div className="">
          <label
            htmlFor={"message"}
            className="text-light mb-2 block font-medium"
          >
            Write Message:
          </label>
          <div className="relative">
            <textarea
              id={"message"}
              {...register("message", {
                required: `*${"Message"} is required`,
              })}
              className="w-full h-40 resize-none border border-black/10 p-3 rounded px-4 focus:outline-secondary transition-custom"
              placeholder={"Enter message Here"}
            />
          </div>
          {errors.message && (
            <span className="text-xs text-red-500">
              {errors.message.message}
            </span>
          )}
        </div>
        <SubmitButton text={"Submit Review"} loading={isLoading["addReview"]} />
      </form>
    </div>
  );
};

export default CommentForm;
