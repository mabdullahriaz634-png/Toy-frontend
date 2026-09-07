// import { useEffect, useState } from "react";

// const messages = [
//   "🎁 Free Shipping on Orders Over Rs. 3,000",
//   "🧸 New Toys Collection Available Now",
//   "🔥 Up to 50% OFF on Selected Toys",
//   "🚚 Fast Delivery All Over Pakistan",
//   "🎉 Buy 2 Get 1 FREE on Selected Items",
// ];

// export default function AnnouncementSlider() {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % messages.length);
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 overflow-hidden">
//       <div className="max-w-7xl mx-auto h-12 flex items-center justify-center px-4">
//         <div className="relative w-full h-8 overflow-hidden">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out
//               ${
//                 index === current
//                   ? "translate-y-0 opacity-100"
//                   : index < current
//                   ? "-translate-y-full opacity-0"
//                   : "translate-y-full opacity-0"
//               }`}
//             >
//               <p className="text-white font-semibold text-center text-sm sm:text-base md:text-lg tracking-wide">
//                 {msg}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// } 


/////////////////

const announcements = [
  "🎁 Free Shipping on Orders Over Rs. 3,000",
  "🧸 New Arrivals Added Every Week",
  "🔥 Up to 50% OFF on Selected Toys",
  "🚚 Fast Delivery Across Pakistan",
  "🎉 Buy 2 Get 1 FREE",
  "💳 Cash on Delivery Available",
  "⭐ Trusted by Thousands of Happy Customers",
];

export default function AnnouncementBar() {
  return (
    <div className=" bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 text-white overflow-hidden border-y border-white/20">
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...announcements, ...announcements].map((item, index) => (
            <span
              key={index}
              className="mx-8 flex items-center text-sm sm:text-base md:text-lg font-semibold py-3 tracking-wide"
            >
              {item}
              <span className="ml-8 text-white/60">●</span>
            </span>
          ))}
        </div>

        <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap group-hover:[animation-play-state:paused]">
          {[...announcements, ...announcements].map((item, index) => (
            <span
              key={index}
              className="mx-8 flex items-center text-sm sm:text-base md:text-lg font-semibold py-3 tracking-wide"
            >
              {item}
              <span className="ml-8 text-white/60">●</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}