import React from "react";
import { Users, Eye } from "lucide-react";
import { ImBlocked } from "react-icons/im";
import { useState } from "react";
import { authAPI } from "../../Api";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";


export default function AdminCustomers() {
const {AdminCustomers, setAdminCustomers,getCustomers}=useOutletContext() 
  useEffect(() => {
    getCustomers();
  }, [])

  // const blockedCustomer = async (customerId) => {
  //   try {
  //     const res = await authAPI.patch(`/auth/admin,${customerId}`)
  //     console.log("Blocked customer", res.data);
  //     setCustomers((prevCustomers) =>
  //       prevCustomers.map((customer) =>
  //         customer._id === customerId
  //           ? { ...customer, isBlocked: true }
  //           : customer
  //       )
  //     );
  //     toast.success("Customer blocked successfully")

  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to get all Customers")
  //     console.log(error);
  //   }
  // }

  const toggleCustomerBlock = async (customerId, currentStatus) => {
    try {
      const newStatus = !currentStatus;

      const res = await authAPI.patch(
        `/auth/admin/${customerId}`,
        {
          isBlocked: newStatus,
        }
      );

      console.log("Customer status:", res.data);

      // UI instantly update
      setAdminCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer._id === customerId
            ? {
              ...customer,
              isBlocked: newStatus,
            }
            : customer
        )
      );

      toast.success(
        newStatus
          ? "Customer blocked successfully"
          : "Customer unblocked successfully"
      );

    } catch (error) {
      console.log("Toggle customer block error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update customer status"
      );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="mb-2 text-lg font-semibold text-violet-600">
          Management
        </p>

        <h1 className="text-3xl font-serif sm:text-4xl">
          Customers
        </h1>

        <p className="mt-2 text-violet-600">
          View and manage your store customers.
        </p>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px]">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-serif uppercase tracking-wider text-violet-600">
                  Customer
                </th>

                <th className="px-6 py-5 text-left text-xs font-serif uppercase tracking-wider text-violet-600">
                  Orders
                </th>

                <th className="px-6 py-5 text-left text-xs font-serif uppercase tracking-wider text-violet-600">
                  Total Spent
                </th>

                <th className="px-6 py-5 text-left text-xs font-serif uppercase tracking-wider text-violet-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {AdminCustomers.map((customer) => (
                <tr
                  key={customer._id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 font-bold text-violet-600">
                        {customer.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-normal text-green-400">
                          {customer.name}
                        </p>

                        <p className="mt-1 text-xs text-blue-400">
                          {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold text-red-500">
                    {customer.totalOrders}
                  </td>

                  <td className="px-6 py-5 font-normal text-emerald-400">
                    {customer.totalSpent?.toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    {/* <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600 hover:bg-violet-100 hover:text-violet-600">
                      <Eye size={17} />
                    </button> */}
                    {/* <button
                      onClick={() => { blockedCustomer(customer._id) }}
                      className="group flex w-[105px] items-center justify-center gap-2 cursor-pointer
                                       rounded-lg border border-red-200
                                bg-red-50 px-3 py-2  text-sm font-semibold text-red-600 shadow-sm 
                                transition-all duration-200 hover:-translate-y-0.5
                                 hover:border-red-300 hover:bg-red-100 hover:text-red-700 
                                  hover:shadow-md active:translate-y-0">
                      Block
                      <ImBlocked
                        size={14}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                    </button> */}
                    <button
                      onClick={() => toggleCustomerBlock(customer._id, customer.isBlocked)}
                      className={`group flex w-[115px] items-center justify-center gap-2 cursor-pointer
    rounded-lg px-3 py-2 text-sm font-semibold shadow-sm
    transition-all duration-200 hover:-translate-y-0.5
    active:translate-y-0
    ${customer.isBlocked
                          ? "border border-green-200 bg-green-50 text-green-600 hover:border-green-300 hover:bg-green-100 hover:text-green-700 hover:shadow-md"
                          : "border border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100 hover:text-red-700 hover:shadow-md"
                        }
  `}
                    >
                      {customer.isBlocked ? "Unblock" : "Block"}

                      <ImBlocked
                        size={14}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                    </button>

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}