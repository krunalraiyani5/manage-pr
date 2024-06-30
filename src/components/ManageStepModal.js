import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const ManageStepModal = ({ isOpen, onClose, getData, steps }) => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");

  console.log(companyId, "companyId");

  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  const [status, setStatus] = useState("pending");
  const [tab, setTab] = useState("add");
  const [selectEdit, setSelectEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (companyId && name && order && status) {
      try {
        const response = await fetch("/api/steppers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyId, name, status, order }),
        });
        onClose();
        getData();
        setName("");
        setOrder("");
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (companyId && name && order && status) {
      try {
        const response = await fetch(`/api/steppers/${editData?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ companyId, name, status, order }),
        });
        onClose();
        getData();
        setName("");
        setOrder("");
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (deleteData?._id) {
      try {
        const response = await fetch(`/api/steppers/${deleteData?._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        onClose();
        getData();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  console.log(steps, "steps");

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Manage Steps
                </h3>

                {/* Tabs */}
                <div className="mb-4">
                  <nav className="flex">
                    <button
                      onClick={() => setTab("add")}
                      className={`${
                        tab === "add"
                          ? "bg-[#009F69] text-white"
                          : "text-gray-700"
                      } px-4 py-2 mr-2 rounded-md focus:outline-none`}>
                      Add
                    </button>
                    <button
                      onClick={() => setTab("edit")}
                      className={`${
                        tab === "edit"
                          ? "bg-[#009F69] text-white"
                          : "text-gray-700"
                      } px-4 py-2 mr-2 rounded-md focus:outline-none`}>
                      Edit
                    </button>
                    <button
                      onClick={() => setTab("delete")}
                      className={`${
                        tab === "delete"
                          ? "bg-[#009F69] text-white"
                          : "text-gray-700"
                      } px-4 py-2 rounded-md focus:outline-none`}>
                      Delete
                    </button>
                  </nav>
                </div>

                {/* Tab Content */}
                {tab === "add" && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <h3 className="block text-sm font-medium text-gray-700">
                        Status
                      </h3>
                      <ul className="mt-1 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                          <div className="flex items-center ps-3">
                            <input
                              id="status-pending"
                              type="radio"
                              value="pending"
                              name="status-radio"
                              className="peer hidden"
                              checked={status === "pending"}
                              onChange={() => setStatus("pending")}
                            />
                            <label
                              htmlFor="status-pending"
                              className={`w-full py-3 ms-2 text-sm font-medium cursor-pointer ${
                                status === "pending"
                                  ? "text-green-600 border-green-600"
                                  : "text-gray-900 dark:text-gray-300"
                              } peer-checked:border-green-600 peer-checked:text-green-600`}>
                              Pending
                            </label>
                          </div>
                        </li>
                        <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                          <div className="flex items-center ps-3">
                            <input
                              id="status-complete"
                              type="radio"
                              value="complete"
                              name="status-radio"
                              className="peer hidden"
                              checked={status === "complete"}
                              onChange={() => setStatus("complete")}
                            />
                            <label
                              htmlFor="status-complete"
                              className={`w-full py-3 ms-2 text-sm font-medium cursor-pointer ${
                                status === "complete"
                                  ? "text-green-600 border-green-600"
                                  : "text-gray-900 dark:text-gray-300"
                              } peer-checked:border-green-600 peer-checked:text-green-600`}>
                              Complete
                            </label>
                          </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                          <div className="flex items-center ps-3">
                            <input
                              id="status-problem"
                              type="radio"
                              value="problem"
                              name="status-radio"
                              className="peer hidden"
                              checked={status === "problem"}
                              onChange={() => setStatus("problem")}
                            />
                            <label
                              htmlFor="status-problem"
                              className={`w-full py-3 ms-2 text-sm font-medium cursor-pointer ${
                                status === "problem"
                                  ? "text-green-600 border-green-600"
                                  : "text-gray-900 dark:text-gray-300"
                              } peer-checked:border-green-600 peer-checked:text-green-600`}>
                              Problem
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="order"
                        className="block text-sm font-medium text-gray-700">
                        Order
                      </label>
                      <input
                        type="number"
                        id="order"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#009F69] text-base font-medium text-white hover:bg-[#007f55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                        Add
                      </button>
                      <button
                        onClick={onClose}
                        type="button"
                        className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {tab === "edit" && (
                  <div>
                    {!selectEdit ? (
                      <div>
                        {steps?.map((item) => (
                          <div className="mb-4" key={item?._id}>
                            <div className="flex items-center gap-2 border-2 rounded-md p-2 px-4">
                              <div className="inline-flex items-center justify-between w-full cursor-pointer peer-checked:text-red-600 hover:text-gray-600 dark:text-gray-400">
                                {item?.name}
                              </div>
                              <button
                                onClick={() => {
                                  setSelectEdit(true);
                                  setEditData(item);
                                  setName(item?.name);
                                  setStatus(item?.status);
                                  setOrder(item?.order);
                                }}
                                className={`p-2 bg-gray-200 text-[#009F69] border-2 border-[#009F69] rounded-md shadow-md hover:bg-gray-300 focus:outline-none`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="size-4">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              setSelectEdit(false);
                              onClose();
                            }}
                            type="button"
                            className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                          <h3 className="block text-sm font-medium text-gray-700">
                            Status
                          </h3>
                          <ul className="mt-1 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="status-pending"
                                  type="radio"
                                  value="pending"
                                  name="status-radio"
                                  className="peer hidden"
                                  checked={status === "pending"}
                                  onChange={() => setStatus("pending")}
                                />
                                <label
                                  htmlFor="status-pending"
                                  className={`w-full py-3 ms-2 text-sm font-medium cursor-pointer ${
                                    status === "pending"
                                      ? "text-green-600 border-green-600"
                                      : "text-gray-900 dark:text-gray-300"
                                  } peer-checked:border-green-600 peer-checked:text-green-600`}>
                                  Pending
                                </label>
                              </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="status-complete"
                                  type="radio"
                                  value="complete"
                                  name="status-radio"
                                  className="peer hidden"
                                  checked={status === "complete"}
                                  onChange={() => setStatus("complete")}
                                />
                                <label
                                  htmlFor="status-complete"
                                  className={`w-full py-3 ms-2 text-sm font-medium cursor-pointer ${
                                    status === "complete"
                                      ? "text-green-600 border-green-600"
                                      : "text-gray-900 dark:text-gray-300"
                                  } peer-checked:border-green-600 peer-checked:text-green-600`}>
                                  Complete
                                </label>
                              </div>
                            </li>
                            <li className="w-full dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="status-problem"
                                  type="radio"
                                  value="problem"
                                  name="status-radio"
                                  className="peer hidden"
                                  checked={status === "problem"}
                                  onChange={() => setStatus("problem")}
                                />
                                <label
                                  htmlFor="status-problem"
                                  className={`w-full py-3 ms-2 text-sm font-medium cursor-pointer ${
                                    status === "problem"
                                      ? "text-green-600 border-green-600"
                                      : "text-gray-900 dark:text-gray-300"
                                  } peer-checked:border-green-600 peer-checked:text-green-600`}>
                                  Problem
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="order"
                            className="block text-sm font-medium text-gray-700">
                            Order
                          </label>
                          <input
                            type="number"
                            id="order"
                            value={order}
                            onChange={(e) => setOrder(e.target.value)}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                          />
                        </div>
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#009F69] text-base font-medium text-white hover:bg-[#007f55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                            Done
                          </button>
                          <button
                            onClick={() => {
                              setSelectEdit(false);
                              onClose();
                            }}
                            type="button"
                            className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {tab === "delete" && (
                  <form onSubmit={handleDelete}>
                    {steps?.map((item) => (
                      <div className="mb-4" key={item?._id}>
                        <div className="flex items-center gap-2 border-2 rounded-md p-2 px-4">
                          <input
                            type="radio"
                            id={item?._id}
                            name="step"
                            className="peer"
                            onChange={() => setDeleteData(item)}
                          />
                          <label
                            htmlFor={item?._id}
                            className="inline-flex items-center justify-between w-full cursor-pointer peer-checked:text-red-600 hover:text-gray-600 dark:text-gray-400">
                            {item?.name}
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#009F69] text-base font-medium text-white hover:bg-[#007f55] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                        Delete
                      </button>
                      <button
                        onClick={onClose}
                        type="button"
                        className="ml-2 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009F69] sm:text-sm">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageStepModal;
