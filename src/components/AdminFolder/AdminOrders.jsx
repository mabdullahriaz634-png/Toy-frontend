import React, { useContext } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { authAPI } from "../../Api";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useRef, useEffect } from "react";
import { AdminOrderContext } from "./Context/AdminOrderContext";

export default function AdminOrders() {
  // const [adminOrders, setAdminOrdes] = useState([])
  // console.log("All Orders State", adminOrders.length);
  // const [loading, setLoading] = useState(true)
  const { adminOrders, setAdminOrdes, loading, setLoading } = useOutletContext()
  console.log("Orders", adminOrders);

  const [searchOrder, setSearchOrder] = useState("")
  const [highlightOrder, setHighlightOrder] = useState(null)
  const orderRefs = useRef({});
  const navigate = useNavigate();

  // const getOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await authAPI.get('/order/admin')
  //     // console.log("Admin Orders Res", res);
  //     setAdminOrdes(res.data.orders || [])

  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to get orders")
  //     console.log(error);
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // useEffect(() => {
  // getOrders();
  // }, [])

  // const handleSearch = async () => {
  //   if (!searchOrder.trim()) {
  //     setHighlightOrder(null);
  //     return;
  //   }

  //   const foundOrder = adminOrders.find(
  //     (order) =>
  //       order.orderId?.toLowerCase() ===
  //       searchOrder.trim().toLowerCase()
  //   );

  //   if (foundOrder) {
  //     setHighlightOrder(foundOrder._id);

  //     // Order ko screen par automatically le aayega
  //     setTimeout(() => {
  //       orderRefs.current[foundOrder._id]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }, 100);
  //   } else {
  //     setHighlightOrder("not-found");
  //     toast.error("Order not found");
  //   }
  // };

  const handleSearch = async () => {
    if (!searchOrder.trim()) {
      setHighlightOrder(null);
      return;
    }

    try {
      const res = await authAPI.get(
        `/order/admin/search/${encodeURIComponent(searchOrder.trim())}`
      );

      console.log("Search Order Response:", res.data);

      const foundOrder = res.data.order?.[0];

      if (foundOrder) {
        setHighlightOrder(foundOrder._id);

        setTimeout(() => {
          orderRefs.current[foundOrder._id]?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, 100);
      }
    } catch (error) {
      console.log("Search Order Error:", error);
      setHighlightOrder("not-found");
      toast.error(error.response?.data?.message || "Order not found");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await authAPI.patch(
        `/order/admin/${orderId}/status`,
        {
          orderStatus: newStatus,
        }
      );

      toast.success("Order status updated");

      setAdminOrdes((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? {
              ...order,
              orderStatus: newStatus,
            }
            : order
        )
      );

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 text-yellow-600";

      case "confirmed":
        return "bg-green-50 text-green-600";

      case "processing":
        return "bg-orange-50 text-orange-600";

      case "shipped":
        return "bg-blue-50 text-blue-600";

      case "delivered":
        return "bg-emerald-50 text-emerald-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-lg font-semibold text-violet-600">
          Management
        </p>

        <h1 className="text-3xl font-serif sm:text-4xl">
          Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage and track all customer orders.
        </p>

        {/* <input type="text" placeholder="Search Order" className=" w-full border-2 mt-2 h-[50px] text-[#AC5FFE] rounded-xl pl-4" /> */}
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            value={searchOrder}
            onChange={(e) => {
              setSearchOrder(e.target.value);

              if (!e.target.value.trim()) {
                setHighlightOrder(null);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search Order e.g. #ORD-1024"
            className="h-[50px] w-full rounded-xl border-2 pl-4 text-[#AC5FFE] outline-none focus:border-violet-500"
          />

          <button
            onClick={handleSearch}
            className="rounded-xl bg-violet-600 px-6 font-semibold text-white transition hover:bg-violet-700"
          >
            Search
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white border-2 border-red-500 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px]">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Order
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Customer
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Product
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Amount
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Status
                </th>
                <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-gray-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (<tr>
                <td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">

                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600"></div>

                    <p className="text-sm text-gray-500">
                      Loading orders...
                    </p>

                  </div>
                </td>
              </tr>) : adminOrders.length === 0 ? (<tr>
                <td colSpan="6" className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">

                    <ShoppingCart
                      size={45}
                      className="mb-3 text-gray-300"
                    />

                    <h3 className="text-lg font-semibold text-gray-600">
                      No Orders Found
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      There are no customer orders yet.
                    </p>

                  </div>
                </td>
              </tr>
              ) : (adminOrders.map((order) => (
                <tr
                  key={order._id}
                  ref={(el) => {
                    orderRefs.current[order._id] = el;
                  }}
                  className={`transition-all duration-300 ${highlightOrder === order._id
                    ? "animate-pulse bg-violet-300 ring-4 ring-violet-600 shadow-lg shadow-violet-300"
                    : "hover:bg-gray-50"
                    }`}
                >
                  <td className="px-6 py-5 text-xs font-normal">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-5 text-gray-600">
                    {order.user?.name}
                  </td>

                  <td className="px-6 py-5 text-xs text-gray-600">
                    {order.orderItems?.map((item) => item.name).join(", ")}
                  </td>

                  <td className="px-6 py-5 font-normal">
                    Rs {order.orderSummary?.totalAmount}
                  </td>

                  <td className="px-6 py-5">
                    {/* <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                      {order.orderStatus}
                    </span> */}
                    {/* <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className={`cursor-pointer rounded-full border-none px-3 py-2 text-xs font-bold outline-none ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select> */}

                    {/* //////////// */}

                    <select
                      value={order.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      disabled={
                        order.orderStatus === "delivered" ||
                        order.orderStatus === "cancelled"
                      }
                      className={`rounded-full border-none px-3 py-2 text-xs font-bold outline-none
                      ${getStatusColor(order.orderStatus)}
                      ${order.orderStatus === "delivered" ||
                          order.orderStatus === "cancelled"
                           ? "cursor-not-allowed opacity-100"
                          : "cursor-pointer"
                        }`}
                    >
                      {order.orderStatus === "delivered" ? (
                        <option value="delivered">Delivered</option>
                      ) : order.orderStatus === "cancelled" ? (
                        <option value="cancelled">Cancelled</option>
                      ) : (
                        <>
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </>
                      )}
                    </select>
                    {/* //////////////// */}
                  </td>

                  <td className="px-6 py-5">
                    {/* <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-600">
                      <Eye size={17} />
                    </button> */}
                    <button
                      onClick={() => { navigate(`/admin/orders/${order._id}`) }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition hover:bg-violet-100 hover:text-violet-600"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))
              )}


              {/* {adminOrders.map((order) => (
                <tr
                  key={order._id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5 text-xs font-normal">
                    {order.orderId}
                  </td>

                  <td className="px-6 py-5 text-gray-600">
                    {order.user?.name}
                  </td>

                  <td className="px-6 py-5 text-xs text-gray-600">
                    {order.orderItems?.map((item) => item.name).join(",")}
                  </td>

                  <td className="px-6 py-5 font-normal">
                    Rs {order.orderSummary?.totalAmount}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-600">
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))} */}

            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}