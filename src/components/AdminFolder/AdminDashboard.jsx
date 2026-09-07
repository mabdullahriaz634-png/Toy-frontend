import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  LogOut,
  // Settings,
  Search,
  Bell,
  ChevronDown,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Menu,
  X,
  Box,
  UserRound,
} from "lucide-react";

// const menuItems = [
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     name: "Orders",
//     path: "/admin/orders",
//     icon: ShoppingCart,
//     count: 24,
//   },
//   {
//     name: "Products",
//     path: "/admin/products",
//     icon: Package,
//   },
//   {
//     name: "Customers",
//     path: "/admin/customers",
//     icon: Users,
//   },
// ];

export default function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isDashboard =
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb] text-[#111827]">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>



      {/* Main Area */}
      <div className="min-h-screen lg:ml-[270px]">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-[90px] items-center border-b border-gray-200/80 bg-white/95 px-5 backdrop-blur-xl sm:px-8 lg:px-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="mr-4 rounded-xl border border-gray-200 p-2.5 lg:hidden"
          >
            <Menu size={21} />
          </button>

          <div className="hidden sm:block">
            <p className="text-sm text-gray-400">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>

            <h2 className="mt-1 text-xl font-bold">Dashboard</h2>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Search */}
            <div className="hidden h-14 w-[300px] items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 md:flex">
              <Search size={21} className="text-gray-400" />

              <input
                type="text"
                placeholder="Search anything..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Notification */}
            <button className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white transition hover:bg-gray-50">
              <Bell size={21} className="text-gray-600" />

              <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#7c3aed]" />
            </button>

            {/* User */}
            <div className="hidden items-center gap-3 border-l border-gray-200 pl-4 sm:flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] text-sm font-bold text-white">
                AR
              </div>

              <div className="hidden lg:block">
                <p className="text-sm font-bold">Abdullah</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>

              <ChevronDown size={18} className="text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-5 sm:p-8 lg:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}