import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
import { toast } from "sonner";
import {setAttendance,setAttendanceLoading,} from "../redux/attendanceSlice.js";
import { PUNCH_IN_API_END_POINT } from "../utils/constant.js";
import { setEmployeeDashboard } from "../redux/employeeDashboardSlice.js";

const usePunchIn = () => {
  const dispatch = useDispatch();
  const employeeDashboard = useSelector((state) => state.employeeDashboard.employeeDashboard);

  const punchIn = async () => {
    try {
      dispatch(setAttendanceLoading(true));

      const res = await axios.post(
        PUNCH_IN_API_END_POINT,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const attendance = res.data.attendance;

        // Attendance slice update
        dispatch(setAttendance(attendance));

        // Dashboard slice update
        dispatch(
          setEmployeeDashboard({
            ...employeeDashboard,
            todayAttendance: attendance,
          })
        );
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Punch In failed");
      return false;
    } finally {
      dispatch(setAttendanceLoading(false));
    }
  };
  return { punchIn };
};

export default usePunchIn;
