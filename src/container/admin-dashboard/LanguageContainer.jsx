"use client";

import AddLanguage from "@/components/admin-dashboard/languages/AddLanguage";
import CommonButton from "@/components/common/CommonButton";
import DeleteModal from "@/components/instructor/DeleteModal";
import TableHeader from "@/components/instructor/TableHeader";
import { deleteLanguage } from "@/store/slices/languageSlice";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const headingsData = ["SNO.", "Id", "Name", "Actions"];

const LanguageContainer = () => {
  const [isLanguageAdd, setisLanguageAdd] = useState(false);
  const [isEditLanguage, setisEditLanguage] = useState(null);
  const [isDeleteLanguage, setisDeleteLanguage] = useState(null);
  const toggleLanguageAdd = () => setisLanguageAdd(!isLanguageAdd);
  const { languages, isLoading } = useSelector((state) => state.languages);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteLanguage(isDeleteLanguage))
      .unwrap()
      .then(() => {
        setisDeleteLanguage(null);
      });
  };

  return (
    <main className="">
      <div className="lg:p-5 xl:p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Languages</h1>
          <CommonButton label={"Add Language"} onClick={toggleLanguageAdd} />
        </div>
        <div className="w-full rounded-lg overflow-hidden bg-white mt-6">
          <table className="w-full border border-black/10 !rounded-lg">
            <TableHeader headingsData={headingsData} />
            <tbody>
              {languages?.length === 0 ? (
                <tr>
                  <td
                    className="py-2 text-center"
                    colSpan={headingsData?.length}
                  >
                    No Record Found
                  </td>
                </tr>
              ) : (
                languages?.map((language, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-2 px-6">{i + 1}</td>
                    <td className="py-2 px-6">{language?._id}</td>
                    <td className="py-2 px-6">{language?.name}</td>
                    <td className="py-2 px-4  space-x-4">
                      <button
                        className="text-gray-600 hover:text-yellow-500"
                        onClick={() => setisEditLanguage(language?._id)}
                      >
                        <FiEdit2 size={18} />
                      </button>
                      <button
                        className="text-gray-600 hover:text-red-500"
                        onClick={() => setisDeleteLanguage(language?._id)}
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isLanguageAdd && <AddLanguage handleClose={toggleLanguageAdd} />}
      {isEditLanguage !== null && (
        <AddLanguage
          handleClose={() => setisEditLanguage(null)}
          isEdit={isEditLanguage}
        />
      )}
      {isDeleteLanguage !== null && (
        <DeleteModal
          text={"Language"}
          onClose={() => setisDeleteLanguage(null)}
          loading={isLoading["deleteLanguage"]}
          handleDelete={handleDelete}
        />
      )}
    </main>
  );
};

export default LanguageContainer;
