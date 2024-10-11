import { connect } from "@/lib/db";
import Suggestion from "@/lib/model/suggestion";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    await connect();

    let suggestion = new Suggestion(data);
    const result = await suggestion.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving suggestion:", error);
    return NextResponse.json({
      error: "Failed to save suggestion",
      success: false,
    });
  }
}
