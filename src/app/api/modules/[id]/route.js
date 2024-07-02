import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { ModuleModel } from "@/app/lib/model/module";

// PUT (update) a module by ID
export async function PUT(req, { params }) {
  const body = await req.json();
  await dbConnect();
  try {
    const companyModule = await ModuleModel.findById(params.id);
    if (!companyModule) {
      return NextResponse.json(
        { message: "companyModule not found" },
        { status: 404 }
      );
    }
    companyModule.name = body.name || companyModule.name;
    companyModule.logo = body.logo || companyModule.logo;
    const updatedModule = await companyModule.save();
    return NextResponse.json(updatedModule, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

// DELETE a module by ID
export async function DELETE(req, { params }) {
  await dbConnect();
  try {
    const companyModule = await ModuleModel.findById(params.id);
    if (!companyModule) {
      return NextResponse.json(
        { message: "Module not found" },
        { status: 404 }
      );
    }
    await companyModule.deleteOne();
    return NextResponse.json({ message: "Module deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
