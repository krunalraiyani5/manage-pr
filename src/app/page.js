import Hero from "@/components/Hero";

async function getData() {
  try {
    const response = await fetch("http://localhost:3000/api/modules");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

export default async function Home() {
  const data = await getData();
  return (
    <div className="h-screen bg-[url('/images/bg.png')] bg-no-repeat bg-cover bg-center">
      <Hero data={data?.data || []} />
    </div>
  );
}
