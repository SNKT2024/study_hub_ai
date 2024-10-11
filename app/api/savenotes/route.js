import Note from "@/lib/model/notes";
import { connect } from "mongoose";

export const saveNotes = async (id, topicHeader, summary) => {
  try {
    await connect();

    const note = await Note.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          topicHeader,
          summary,
        },
      },
      { new: true, upsert: true }
    );

    return note;
  } catch (error) {
    console.error("Error saving note:", error);
    throw new Error("Failed to save note");
  }
};
