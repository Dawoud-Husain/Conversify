import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import speakEasy from "speakeasy";
import nodemailer from "nodemailer";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Generates and sends OTP Email through PHONE
export async function sendOTPEmail(email, token) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TWO_FACTOR_EMAIL,
      pass: process.env.TWO_FACTOR_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: "Conversify - OTP Service",
    to: email,
    subject: "Your OTP Code",
    text: `Conversify OTP Code is: ${token}`,
  });

  console.log("Message sent: %s", info.messageId);
}

export const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      confirmPassword,
      gender,
      timezone,
      country,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password: hashedPassword,
      gender,
      timezone,
      country,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        gender: newUser.gender,
        timezone: newUser.timezone,
        country: newUser.country,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { code, user } = req.body;
    const profileUser = await User.findById(user).select("-password");
    if (profileUser.otp == code) {
      res.status(200).json({
        _id: profileUser._id,
        firstName: profileUser.firstName,
        lastName: profileUser.lastName,
        username: profileUser.username,
        email: profileUser.email,
        phoneNumber: profileUser.phoneNumber,
        gender: profileUser.gender,

        profilePic: profileUser.profilePic,
      });
    } else {
      res.status(500).json({ error: "Incorrect OTP. Please Try Again" });
    }
  } catch (error) {
    console.error("Error in verifyToken: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // // 2 Factor Authentication
    var secret = speakEasy.generateSecret();
    var token = speakEasy.totp({
      secret: secret.base32,
      encoding: "base32",
      step: 10,
    });
    user.otp = token;
    user.save();
    sendOTPEmail(user.email, token);

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
