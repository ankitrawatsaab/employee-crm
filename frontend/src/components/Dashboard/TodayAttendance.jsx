import { Clock, LogIn, LogOut, CalendarCheck, X } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import FaceVerification from "../../pages/FaceVerification.jsx";

const TodayAttendance = ({ attendance }) => {
  const isPunchedIn = Boolean(attendance?.punchIn);
  const isPunchedOut = Boolean(attendance?.punchOut);

  const loading = useSelector((state) => state.attendance.loading);

  const [showFaceVerification, setShowFaceVerification] = useState(false);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
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
            onClick={() => setShowFaceVerification(true)}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 sm:w-auto"
          >
            <LogIn size={18} />
            Punch In
          </button>
        )}

        {isPunchedIn && !isPunchedOut && (
          <button
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-medium text-white opacity-70 sm:w-auto"
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

      {/* Face Verification Modal */}
      {showFaceVerification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setShowFaceVerification(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            <FaceVerification  onSuccess={() => setShowFaceVerification(false)}  />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayAttendance;
