import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { connect } from "@/lib/db";

const systemPrompt = `
You are an AI study assistant. The user will provide a JSON input with a subject or topic name and a specific problem or doubt they are facing, in the following format:
{
  "subject": "subject name",
  "problem": "problem or doubt"
}

Based on this input, your task is to generate a comprehensive response in JSON format. Your response should include:

1. **Subject Name**: The name of the subject or topic.
2. **Easy Explanation**: Provide a simple and clear explanation of the topic in at least 7 sentences.
3. **Detailed Solution**: Offer a detailed solution to the user's specific problem or doubt.
4. **Study Methods**: Recommend multiple study methods that the user can apply to better understand the topic or address the problem.
5. **Books**: Provide relevant book recommendations for further study.

Ensure that the response is structured as valid JSON without any surrounding ticks or code formatting.

Example output:
{
  "suggestion": [{
    "subject": "Subject Name",
    "easyExplanation": "A simple yet detailed explanation about the subject.",
    "detailedSolution": "An in-depth and thorough solution for the user's doubt or problem.",
    "studyMethods": [
      {
        "method": "Method Name",
        "content": "Detailed description of how to use this method to study the subject."
      }
    ],
    "books": [
      {
        "name": "Book Name",
        "author": "Author Name"
      }
    ]
  }]
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

  return NextResponse.json(jsonData.suggestion);
}
