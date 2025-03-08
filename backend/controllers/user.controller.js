import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get all the users of the application.
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

export const getPinnedContacts = async (req, res) => {
	try {
		// Get all the pinned contacts first.
		const pinnedContacts = req.user.pinnedContacts.map(contact => contact.toString());
		res.status(200).json(pinnedContacts);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const pinContact = async (req, res) => {
	try {
		// Update pinned contact, add the contact to pinned contacts
		req.user.pinnedContacts.push(req.body.contact);
		await req.user.save();
		res.status(200).json(req.user);
	} catch (error) {
		console.error("Error in pinMessage: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
export const unPinContact = async (req, res) => {
	try {
		// If no pinned contacts or the requested contacts isn't in pinnedContacts(technically this should never occur)
		if (!req.user.pinnedContacts.length || !req.user.pinnedContacts.includes(req.body.contact)) {
			return res.status(200).json(req.user);
		}
		// Update pinned contact, filter to the list of contacts to remove the contact
		req.user.pinnedContacts = req.user.pinnedContacts.filter(contact => contact.toString() !== req.body.contact);
		await req.user.save();
		res.status(200).json(req.user);
	} catch (error) {
		console.error("Error in unPinContact: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getFriends = async (req, res) => {

  try {
    const { id: profileId } = req.params;
    const profileUser = await User.findById(profileId).select("-password");
    if (!profileUser) {
      res.status(404).json({ error: "User Not Found" });
    }
    const filteredUsers = await User.find({
      _id: { $in: profileUser.friends},
    }).select("-password");    

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getFriends: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addFriend = async (req, res) => {
  try {
    const profileUser = await User.findById(req.body.id).select("-password");
    if (!profileUser) {
      return res.status(404).json({ error: "User Not Found" });
    }
    // Add each user to each other's friends list
    req.user.friends.push(profileUser._id);
    profileUser.friends.push(req.user._id);
  
    // Save both profiles
    await req.user.save();
    await profileUser.save();
    res.status(200).json(req.user);
	} catch (error) {
		console.error("Error in addFriend: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
