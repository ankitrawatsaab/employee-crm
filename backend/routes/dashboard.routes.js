import express from "express";
import { getDashboardStats ,getAttendanceSummary,getRecentLeaves,getEmployeeDashboard} from "../controllers/dashboard.controller.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/stats").get(isAuthenticated,authorizeRoles("admin"),getDashboardStats);
router.route("/attendance-summary").get(isAuthenticated,authorizeRoles("admin"),getAttendanceSummary);
router.route("/recent-leaves").get(isAuthenticated,authorizeRoles("admin"),getRecentLeaves);
router.route("/employee").get(isAuthenticated,authorizeRoles("employee"),getEmployeeDashboard);

export default router;