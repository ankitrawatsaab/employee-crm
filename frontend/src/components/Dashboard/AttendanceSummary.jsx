import {
  CalendarCheck,
  CalendarX,
  Clock,
  CalendarDays,
} from "lucide-react";

const AttendanceSummary = ({ stats }) => {
  const cards = [
    {
      title: "Present Days",
      value: stats?.presentDays ?? 0,
      subtitle: "This month",
      icon: CalendarCheck,
      color: "blue",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Absent Days",
      value: stats?.absentDays ?? 0,
      subtitle: "This month",
      icon: CalendarX,
      color: "red",
      bg: "bg-red-50",
      text: "text-red-600",
    },
    {
      title: "Working Hours",
      value: `${stats?.workingHours ?? 0}h`,
      subtitle: "This month",
      icon: Clock,
      color: "purple",
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Leave Balance",
      value: stats?.leaveBalance ?? 0,
      subtitle: "Available leaves",
      icon: CalendarDays,
      color: "green",
      bg: "bg-green-50",
      text: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {card.value}
                </h2>

                <p className="mt-2 text-xs text-gray-400">
                  {card.subtitle}
                </p>
              </div>

              <div className={`rounded-xl p-3 ${card.bg} ${card.text}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceSummary;
