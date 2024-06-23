import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { StepperModel } from "@/app/lib/model/stepper";

// GET all steppers
export async function GET() {
  await dbConnect();
  try {
    const steppers = await StepperModel.find().populate("companyId");
    return NextResponse.json({ data: steppers }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST a new stepper
export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  try {
    const stepper = new StepperModel(body);
    const result = await stepper.save();
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
