import dbConnect from "@/app/lib/db";
import UserModel from "@/app/lib/model/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  await dbConnect();
  try {
    const user = await UserModel.findOne(body);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ userId: user?._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
