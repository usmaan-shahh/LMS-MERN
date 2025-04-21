import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.Token;
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded;
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

export default isAuthenticated;
