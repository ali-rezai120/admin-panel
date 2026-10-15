import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Settings,
  LogOut,
  Layers,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Products", icon: Package, to: "/products" },
  { label: "Orders", icon: ShoppingCart, to: "/orders" },
  { label: "Customers", icon: Users, to: "/customers" },
  { label: "Categories", icon: Tags, to: "/categories" },
  { label: "Settings", icon: Settings, to: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-colors duration-300 md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col md:justify-between md:border-r md:border-t-0 md:pb-4 md:shadow-none dark:border-gray-800 dark:bg-gray-900">
      {/* Logo - Desktop */}
      <div className="hidden items-center gap-3 px-6 py-7 md:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
          <Layers size={23} />
        </div>
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          adminPanel
        </span>
      </div>

      {/* Navigation */}
      <nav className="grid grid-cols-7 gap-0.5 px-1 py-2 md:flex md:flex-1 md:flex-col md:gap-1 md:px-4 md:py-0">
        {navigation.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              [
                "flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-2 text-[9px] font-medium transition-colors duration-200 sm:text-xs md:w-full md:flex-row md:justify-start md:gap-3 md:px-3 md:py-3 md:text-sm",
                isActive
                  ? "bg-blue-600 !text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
              ].join(" ")
            }
          >
            <Icon size={20} strokeWidth={1.8} />
            <span className="max-w-full truncate">{label}</span>
          </NavLink>
        ))}

        {/* Logout - Mobile */}
        <button
          type="button"
          className="flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-0.5 py-2 text-[9px] font-medium text-red-500 transition-colors hover:bg-red-50 sm:text-xs md:hidden dark:text-red-400 dark:hover:bg-red-950/40"
        >
          <LogOut size={20} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </nav>

      {/* Logout - Desktop */}
      <div className="hidden px-4 pt-4 md:block">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-red-500 transition-colors hover:border-red-100 hover:bg-red-50 dark:text-red-400 dark:hover:border-red-900/50 dark:hover:bg-red-950/40"
        >
          <LogOut size={20} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
