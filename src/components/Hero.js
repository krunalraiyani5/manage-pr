import React from "react";

const Hero = () => {
  return (
    <section className="bg-white py-20 flex justify-center">
      <div className="max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            style={{ transitionDuration: "0.3s" }}
          >
            <img
              src={`https://via.placeholder.com/300x200?text=Image+${
                index + 1
              }`}
              alt={`Card Image ${index + 1}`}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-gray-800 font-bold text-lg">
                Card Title {index + 1}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
