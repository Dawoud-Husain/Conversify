import { useAuthContext } from "../../context/AuthContext";
import React, { useState } from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import ProfilePictureUploadButton from "../../components/utility/ProfilePictureUploadButton";

const ProfileTest = () => {
  /* Allows uploading of profile picture for the current account. Will update the backend*/
  return <ProfilePictureUploadButton />;
};

export default ProfileTest;
