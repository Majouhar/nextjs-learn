import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { headers } from "next/headers";

export async function GET(request) {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const existingData = JSON.parse(fs.readFileSync(filePath));
  return NextResponse.json(existingData);
}

export async function POST(request) {
  const data = await request.json();
  const header = headers();
  const email = data.email;
  const text = data.text;
  const newObj = {
    id: new Date().toString(),
    email,
    text,
  };
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const existingData = JSON.parse(fs.readFileSync(filePath));
  existingData.push(newObj);
  fs.writeFileSync(filePath, JSON.stringify(existingData));
  return NextResponse.json(
    {
      message: "Success",
      feedback: existingData,
    },
    {
      status: 201,
    }
  );
}
