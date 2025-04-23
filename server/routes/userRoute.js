import express from "express";
import {
  fetchUserProfile,
  login,
  logout,
  register,
  updateUserProfile,
} from "../controller/userController.js";
import isAuthenticated from "../middleware/isAutheticated.js";
import upload from "../configuration/multer.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", isAuthenticated, fetchUserProfile);
router.post("/logout", logout);
router.put(
  "/update/profile",
  isAuthenticated,
  upload.single("profilePhoto"),
  updateUserProfile
);
export default router;
