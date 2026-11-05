import express from "express";
import  {registerEmployee, getAllEmployees, getEmployeeById, updateEmployee,deleteEmployee} from "../controllers/employee.controller.js";
import { isAuthenticated, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, authorizeRoles("admin"), registerEmployee);
router.route("/all").get(isAuthenticated, authorizeRoles("admin"), getAllEmployees);
router.route("/:id").get(isAuthenticated, authorizeRoles("admin"), getEmployeeById);
router.route("/:id").put(isAuthenticated, authorizeRoles("admin"), updateEmployee);
router.route("/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteEmployee);

export default router;