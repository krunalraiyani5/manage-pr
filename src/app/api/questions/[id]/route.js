import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { QuestionModel } from "@/app/lib/model/question";

// PUT (update) a question by ID
export async function PUT(req, { params }) {
  const body = await req.json();
  await dbConnect();
  try {
    const question = await QuestionModel.findById(params.id);
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 }
      );
    }
    question.stepperId = body.stepperId || question.stepperId;
    question.type = body.type || question.type;
    question.content = body.content || question.content;
    const updatedQuestion = await question.save();
    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE a question by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const question = await QuestionModel.findById(params.id);
    if (!question) {
      return NextResponse.json(
        { message: "Question not found" },
        { status: 404 }
      );
    }
    await question.deleteOne();
    return NextResponse.json({ message: "Question deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
