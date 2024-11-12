"use client";
import React, { useState, useEffect, useRef } from "react";
import "../app/globals.css";
import gsap from "gsap";
import AddCardModal from "./AddCardModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditCardModal from "./EditCardModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { isAuth } from "@/utils/checkAuth";

const Hero = ({ data }) => {
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authenticated = await isAuth();
      setAuth(authenticated);
    };
    fetchAuthStatus();
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [cardList, setCardList] = useState(data || []);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItemsRef = useRef([]);

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

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const floatAnimation = () => {
    gsap.to(cardsRef.current, {
      y: "+=10",
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    });
  };

  const stopFloatAnimation = () => {
    gsap.killTweensOf(cardsRef.current);
    gsap.to(cardsRef.current, {
      y: 0,
      duration: 0.3,
      ease: "power1.inOut",
    });
  };

  useEffect(() => {
    if (editMode || deleteMode) {
      floatAnimation();
    } else {
      stopFloatAnimation();
    }

    return () => {
      stopFloatAnimation();
    };
  }, [editMode, deleteMode]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setDeleteMode(false);
  };

  const toggleDeleteMode = () => {
    setDeleteMode(!deleteMode);
    setEditMode(false);
  };

  useEffect(() => {
    if (data.length > 0) {
      const tl = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: "power3.out",
        },
      });

      tl.fromTo(".hero-title", { opacity: 0, y: -50 }, { opacity: 1, y: 0 })
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0 },
          "-=0.5"
        )
        .fromTo(
          cardsRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotationY: 180,
            y: -50,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            y: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.5"
        );
    }
  }, [data]);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuItemsRef.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power1.inOut",
      });
    } else {
      gsap.to(menuItemsRef.current, {
        duration: 0.5,
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: "power1.inOut",
      });
    }
  }, [isMenuOpen]);

  async function getData() {
    try {
      const response = await fetch("/api/modules");

      const data = await response.json();
      setCardList(data?.data);
    } catch (error) {
      toast.error("Something want wrong");
      console.error("Fetch error:", error);
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    setEditMode(false);
    setDeleteMode(false);
  };

  const openConfirmDeleteModal = (card) => {
    setIsConfirmDeleteModalOpen(true);
    setCardToDeleteIndex(card);
  };

  const openEditModal = (card) => {
    setIsEditModalOpen(true);
    setCardToEditIndex(card);
  };

  const handleAddCard = async (name, logo) => {
    setIsAddModalOpen(false);

    // Logic to add the card
    try {
      const response = await fetch("/api/modules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, logo }),
      });
      toast.success("Added successfully");
      getData();
    } catch (error) {
      toast.error("Something want wrong");
      console.error("Fetch error:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (cardToDeleteIndex !== null) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/modules/${cardToDeleteIndex?._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Delete successfully");
        const data = await response.json();
        getData();
      } catch (error) {
        toast.error("Something want wrong");
        console.error("Fetch error:", error);
      }
      setIsConfirmDeleteModalOpen(false);
    }
  };

  const handleEditCard = async (updatedName, updatedLogo) => {
    if (cardToEditIndex?._id !== null) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API}/api/modules/${cardToEditIndex?._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: updatedName, logo: updatedLogo }),
          }
        );
        toast.success("Update successfully");
        const data = await response.json();
        getData();
      } catch (error) {
        toast.error("Something want wrong");
        console.error("Fetch error:", error);
      }
      setIsEditModalOpen(false);
    }
  };

  return (
    <section className="h-full relative flex flex-col gap-12 items-center justify-center">
      <div className="hero-title">
        <h1 className="text-4xl">
          The Futuristic Way To{" "}
          <b className="text-[#009F69]">Manage projects</b>
        </h1>
      </div>
      <div className="hero-subtitle text-xl">Compare your data</div>

      <div className="absolute top-20 right-4 flex flex-col items-center">
        {auth ? (
          <button
            onClick={toggleMenu}
            className="bg-[#009F69] text-white p-4 rounded-full shadow-md hover:bg-[#007f55] focus:outline-none z-10"
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
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        ) : (
          <button
            className="bg-[#009F69] text-white p-2 px-4 rounded-full shadow-md hover:bg-[#007f55] focus:outline-none z-10"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        )}
        <div className="relative flex flex-col items-center mt-8 space-y-2">
          <button
            onClick={openAddModal}
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[0] = el)}
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
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[1] = el)}
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
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[2] = el)}
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

      <div className="w-full flex flex-wrap justify-center gap-4">
        {cardList?.map((card, index) => (
          <div
            key={index}
            ref={addToRefs}
            onClick={(e) => {
              e.stopPropagation();
              router.push(
                `/${formatRouteName(card?.name)}?modultId=${card?._id}`
              );
            }}
          >
            <div className="bg-white h-36 w-36 rounded-lg shadow-lg p-4 flex flex-col items-center justify-center relative cursor-pointer transform transition-transform hover:!scale-105">
              <img
                src={card.logo}
                alt={card.name}
                className="h-full w-full object-contain"
              />
              {(editMode || deleteMode) && (
                <div className="absolute top-2 right-2 flex gap-2">
                  {editMode && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(card);
                      }}
                      className="bg-blue-500 text-white p-1 rounded-full shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
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
                        openConfirmDeleteModal(card);
                      }}
                      className="bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-700 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
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
            </div>
            <h3 className="mt-4 text-center text-lg">{card.name}</h3>
          </div>
        ))}
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

export default Hero;
