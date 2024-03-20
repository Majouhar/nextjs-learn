import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { hashPassword } from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(request) {
  const data = await request.json();
  const { email, password } = data;
  if (!email || !email.includes("@") || password?.trim()?.length < 7) {
    return NextResponse.json(
      { message: "Invalide Username/Password" },
      { status: 422 }
    );
  }
  if (isExistingEmail(email)) {
    return NextResponse.json(
      { message: "User already exists" },
      { status: 409 }
    );
  }
  data.password = await hashPassword(password);
  data.id = randomUUID();
  const existingData = getAllData();
  existingData.push(data);
  const filePath = path.join(process.cwd(), "data", "auth.json");
  fs.writeFileSync(filePath, JSON.stringify(existingData));
  return NextResponse.json({ message: "User Created User" }, { status: 201 });
}

export function getAllData() {
  const filePath = path.join(process.cwd(), "data", "auth.json");
  return JSON.parse(fs.readFileSync(filePath));
}

function isExistingEmail(email) {
  const existingData = getAllData();
  return existingData.filter((data) => data.email === email).length > 0;
}
