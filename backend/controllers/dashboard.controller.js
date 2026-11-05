import { Employee } from "../models/employee.model.js";
import { Attendance } from "../models/attendance.model.js";
import { Leave } from "../models/leave.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
      status: "active",
    });

    const presentEmployees = await Attendance.countDocuments({
      date: today,
      status: "present",
    });

    const approvedLeaveEmployees = await Leave.distinct("employeeId", {
      status: "approved",
      startDate: { $lte: new Date(`${today}T23:59:59.999+05:30`) },
      endDate: { $gte: new Date(`${today}T00:00:00+05:30`) },
    });

    const absentEmployees = Math.max(
      0,
      activeEmployees - presentEmployees - approvedLeaveEmployees.length
    );

    const pendingLeaves = await Leave.countDocuments({
      status: "pending",
    });

    const approvedLeaves = await Leave.countDocuments({
      status: "approved",
    });

    return res.status(200).json({
      success: true,
      stats: {
        totalEmployees,
        activeEmployees,
        presentEmployees,
        approvedLeaveEmployees: approvedLeaveEmployees.length,
        absentEmployees,
        pendingLeaves,
        approvedLeaves,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getAttendanceSummary = async (req, res) => {
  try {
    const today = new Date();

    const attendance = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);

      const day = date.toLocaleDateString("en-CA", {
        timeZone: "Asia/Kolkata",
      });

      const present = await Attendance.countDocuments({
        date: day,
        status: "present",
      });

      const approvedLeaveEmployees = await Leave.distinct("employeeId", {
        status: "approved",
        startDate: { $lte: new Date(`${day}T23:59:59.999+05:30`) },
        endDate: { $gte: new Date(`${day}T00:00:00+05:30`) },
      });

      const absent = Math.max(
        0,
        (await Employee.countDocuments({ status: "active" })) -
          present -
          approvedLeaveEmployees.length
      );

      attendance.push({
        date: day,
        present,
        absent,
        approvedLeave: approvedLeaveEmployees.length,
      });
    }

    return res.status(200).json({
      success: true,
      attendance,
    });
  } catch (error) {
    console.error("Attendance Summary Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getRecentLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "name employeeCode department designation")
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Recent Leaves Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


export const getEmployeeDashboard = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Profile not found",
      });
    }

    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const todayAttendance = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    const recentAttendance = await Attendance.find({
      employeeId: employee._id,
    })
      .sort({ date: -1 })
      .limit(5);

    const recentLeaves = await Leave.find({
      employeeId: employee._id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json({
      success: true,
      dashboard: {
        employee,
        todayAttendance,
        recentAttendance,
        recentLeaves,
      },
    });
  } catch (error) {
    console.error("Employee Dashboard Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

