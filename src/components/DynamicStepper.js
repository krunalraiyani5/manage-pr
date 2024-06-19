import React, { useState } from "react";

const DynamicStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      status: "complete",
      title: "Step 1",
      content: [
        { question: "Question 1?", answer: "Answer 1 for Step 1" },
        { question: "Question 2?", answer: "Answer 2 for Step 1" },
      ],
    },
    {
      id: 2,
      status: "problem",
      title: "Step 2",
      content: [
        { question: "Question 3?", answer: "Answer 3 for Step 2" },
        { question: "Question 4?", answer: "Answer 4 for Step 2" },
      ],
    },
    {
      id: 3,
      status: "pending",
      title: "Step 3",
      content: [
        { question: "Question 5?", answer: "Answer 5 for Step 3" },
        { question: "Question 6?", answer: "Answer 6 for Step 3" },
      ],
    },
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Dynamic Stepper</h1>
      <div className=" mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center justify-between bg-gray-100 px-6 py-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`focus:outline-none flex items-center justify-center relative w-12 h-12 rounded-full ${
                step.status === "complete"
                  ? "bg-green-400 text-white"
                  : step.status === "problem"
                  ? "bg-red-400 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              <div>{step.id}</div>
            </button>
          ))}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-8">
            Step {steps[activeStep].id}:{" "}
            <span
              className={`${
                steps[activeStep].status === "complete"
                  ? "text-green-600"
                  : steps[activeStep].status === "problem"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {steps[activeStep].status === "complete"
                ? "Complete"
                : steps[activeStep].status === "problem"
                ? "Problem"
                : "Pending"}
            </span>
          </h2>
          <div className="space-y-4">
            {steps[activeStep].content.map((item, qIndex) => (
              <div
                key={qIndex}
                className="border-2 border-gray-300 rounded-md overflow-hidden"
              >
                <p
                  className={`font-semibold text-white w-fit p-1 px-6 rounded-br-md ${
                    steps[activeStep].status === "complete"
                      ? "bg-green-600"
                      : steps[activeStep].status === "problem"
                      ? "bg-red-600"
                      : "bg-gray-600"
                  }`}
                >
                  {item.question}
                </p>
                <p className="m-6 mt-2 text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicStepper;
