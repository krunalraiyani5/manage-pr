import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function POST(req) {
  const data = await req.json();

  return NextResponse.json(data);
}
