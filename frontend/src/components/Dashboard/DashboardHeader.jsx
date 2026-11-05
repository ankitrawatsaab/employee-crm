
import { Bell, ChevronDown } from "lucide-react";

const DashboardHeader = ({ employee }) => {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      {/* Welcome */}
      <div>
        <p className="mb-1 text-sm text-gray-500">{today}</p>

        <h1 className="text-2xl font-bold text-gray-900">
          {getGreeting()}, {employee?.name?.split(" ")[0]} 👋
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening with your work today.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification */}
        <button className="relative rounded-xl border border-gray-200 bg-white p-3 text-gray-600 transition hover:bg-gray-50">
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 transition hover:bg-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
            {employee?.name?.charAt(0)?.toUpperCase() || "E"}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-gray-900">
              {employee?.name || "Employee"}
            </p>
            <p className="text-xs text-gray-500">
              {employee?.designation || "Employee"}
            </p>
          </div>

          <ChevronDown size={16} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
