import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";

export const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      throw new Error("Admin credentials missing in .env");
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingAdmin = await User.findOne({
      email: normalizedEmail,
    });

    if (existingAdmin) {
      console.log("Admin account already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin created successfully:", admin.email);

  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

createAdmin();