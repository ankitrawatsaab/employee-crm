import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import employeeRoute from "./routes/employee.route.js";
import authRoute from "./routes/auth.route.js";
import attendanceRoute from "./routes/attendance.route.js";
import leaveRoute from "./routes/leave.route.js";  
import dashboardRoute from "./routes/dashboard.routes.js"; 
import faceRoute from "./routes/face.routes.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//  api's
app.use("/api/v1/employee", employeeRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/attendance", attendanceRoute);
app.use("/api/v1/leave", leaveRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/face", faceRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})