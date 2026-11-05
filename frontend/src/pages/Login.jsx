import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice.js";

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((store) => store.auth);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(setLoading(true));

            const res = await axios.post("https://employee-crm-dpa9.onrender.com/api/v1/auth/login", input, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,

            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || "Login successful!");
                navigate("/");
            } else {
                toast.error(res.data.message || "Unable to login.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Login failed.");

        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={submitHandler}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Employee Login
                </h1>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={changeEventHandler}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
