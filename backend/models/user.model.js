import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },

  isActive: {
    type: Boolean,
    default: true,
  },
},
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);