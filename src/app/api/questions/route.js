import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { QuestionModel } from "@/app/lib/model/question";

// GET all questions
export async function GET() {
  await dbConnect();
  try {
    const questions = await QuestionModel.find().populate("stepperId");
    return NextResponse.json({ data: questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST a new question
export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  try {
    const question = new QuestionModel(body);
    const result = await question.save();
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
