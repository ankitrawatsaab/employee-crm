
export const dashboardData = {
  employee: {
    name: "Ankit Rawat",
    employeeCode: "EMP-001",
    designation: "MERN Stack Developer",
    department: "IT",
    email: "ankit@example.com",
    profileImage: "",
  },

  stats: {
    presentDays: 22,
    absentDays: 2,
    workingHours: 176,
    leaveBalance: 12,
  },

  todayAttendance: {
    date: "2026-11-05",
    punchIn: "09:30 AM",
    punchOut: null,
    status: "Present",
    workingHours: "08h 15m",
  },

  recentAttendance: [
    {
      id: 1,
      date: "2026-11-05",
      punchIn: "09:30 AM",
      punchOut: "--",
      status: "Present",
    },
    {
      id: 2,
      date: "2026-11-04",
      punchIn: "09:15 AM",
      punchOut: "06:20 PM",
      status: "Present",
    },
    {
      id: 3,
      date: "2026-11-03",
      punchIn: "09:45 AM",
      punchOut: "06:30 PM",
      status: "Late",
    },
    {
      id: 4,
      date: "2026-11-02",
      punchIn: "09:20 AM",
      punchOut: "06:10 PM",
      status: "Present",
    },
    {
      id: 5,
      date: "2026-10-30",
      punchIn: "--",
      punchOut: "--",
      status: "Absent",
    },
  ],

  recentLeaves: [
    {
      id: 1,
      type: "Casual Leave",
      startDate: "2026-11-10",
      endDate: "2026-11-11",
      status: "Pending",
    },
    {
      id: 2,
      type: "Sick Leave",
      startDate: "2026-10-21",
      endDate: "2026-10-21",
      status: "Approved",
    },
    {
      id: 3,
      type: "Casual Leave",
      startDate: "2026-10-15",
      endDate: "2026-10-15",
      status: "Rejected",
    },
  ],
};
