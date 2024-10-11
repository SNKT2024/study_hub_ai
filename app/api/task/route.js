import { connect } from "@/lib/db";
import Task from "@/lib/model/task";
import { error } from "console";

import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const clerkId = url.searchParams.get("clerkId");

    if (!clerkId) {
      return NextResponse.json(
        { error: "Clerk ID is required" },
        { status: 400 }
      );
    }

    await connect();

    const tasks = await Task.find({ clerkId });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

// Add Task

export async function POST(req) {
  try {
    const data = await req.json();

    await connect();

    const task = new Task(data);
    const result = task.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse("Failed to add New Task", error);
  }
}

// Edit Task

export async function PUT(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("taskId");
    const data = await req.json();

    await connect();
    const updatedTask = await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

// Delete Task

export async function DELETE(req) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("taskId");
    console.log(id);

    await connect();
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
