import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies?.Token;
  if (!token) {
    return res
      .status(401) //401 Unauthorized – Authentication required or token invalid/missing.
      .json({ message: "No token provided", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { id } = decoded;
    req.id = id; // Attach the user ID to the request object for further use in the application.
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", success: false });
  }
};

export default isAuthenticated;
