import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const CompanyGrid = () => {
  const [isGridView, setIsGridView] = useState(true);
  const gridRef = useRef(null);

  // Dummy data for company cards with milestones
  const companyData = [
    {
      id: 1,
      title: "Company 1",
      imageUrl: "https://via.placeholder.com/300x200?text=Image+1",
      milestones: [
        { id: 1, title: "Achievement 1", status: "complete" },
        { id: 2, title: "Achievement 2", status: "pending" },
        { id: 3, title: "Problem 1", status: "problem" },
      ],
    },
    {
      id: 2,
      title: "Company 2",
      imageUrl: "https://via.placeholder.com/300x200?text=Image+2",
      milestones: [
        { id: 4, title: "Achievement 1", status: "complete" },
        { id: 5, title: "Problem 1", status: "problem" },
      ],
    },
    {
      id: 3,
      title: "Company 3",
      imageUrl: "https://via.placeholder.com/300x200?text=Image+3",
      milestones: [
        { id: 6, title: "Achievement 1", status: "pending" },
        { id: 7, title: "Problem 1", status: "problem" },
      ],
    },
    {
      id: 4,
      title: "Company 4",
      imageUrl: "https://via.placeholder.com/300x200?text=Image+4",
      milestones: [
        { id: 8, title: "Achievement 1", status: "complete" },
        { id: 9, title: "Achievement 2", status: "complete" },
      ],
    },
    {
      id: 5,
      title: "Company 5",
      imageUrl: "https://via.placeholder.com/300x200?text=Image+5",
      milestones: [
        { id: 10, title: "Achievement 1", status: "pending" },
        { id: 11, title: "Problem 1", status: "problem" },
      ],
    },
    {
      id: 6,
      title: "Company 6",
      imageUrl: "https://via.placeholder.com/300x200?text=Image+6",
      milestones: [
        { id: 12, title: "Achievement 1", status: "complete" },
        { id: 13, title: "Achievement 2", status: "pending" },
        { id: 14, title: "Problem 1", status: "problem" },
      ],
    },
  ];

  useEffect(() => {
    // Initial animation on mount
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
    );
  }, []);

  useEffect(() => {
    // Animation when view changes
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
    );
  }, [isGridView]);

  return (
    <section className="bg-gray-200">
      <div className="mx-20">
        <div className="sticky top-16 z-50 flex justify-end mb-4 gap-4">
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md ${
              !isGridView ? "opacity-50 cursor-default" : ""
            }`}
            onClick={() => setIsGridView(true)}
            disabled={isGridView}>
            Grid View
          </button>
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-md shadow-md ${
              isGridView ? "opacity-50 cursor-default" : ""
            }`}
            onClick={() => setIsGridView(false)}
            disabled={!isGridView}>
            Alternate View
          </button>
        </div>

        <div
          ref={gridRef}
          className={`grid ${
            isGridView ? "grid-cols-5" : "grid-cols-1 sm:grid-cols-2"
          } gap-8`}>
          {companyData.map((company) => (
            <div
              key={company.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden flex ${
                isGridView ? "flex-col" : ""
              } transform transition-transform hover:scale-105 ${
                isGridView ? "mb-8" : ""
              }`}
              style={{ transitionDuration: "0.3s" }}>
              {/* Left Side: Company Image and Details */}
              <div className={`p-4 ${isGridView ? "" : "sm:w-2/3"}`}>
                <img
                  src={company.imageUrl}
                  alt={`Company ${company.id}`}
                  className={`w-full ${
                    isGridView ? "h-40" : "h-60"
                  } object-cover`}
                />
                <h2 className="text-gray-800 font-bold text-lg mt-4">
                  {company.title}
                </h2>
              </div>

              {/* Right Side: Milestones or Stepper (Hidden in Grid View) */}
              {!isGridView && (
                <div className="bg-gray-100 p-4 sm:w-1/3">
                  <h3 className="text-gray-700 font-medium mb-2">Milestones</h3>
                  <div className="space-y-2">
                    {company.milestones.map((milestone) => (
                      <div
                        key={milestone.id}
                        className="flex items-center space-x-2">
                        <div
                          className={`h-4 w-4 rounded-full ${
                            milestone.status === "complete"
                              ? "bg-green-500"
                              : milestone.status === "pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                        />
                        <p className="text-sm">{milestone.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyGrid;
