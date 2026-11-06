
import { createSlice } from "@reduxjs/toolkit";

const attendanceSlice = createSlice({
  name: "attendance",

  initialState: {
    loading: false,
    attendance: null,
  },

  reducers: {
    setAttendanceLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAttendance: (state, action) => {
      state.attendance = action.payload;
    },
  },
});

export const {
  setAttendanceLoading,
  setAttendance,
} = attendanceSlice.actions;

export default attendanceSlice.reducer;
