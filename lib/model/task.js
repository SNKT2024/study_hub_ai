import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  taskTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

export default Task;
