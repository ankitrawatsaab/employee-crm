import express from "express";
import { punchIn, punchOut, getMyAttendance,getAllAttendance,getAttendanceByDate} from "../controllers/attendance.controller.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/punch-in").post(isAuthenticated,authorizeRoles("employee"), punchIn);
router.route("/punch-out").post(isAuthenticated,authorizeRoles("employee"), punchOut);
router.route("/my").get(isAuthenticated,authorizeRoles("employee"), getMyAttendance);
router.route("/all").get(isAuthenticated,authorizeRoles("admin"), getAllAttendance);
router.route("/by-date").get(isAuthenticated,authorizeRoles("admin"), getAttendanceByDate);

export default router;
