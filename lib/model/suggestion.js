import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  easyExplanation: {
    type: String,
    required: true,
  },
  detailedSolution: {
    type: String,
    required: true,
  },
  studyMethods: [
    {
      method: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  books: [
    {
      name: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
    },
  ],
});

const Suggestion =
  mongoose.models.Suggestion || mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;
