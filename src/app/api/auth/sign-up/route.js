import dbConnect from "@/app/lib/db";
import UserModel from "@/app/lib/model/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  try {
    const user = new UserModel(body);
    const result = await user.save();
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
