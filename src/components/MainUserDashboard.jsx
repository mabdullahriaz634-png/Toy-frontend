import React, { useState } from "react";
import OverviewTab from "./Overview.Tab";
import OrdersTab from "./MyOrderTab";
import ProfileTab from "./ProfileTab";

const tabs = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "orders", label: "My Orders", icon: "📋" },
  { id: "profile", label: "Profile", icon: "👤" },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setSidebarOpen(false); // close sidebar on mobile after selecting
  };

  return (
    <div className="flex min-h-screen bg-gray-50 " >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 transform bg-white shadow-lg transition-transform duration-300 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-6">
          <h2 className="text-lg font-bold text-gray-800">Dashboard</h2>
          <button
            className="rounded p-1 text-gray-500 hover:bg-gray-100 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mt-4 space-y-1 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Mobile header with hamburger */}
        <div className="mb-6 flex items-center gap-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-bold capitalize text-gray-800">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
        </div>

        <div className="rounded-xl bg-white p-4 shadow-sm sm:p-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "orders" && <OrdersTab />}
          {activeTab === "profile" && <ProfileTab />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;