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
    stepper.order = body.order || stepper.order;
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

    let companyId = new mongoose.Types.ObjectId(id);

    const steppers = await StepperModel.aggregate([
      {
        $match: {
          companyId: companyId, // Filter steppers by company ID
        },
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
        $group: {
          _id: "$companyId",
          steppers: {
            $push: {
              _id: "$_id",
              name: "$name",
              order: "$order",
              status: "$status",
              questions: "$questions",
              questionCount: { $size: "$questions" },
              // Add any other fields you want to include here
            },
          },
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "_id",
          foreignField: "_id",
          as: "companyInfo",
        },
      },
      {
        $unwind: "$companyInfo",
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          companyId: "$_id",
          steppers: {
            $cond: {
              if: { $isArray: "$steppers" },
              then: "$steppers",
              else: [], // Return empty array if no steppers exist
            },
          },
          companyInfo: "$companyInfo",
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
