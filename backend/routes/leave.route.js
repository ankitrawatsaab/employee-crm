import express from "express";
import { applyLeave, getMyLeaves, getAllLeaves,updateLeaveStatus,cancelLeave} from "../controllers/leave.controller.js";
import {isAuthenticated,authorizeRoles,} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/apply").post(isAuthenticated,authorizeRoles("employee"),applyLeave);
router.route("/my").get(isAuthenticated,authorizeRoles("employee"),getMyLeaves);
router.route("/all").get(isAuthenticated,authorizeRoles("admin"),getAllLeaves);
router.route("/:id/status").patch(isAuthenticated,authorizeRoles("admin"),updateLeaveStatus);
router.route("/cancel/:id").patch(isAuthenticated,authorizeRoles("employee"),cancelLeave);

export default router;