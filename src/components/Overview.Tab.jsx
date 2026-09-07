import React, { useContext } from "react";
import StatCard from "./Reusable.StatCard";
import { OrderContext } from "../Context/orderContext";

// const recentOrders = [
//   { id: "#ORD-001", date: "2026-07-20", total: "$129.99", status: "Delivered" },
//   { id: "#ORD-002", date: "2026-07-18", total: "$79.50", status: "Shipped" },
// ];


const OverviewTab = () => {
  const { userOrders, setuserOrders, orders } = useContext(OrderContext);

  const totalOrders = userOrders?.length || 0;
  const totalSpent = userOrders?.reduce(
    (total, order) =>
      total + (order.orderSummary?.totalAmount || 0), 0
  ) || 0;

  const recentOrders = userOrders?.slice(0, 3) || []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon="📦" label="Total Orders" value={totalOrders} color="blue" />
        {/* <StatCard icon="❤️" label="Wishlist" value="8" color="purple" /> */}
        {/* <StatCard icon="⭐" label="Reward Points" value="1,250" color="orange" /> */}
        <StatCard icon="💰" label="Total Spent" value={`Rs. ${totalSpent.toLocaleString()}`} color="green" />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">Recent Orders</h3>
        <div className="space-y-3">
          {/* recentOrders */}
          {recentOrders.map((order) => (

            <div
              key={order.orderId}
              className="flex flex-col rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-gray-800">{order.orderId}</p>
                <p className="text-sm text-gray-500">{order.createdAt}</p>
              </div>
              <div className="mt-2 flex items-center gap-4 sm:mt-0">
                <span className="text-sm font-medium text-gray-700">{order.orderSummary?.totalAmount}</span>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  {order.orderStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default OverviewTab;