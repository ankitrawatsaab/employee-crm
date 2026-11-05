import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import AttendanceSummary from "../components/Dashboard/AttendanceSummary";
import TodayAttendance from "../components/Dashboard/TodayAttendance";
import RecentAttendance from "../components/Dashboard/RecentAttendance";
import RecentLeaves from "../components/Dashboard/RecentLeaves";

import { dashboardData } from "../data/dashboardData";

const EmployeeDashboard = () => {
  const { employee, stats, todayAttendance, recentAttendance, recentLeaves } =
    dashboardData;

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-5 sm:p-8">

        <div className="mx-auto max-w-7xl space-y-8">

          {/* Header */}
          <DashboardHeader employee={employee} />

          {/* Summary Cards */}
          <AttendanceSummary stats={stats} />

          {/* Today's Attendance */}
          <TodayAttendance attendance={todayAttendance} />

          {/* Recent Records */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <RecentAttendance records={recentAttendance} />

            <RecentLeaves leaves={recentLeaves} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
