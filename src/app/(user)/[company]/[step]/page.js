"use client";
import handler from "@/app/api/route";
import Breadcrumb from "@/components/Breadcrumb";
import DynamicStepper from "@/components/DynamicStepper";
import React from "react";

const page = () => {
  handler();
  return (
    <div>
      <Breadcrumb />
      <DynamicStepper />
    </div>
  );
};

export default page;
