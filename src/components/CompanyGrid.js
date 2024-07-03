"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import AddCardModal from "./AddCardModal";
import EditCardModal from "./EditCardModal";

const CompanyGrid = ({ data }) => {
  const router = useRouter();
  const gridRef = useRef(null);
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("modultId");

  const [isGridView, setIsGridView] = useState(true);
  const [cardList, setCardList] = useState(data || []);
  const pathname = usePathname();
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardToDeleteIndex, setCardToDeleteIndex] = useState(null);
  const [cardToEditIndex, setCardToEditIndex] = useState({
    name: "",
    logo: "",
  });

  const formatRouteName = (pathname) => {
    return pathname.split(" ").join("-").toLowerCase();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setEditMode(false);
    setDeleteMode(false);
  };

  const openConfirmDeleteModal = (index) => {
    setIsConfirmDeleteModalOpen(true);
    setCardToDeleteIndex(index);
  };

  const openEditModal = (card) => {
    setIsEditModalOpen(true);
    setCardToEditIndex(card);
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/companies/${moduleId}`,
        {
          cache: "no-store",
        }
      );

      const data = await response.json();
      setCardList(data?.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleAddCard = async (name, logo) => {
    setIsAddModalOpen(false);

    // Logic to add the card
    try {
      const response = await fetch(`/api/companies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moduleId, name, logo }),
      });

      getData();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (cardToDeleteIndex !== null) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/${cardToDeleteIndex?._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        getData();
      } catch (error) {
        console.error("Fetch error:", error);
      }
      setIsConfirmDeleteModalOpen(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setDeleteMode(false);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setEditMode(false);
  };

  const handleEditCard = async (updatedName, updatedLogo) => {
    if (cardToEditIndex?._id !== null) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/companies/${cardToEditIndex?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: updatedName, logo: updatedLogo }),
          }
        );

        const data = await response.json();
        getData();
      } catch (error) {
        console.error("Fetch error:", error);
      }
      setIsEditModalOpen(false);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
      );
    }
  }, [data]);

  useEffect(() => {
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [isGridView]);

  return (
    <section className="bg-gray-200">
      <div className="mx-20">
        <div className="sticky top-[4.2rem] z-50 flex justify-end mb-4 gap-4">
          <button
            className={`px-4 py-2 bg-white text-black rounded-md shadow-lg ${
              !isGridView ? "opacity-50 cursor-default" : ""
            }`}
            onClick={() => setIsGridView(true)}
            disabled={isGridView}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
              />
            </svg>
          </button>
          <button
            className={`px-4 py-2 bg-white text-black rounded-md shadow-lg ${
              isGridView ? "opacity-50 cursor-default" : ""
            }`}
            onClick={() => setIsGridView(false)}
            disabled={!isGridView}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>
          </button>
          {/* menu button */}
          <button
            onClick={toggleMenu}
            className={`px-4 py-2 text-white rounded-md shadow-lg bg-[#009F69] hover:bg-[#007f55] z-20`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>

          {/* add,edit and delete buttons */}
          <div
            className={`absolute flex flex-col items-center mt-5 space-y-2 duration-300 delay-300 transform ${
              isMenuOpen ? "translate-x-16" : "translate-x-0"
            }`}
          >
            <button
              onClick={openAddModal}
              className={`menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-300 z-10 transform ${
                isMenuOpen ? "translate-y-7" : "-translate-y-5 opacity-0"
              } `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
            </button>
            <button
              onClick={toggleEditMode}
              className={`menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none transition-all duration-300 transform z-10 ${
                isMenuOpen ? "translate-y-8" : "-translate-y-20 opacity-0"
              }`}
            >
              {editMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.625 2.625 0 0 1 3.705 3.706L7.5 20.261 3 21l.738-4.5L16.862 3.487z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={toggleDeleteMode}
              className={`menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none transform transition-all duration-300 z-10 ${
                isMenuOpen ? "translate-y-9" : "-translate-y-28 opacity-0"
              }`}
            >
              {deleteMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          ref={gridRef}
          className={`grid ${
            isGridView ? "grid-cols-6" : "grid-cols-2 sm:grid-cols-2"
          } gap-8 mt-8`}
        >
          {cardList?.map((company, index) => (
            <div
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                router.push(
                  `${pathname}/${formatRouteName(
                    company?.name
                  )}?modultId=${moduleId}&companyId=${company?._id}`
                );
              }}
              className={`bg-white rounded-lg cursor-pointer shadow-lg overflow-hidden flex relative ${
                isGridView ? "flex-col" : ""
              } transform transition-transform hover:scale-105 ${
                isGridView ? "mb-8" : ""
              }`}
              style={{ transitionDuration: "0.3s" }}
            >
              {/* Left Side: Company Image and Details */}
              <div className={`p-4 ${isGridView ? "" : "sm:w-2/3"}`}>
                <div
                  className={`w-full ${
                    isGridView ? "h-32" : "h-52"
                  } object-cover`}
                >
                  <img
                    src={company?.logo}
                    alt={`Company ${company?.name}`}
                    className={`h-full w-full object-contain`}
                  />
                </div>
                <h2 className="text-gray-800 font-bold text-lg mt-4">
                  {company?.name}
                </h2>
              </div>
              {(editMode || deleteMode) && (
                <div className="absolute top-2 right-2 flex gap-2">
                  {editMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(company);
                      }}
                      className="bg-blue-500 text-white p-1 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 3.487a2.625 2.625 0 0 1 3.705 3.706L7.5 20.261 3 21l.738-4.5L16.862 3.487z"
                        />
                      </svg>
                    </button>
                  )}
                  {deleteMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openConfirmDeleteModal(company);
                      }}
                      className="bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-700 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              )}

              {/* Right Side: Milestones or Stepper (Hidden in Grid View) */}
              {!isGridView && (
                <div className="bg-gray-100 p-4 px-6 sm:w-1/3">
                  <h3 className="text-gray-700 text-lg font-medium mb-4">
                    Progress
                  </h3>
                  <div className="space-y-2">
                    {company?.steppers?.map((milestone) => (
                      <div
                        key={milestone._id}
                        className="flex items-center space-x-2"
                      >
                        <div
                          className={`h-4 w-4 rounded-full ${
                            milestone?.status === "complete"
                              ? "bg-green-500"
                              : milestone.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <p className="text-md">{milestone?.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddCardModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCard={handleAddCard}
      />
      <ConfirmDeleteModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteModalOpen(false)}
        onConfirmDelete={handleConfirmDelete}
      />
      <EditCardModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditCard={handleEditCard}
        initialName={cardToEditIndex?.name}
        initialLogo={cardToEditIndex?.logo}
      />
    </section>
  );
};

export default CompanyGrid;
