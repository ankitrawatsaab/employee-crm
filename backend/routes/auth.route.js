import express from "express";
import { login, logout} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/logout").post(logout);

// Protected route
router.get("/me", isAuthenticated, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    user: req.user,
  });
});

export default router;