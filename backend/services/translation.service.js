import axios from "axios";

export const translateText = async (text, targetLang, sourceLang = "auto") => {
  const url = `https://translation.googleapis.com/language/translate/v2?key=AIzaSyA18NLa2ojbZlS5JSD7sCErZWGHeffTMDA`;

  try {
    const res = await axios.post(url, {
      q: text,
      source: sourceLang,
      target: targetLang,
      format: "text",
    });

    return res.data.data.translations[0].translatedText;
  } catch (err) {
    console.error("Translation error:", err.message);
    return text;
  }
};
