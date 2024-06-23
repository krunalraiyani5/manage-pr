import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import { ModuleModel } from "@/app/lib/model/module";

// PUT (update) a module by ID
export async function PUT(req, { params }) {
  const body = await req.json();
  await dbConnect();
  try {
    const module = await ModuleModel.findById(params.id);
    if (!module) {
      return NextResponse.json(
        { message: "Module not found" },
        { status: 404 }
      );
    }
    module.name = body.name || module.name;
    module.logo = body.logo || module.logo;
    const updatedModule = await module.save();
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
    const module = await ModuleModel.findById(params.id);
    if (!module) {
      return NextResponse.json(
        { message: "Module not found" },
        { status: 404 }
      );
    }
    await module.deleteOne();
    return NextResponse.json({ message: "Module deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
