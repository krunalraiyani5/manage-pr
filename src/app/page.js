import Hero from "@/components/Hero";

async function getData() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/modules`);
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
