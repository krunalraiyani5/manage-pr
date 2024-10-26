"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  const images = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpb7LwZjsgrr9sRzev5715ZH74bfihu-zMlcKATLbvsCK9BQ1FFjOtKuDCJVv-qYLVp-g&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9POHIO8yk3pHu0C7Q0h3xjHVfpbZzefEBPuNijhstthVvrN_XnKPREEC1zXVHSWwewyY&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmq98Eh57Wd4jpplH09WY55elSJvjb4y3OE6UG8Bp6AyyaFlrDw5mH-GdOg1TYK-du-DA&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLC99m6-sEd6CJwBH3CIh4q5jIRPxBRabuWY-7IFHqh_XSSrT6pFcf3b-KdMFBurW_EM&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg7bo8c6OcD-1kGxYm3a-s2Nvz0szT4u2rlCC6PLmHVcj_zRbADy2v97lb9E5EcVap4GY&usqp=CAU",
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const images = containerRef.current.children;

    const animateSwap = () => {
      gsap.to(images, {
        duration: 0.5,
        y: "-=20", // Move up
        stagger: {
          amount: 0.5,
          from: "start",
        },
        onComplete: () => {
          gsap.to(images, {
            duration: 0.5,
            y: "+=20", // Move back down
            stagger: {
              amount: 0.5,
              from: "end",
            },
            onComplete: () => {
              // Swap the positions of the images
              gsap.to(images, {
                duration: 0.5,
                x: (i) => (i % 2 === 0 ? "+=40" : "-=40"), // Swap positions
                stagger: {
                  amount: 0.5,
                },
              });
            },
          });
        },
        repeat: -1,
        yoyo: true,
      });
    };

    animateSwap();

    return () => {
      if (containerRef.current) {
        gsap.killTweensOf(images);
      }
    };
  }, []);

  return (
    <div
      className="flex justify-center items-center h-screen bg-gray-200"
      style={{
        zIndex: "999",
      }}>
      <div ref={containerRef} className="flex space-x-4">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Loading ${index + 1}`}
            className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-blue-200"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
