import React from "react";
import SettingsInputField from "../instructor/SettingsInputField";
import toast from "react-hot-toast";

const AddExperience = ({
  handleSubmit,
  addExperience,
  register,
  errors,
  control,
}) => {
  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "text/plain",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/pdf",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Allowed: png, jpg, jpeg, txt, doc, docx, pdf."
        );
      } else if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB.");
      } else {
        toast.success("File uploaded successfully!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(addExperience)} className="space-y-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SettingsInputField
          errors={errors}
          label={"Experience type"}
          control={control}
          name={"type"}
          options={["work experience", "education", "certification"].map(
            (option) => ({
              label: option,
              value: option.toLowerCase().replace(/\s+/g, "_"),
            })
          )}
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

      <div className="space-y-2">
        <label
          htmlFor="certificate"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Certificate
        </label>
        <input
          type="file"
          id="certificate"
          accept=".png, .jpg, .jpeg, .txt, .doc, .docx, .pdf"
          className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          {...register("certificate")}
          onChange={onFileChange}
        />
        <p className="text-xs text-gray-500">
          Certificate max size 2.00 MB and allowed ext png, jpg, jpeg, txt, doc,
          docx, pdf
        </p>
        {errors.certificate && (
          <p className="text-sm text-red-500">{errors.certificate.message}</p>
        )}
      </div>

      <button
        type="submit"
        className=" w-fit flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary ring-[1px] ring-gray-200 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Add Experience
      </button>
    </form>
  );
};

export default AddExperience;
