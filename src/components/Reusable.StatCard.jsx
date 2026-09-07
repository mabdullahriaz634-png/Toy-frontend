import React from "react";

const StatCard = ({ icon, label, value, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
  };

  return (
    <div
      className={`flex items-center gap-4 rounded-xl border p-4 ${
        colorClasses[color] || colorClasses.blue
      }`}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;