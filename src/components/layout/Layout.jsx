import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-[#F7F8FA] text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-100">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="min-w-0 flex-1 p-3 pb-24 transition-colors duration-300 sm:p-5 sm:pb-24 lg:p-8 dark:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
}
