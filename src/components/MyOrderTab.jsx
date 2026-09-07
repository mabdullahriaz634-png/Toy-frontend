import React, { useContext, useRef, useState } from "react";
import { Search } from "lucide-react";
import { IoSearch } from "react-icons/io5";
import { OrderContext } from "../Context/orderContext";
import { Link, useParams } from "react-router-dom";
import { authAPI } from "../Api";
import { toast } from "react-toastify";


// const allOrders = [
//   { id: "#ORD-001", date: "2026-07-20", total: "$129.99", status: "Delivered", items: 3 },
//   { id: "#ORD-002", date: "2026-07-18", total: "$79.50", status: "Shipped", items: 1 },
//   { id: "#ORD-003", date: "2026-07-15", total: "$249.00", status: "Processing", items: 5 },
//   { id: "#ORD-004", date: "2026-07-10", total: "$59.99", status: "Delivered", items: 2 },
// ];

const statusStyles = {
  Delivered: "bg-green-100 text-green-700",
  Shipped: "bg-blue-100 text-blue-700",
  Processing: "bg-yellow-100 text-yellow-700",
};

const OrdersTab = () => {

  const { userOrders, setuserOrders, orders } = useContext(OrderContext);
  console.log("All Orders", userOrders);

  const [searchOrder, setSearchOrder] = useState("");
  console.log("Search Order Id", searchOrder);

  const [highlightOrder, setHighlightOrder] = useState("");
  console.log("HighlightedOrder State", highlightOrder);
  const timeoutRef = useRef(null)

  const handleSearch = async (value) => {
    console.log(value);
    if (value.trim() === '') {
      console.log("Loading all orders");
      orders()
      setHighlightOrder("");
    } else {
      // debouncing concept
      if (timeoutRef.current) {
        console.log('running');
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(async () => {
          try {
            const res = await authAPI.get(`/order/${value}`)
            console.log("Response = ", res.data.order);
            setuserOrders(res.data.order)

            if (res.data.order.length > 0) {
              setHighlightOrder(res.data.order[0]._id)
            } else {
              setHighlightOrder("");
            }
            console.log("Highlight should be:", res.data.order[0]?._id);

          } catch (error) {
            setHighlightOrder("");
            // setuserOrders([]);
            toast.error(error.response?.data?.message || "Something went wrong");
          }
          console.log("Searching...");
        }, 2000);
      }
      else {
        timeoutRef.current = setTimeout(async () => {

          try {
            const res = await authAPI.get(`/order/${value}`)
            console.log("Response = ", res.data.order);
            setuserOrders(res.data.order)
            if (res.data.order.length > 0) {
              setHighlightOrder(res.data.order[0]._id)
            } else {
              setHighlightOrder("");
            }
            console.log("Highlight should be:", res.data.order[0]?._id);

          } catch (error) {
            setHighlightOrder("");
            // setuserOrders([]);
            toast.error(error.response?.data?.message || "Something went wrong");
          }
          console.log("Searching...");
        }, 2000);
      }
    }

  }

  // const params = useParams()

  // <div className="space-y-4 border-2 border-black">
  //   <h2 className="text-xl font-bold text-gray-800">My Orders</h2>
  //   <div className="hidden rounded-t-lg bg-gray-100 p-4 sm:grid sm:grid-cols-5 sm:gap-4">
  //     <span className="text-sm font-semibold text-gray-600">Order ID</span>
  //     <span className="text-sm font-semibold text-gray-600">Date</span>
  //     <span className="text-sm font-semibold text-gray-600">Items</span>
  //     <span className="text-sm font-semibold text-gray-600">Total</span>
  //     <span className="text-sm font-semibold text-gray-600">Status</span>
  //   </div>
  //   <div className="space-y-3">

  //     {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-red-400 w-5 h-5" /> */}

  //     <IoSearch />
  //     <input
  //       type="text"
  //       placeholder="Search with Order ID..."
  //       className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
  //     />

  //     {allOrders.map((order) => (
  //       <div
  //         key={order.id}
  //         className="grid grid-cols-2 gap-x-4 gap-y-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-5 sm:gap-4"
  //       >
  //         <div className="col-span-2 sm:col-span-1">
  //           <span className="text-xs text-gray-500 sm:hidden">Order ID</span>
  //           <p className="font-medium text-gray-800">{order.id}</p>
  //         </div>
  //         <div className="sm:col-span-1">
  //           <span className="text-xs text-gray-500 sm:hidden">Date</span>
  //           <p className="text-sm text-gray-600">{order.date}</p>
  //         </div>
  //         <div className="sm:col-span-1">
  //           <span className="text-xs text-gray-500 sm:hidden">Items</span>
  //           <p className="text-sm text-gray-600">{order.items} items</p>
  //         </div>
  //         <div className="sm:col-span-1">
  //           <span className="text-xs text-gray-500 sm:hidden">Total</span>
  //           <p className="font-medium text-gray-800">{order.total}</p>
  //         </div>
  //         <div className="sm:col-span-1">
  //           <span className="text-xs text-gray-500 sm:hidden">Status</span>
  //           <span
  //             className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${statusStyles[order.status] || "bg-gray-100 text-gray-700"
  //               }`}
  //           >
  //             {order.status}
  //           </span>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // </div> 

  /////////////////////////

  //   <div className="space-y-6 rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-orange-100">
  //   {/* Header */}
  //   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
  //     <h2 className="text-xl sm:text-2xl font-black text-gray-800 flex items-center gap-2">
  //       <span className="text-2xl">📦</span> My Orders
  //     </h2>
  //     <span className="text-xs sm:text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full w-fit">
  //       {allOrders.length} Orders Placed
  //     </span>
  //   </div>

  //   {/* Search Bar Container */}
  //   <div className="relative w-full">
  //     <IoSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-500 text-lg pointer-events-none" />
  //     <input
  //       type="text"
  //       placeholder="Search with Order ID..."
  //       className="w-full pl-10 pr-4 py-3 bg-amber-50/40 border border-amber-200/60 rounded-xl text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all shadow-inner"
  //     />
  //   </div>

  //   {/* Table Header (Desktop Only) */}
  //   <div className="hidden rounded-xl bg-amber-500/10 p-3.5 sm:grid sm:grid-cols-5 sm:gap-4 font-bold text-xs uppercase tracking-wider text-amber-900">
  //     <span>Order ID</span>
  //     <span>Date</span>
  //     <span>Items</span>
  //     <span>Total</span>
  //     <span>Status</span>
  //   </div>

  //   {/* Orders List */}
  //   <div className="space-y-3">
  //     {allOrders.map((order) => (
  //       <div
  //         key={order.id}
  //         className="grid grid-cols-2 gap-y-3 gap-x-2 rounded-2xl border border-gray-100 bg-white p-4 sm:grid-cols-5 sm:gap-4 sm:items-center hover:border-amber-200 hover:shadow-md transition-all duration-200"
  //       >
  //         {/* Order ID */}
  //         <div className="col-span-2 sm:col-span-1 flex flex-col">
  //           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:hidden">
  //             Order ID
  //           </span>
  //           <p className="font-bold text-gray-900 text-sm sm:text-base">
  //             {order.id}
  //           </p>
  //         </div>

  //         {/* Date */}
  //         <div className="flex flex-col">
  //           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:hidden">
  //             Date
  //           </span>
  //           <p className="text-xs sm:text-sm font-medium text-gray-600">
  //             {order.date}
  //           </p>
  //         </div>

  //         {/* Items */}
  //         <div className="flex flex-col">
  //           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:hidden">
  //             Items
  //           </span>
  //           <p className="text-xs sm:text-sm font-medium text-gray-600">
  //             {order.items} {order.items === 1 ? "item" : "items"}
  //           </p>
  //         </div>

  //         {/* Total */}
  //         <div className="flex flex-col">
  //           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:hidden">
  //             Total
  //           </span>
  //           <p className="font-extrabold text-amber-600 text-sm sm:text-base">
  //             {order.total}
  //           </p>
  //         </div>

  //         {/* Status */}
  //         <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-start">
  //           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider sm:hidden">
  //             Status
  //           </span>
  //           <span
  //             className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold shadow-xs ${
  //               statusStyles[order.status] || "bg-gray-100 text-gray-700"
  //             }`}
  //           >
  //             {order.status}
  //           </span>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // </div>
  ////////////////////////////
  return (

    <div className="w-full max-w-full overflow-hidden space-y-4 border-2 border-black p-3 sm:p-4 rounded-xl bg-white">
      {/* <h2 className="text-xl font-bold text-gray-800">My Orders</h2> */}
      <h2 className="text-lg sm:text-xl font-black text-gray-800 flex items-center gap-2">
        <span className="text-xl">📦</span> My Orders
      </h2>
      {/* Table Header for Desktop */}
      <div className="hidden rounded-t-lg bg-gray-100 p-4 sm:grid sm:grid-cols-5 sm:gap-4">
        <span className="text-sm font-semibold text-gray-600">Order ID</span>
        <span className="text-sm font-semibold text-gray-600">Date</span>
        <span className="text-sm font-semibold text-gray-600">Items</span>
        <span className="text-sm font-semibold text-gray-600">Total</span>
        <span className="text-sm font-semibold text-gray-600">Status</span>
      </div>

      <div className="space-y-3">
        {/* Search Box with Search Icon */}
        {/* <div className="relative w-full border-2 border-black">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search with Order ID..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-sm"
          />
          <button>Enter</button>
        </div> */}
        <div className="w-full">
          <div className="flex flex-col sm:flex-row gap-3">

            {/* Search Input */}
            <div className="relative flex-1">
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />

              <input type="text"
                // value={}
                onChange={(e) => {
                  handleSearch(e.target.value)
                }}

                onKeyDown={(e) => { if (e.key === "Enter") { handleSearch() } }}

                placeholder="Search with Order ID..."
                className="w-full rounded-xl border border-gray-300 bg-white pl-11 pr-4 py-3 text-sm text-gray-700 placeholder-green-500 shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Search Button */}
            {/* <button onClick={handleSearch}
              className="w-full cursor-pointer sm:w-auto rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-700 active:scale-95"
            >
              Search
            </button> */}

          </div>
        </div>

        {/* Order Items List */}
        {userOrders.map((order) => {
          console.log("highlightOrder =", highlightOrder);
          console.log("order._id =", order._id);
          console.log("equal =", highlightOrder === order._id);

          return (
            <Link key={order._id}
              to={`/dashboard/order-detail/${order._id}`}>
              {/* className="flex flex-col gap-y-2 rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center" */}
              <div
                className={`flex flex-col gap-y-2 rounded-lg border p-3.5 shadow-sm
               sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center transition-all duration-300

              ${highlightOrder === order._id
                    ? "border-yellow-400 bg-yellow-100 ring-2 ring-yellow-400 animate-pulse"
                    : "border-gray-200 bg-white"
                  }`}
              >
                {/* Order ID */}
                <div className="flex justify-between items-center sm:block">
                  <span className="text-xs text-gray-500 sm:hidden">Order ID</span>
                  <p className="font-medium text-blue-600 text-sm truncate">{order.orderId}</p>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center sm:block">
                  <span className="text-xs text-gray-500 sm:hidden">Date</span>
                  <p className="text-sm text-[#9A519D]">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                {/* Items */}
                <div className="flex justify-between items-center sm:block">
                  <span className="text-xs text-gray-500 sm:hidden">Items</span>
                  <p className="text-sm text-blue-600">{order.orderItems?.length || 0} item</p>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center sm:block">
                  <span className="text-xs text-gray-500 sm:hidden">Total</span>
                  <p className="font-medium text-green-400 text-sm">{order.orderSummary?.totalAmount}</p>
                </div>

                {/* Status */}
                <div className="flex justify-between items-center sm:block">
                  <span className="text-xs text-gray-500 sm:hidden">Status</span>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs 
               font-medium ${statusStyles[order.orderStatus] || "bg-[#bb4949] text-white"
                      }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </Link>
          )
        }
        )}
      </div>
    </div>
  )

};

export default OrdersTab;