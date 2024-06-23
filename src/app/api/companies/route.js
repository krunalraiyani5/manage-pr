import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { CompanyModel } from "@/app/lib/model/company";

// GET all companies
export async function GET() {
  await dbConnect();
  try {
    const companies = await CompanyModel.find().populate("moduleId");
    return NextResponse.json({ data: companies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// POST a new company
export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  try {
    const company = new CompanyModel(body);
    const result = await company.save();
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
