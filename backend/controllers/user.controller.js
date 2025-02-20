import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { id: profileId } = req.params;
    const profileUser = await User.findById(profileId).select("-password");
    if (!profileUser) {
      res.status(404).json({ error: "User Not Found" });
    }
    res.status(200).json(profileUser);
  } catch (error) {
    console.error("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is missing" });
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    })
      .limit(5)
      .select("firstName lastName username profilePic");

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const username = req.user.username;
    const { updates } = req.body.profileData;

    // Find user by username and only update the fields that are in the request body
    const updatedUser = await User.findOneAndUpdate(
      { username },
      { $set: updates },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in updateProfile: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
