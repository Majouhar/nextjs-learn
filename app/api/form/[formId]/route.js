import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request, { params: { formId } }) {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  const existingData = JSON.parse(fs.readFileSync(filePath));
  const selectedFeedback = existingData.find((v) => v.id == formId) ?? {};
  return NextResponse.json(selectedFeedback);
}
