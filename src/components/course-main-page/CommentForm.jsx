import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useForm } from "react-hook-form";
import InputField from "../login/InputField";
import SubmitButton from "../login/SubmitButton";

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

const CommentForm = () => {
  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();
  const [ratings, setRatings] = useState(3);

  const handleRatingChange = (newRating) => {
    setRatings(newRating);
  };

  useEffect(() => {
    setValue("ratings", ratings);
  }, [ratings]);

  const submitHandler = (data) => {
    console.log(data);
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
          label={"Name:"}
          errors={errors}
          name={"name"}
          placeHolder={"Enter Your Name"}
          register={register}
          type={"text"}
        />
        <div className="">
          <label
            htmlFor={"review"}
            className="text-light mb-2 block font-medium"
          >
            Write Review:
          </label>
          <div className="relative">
            <textarea
              id={"review"}
              {...register("review", { required: `*${"review"} is required` })}
              className="w-full h-40 resize-none border border-black/10 p-3 rounded px-4 focus:outline-secondary transition-custom"
              placeholder={"Enter Review Here"}
            />
          </div>
          {errors.review && (
            <span className="text-xs text-red-500">
              {errors.review.message}
            </span>
          )}
        </div>
        <SubmitButton text={"Submit Review"} />
      </form>
    </div>
  );
};

export default CommentForm;
