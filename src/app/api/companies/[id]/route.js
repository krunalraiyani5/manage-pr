import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { CompanyModel } from "@/app/lib/model/company";
import mongoose, { isObjectIdOrHexString } from "mongoose";

// PUT (update) a company by ID
export async function PUT(req, { params }) {
  const body = await req.json();
  await dbConnect();
  try {
    const company = await CompanyModel.findById(params.id);
    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }
    company.moduleId = body.moduleId || company.moduleId;
    company.name = body.name || company.name;
    company.logo = body.logo || company.logo;
    const updatedCompany = await company.save();
    return NextResponse.json(updatedCompany, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE a company by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const company = await CompanyModel.findById(params.id);
    if (!company) {
      return NextResponse.json(
        { message: "Company not found" },
        { status: 404 }
      );
    }
    await company.deleteOne();
    return NextResponse.json({ message: "Company deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET All companieny by id
export async function GET(req, { params }) {
  await dbConnect();
  try {
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid module ID" },
        { status: 400 }
      );
    }

    const companies = await CompanyModel.aggregate([
      {
        $match: { moduleId: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: "steppers",
          localField: "_id",
          foreignField: "companyId",
          as: "steppers",
        },
      },
    ]);

    if (!companies || companies.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    return NextResponse.json({ data: companies }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
