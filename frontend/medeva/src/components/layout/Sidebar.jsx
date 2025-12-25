import { NavLink } from "react-router-dom";
import { LayoutDashboard, Settings, User } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-white border-r h-screen sticky top-0">
      <div className="p-6 text-xl font-bold text-blue-600">MEDEVA MINT</div>

      <nav className="flex flex-col gap-2 px-4 mt-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl ${
              isActive ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600"
            }`
          }
        >
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>

        <NavLink
          to="/karyawan"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl ${
              isActive ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600"
            }`
          }
        >
          <User size={20} />
          Karyawan
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl ${
              isActive ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600"
            }`
          }
        >
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
}
