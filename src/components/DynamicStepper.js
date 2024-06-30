"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import ManageStepModal from "./ManageStepModal";
import { useSearchParams } from "next/navigation";
import AddQuestionModal from "./AddQuestionModal";
import EditQuestionModal from "./EditQuestionModal";

const DynamicStepper = ({ data }) => {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId");
  const [resData, setResData] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [isNote, setIsNote] = useState(true);
  const [handleStepModal, setHandleStepModal] = useState(false);
  const [steps, setsteps] = useState(data?.steppers || []);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isEditQuestionModal, setIsEditQuestionModal] = useState(false);

  const containerRef = useRef(null);

  async function getData() {
    try {
      const response = await fetch(`/api/steppers/${companyId}`, {
        cache: "no-store",
      });

      const data = await response.json();
      setResData(data?.data);
      setsteps(data?.data?.steppers);
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }

  const handleAddQuestion = async (title, content) => {
    console.log(steps[activeStep], "checkTitle");

    if (title && content && steps[activeStep]?._id) {
      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stepperId: steps[activeStep]?._id,
            title,
            content,
            type: isNote ? "notes" : "problem",
          }),
        });
        getData();
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

    setIsQuestionModalOpen(false);
  };

  const handleEditQuestion = async (title, content) => {
    console.log(steps[activeStep], "checkTitle");

    // if (title && content && steps[activeStep]?._id) {
    //   try {
    //     const response = await fetch("/api/questions", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         stepperId: steps[activeStep]?._id,
    //         title,
    //         content,
    //         type: isNote ? "notes" : "problem",
    //       }),
    //     });
    //     getData();
    //   } catch (error) {
    //     console.error("Fetch error:", error);
    //   }
    // }

    setIsEditQuestionModal(false);
  };

  useEffect(() => {
    // GSAP animation on initial mount
    animateEntry();
  }, []);

  const animateEntry = () => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  };

  const handleStepClick = (index) => {
    // Animate exit before changing active step
    animateExit().then(() => {
      setActiveStep(index);
      animateEntry();
    });
  };

  const animateExit = () => {
    return gsap.to(containerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power3.inOut",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-4">
      <div
        ref={containerRef}
        className="mx-auto rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-center gap-28 bg-white px-6 py-4 relative">
          {steps?.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center"
              onClick={() => {
                handleStepClick(index);
                setIsNote(true);
              }}>
              <button
                className={`focus:outline-none flex items-center justify-center relative w-12 h-12 rounded-full ${
                  step?.status === "complete"
                    ? "bg-green-400 text-white"
                    : step.status === "problem"
                    ? "bg-red-400 text-white"
                    : "bg-gray-400 text-white"
                }`}>
                <div>{step?.order}</div>
              </button>
              <div className="absolute top-14 w-fit text-center whitespace-nowrap">
                {step?.name}
              </div>
              {
                <div
                  className={`bg-gradient-to-r ${
                    step?.status === "complete"
                      ? "from-green-400"
                      : step.status === "problem"
                      ? "from-red-400"
                      : "from-gray-400"
                  } ${
                    steps?.[index + 1]?.status === "complete"
                      ? "to-green-400"
                      : steps[index + 1]?.status === "problem"
                      ? "to-red-400"
                      : "to-gray-400"
                  } absolute top-6 transform left-full w-28 h-1`}
                />
              }
            </div>
          ))}
          <div className="relative flex flex-col items-center">
            <button
              className="focus:outline-none flex items-center justify-center relative w-12 h-12 rounded-full bg-gray-400 text-white"
              onClick={() => setHandleStepModal(true)}>
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
            <div className="absolute top-14 w-fit text-center whitespace-nowrap">
              Add
            </div>
          </div>
        </div>

        <div className="p-6 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-8">
              {steps?.[activeStep]?.name}:{" "}
              <span
                className={`${
                  steps?.[activeStep]?.status === "complete"
                    ? "text-green-600"
                    : steps?.[activeStep]?.status === "problem"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}>
                {steps?.[activeStep]?.status === "complete"
                  ? "Complete"
                  : steps?.[activeStep]?.status === "problem"
                  ? "Problem"
                  : "Pending"}
              </span>
              ({isNote ? "Notes" : "Problems"})
              <button
                onClick={() => setIsQuestionModalOpen(true)}
                className={`ms-4 p-2 bg-gray-300 text-black rounded-md shadow-lg hover:bg-black hover:text-white focus:outline-none`}>
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
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </h2>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsNote(true)}
                className={`px-4 py-2 bg-[#009F69] text-white rounded-md shadow-lg `}>
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
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsNote(false)}
                className={`px-4 py-2 bg-[#d72525] text-white rounded-md shadow-lg`}>
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
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {steps?.[activeStep]?.questions
              ?.filter((item) =>
                isNote ? item.type === "notes" : item.type === "problem"
              )
              .map((item) => (
                <div
                  key={item?._id}
                  className="border-2 border-gray-300 rounded-md overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p
                      className={`font-semibold text-white w-fit p-1 px-6 rounded-br-md ${
                        isNote ? "bg-green-600" : "bg-red-600"
                      }`}>
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 transform -translate-x-2 translate-y-2">
                      <button
                        className={`p-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none`}>
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
                      <button
                        className={`p-2 bg-gray-200 rounded-md shadow-md hover:bg-gray-300 focus:outline-none`}>
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
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="m-6 mt-2 text-gray-700">{item.content}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <ManageStepModal
        isOpen={handleStepModal}
        onClose={() => setHandleStepModal(false)}
        getData={getData}
        steps={steps}
      />

      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        onAddQuestion={handleAddQuestion}
      />

      <EditQuestionModal
        isOpen={isEditQuestionModal}
        onClose={() => setIsEditQuestionModal(false)}
        onEditQuestion={handleEditQuestion}
      />
    </div>
  );
};

export default DynamicStepper;
