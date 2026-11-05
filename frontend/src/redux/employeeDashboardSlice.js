import { createSlice } from "@reduxjs/toolkit";

const employeeDashboardSlice = createSlice({
    name: "employeeDashboard",
    initialState: {
        employeeDashboard: null,
    },
    reducers: {
        setEmployeeDashboard: (state, action) => {
            state.employeeDashboard = action.payload;
        },
    },
});

export const { setEmployeeDashboard } = employeeDashboardSlice.actions;

export default employeeDashboardSlice.reducer;
