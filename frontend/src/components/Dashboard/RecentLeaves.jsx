
import { CalendarDays } from "lucide-react";

const RecentLeaves = ({ leaves = [] }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-orange-100 text-orange-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Leaves
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Your latest leave requests
          </p>
        </div>

        <CalendarDays size={22} className="text-blue-600" />
      </div>

      {/* Leave List */}
      <div className="divide-y divide-gray-100">
        {leaves.length > 0 ? (
          leaves.map((leave) => (
            <div
              key={leave.id}
              className="flex flex-col justify-between gap-3 p-5 transition hover:bg-gray-50 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {leave.type}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  {leave.startDate} - {leave.endDate}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                  leave.status
                )}`}
              >
                {leave.status}
              </span>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-sm text-gray-500">
            No leave requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentLeaves;