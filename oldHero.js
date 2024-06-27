import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import UtilityModel from "./UtilityModel";

const Hero = () => {
  const [editMode, setEditMode] = useState(false);
  const [cardList, setCardList] = useState(generateInitialCards());
  const cardsRef = useRef([]);
  cardsRef.current = [];

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const menuItemsRef = useRef([]);
  const divRef = useRef();

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
    if (editMode) {
      floatAnimation();
    } else {
      stopFloatAnimation();
    }

    return () => {
      stopFloatAnimation();
    };
  }, [editMode]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleRemoveCard = (index) => {
    setCardList((prevCards) => prevCards.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
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
  }, []);

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

  function generateInitialCards() {
    return Array.from({ length: 6 }).map((_, index) => ({
      id: index,
      title: `Card Title ${index + 1}`,
      imageUrl: `https://via.placeholder.com/300x200?text=Image+${index + 1}`,
    }));
  }

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cardClick = () => {
    gsap.to(divRef.current, {
      duration: 0.5,
      width: "100vw",
      height: "100vh",
      borderRadius: "0px",
    });
  };

  return (
    <section className="h-full relative flex flex-col gap-12 items-center justify-center">
      <div
        className="absolute inset-0 bg-white rounded-full h-0 w-0"
        ref={divRef}
        style={{
          position: "fixed",
          zIndex: -1,
          visibility: "hidden",
        }}
      >
        {/* Placeholder div, adjust as per your layout */}
      </div>
      <div className="hero-title">
        <h1 className="text-4xl">
          The Futuristic Way To{" "}
          <b className="text-[#009F69]"> Manage projects</b>
        </h1>
      </div>
      <div className="hero-subtitle text-xl">Compare your data</div>

      <div className="absolute top-20 right-4 flex flex-col items-center">
        <button
          onClick={toggleMenu}
          ref={menuButtonRef}
          className="bg-[#009F69] p-4 rounded-full shadow-md hover:bg-[#007f55] focus:outline-none z-10"
        >
          <span className="block w-5 h-0.5 bg-white mb-1"></span>
          <span className="block w-5 h-0.5 bg-white"></span>
        </button>
        <div className="relative flex flex-col items-center mt-8 space-y-2">
          <button
            onClick={toggleModel}
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[0] = el)}
          >
            Add
          </button>
          <button
            onClick={toggleEditMode}
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[1] = el)}
          >
            Edit
          </button>
          <button
            onClick={toggleEditMode}
            className="menu-item bg-gray-200 px-4 py-2 rounded-md shadow-md hover:bg-gray-300 focus:outline-none opacity-0 transform -translate-y-5"
            ref={(el) => (menuItemsRef.current[2] = el)}
          >
            {editMode ? "Done" : "Delete"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl flex gap-12">
        {cardList.map((card, index) => (
          <div
            key={card.id}
            ref={addToRefs}
            onClick={cardClick}
            className="relative flex flex-col justify-center items-center gap-6"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-110">
              <img
                src={card.imageUrl}
                alt={`Card Image ${index + 1}`}
                className="w-28 h-28 object-cover"
              />
              {editMode && (
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none"
                  onClick={() => handleRemoveCard(index)}
                >
                  X
                </button>
              )}
            </div>
            <div className="text-center text-lg">{card.title}</div>
          </div>
        ))}
      </div>
      <UtilityModel isOpen={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <h2 className="text-2xl mb-4">Custom Modal Content</h2>
        <p className="text-gray-700">
          You can pass any content here, such as forms, text, images, or other
          React components.
        </p>
      </UtilityModel>
    </section>
  );
};

export default Hero;
