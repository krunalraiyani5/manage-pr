import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { ModuleModel } from "@/app/lib/model/module";

// GET all modules
export async function GET() {
  await dbConnect();
  try {
    const modules = await ModuleModel.find();
    return NextResponse.json({ data: modules }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST a new module
export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  try {
    const module = new ModuleModel(body);
    const result = await module.save();
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
