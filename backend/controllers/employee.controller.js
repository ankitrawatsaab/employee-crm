import { User } from "../models/user.model.js";
import { Employee } from "../models/employee.model.js";
import bcrypt from "bcryptjs";

export const registerEmployee = async (req, res) => {
    try {
        const { name, email, password, employeeCode, phone, department, designation, joiningDate } = req.body;

        if (!name || !email || !password || !employeeCode || !phone || !department || !designation || !joiningDate) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided"
            })
        }

        const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already exists.',
                success: false,
            })
        }

        const existingEmployee = await Employee.findOne({ employeeCode: employeeCode.trim() });
        if (existingEmployee) {
            return res.status(409).json({
                message: 'Employee code already exists.',
                success: false,
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
            role: "employee",
        });

        try {

            const employee = await Employee.create({
                userId: user._id,
                employeeCode,
                name,
                phone,
                department,
                designation,
                joiningDate,
            });

            return res.status(201).json({
                success: true,
                message: "Employee Registered Successfully",
                data: {
                    employee,
                    user: {
                        id: user._id,
                        email: user.email,
                        role: "employee",
                    }
                }
            })
        } catch (error) {
            await User.findByIdAndDelete(user._id);
            throw error;
        }

    } catch (error) {
        console.error("Register Employee Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate("userId", "email isActive")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            totalEmployees: employees.length,
            employees,
        });

    } catch (error) {
        console.error("Get All Employees Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId).populate("userId", "email isActive");

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found.",
            })
        }

        return res.status(200).json({
            success: true,
            employee,
        });
    } catch (error) {
        console.error("Get Employee By ID Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.id;

        const { name, phone, department, designation, joiningDate, status } = req.body;

        const employee = await Employee.findById(
            employeeId, 
            { name, phone, department, designation, joiningDate, status },
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found.",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            employee,
        });
        

    } catch (error) {
        console.error("Update Employee Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}

export const deleteEmployee = async (req, res) => {
    try{
        const employeeId = req.params.id;
        const employee = await Employee.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found.",
            })
        }

        await Employee.findByIdAndDelete(employeeId.userId);
        await Employee.findByIdAndDelete(employeeId);

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully.",
        });

    }catch(error){
        console.error("Delete Employee Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
        })
    }
}