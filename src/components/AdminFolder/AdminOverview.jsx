import React, { useContext } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import { AdminOrderContext } from "./Context/AdminOrderContext";
import { useEffect } from "react";

const stats = [
  {
    title: "Revenue",
    value: "Rs. 248,560",
    change: "12.5%",
    icon: DollarSign,
    positive: true,
  },
  {
    title: "Orders",
    value: "1,284",
    change: "8.2%",
    icon: ShoppingCart,
    positive: true,
  },
  {
    title: "Customers",
    value: "8,549",
    change: "14.4%",
    icon: Users,
    positive: true,
  },
  {
    title: "Products",
    value: "356",
    change: "2.4%",
    icon: Package,
    positive: false,
  },
];

export default function AdminOverview() {
  const { adminOrders, getOrders, totalRevenue, 
    paidOrdersCount,AdminProducts,getCustomers,AdminCustomers } = useOutletContext()


  console.log("Admin Orders:", adminOrders);
  console.log("Paid Orders:", paidOrdersCount);
  console.log("Revenue:", totalRevenue);


  console.log("All Orders Length", adminOrders.length);
  const { count } = useOutletContext()
  console.log(count);

  useEffect(() => {
    getOrders();
  }, [])
  return (
    <>
      <div>
        {/* Heading */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-lg font-semibold text-violet-600">
              Overview
            </p>

            <h1 className="text-xl  tracking-tight text-green-400 sm:text-2xl lg:text-[30px]">
              Good morning, Abdullah
            </h1>

            <p className="mt-3 text-base text-gray-500">
              Here's what's happening with your store.
            </p>
          </div>
          <div className=" flex gap-2">
            {/* <Link to="/admin/products"
              className="inline-flex w-fit items-center 
              gap-1 rounded-2xl bg-[#111827] px-3  text-sm font-semibold text-white shadow-lg
               shadow-gray-300 transition hover:-translate-y-0.5 hover:bg-black"
            >
              <Plus size={20} />
              Add Product
            </Link> */}

            <Link to="/"
              className="inline-flex w-fit items-center gap-1 rounded-xl
               bg-green-400 px-4 py-3
                text-sm font-bold text-white shadow-lg shadow-gray-300 transition hover:-translate-y-0.5 hover:bg-black"
            >
              <Plus size={20} />
              Home
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="group rounded-[22px] border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[15px] font-medium text-gray-500">
                      {stat.title}
                    </p>

                    <h4 className="mt-4 text-xl tracking-tight text-gray-450">
                      {/* {stat.value} */}
                       { stat.title == 'Orders' ? 
                          adminOrders.length : stat.title == 'Revenue' ? `Rs. ${totalRevenue.toLocaleString()}` 
                          : stat.title == 'Products' ? `${AdminProducts.length}`:stat.title == 'Customers' ? `${AdminCustomers.length}`: 0 } 
                     
                    </h4>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-700 transition group-hover:bg-violet-50 group-hover:text-violet-600">
                    <Icon size={25} />
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-2 text-sm">
                  {stat.positive ? (
                    <ArrowUpRight
                      size={18}
                      className="text-emerald-500"
                    />
                  ) : (
                    <ArrowDownRight
                      size={18}
                      className="text-red-500"
                    />
                  )}

                  <span
                    className={`font-bold ${stat.positive
                      ? "text-emerald-600"
                      : "text-red-500"
                      }`}
                  >
                    {stat.change}
                  </span>

                  <span className="text-gray-400">
                    vs last month
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* Revenue Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Revenue
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Store revenue overview
                </p>
              </div>

              <select className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 6 months</option>
                <option>This year</option>
              </select>
            </div>

            <div className="mt-8 flex h-56 items-end gap-2 sm:gap-4">
              {[40, 58, 42, 75, 60, 88, 70, 96, 76, 84, 68, 92].map(
                (height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.04,
                    }}
                    className="flex-1 rounded-t-xl bg-gradient-to-t from-violet-600 to-violet-400"
                  />
                )
              )}
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Recent Orders</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Latest customer orders
                </p>
              </div>

              <Link
                to="/admin/orders"
                className="text-sm font-bold text-violet-600 hover:text-violet-700"
              >
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {[
                ["#ORD-1024", "Ali Raza", "Rs. 4,500"],
                ["#ORD-1023", "Ahmed Khan", "Rs. 2,850"],
                ["#ORD-1022", "Usman Ali", "Rs. 6,200"],
                ["#ORD-1021", "Hamza", "Rs. 1,950"],
              ].map(([id, name, price]) => (
                <div
                  key={id}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
                >
                  <div>
                    <p className="text-sm font-serif">{id}</p>
                    <p className="mt-1 text-xs text-gray-400">
                      {name}
                    </p>
                  </div>

                  <p className="text-sm font-normal">{price}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}