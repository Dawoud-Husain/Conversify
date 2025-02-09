import { useAuthContext } from "../../context/AuthContext";
import { Cloudinary } from "@cloudinary/url-gen";
import React, { useState } from "react";

const ProfilePictureUploadButton = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [imageUrl, setImageUrl] = useState("");

  //This defines our Cloundinary collection (Allows us to upload to it)
  const cld = new Cloudinary({ cloud: { cloudName: "dddzvabhg" } });

  //This calls our back-end to save the new profile picture URL to mongo
  const saveProfilePicture = async (imageUrl) => {
    try {
      const response = await fetch(
        "/api/profile/picture/update-profile-picture",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl, userId: authUser._id }),
        }
      );
      const data = await response.json();
      console.log("Profile picture updated!", data);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  //This is called if something is succesfully uploaded to Cloudinary
  const handleUploadSuccess = async (error, result) => {
    if (error) {
      console.error("Upload error:", error);
      return;
    }
    if (result.event === "success") {
      setImageUrl(result.info.secure_url);
      saveProfilePicture(result.info.secure_url);
    }
  };

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dddzvabhg",
        uploadPreset: "chatapp",
        sources: ["local", "url", "camera"],
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        croppingDefaultSelectionRatio: 1,
        showSkipCropButton: false,
      },
      handleUploadSuccess
    );
  };
  /* Allows uploading of profile picture for the current account. Will update the backend*/
  return (
    <div>
      <button onClick={openUploadWidget}>Change profile picture!</button>
    </div>
  );
};

export default ProfilePictureUploadButton;
