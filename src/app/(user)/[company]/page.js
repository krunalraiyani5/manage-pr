import CompanyGrid from "@/components/CompanyGrid";
import React from "react";

async function getData(id) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/api/companies/${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

const Page = async ({ searchParams }) => {
  const data = await getData(searchParams?.modultId);
  return (
    <div>
      <CompanyGrid data={data?.data} />
    </div>
  );
};

export default Page;
