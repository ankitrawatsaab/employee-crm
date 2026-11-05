import express from "express";
import { registerFace,verifyFace } from "../controllers/face.controller.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(isAuthenticated,authorizeRoles("employee"),registerFace);
router.route("/verify").post(isAuthenticated,authorizeRoles("employee"),verifyFace);

export default router;