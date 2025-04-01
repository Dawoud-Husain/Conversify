import Language from "../models/language.model.js";

export const getLanguages = async (req, res) => {
  try {
    const languages = await Language.find().sort({ name: 1 }); // sort alphabetically by name
    res.status(200).json(languages);
  } catch (error) {
    console.error("Error fetching languages:", error.message);
    res.status(500).json({ error: "Failed to fetch languages" });
  }
};
