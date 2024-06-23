import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import AddCardModal from "./AddCardModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditCardModal from "./EditCardModal";

const Hero = () => {
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [cardList, setCardList] = useState([]);
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItemsRef = useRef([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [cardToDeleteIndex, setCardToDeleteIndex] = useState(null);
  const [cardToEditIndex, setCardToEditIndex] = useState(null);

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
    if (cardList.length > 0) {
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
  }, [cardList]);

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

  const openEditModal = (index) => {
    setIsEditModalOpen(true);
    setCardToEditIndex(index);
  };

  const handleAddCard = (name, logo) => {
    setIsAddModalOpen(false);
    // Logic to add the card
  };

  const handleConfirmDelete = () => {
    if (cardToDeleteIndex !== null) {
      setCardList((prevCards) =>
        prevCards.filter((_, idx) => idx !== cardToDeleteIndex)
      );
      setIsConfirmDeleteModalOpen(false);
    }
  };

  const handleEditCard = (updatedName, updatedLogo) => {
    if (cardToEditIndex !== null) {
      setCardList((prevCards) =>
        prevCards.map((card, idx) =>
          idx === cardToEditIndex
            ? { ...card, title: updatedName, imageUrl: updatedLogo }
            : card
        )
      );
      setIsEditModalOpen(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("/api/modules");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCardList(data?.data);
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
        <button
          onClick={toggleMenu}
          className="bg-[#009F69] text-white p-4 rounded-full shadow-md hover:bg-[#007f55] focus:outline-none z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="relative flex flex-col items-center mt-8 space-y-2">
          <button
            onClick={openAddModal}
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[0] = el)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6">
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
            ref={(el) => (menuItemsRef.current[1] = el)}>
            {editMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
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
                className="size-6">
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
            ref={(el) => (menuItemsRef.current[2] = el)}>
            {deleteMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6">
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
                className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.75 9.75v9m4.5-9v9m-9 0h13.5m-12-10.5h10.5m-8.25 0v-1.5a2.25 2.25 0 1 1 4.5 0v1.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-4">
        {cardList.map((card, index) => (
          <div
            key={index}
            ref={addToRefs}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center justify-center w-48 h-48 relative">
            <img
              src={card.imageUrl}
              alt={card.title}
              className="w-full h-full object-cover rounded-md"
            />
            <h3 className="mt-2 text-center">{card.title}</h3>
            {(editMode || deleteMode) && (
              <div className="absolute top-2 right-2 flex gap-2">
                {editMode && (
                  <button
                    onClick={() => openEditModal(index)}
                    className="bg-blue-500 text-white p-1 rounded-full shadow-md hover:bg-blue-700 focus:outline-none">
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
                        d="M16.862 3.487a2.625 2.625 0 0 1 3.705 3.706L7.5 20.261 3 21l.738-4.5L16.862 3.487z"
                      />
                    </svg>
                  </button>
                )}
                {deleteMode && (
                  <button
                    onClick={() => openConfirmDeleteModal(index)}
                    className="bg-red-500 text-white p-1 rounded-full shadow-md hover:bg-red-700 focus:outline-none">
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
                        d="M9.75 9.75v9m4.5-9v9m-9 0h13.5m-12-10.5h10.5m-8.25 0v-1.5a2.25 2.25 0 1 1 4.5 0v1.5"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
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
      />
    </section>
  );
};

export default Hero;
