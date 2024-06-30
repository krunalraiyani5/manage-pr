import CompanyGrid from "@/components/CompanyGrid";
import React from "react";

async function getData(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/companies/${id}`, {
      cache: "no-store",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

const Page = async ({ searchParams }) => {
  const data = await getData(searchParams?.modultId);
  console.log(data);
  return (
    <div>
      <CompanyGrid data={data?.data} />
    </div>
  );
};

export default Page;
