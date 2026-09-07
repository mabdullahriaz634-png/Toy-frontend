import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { authAPI } from "../Api";
import { useEffect } from "react";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get("session_id")
    console.log(sessionId);

    const activeTab=searchParams.get("tab") || "orders";

    useEffect(() => {
        confirmPayment()
        async function confirmPayment() {
            try {
                const res = await authAPI.get('/order/confirm', { params: { session_id: sessionId } })
                console.log(res);
            } catch (error) {
                console.log(error);
                toast.error(error)
            }
        }
    }, [])

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex min-h-[90vh] items-center justify-center">
                <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-lg">
                    {/* Success Header */}
                    <div className="px-5 py-10 text-center sm:px-10 sm:py-12">
                        {/* Success Icon */}
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:h-24 sm:w-24">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 sm:h-16 sm:w-16">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-8 w-8 sm:h-9 sm:w-9"
                                >
                                    <path d="M20 6 9 17l-5-5" />
                                </svg>
                            </div>
                        </div>

                        {/* Heading */}
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl">
                            Payment Successful!
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
                            Thank you for your purchase. Your payment has been successfully
                            processed and your order is now being prepared.
                        </p>

                        {/* Success Message */}
                        <div className="mx-auto mt-7 max-w-md rounded-xl border border-green-100 bg-green-50 px-4 py-4 text-left">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-3 w-3"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Order Confirmed
                                    </h3>

                                    <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                                        Your order has been received successfully. You will
                                        receive updates about your order shortly.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link
                                to="/orders?tab=orders"
                                className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] sm:w-auto"
                            >
                                View My Orders
                            </Link>

                            <Link
                                to="/"
                                className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] sm:w-auto"
                            >
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Home */}
                        <Link
                            to="/"
                            className="mt-6 inline-flex items-center text-sm font-medium text-gray-500 transition hover:text-gray-900"
                        >
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-center">
                        <p className="text-xs text-gray-400">
                            A confirmation of your order will be available in your account.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
