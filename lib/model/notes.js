const mongoose = require("mongoose");

const summarySectionSchema = new mongoose.Schema({
  header: { type: String, required: true },
  content: { type: String, required: true },
});

const noteSchema = new mongoose.Schema(
  {
    topicHeader: { type: String, required: true },
    summary: {
      section1: summarySectionSchema,
      section2: summarySectionSchema,
      section3: summarySectionSchema,
      section4: summarySectionSchema,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

module.exports = Note;
