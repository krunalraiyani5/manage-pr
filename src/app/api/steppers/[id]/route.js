import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { StepperModel } from "@/app/lib/model/stepper";
import mongoose from "mongoose";

// PUT (update) a stepper by ID
export async function PUT(req, { params }) {
  const body = await req.json();
  await dbConnect();
  try {
    const stepper = await StepperModel.findById(params.id);
    if (!stepper) {
      return NextResponse.json(
        { message: "Stepper not found" },
        { status: 404 }
      );
    }
    stepper.companyId = body.companyId || stepper.companyId;
    stepper.status = body.status || stepper.status;
    stepper.name = body.name || stepper.name;
    const updatedStepper = await stepper.save();
    return NextResponse.json(updatedStepper, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE a stepper by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const stepper = await StepperModel.findById(params.id);
    if (!stepper) {
      return NextResponse.json(
        { message: "Stepper not found" },
        { status: 404 }
      );
    }
    await stepper.deleteOne();
    return NextResponse.json({ message: "Stepper deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET All stappers by id
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid stepper ID" },
        { status: 400 }
      );
    }

    const steppers = await StepperModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "stepperId",
          as: "questions",
        },
      },
      {
        $addFields: {
          questionCount: { $size: "$questions" },
        },
      },
    ]);

    if (!steppers || steppers.length === 0) {
      return NextResponse.json(
        { message: "No stepper found with the provided ID" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: steppers[0] }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/steppers/:id:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
