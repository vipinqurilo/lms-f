import React from "react";
import SettingsInputField from "../instructor/SettingsInputField";
import toast from "react-hot-toast";

const AddExperience = ({
  handleSubmit,
  addExperience,
  register,
  errors,
  control,
  watch,
  addEducation,
}) => {
  const type = watch("type");

  console.log("type", type);

  return (
    <form
      onSubmit={handleSubmit(
        type === "education" ? addEducation : addExperience
      )}
      className="space-y-4"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SettingsInputField
          errors={errors}
          label={"Experience type"}
          control={control}
          name={"type"}
          options={["work experience", "education"].map((option) => ({
            label: option,
            value: option.toLowerCase().replace(/\s+/g, "_"),
          }))}
          register={register}
          isSelect={true}
        />
        <SettingsInputField
          errors={errors}
          label={"Title"}
          name={"title"}
          register={register}
        />
      </div>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SettingsInputField
          errors={errors}
          label={"Institution"}
          name={"institution"}
          register={register}
        />
        <SettingsInputField
          errors={errors}
          label={"Location"}
          name={"location"}
          register={register}
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="Description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="Description"
          className="mt-1 block px-4 py-2  w-full rounded-md border-gray-300 shadow-sm focus:border-primary      focus:ring focus:ring-primary ring-[1px] ring-gray-200 outline-none resize-none"
          {...register("des")}
          rows={4}
        />
      </div>
      <div className="w-full grid grid-cols-2 gap-5">
        <SettingsInputField
          errors={errors}
          label={"Start year"}
          name={"startyear"}
          register={register}
        />

        <SettingsInputField
          errors={errors}
          label={"End year"}
          name={"endyear"}
          register={register}
        />
      </div>

      <SettingsInputField
        errors={errors}
        label={"Document"}
        name={"certificate"}
        register={register}
      />

      <button
        type="submit"
        className=" w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Add {type === "education" ? "Education" : "Experience"}
      </button>
    </form>
  );
};

export default AddExperience;
