"use client";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen bg-[url('/images/bg.png')] bg-no-repeat bg-cover bg-center">
      <Hero />
    </div>
  );
}
