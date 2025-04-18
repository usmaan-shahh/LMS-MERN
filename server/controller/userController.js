import { User } from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
    res.cookie("authToken", token, {
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
    res.status(200).json({
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
