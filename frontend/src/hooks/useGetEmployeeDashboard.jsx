import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmployeeDashboard } from "../redux/employeeDashboardSlice.js";
import { DASHBOARD_API_END_POINT } from "../utils/constant";

const useGetEmployeeDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchEmployeeDashboard = async () => {
            try {
                const res = await axios.get(`${DASHBOARD_API_END_POINT}`,{withCredentials: true,});
                dispatch(setEmployeeDashboard(res.data));
            } catch (error) {
                console.error(
                    "Error fetching employee dashboard:",
                    error
                );
            }
        };
        fetchEmployeeDashboard();
    }, [dispatch]);
};

export default useGetEmployeeDashboard;
