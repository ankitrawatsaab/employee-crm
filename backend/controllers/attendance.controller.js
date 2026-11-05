import { Attendance } from "../models/attendance.model.js";
import { Employee } from "../models/employee.model.js";

export const punchIn = async (req, res) => {
    try {
        const employee = await Employee.findOne({ userId: req.user._id });
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Profile not found"
            });
        }

        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "Asia/Kolkata",
        }); // Format: YYYY-MM-DD

        const existingAttendance = await Attendance.findOne({
            employeeId: employee._id,
            date: today,
        });

        if (existingAttendance?.punchIn) {
            return res.status(400).json({
                success: false,
                message: "You have already punched in for today.",
            });
        }

        const attendance = await Attendance.create({
            employeeId: employee._id,
            date: today,
            punchIn: new Date(),
            status: "present",
        })

        return res.status(200).json({
            success: true,
            message: "Punched in successfully",
            attendance,
        });

    } catch (error) {
        console.error("Punch In Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
}

export const punchOut = async (req, res) => {
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

    const attendance = await Attendance.findOne({
      employeeId: employee._id,
      date: today,
    });

    if (!attendance || !attendance.punchIn) {
      return res.status(400).json({
        success: false,
        message: "Please punch in first.",
      });
    }

    if (attendance.punchOut) {
      return res.status(400).json({
        success: false,
        message: "Already punched out for today.",
      });
    }

    const punchOutTime = new Date();

    attendance.punchOut = punchOutTime;

    attendance.workingHours =
      (punchOutTime - attendance.punchIn) / (1000 * 60 * 60);

    await attendance.save();

    return res.status(200).json({
      success: true,
      message: "Punched out successfully",
      attendance,
    });
  } catch (error) {
    console.error("Punch Out Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getMyAttendance = async (req, res) => {
  try {
    const employee = await Employee.findOne({userId: req.user._id});

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Profile not found",
      });
    }

    const attendance = await Attendance.find({
      employeeId: employee._id,
    }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get My Attendance Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin function to get all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find()
      .populate("employeeId", "name employeeCode department designation")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get All Attendance Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// Admin function to get attendance records by date
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;

    const attendance = await Attendance.find({ date })
      .populate("employeeId", "name employeeCode department designation")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error("Get Attendance By Date Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};