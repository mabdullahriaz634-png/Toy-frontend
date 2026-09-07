import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  User,
  Package,
  CreditCard,
  Truck,
  CalendarDays,
  ShoppingBag,
} from "lucide-react";
import { toast } from "react-toastify";
import { authAPI } from "../../Api";

export default function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= GET ORDER =================
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        setLoading(true);

        const res = await authAPI.get(`/order/admin/${id}`);

        console.log("Order Detail:", res.data);

        setOrder(res.data.order || res.data);
      } catch (error) {
        console.log("ORDER DETAIL ERROR:", error);

        toast.error(
          error.response?.data?.message ||
          "Failed to get order details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) getOrderDetail();
  }, [id]);

  // ================= HELPERS =================
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-PK");
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusClass = {
    delivered: "bg-green-100 text-green-700 border-green-200",
    processing: "bg-blue-100 text-blue-700 border-blue-200",
    shipped: "bg-purple-100 text-purple-700 border-purple-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    confirmed: "bg-cyan-100 text-cyan-700 border-cyan-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="w-full flex min-h-[60vh] items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />
          <p className="mt-4 text-sm text-gray-500">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  // ================= NOT FOUND =================
  if (!order) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-gray-50 px-4 text-center">
        <Package size={50} className="text-gray-300" />

        <h2 className="mt-4 text-xl font-bold text-gray-700">
          Order Not Found
        </h2>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="box-border w-full max-w-full overflow-x-hidden bg-gray-50 p-3 sm:p-4 md:p-5 lg:p-6">
      <div className="mx-auto w-full max-w-7xl">

        {/* ================= BACK ================= */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-gray-600 hover:bg-white"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        {/* ================= HEADER ================= */}
        <div className="mb-5 w-full rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="min-w-0">
              <p className="text-xs font-semibold text-violet-600">
                ORDER DETAILS
              </p>

              <h1 className="mt-1 break-all text-xl font-bold text-gray-800 sm:text-2xl">
                #{order.orderId}
              </h1>

              <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500 sm:text-sm">
                <span className="flex items-center gap-1">
                  <CalendarDays size={15} />
                  {formatDate(order.createdAt)}
                </span>

                <span className="flex items-center gap-1">
                  <ShoppingBag size={15} />
                  {order.orderItems?.length || 0} Items
                </span>
              </div>
            </div>

            <span
              className={`w-fit rounded-full border px-4 py-2 text-xs font-bold capitalize ${statusClass[order.orderStatus?.toLowerCase()] ||
                "bg-gray-100 text-gray-700"
                }`}
            >
              {order.orderStatus || "Unknown"}
            </span>

          </div>
        </div>

        {/* ================= MAIN ================= */}
        <div className="grid w-full grid-cols-1 gap-5 xl:grid-cols-3">

          {/* ================= LEFT ================= */}
          <div className="w-full min-w-0 space-y-5 xl:col-span-2">

            {/* <div className="border-2">
              s
            </div> */}
            {/* ORDER ITEMS */}
            <div className=" rounded-2xl border bg-white shadow-sm">

              <div className="border-b p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                    <Package size={20} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-gray-800">
                      Order Items
                    </h2>

                    <p className="text-xs text-gray-400">
                      Products included in this order
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full divide-y">

                {order.orderItems?.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex w-full flex-col gap-4 p-4 sm:p-5 md:flex-row"
                  >

                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="break-words text-sm font-semibold text-gray-800 sm:text-base">
                        {item.name}
                      </h3>

                      <p className="mt-1 break-all text-[11px] text-gray-400">
                        Product ID: {item.productId}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs text-gray-600">
                          Qty: {item.qty}
                        </span>

                        <span className="rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-600">
                          Rs {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>

                    <div className="w-full border-t pt-3 md:w-auto md:border-0 md:pt-0 md:text-right">
                      <p className="text-xs text-gray-400">
                        Item Total
                      </p>

                      <p className="font-bold text-gray-800">
                        Rs{" "}
                        {formatPrice(
                          Number(item.price || 0) *
                          Number(item.qty || 0)
                        )}
                      </p>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* CUSTOMER */}
            <div className="w-full rounded-2xl border bg-white p-4 shadow-sm sm:p-5">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <User size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">
                    Customer Information
                  </h2>
                  <p className="text-xs text-gray-400">
                    Customer details
                  </p>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">

                <InfoBox
                  icon={<User size={16} />}
                  title="Full Name"
                  value={
                    order.shippingInfo?.fullName ||
                    order.user?.name ||
                    "-"
                  }
                />

                <InfoBox
                  icon={<Mail size={16} />}
                  title="Email"
                  value={
                    order.shippingInfo?.email ||
                    order.user?.email ||
                    "-"
                  }
                />

                <InfoBox
                  icon={<Phone size={16} />}
                  title="Phone"
                  value={order.shippingInfo?.phone || "-"}
                />

                <InfoBox
                  icon={<MapPin size={16} />}
                  title="Address"
                  value={order.shippingInfo?.address || "-"}
                />

              </div>
            </div>

            {/* SHIPPING */}
            <div className="w-full rounded-2xl border bg-white p-4 shadow-sm sm:p-5">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Truck size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">
                    Shipping Information
                  </h2>
                  <p className="text-xs text-gray-400">
                    Delivery details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                <InfoBox
                  title="Shipping Method"
                  value={order.shippingMethod?.name || "-"}
                />

                <InfoBox
                  title="Estimated Delivery"
                  value={
                    order.shippingMethod?.estimatedDays || "-"
                  }
                />

                <InfoBox
                  title="Shipping Cost"
                  value={`Rs ${formatPrice(
                    order.shippingMethod?.price
                  )}`}
                />

              </div>

              <div className="mt-3 rounded-xl bg-gray-50 p-4">
                <div className="flex items-start gap-2">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-violet-600"
                  />

                  <p className="min-w-0 break-words text-sm font-semibold text-gray-700">
                    {order.shippingInfo?.address || "-"}
                    {order.shippingInfo?.city &&
                      `, ${order.shippingInfo.city}`}
                    {order.shippingInfo?.country &&
                      `, ${order.shippingInfo.country}`}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="w-full min-w-0 space-y-5">

            {/* SUMMARY */}
            <div className="w-full rounded-2xl border bg-white p-4 shadow-sm sm:p-5">

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                  <CreditCard size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-800">
                    Order Summary
                  </h2>
                  <p className="text-xs text-gray-400">
                    Payment breakdown
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">

                <SummaryRow
                  title="Subtotal"
                  value={`Rs ${formatPrice(
                    order.orderSummary?.subtotal
                  )}`}
                />

                <SummaryRow
                  title="Shipping"
                  value={`Rs ${formatPrice(
                    order.orderSummary?.shippingCost
                  )}`}
                />

                <SummaryRow
                  title="Tax"
                  value={`Rs ${formatPrice(
                    order.orderSummary?.tax
                  )}`}
                />

                <div className="border-t pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-gray-700">
                      Total Amount
                    </span>

                    <span className="text-lg font-bold text-violet-600">
                      Rs{" "}
                      {formatPrice(
                        order.orderSummary?.totalAmount
                      )}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* PAYMENT */}
            <div className="w-full rounded-2xl border bg-white p-4 shadow-sm sm:p-5">

              <h2 className="mb-5 font-semibold text-gray-800">
                Payment Details
              </h2>

              <p className="text-xs text-gray-400">
                Payment Method
              </p>

              <p className="mt-1 break-words font-semibold capitalize text-gray-700">
                {order.paymentMethod?.replaceAll("_", " ") || "-"}
              </p>

              <p className="mt-4 text-xs text-gray-400">
                Payment Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${order.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {order.isPaid ? "Paid" : "Cash on Delivery"}
              </span>

            </div>

            {/* ORDER INFO */}
            <div className="w-full rounded-2xl border bg-white p-4 shadow-sm sm:p-5">

              <h2 className="mb-5 font-semibold text-gray-800">
                Order Information
              </h2>

              <div className="space-y-4 text-sm">

                <InfoRow
                  title="Order ID"
                  value={order.orderId}
                />

                <InfoRow
                  title="Created"
                  value={formatDate(order.createdAt)}
                />

                <InfoRow
                  title="Last Updated"
                  value={formatDate(order.updatedAt)}
                />

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

// ================= SMALL COMPONENTS =================

function InfoBox({ icon, title, value }) {
  return (
    <div className="min-w-0 rounded-xl bg-gray-50 p-4">
      <div className="mb-2 flex items-center gap-2 text-gray-400">
        {icon}
        <span className="text-xs font-medium">
          {title}
        </span>
      </div>

      <p className="break-words font-semibold text-gray-700">
        {value}
      </p>
    </div>
  );
}

function SummaryRow({ title, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-gray-500">{title}</span>

      <span className="shrink-0 font-medium text-gray-700">
        {value}
      </span>
    </div>
  );
}

function InfoRow({ title, value }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="text-gray-400">{title}</span>

      <span className="break-all font-medium text-gray-700 sm:text-right">
        {value}
      </span>
    </div>
  );
}



