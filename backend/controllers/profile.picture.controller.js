import User from "../models/user.model.js";

export const updateProfilePicture = async (req, res) => {
  try {
    const { imageUrl, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: "User not found while attempting to update profile picture!",
      });
    }

    user.profilePic = imageUrl;
    await user.save();

    res.status(200).json({
      message: "successfully updated profile picture!",
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Error while updating profile picture:", error.message);
    res.status(500).json({ error: "Server-side error!" });
  }
};
