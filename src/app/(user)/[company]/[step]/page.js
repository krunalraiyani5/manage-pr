import DynamicStepper from "@/components/DynamicStepper";
import React from "react";

async function getData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/steppers/${id}`, {
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

const page = async ({ searchParams }) => {
  const data = await getData(searchParams?.companyId);
  return (
    <div>
      <DynamicStepper data={data?.data} />
    </div>
  );
};

export default page;
