import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  deleteMediaFromCloudinary,
  uploadMedia,
} from "../configuration/cloudinary.js";

export const register = async (request, response) => {
  const { name, email, password } = request.body; // Destructure the request body to get name, email, and password

  try {
    if (!name || !email || !password) {
      return response
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists in the User collection
    const userAlreadyExists = await User.exists({ email }); //Find a document in the User collection where the email field is "example@email.com

    if (userAlreadyExists) {
      return response
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password using bcryptjs
    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Password should be hashed before saving to the database
    });

    await newUser.save(); // Save the new user to the database

    response.status(201).json({
      success: true,
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    return response
      .status(500)
      .json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  // Extract email and password from req.body.
  const { email, password } = req.body;

  try {
    // Check if a user with that email exists in the User collection.
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password stored in the database.
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token if authentication is successful.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      // The secret-key(JWT_SECRET) ensures that no one can change the payload without being caught.
      expiresIn: "1d",
    });

    // Set token as an HTTP-only cookie
    res.cookie("Token", token, {
      // "token" is the name of the cookie.
      // token is the value stored inside the cookie (usually a JWT token).
      httpOnly: true, // Prevent client-side access to the cookie
      secure: false,
      // secure: false allows cookies to be sent over HTTP (useful in development).
      // secure: true enforces cookies to be sent only over HTTPS (for security in production).
      sameSite: "strict", // Protect against CSRF attacks
      maxAge: 24 * 60 * 1000, // Cookie expiration time (1 day)
    });

    // Send success response
    res.json({
      /* Status: 200 OK (default)
        Content-Type: application/json
        Sends your object as JSON*/
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
  //  The secret key "your_secret_key" is used to sign (encrypt) the token.
  //  Payload → Contains user data (id, email).
};

export const logout = async (req, res) => {
  res.clearCookie("Token");
  res.status(200).json({ success: true, message: "logged out successfully" });
};

export const fetchUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select(
      // .select() to exclude sensitive or unnecessary fields
      "-password -createdAt -updatedAt -__v"
    );
    if (!user) {
      return res
        .status(404)
        .json({ message: "Profile not found", success: false });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name } = req.body;
    const profilePhoto = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    // extract public id of the old image from the url is it exists;
    if (user.photoUrl) {
      const publicId = user.photoUrl.split("/").pop().split(".")[0]; // extract public id
      deleteMediaFromCloudinary(publicId);
    }

    // upload new photo
    const cloudResponse = await uploadMedia(profilePhoto.path);
    const photoUrl = cloudResponse.secure_url;

    const updatedData = { name, photoUrl };
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
