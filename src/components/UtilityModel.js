import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const UtilityModel = ({ isOpen, onClose, children }) => {
  const modelRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap
        .timeline()
        .to(backdropRef.current, {
          duration: 0.3,
          opacity: 1,
          ease: "power3.out",
          pointerEvents: "auto",
        })
        .fromTo(
          modelRef.current,
          {
            y: -100,
            opacity: 0,
            scale: 0.9,
          },
          {
            duration: 0.4,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power3.out",
            pointerEvents: "auto",
          }
        );
    } else {
      gsap
        .timeline()
        .to(modelRef.current, {
          duration: 0.3,
          y: -100,
          opacity: 0,
          scale: 0.9,
          ease: "power3.in",
          pointerEvents: "none",
          onComplete: onClose,
        })
        .to(
          backdropRef.current,
          {
            duration: 0.3,
            opacity: 0,
            ease: "power3.in",
            pointerEvents: "none",
          },
          "-=0.3"
        );
    }
  }, [isOpen, onClose]);

  return (
    <>
      <div>
        <div
          ref={backdropRef}
          className="fixed inset-0 bg-black bg-opacity-50 opacity-0 pointer-events-none"
        />
        <div
          ref={modelRef}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-8 opacity-0 pointer-events-none">
          {children}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default UtilityModel;
