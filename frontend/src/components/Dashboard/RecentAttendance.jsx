
import { CalendarDays, Clock } from "lucide-react";

const RecentAttendance = ({ records = [] }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-700";
      case "Late":
        return "bg-orange-100 text-orange-700";
      case "Absent":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 p-4 sm:p-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Attendance
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your latest attendance records
          </p>
        </div>

        <CalendarDays className="text-blue-600" size={22} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase text-gray-500 sm:px-5">
                Date
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase text-gray-500 sm:px-5">
                Punch In
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase text-gray-500 sm:px-5">
                Punch Out
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase text-gray-500 sm:px-5">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id} className="transition hover:bg-gray-50">
                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-5">
                    {record.date}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-5">
                    <span className="flex items-center gap-2">
                      <Clock size={15} className="text-gray-400" />
                      {record.punchIn}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-600 sm:px-5">
                    {record.punchOut}
                  </td>

                  <td className="whitespace-nowrap px-4 py-4 sm:px-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="whitespace-nowrap px-4 py-10 text-center text-sm text-gray-500 sm:px-5"
                >
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAttendance;
