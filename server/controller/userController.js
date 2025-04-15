import { User } from "../models/User";
import bcryptjs from "bcryptjs"; // Import bcryptjs for password hashing

export const register = async (request, response) => {
  const { name, email, password } = req.body; // Destructure the request body to get name, email, and password

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
      message: "User created successfully. Please verify your email.",
      newUser: { ...newUser._doc, password: undefined }, //._doc Removes Mongoose metadata and returns a clean JavaScript object.
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

    //  Send success response
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
