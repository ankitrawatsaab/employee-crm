import mongoose from "mongoose"

const attendanceSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    punchIn: {
        type: Date,
        default: null,
    },
    punchOut: {
        type: Date,
        default: null,
    },
    workingHours: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ["present", "absent", "leave"],
        default: "absent",
    },
},
    { timestamps: true }
);

attendanceSchema.index(
    { employeeId: 1, date: 1 },
    { unique: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);

