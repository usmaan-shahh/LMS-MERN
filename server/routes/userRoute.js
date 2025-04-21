import express from "express";
import {
  fetchUserProfile,
  login,
  register,
} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/isAutheticated.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/profile", isAuthenticated, fetchUserProfile);

export default router;
