
import { Clock, LogIn, LogOut, CalendarCheck } from "lucide-react";

const TodayAttendance = ({ attendance }) => {
  const isPunchedIn = Boolean(attendance?.punchIn);
  const isPunchedOut = Boolean(attendance?.punchOut);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Today's Attendance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Track your attendance for today
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <CalendarCheck size={22} />
        </div>
      </div>

      {/* Attendance Status */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Punch In */}
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <LogIn size={17} />
            Punch In
          </div>

          <p className="text-xl font-bold text-gray-900">
            {attendance?.punchIn || "--:--"}
          </p>

          <span className="mt-2 inline-block rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
            {isPunchedIn ? "Completed" : "Not Started"}
          </span>
        </div>

        {/* Punch Out */}
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <LogOut size={17} />
            Punch Out
          </div>

          <p className="text-xl font-bold text-gray-900">
            {attendance?.punchOut || "--:--"}
          </p>

          <span className="mt-2 inline-block rounded-full bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700">
            {isPunchedOut ? "Completed" : "Pending"}
          </span>
        </div>

        {/* Working Hours */}
        <div className="rounded-xl bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Clock size={17} />
            Working Hours
          </div>

          <p className="text-xl font-bold text-gray-900">
            {attendance?.workingHours || "00h 00m"}
          </p>

          <span className="mt-2 inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
            Today's Total
          </span>
        </div>
      </div>

      {/* Attendance Action */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {!isPunchedIn && (
          <button
            disabled
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white opacity-70"
          >
            <LogIn size={18} />
            Punch In (Coming Soon)
          </button>
        )}

        {isPunchedIn && !isPunchedOut && (
          <button
            disabled
            className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white opacity-70"
          >
            <LogOut size={18} />
            Punch Out (Coming Soon)
          </button>
        )}

        {isPunchedOut && (
          <div className="flex items-center gap-2 rounded-xl bg-green-50 px-5 py-3 text-sm font-medium text-green-700">
            <CalendarCheck size={18} />
            Attendance Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayAttendance;
