import { useState } from "react";
import { Menu } from "lucide-react";
import DashboardSidebar from "../components/Dashboard/DashboardSidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import AttendanceSummary from "../components/Dashboard/AttendanceSummary";
import TodayAttendance from "../components/Dashboard/TodayAttendance";
import RecentAttendance from "../components/Dashboard/RecentAttendance";
import RecentLeaves from "../components/Dashboard/RecentLeaves";
import { useSelector } from "react-redux";
import useGetEmployeeDashboard from "../hooks/useGetEmployeeDashboard";

const EmployeeDashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  // API fetch
  useGetEmployeeDashboard();

  const { employeeDashboard } = useSelector((state) => state.employeeDashboard);

  const dashboard = employeeDashboard;

  const employee = dashboard?.employee;
  const todayAttendance = dashboard?.todayAttendance;
  const recentAttendance = dashboard?.recentAttendance;
  const recentLeaves = dashboard?.recentLeaves;
  const stats = dashboard?.stats;


  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Responsive Sidebar */}
      <DashboardSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="mb-5 flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">

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
