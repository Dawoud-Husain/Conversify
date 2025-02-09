import { useAuthContext } from "../../context/AuthContext";
import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const ProfileTest = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [imageUrl, setImageUrl] = useState("");
  const [trueUrl, setTrueUrl] = useState("");

  const cld = new Cloudinary({ cloud: { cloudName: "dddzvabhg" } });

  const handleUploadSuccess = (error, result) => {
    if (error) {
      console.error("Upload Widget Error:", error);
      return;
    }

    // now 'result' is the correct object
    if (result.event === "success") {
      setImageUrl(result.info.public_id);
      setTrueUrl(result.info.secure_url);
    }
  };

  //   const saveProfilePicture = async (imageUrl) => {
  //     try {
  //       const response = await fetch("/api/update-profile-picture", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ imageUrl, userId: authUser._id }), // Include user ID
  //       });
  //       const data = await response.json();
  //       console.log("Profile picture updated:", data);
  //     } catch (error) {
  //       console.error("Error updating profile picture:", error);
  //     }
  //   };

  const openUploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dddzvabhg", // Replace with your actual cloud name
        uploadPreset: "chatapp", // Replace with your actual upload preset
        sources: ["local", "url", "camera"], // Allow multiple sources for upload
        multiple: false, // Allow only one file upload
        cropping: true, // Enable cropping
        croppingAspectRatio: 2, // Square aspect ratio
        croppingDefaultSelectionRatio: 2, // Default to square
        showAdvancedOptions: true, // Show advanced options
      },
      handleUploadSuccess
    );
  };

  return (
    <div>
      <h1>Welcome, {authUser ? authUser.fullName : "Guest"}</h1>
      <div>
        <button onClick={openUploadWidget}>Upload Profile Picture</button>
        <p>I am a test paa</p>
        {trueUrl && <img src={trueUrl}></img>}
      </div>
    </div>
  );
};

export default ProfileTest;
