import User from "../models/user.model.js";

export const editProfile = async (req, res) => {
  try {
    const { company, about, languages, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found while attempting to update profile picture!",
      });
    }

    user.company = company;
    user.about = about;
    user.languages = languages;
    await user.save();

    res.status(200).json({
      message: "successfully updated profile!",
      company: user.company,
      about: user.about,
      languages: user.languages,
    });
  } catch (error) {
    console.error("Error while updating profile:", error.message);
    res.status(500).json({ error: "Server-side error!" });
  }
};
