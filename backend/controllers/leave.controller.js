import { Leave } from "../models/leave.model.js";
import { Employee } from "../models/employee.model.js";

export const applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        const employee = await Employee.findOne({ userId: req.user._id, });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Profile not found",
            });
        }

        const leave = await Leave.create({
            employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            reason,
        });

        return res.status(201).json({
            success: true,
            message: "Leave applied successfully",
            leave,
        });
    } catch (error) {
        console.error("Apply Leave Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

export const getMyLeaves = async (req, res) => {
    try {
        const employee = await Employee.findOne({ userId: req.user._id, });

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Profile not found",
            });
        }

        const leaves = await Leave.find({
            employeeId: employee._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: leaves.length,
            leaves,
        });
    } catch (error) {
        console.error("Get My Leaves Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

// Get all leaves (admin only)
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("employeeId", "name employeeCode department designation")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });
  } catch (error) {
    console.error("Get All Leaves Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Update leave status (admin only)
export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      leave,
    });
  } catch (error) {
    console.error("Update Leave Status Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Cancel leave (employee only)
export const cancelLeave = async (req, res) => {
  try {
    const employee = await Employee.findOne({userId: req.user._id,});

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Profile not found",
      });
    }

    const leave = await Leave.findOne({
      _id: req.params.id,
      employeeId: employee._id,
      status: "pending",
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Pending leave not found",
      });
    }

    leave.status = "cancelled";
    await leave.save();

    return res.status(200).json({
      success: true,
      message: "Leave cancelled successfully",
      leave,
    });
  } catch (error) {
    console.error("Cancel Leave Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};