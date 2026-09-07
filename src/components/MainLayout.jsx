import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import CartSidebar from './CartSideBar'
import Footer from './Footer'

export default function MainLayout() {
    return (
        <div>
            <Navbar />
            <CartSidebar/>
            <Outlet />
            <Footer/>
        </div>
    )
}


// import React from 'react';

// const Footer = () => {
//   return (
//     <footer className="bg-slate-900 text-slate-300 font-sans">
//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
//           {/* Brand Section */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center space-x-2 text-white font-bold text-2xl mb-4">
//               <span className="text-yellow-400">🧸</span>
//               <span className="tracking-wide">Toys<span className="text-yellow-400">Box</span></span>
//             </div>
//             <p className="text-sm text-slate-400 max-w-sm mb-6">
//               Aapke bachon ki khushiyon ka thikana! Humaray paas har qisam ke high-quality, safe aur mazedaar khonay munasib keemat par dastiyab hain.
//             </p>
//             {/* Social Media Links */}
//             <div className="flex space-x-4">
//               <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-yellow-400 hover:text-slate-900 transition-colors duration-300">
//                 <i className="fab fa-facebook-f"></i>
//               </a>
//               <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-yellow-400 hover:text-slate-900 transition-colors duration-300">
//                 <i className="fab fa-instagram"></i>
//               </a>
//               <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-yellow-400 hover:text-slate-900 transition-colors duration-300">
//                 <i className="fab fa-twitter"></i>
//               </a>
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-white font-semibold tracking-wider uppercase text-sm mb-4 border-b border-slate-800 pb-2">
//               Categories
//             </h3>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Remote Control Cars</a></li>
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Action Figures</a></li>
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Educational Toys</a></li>
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Dolls & Girls Toys</a></li>
//             </ul>
//           </div>

//           {/* Customer Support */}
//           <div>
//             <h3 className="text-white font-semibold tracking-wider uppercase text-sm mb-4 border-b border-slate-800 pb-2">
//               Support
//             </h3>
//             <ul className="space-y-2 text-sm">
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Contact Us</a></li>
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Shipping & Delivery</a></li>
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">Return Policy</a></li>
//               <li><a href="#" className="hover:text-yellow-400 transition-colors">FAQs</a></li>
//             </ul>
//           </div>

//           {/* Contact Info & Newsletter */}
//           <div>
//             <h3 className="text-white font-semibold tracking-wider uppercase text-sm mb-4 border-b border-slate-800 pb-2">
//               Contact
//             </h3>
//             <ul className="space-y-2 text-sm text-slate-400 mb-4">
//               <li className="flex items-center space-x-2">
//                 <span>📍</span> <span>Lahore, Punjab, Pakistan</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <span>📞</span> <span>+92 300 1234567</span>
//               </li>
//               <li className="flex items-center space-x-2">
//                 <span>✉️</span> <span>support@toysbox.com</span>
//               </li>
//             </ul>
//           </div>

//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="bg-slate-950 text-slate-500 py-6 text-center text-xs border-t border-slate-800/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <p>&copy; {new Date().getFullYear()} Toys Box. All rights reserved.</p>
//           <div className="flex space-x-4">
//             <a href="#" className="hover:text-slate-300">Privacy Policy</a>
//             <a href="#" className="hover:text-slate-300">Terms of Service</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
