import Hero from "@/components/Hero";
import React from "react";

async function getData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/modules`, {
      cache: "no-store",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

const Home = async () => {
  const data = await getData();
  return (
    <div className="h-screen bg-[url('/images/bg.png')] bg-no-repeat bg-cover bg-center">
      <Hero data={data?.data || []} />
    </div>
  );
};

export default Home;
