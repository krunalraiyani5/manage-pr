import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { ModuleModel } from "@/app/lib/model/module";

// GET all modules
export async function GET() {
  await dbConnect();
  try {
    const companyModule = await ModuleModel.find();
    return NextResponse.json({ data: companyModule }, { status: 200 });
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
    const companyModule = new ModuleModel(body);
    const result = await companyModule.save();
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
