import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast} from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/authSlice.js";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        employeeCode: "",
        phone: "",
        department: "",
        designation: "",
        joiningDate: "",
    });

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));

        try {
            const res = await axios.post("https://employee-crm-dpa9.onrender.com/api/v1/employee/register",
                input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
            );
            if (res.data.success) {
                toast.success(res.data.message || "Employee registered successfully");

                setInput({
                    name: "",
                    email: "",
                    password: "",
                    employeeCode: "",
                    phone: "",
                    department: "",
                    designation: "",
                    joiningDate: "",
                });

                navigate("https://employee-crm-dpa9.onrender.com/api/v1/employee/login");
            }
        } catch (error) {
            console.error("Employee registration error:", error);

            toast.error(error.response?.data?.message || "Employee registration failed"
            );
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-3xl font-bold text-gray-800">
                    Employee Registration
                </h1>

                <p className="mb-6 text-gray-500">
                    Create your employee account
                </p>

                <form onSubmit={submitHandler} className="space-y-4">

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Full Name
                            </label>
                            <input
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter full name"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Employee Code
                            </label>
                            <input
                                name="employeeCode"
                                value={input.employeeCode}
                                onChange={changeEventHandler}
                                placeholder="EMP001"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="Enter email"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={changeEventHandler}
                                placeholder="Enter password"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Phone
                            </label>
                            <input
                                name="phone"
                                value={input.phone}
                                onChange={changeEventHandler}
                                placeholder="Enter phone number"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Department
                            </label>
                            <input
                                name="department"
                                value={input.department}
                                onChange={changeEventHandler}
                                placeholder="IT, HR, Sales..."
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Designation
                            </label>
                            <input
                                name="designation"
                                value={input.designation}
                                onChange={changeEventHandler}
                                placeholder="Software Developer"
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Joining Date
                            </label>
                            <input
                                type="date"
                                name="joiningDate"
                                value={input.joiningDate}
                                onChange={changeEventHandler}
                                required
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Registering..." : "Register Employee"}
                    </button>

                </form>

                <p className="mt-5 text-center text-gray-600">
                    Already registered?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
