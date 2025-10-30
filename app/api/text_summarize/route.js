import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `
You are a note summarizer.Your input will be a JSON object with the following structure:

{
  "type": "paragraph" or "bullet points",
  "length": number of words (limit is 200 words), // the desired number of words for the summary
  "text": "actual text requested by user"
}.
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
  const data = await req.text();
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent(data);
  const response = await result.response;
  const text = await response.text();

  let jsonData;
  jsonData = JSON.parse(text);

  return NextResponse.json(jsonData.summary);
}
