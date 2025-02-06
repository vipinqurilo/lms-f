import React from "react";

const EditDetailsModal = ({ isOpen, onClose, withdrawal, onSave }) => {
  console.log(withdrawal, "jijjiji");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-9 rounded-lg shadow-lg w-9/12 h-[90vh] overflow-auto   ">
        <h2 className="text-xl font-semibold text-gray-700 mb-9 ">
          Edit User
        </h2>
        <div className="grid grid-cols-2 gap-4 gap-y-5">
          {/* ID */}
          <div>
            <label className="text-sm font-bold text-gray-700">ID</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              defaultValue={withdrawal?.userId}
              disabled
            />
          </div>
          {/* Image */}
          <div>
            <label className="text-sm font-medium text-gray-700">Image</label>
            <input type="file" className="w-full border px-3 py-2 rounded" />
          </div>
          {/* Name/ID */}
          <div>
            <label className="text-sm font-medium text-gray-700">Name/ID</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              defaultValue={withdrawal?.method}
            />
          </div>
          {/* Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">Type</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              defaultValue={withdrawal?.type}
            />
          </div>
          {/* Email/Phone */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email/Phone
            </label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              defaultValue={withdrawal?.email}
            />
          </div>
          {/* Registered */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Registered
            </label>
            <input
              type="date"
              className="w-full border px-3 py-2 rounded"
              defaultValue={
                withdrawal?.registered
                  ? new Date(withdrawal.registered).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>

          {/* Featured */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Featured
            </label>
            <select
              className="w-full border px-3 py-2 rounded"
              defaultValue={withdrawal?.featured}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          {/* Verified */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Verified
            </label>
            <select
              className="w-full border px-3 py-2 rounded"
              defaultValue={withdrawal?.verified}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDetailsModal;
