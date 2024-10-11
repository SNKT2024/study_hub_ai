import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { NextResponse } from "next/server";
import pdfParse from "pdf-parse";

const systemPrompt = `You are a note summarizer.Your input will be a pdf file:


Return the response in the following JSON format without any additional formatting or escape characters:


{
  "summary": [
    {
      "header": "topic header",
      "summary": {
        "section1": {
          "header": "header for section 1",
          "content": "summary content for section 1 (minimum 50 words)"
        },

        // minimum 4 sections should be displayed
        // send the data compatible with React Markdwon 
        // each content should be atleast of 6 sentences
        
       
      }
    }
  ]
}
`;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    return NextResponse.json(jsonData.summary);
  } catch (error) {
    console.error("Error processing PDF:", error);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}
