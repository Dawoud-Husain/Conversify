import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
  language: {
    type: String, // Language code like "en", "es", "fr"
    required: true,
    unique: true,
  },
  name: {
    type: String, // Language name like "English", "Spanish"
    required: true,
  },
});

const Language = mongoose.model("languages", languageSchema);

export default Language;
