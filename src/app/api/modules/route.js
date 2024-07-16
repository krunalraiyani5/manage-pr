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
