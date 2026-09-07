import { useState } from "react";

export default function ShippingSection({shippingInfo,setShippingInfo,} ) {
    // console.log("Shipping Methods",shippingInfo);
    
    // Example Data
    const subtotal = 4500;

    // Customer Address (Example)
    const address = {
        city: "Lahore",
    };

    const shippingOptions = [
        {
            id: "standard",
            title: "Standard Delivery",
            days: "3-5 Working Days",
            description: "Best Value",
            price: 199,
            icon: "🚚",
        },
        {
            id: "express",
            title: "Express Delivery",
            days: "1-2 Working Days",
            description: "Fast Delivery",
            price: 299,
            icon: "⚡",
        },
        {
            id: "sameDay",
            title: "Same Day Delivery",
            days: "Today",
            description: "Only Lahore",
            price: 499,
            icon: "🚀",
        },
    ];

    const allowedCities = [
        "Lahore",
    ];

    const availableShipping = shippingOptions.filter((item) => {
        if (item.id === "sameDay") {
            return allowedCities.includes(address.city);
        }
        return true;
    });

    // const [shippingInfo, setShippingInfo] = useState("standard");

    const shippingPrice =
        availableShipping.find(
            (item) => item.id === shippingInfo
        )?.price || 0;

    const total = subtotal + shippingPrice;

    return (
        <div className="w-full border-2 border-black">

            <div className="rounded-xl border border-gray-200 bg-gray-50">

                {/* Header */}

                <div className="border-b p-6">
                    <h2 className="text-2xl font-bold">
                        Choose Delivery Method
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Select your preferred shipping option.
                    </p>
                </div>

                {/* Shipping Options */}

                <div className="p-6 space-y-4">

                    {availableShipping.map((item) => (

                        <label
                            key={item.id}
                            className={`flex flex-col md:flex-row md:items-center md:justify-between gap-5 border rounded-xl p-5 cursor-pointer transition-all

                             ${shippingInfo === item.id
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 hover:border-blue-300"
                                }`}
                        >

                            <div className="flex gap-4">

                                <input
                                    type="radio"
                                    checked={setShippingInfo === item.id}
                                    onChange={() =>
                                        setShippingInfo({...shippingInfo, shippingMethod: item.id})
                                    }
                                />

                                <div>

                                    <h3 className="font-bold text-lg">
                                        {item.icon} {item.title}
                                    </h3>

                                    <p className="text-gray-500">
                                        {item.days}
                                    </p>

                                    <span className="text-green-600 text-sm">
                                        {item.description}
                                    </span>

                                </div>

                            </div>

                            <div className="text-xl font-bold text-blue-600">
                                Rs. {item.price}
                            </div>

                        </label>

                    ))}

                </div>

                {/* Order Summary */}

                {/* <div className="border-t bg-gray-50 rounded-b-2xl p-6">

          <h3 className="text-xl font-bold mb-5">
            Order Summary
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>
                Rs. {subtotal}
              </span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span>
                Rs. {shippingPrice}
              </span>

            </div>

            <hr />

            <div className="flex justify-between text-2xl font-bold">

              <span>Total</span>

              <span className="text-green-600">
                Rs. {total}
              </span>

            </div>

          </div>

          <button
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition"
          >
            Continue to Payment
          </button>

        </div> */}

            </div>

        </div>
    );
}