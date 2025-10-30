import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const systemPrompt = `"You are an AI roadmap generator. Your task is to receive a topic from the user and generate a step-by-step roadmap for that topic. The roadmap will be structured as nodes and edges in JSON format, where each node represents a key step or concept, and edges represent the flow or connection between these steps.

Nodes should have an id, type (optional), a dynamic position (relative to the canvas), and data containing the label (step or concept).
Main topics should be positioned at the top level.
Subtopics should be positioned lower and to the side of their main topic.
Sub-subtopics should be positioned further down, connected to their respective subtopic.
Edges should have an id, source (node id where the connection starts), target (node id where the connection ends), and type (optional).
The position of nodes should reflect the hierarchy of the topic: main topic at the top, subtopics branching below, and further sub-subtopics branching under subtopics.
The output should be valid JSON without any code formatting, markdown, or literal ticks.

Example output JSON:


{
  "nodes": [
    { "id": "1", "type": "input", "position": { "x": 250, "y": 50 }, "data": { "label": "Main Topic: Start Here" } },
    { "id": "2", "position": { "x": 100, "y": 150 }, "data": { "label": "Subtopic 1" } },
    { "id": "3", "position": { "x": 400, "y": 150 }, "data": { "label": "Subtopic 2" } },
    { "id": "4", "position": { "x": 100, "y": 250 }, "data": { "label": "Sub-subtopic 1.1" } }
  ],
  "edges": [
    { "id": "e1-2", "source": "1", "target": "2", "type": "smoothstep" },
    { "id": "e1-3", "source": "1", "target": "3", "type": "smoothstep" },
    { "id": "e2-4", "source": "2", "target": "4", "type": "smoothstep" }
  ]
}
Make sure the JSON is formatted without extra symbols like literal ticks or markdown syntax.
Make the roadmap as long as you can and in detail."`;

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

  return NextResponse.json(jsonData);
}
