import { Employee } from "../models/employee.model.js";

export const registerFace = async (req, res) => {
    try {
        const { faceDescriptor } = req.body;

        const employee = await Employee.findOne({userId: req.user._id,});

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee profile not found.",
            });
        }

        if (!Array.isArray(faceDescriptor) || faceDescriptor.length !== 128) {
            return res.status(400).json({
                success: false,
                message: "Invalid face descriptor.",
            });
        }

        employee.faceDescriptor = faceDescriptor;
        await employee.save();

        return res.status(200).json({
            success: true,
            message: "Face registered successfully.",
        });
    } catch (error) {
        console.error("Face Registration Error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};


export const verifyFace = async (req, res) => {
  try {
    const { faceDescriptor } = req.body;

    const employee = await Employee.findOne({
      userId: req.user._id,
    });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee profile not found.",
      });
    }

    if (!employee.faceDescriptor?.length) {
      return res.status(400).json({
        success: false,
        message: "Face is not registered.",
      });
    }

    if (!Array.isArray(faceDescriptor) || faceDescriptor.length !== 128) {
      return res.status(400).json({
        success: false,
        message: "Invalid face descriptor.",
      });
    }

    const registeredFace = employee.faceDescriptor;

    const distance = Math.sqrt(
      registeredFace.reduce((sum, value, index) => {
        return sum + Math.pow(value - faceDescriptor[index], 2);
      }, 0)
    );

    const isMatch = distance < 0.6;

    return res.status(200).json({
      success: true,
      verified: isMatch,
      distance,
      message: isMatch
        ? "Face verified successfully."
        : "Face verification failed.",
    });
  } catch (error) {
    console.error("Face Verification Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
