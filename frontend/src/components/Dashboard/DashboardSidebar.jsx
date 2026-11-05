
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  CalendarDays,
  UserRound,
  LogOut,
  Building2,
  X,
} from "lucide-react";

const DashboardSidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/employee/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: CalendarCheck,
    },
    {
      name: "Leave Management",
      path: "/employee/leaves",
      icon: CalendarDays,
    },
    {
      name: "My Profile",
      path: "/employee/profile",
      icon: UserRound,
    },
  ];

  const handleLogout = () => {
    setMobileOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white px-5 py-6 transition-transform duration-300 md:sticky md:top-0 md:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Employee CRM
              </h1>
              <p className="text-xs text-gray-500">
                Employee Portal
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={19} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default DashboardSidebar;
