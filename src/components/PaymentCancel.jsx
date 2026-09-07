import React from "react";
import { Link } from "react-router-dom";
import { XCircle,ArrowLeft, CreditCard,ShoppingBag,} from "lucide-react";

export default function PaymentCancel() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[90vh] max-w-2xl items-center justify-center">
        <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">
          
          {/* Top Section */}
          <div className="px-5 py-10 text-center sm:px-10 sm:py-12">
            
            {/* Cancel Icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 sm:h-24 sm:w-24">
              <XCircle
                className="h-12 w-12 text-red-500 sm:h-14 sm:w-14"
                strokeWidth={1.8}
              />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Payment Cancelled
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
              Your payment was cancelled and no amount has been charged.
              You can return to checkout and try again whenever you're ready.
            </p>

            {/* Info Box */}
            <div className="mx-auto mt-8 max-w-md rounded-xl border border-red-100 bg-red-50 p-4 text-left">
              <div className="flex items-start gap-3">
                <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    Payment not completed
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
                    Your order has not been completed because the payment
                    process was cancelled.
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/checkout"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98] sm:w-auto"
              >
                <CreditCard className="h-4 w-4" />
                Try Payment Again
              </Link>

              <Link
                to="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 active:scale-[0.98] sm:w-auto"
              >
                <ShoppingBag className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Back Link */}
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-center">
            <p className="text-xs text-gray-400">
              If you believe this was a mistake, you can try the payment again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}