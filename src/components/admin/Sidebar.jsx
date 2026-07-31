import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../libs/supabase";
import { Boxes, LayoutDashboard, LogOut, Tag, Settings, Ear } from "lucide-react";

export default function Sidebar() {
    const navigate = useNavigate();

    async function handleLogout() {
        await supabase.auth.signOut();

        navigate("/");
    }

    const navItems = [
        { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/admin/products", label: "Products", icon: Boxes, end: true },
        { to: "/admin/categories", label: "Categories", icon: Tag, end: true },
        { to: "/admin/setting", label: "Settings", icon: Settings, end: true },
    ];

    return (
        <aside className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                    <Ear size={18} className="text-blue-600" />
                </div>
                <span className="text-lg font-bold text-gray-800">Hearing Gadget</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-1">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                    }`
                                }
                            >
                                <Icon size={18} />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout */}
            <div className="border-t border-gray-100 px-4 py-4">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}
