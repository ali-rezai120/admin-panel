import { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  UserRound,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Topbar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleProfile = () => {
    setProfileOpen((open) => !open);
    setNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setNotificationsOpen((open) => !open);
    setProfileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 flex min-h-16 w-full items-center justify-between gap-2 border-b border-gray-200 bg-white px-3 py-3 transition-colors sm:min-h-20 sm:gap-5 sm:px-5 lg:px-8 dark:border-gray-700 dark:bg-gray-900">
      {/* Search */}
      <div className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus-within:border-blue-400 focus-within:bg-white dark:focus-within:border-blue-500 sm:max-w-md sm:gap-3 sm:px-4 dark:border-gray-700 dark:bg-gray-800 dark:focus-within:bg-gray-800">
        <Search size={19} className="shrink-0 text-gray-400" />
        <input
          type="search"
          placeholder="Search anything..."
          aria-label="Search anything"
          className="w-full min-w-0 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400 dark:text-gray-100"
        />
        <kbd className="hidden shrink-0 rounded border border-gray-200 bg-white px-2 py-1 text-xs text-gray-400 md:block dark:border-gray-600 dark:bg-gray-700">
          /
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1 sm:gap-3">
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === "light" ? "Enable dark mode" : "Enable light mode"
          }
          title={theme === "light" ? "Dark mode" : "Light mode"}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:h-11 sm:w-11 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
        >
          {theme === "light" ? <Moon size={21} /> : <Sun size={21} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleNotifications}
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 sm:h-11 sm:w-11 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <Bell size={21} />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-1.5rem))] rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-300">
                You don't have any new notifications.
              </p>
            </div>
          )}
        </div>

        {/* Admin Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={toggleProfile}
            aria-label="Admin profile menu"
            aria-expanded={profileOpen}
            className="flex min-h-10 items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-50 sm:gap-3 sm:p-2 dark:hover:bg-gray-800"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 sm:h-10 sm:w-10">
              <UserRound size={21} />
            </div>
            <div className="hidden min-w-0 text-left sm:block">
              <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-100">
                Admin User
              </p>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
            <ChevronDown
              size={17}
              className={`hidden shrink-0 text-gray-400 transition-transform sm:block ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-[min(14rem,calc(100vw-1.5rem))] rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-700">
                <p className="truncate text-sm font-semibold text-gray-800 dark:text-white">
                  Admin User
                </p>
                <p className="mt-1 break-all text-xs text-gray-500 dark:text-gray-400">
                  admin@example.com
                </p>
              </div>

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <User size={17} />
                My Profile
              </button>

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Settings size={17} />
                Account Settings
              </button>

              <div className="my-1 border-t border-gray-100 dark:border-gray-700" />

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
