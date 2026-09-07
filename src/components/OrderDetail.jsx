import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../Context/orderContext';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../Api';


export default function OrderDetailPage({ order }) {
  const { userOrder, setuserOrder, getOrder } = useContext(OrderContext)
  console.log("Order Detail", userOrder);
  const params = useParams()
  console.log("order params", params);

  useEffect(() => {
    getOrder(params.id)
  }, [])

if (!userOrder || !userOrder.orderSummary) {
    return (
      <div className="flex justify-center items-center h-96">
        Loading...
      </div>
    );
  }
  
  const currentOrder = userOrder;


 

  const formatRs = (amount) => `Rs. ${amount.toLocaleString('en-PK')}`;
  
  // gpt Suggestion
  // const formatRs = (amount = 0) => {
  //   return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
  // };

  // Status Badge Color Mapper
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      processing: "bg-indigo-50 text-indigo-700 border-indigo-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return statusStyles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-slate-900/5 py-8 px-4 sm:px-6 lg:px-8 font-sans text-slate-800 antialiased">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Header / Status Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                Order ID
              </span>
              <span className="text-sm font-semibold text-slate-400">
                {new Date(currentOrder?.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-500 mt-2 tracking-tight">
              {currentOrder.orderId}
            </h1>
          </div>
          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className={`px-4 py-2 rounded-2xl text-sm font-bold uppercase tracking-wide border ${getStatusBadge(currentOrder.orderStatus)}`}>
              ● {currentOrder.orderStatus}
            </span>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left 2 Columns: Items & Instructions */}
          <div className="lg:col-span-2 space-y-6">

            {/* Ordered Items Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center justify-between">
                <span className='text-green-800'>Items Ordered</span>
                <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                  {currentOrder.orderItems?.length || 0} Products
                </span>
              </h2>

              <div className="divide-y divide-slate-100">
                {currentOrder.orderItems?.map((item, index) => (
                  <div key={index} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl shrink-0 border border-slate-200 overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 text-base sm:text-lg">{item.name}</h3>
                        <p className="text-sm font-medium text-blue-500 mt-0.5">
                          {formatRs(item.price)} <span className="text-red-500 mx-1">×</span> <span className="text-blue-500">{item.qty}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right font-extrabold text-slate-900 text-lg">
                      {formatRs(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions (If Any) */}
            {currentOrder.instructions && (
              <div className="bg-amber-50/60 rounded-3xl p-6 border border-amber-200/60">
                <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-1">Delivery Instructions</h3>
                <p className="text-amber-800 text-sm leading-relaxed">{currentOrder.instructions}</p>
              </div>
            )}

          </div>

          {/* Right Column: Sidebar Info & Summary */}
          <div className="space-y-6">

            {/* Order Summary Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatRs(currentOrder?.orderSummary?.subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping Cost ({currentOrder.shippingMethod?.name})</span>
                  <span className="font-semibold text-slate-900">{formatRs(currentOrder?.orderSummary?.shippingCost)}</span>
                </div>

                {currentOrder.orderSummary.tax > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Tax</span>
                    <span className="font-semibold text-slate-900">{formatRs(currentOrder?.orderSummary?.tax)}</span>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-slate-900">Total Amount</span>
                  <span className="text-xl font-black text-indigo-600">{formatRs(currentOrder?.orderSummary?.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Payment & Shipping Method */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4 text-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Payment & Logistics</h2>

              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Payment Type</span>
                <span className="font-semibold text-slate-900 capitalize">{currentOrder?.paymentMethod?.replace(/_/g, ' ')}</span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-500">Payment Status</span>
                <span className={`font-semibold px-2.5 py-1 rounded-full text-xs ${currentOrder.isPaid ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {currentOrder.isPaid ? 'Paid' : 'Unpaid'}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-slate-500">Estimated Delivery</span>
                <span className="font-semibold text-slate-900">{currentOrder.shippingMethod?.estimatedDays}</span>
              </div>
            </div>

            {/* Shipping Address Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-3 text-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-3">Shipping Info</h2>

              <div>
                <p className="font-bold text-slate-900 text-base">{currentOrder.shippingInfo?.fullName}</p>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  {currentOrder.shippingInfo?.address}, {currentOrder.shippingInfo?.city}, {currentOrder.shippingInfo?.country}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-slate-600">
                <p><span className="text-slate-400 font-medium">Phone:</span> {currentOrder.shippingInfo?.phone}</p>
                <p><span className="text-slate-400 font-medium">Email:</span> {currentOrder.shippingInfo?.email}</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}