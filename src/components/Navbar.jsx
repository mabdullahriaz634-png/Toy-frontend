import { useContext, useState, useRef, useEffect, } from "react";
import { FaHeartCircleCheck } from "react-icons/fa6";
import logo from "../assets/logo.png";
import logo2 from "../assets/newlogo.png";
import {
    ShoppingBag, ShoppingCart, Menu, X, User, LogOut, ChevronDown, Package, Heart, Settings, UserKey,
} from "lucide-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import UserLogOut from "./Logout";

import { CartContext } from "../Context/cartContext";
import AnnouncementSlider from "./NavbarSlider";
import AnnouncementBar from "./NavbarSlider";
import ToyBoxSlider from "./ImageSlider";
import NavbarSearch from '../components/Search';


const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Deals", href: "/deals" },
    { label: "About", href: "/about" },
];

export default function Navbar({
    isLoggedIn = false,
    user = { name: "John Doe", email: "john@example.com" },
    cartCount = 0,
    onLogin,
    onSignup,
    onLogout,
    onProfile,
    onOrders,
    onWishlist,
    onSettings,
    onCart,
}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const dropdownRef = useRef(null);

    const { isCartOpen, setIsCartOpen, userCart } = useContext(CartContext)

    const { currentUser } = useContext(AuthContext)
    // console.log("navbar current User", currentUser);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const firstName = user?.name?.split(" ")[0] ?? "User";

    const handleLogout = () => {
        setDropdownOpen(false);
        setMobileOpen(false);
        onLogout?.();
    };

    return (
        <>
            {/* <AnnouncementSlider/> */}
            <AnnouncementBar />
            <nav className="bg-[#d4d1d1] border-2 px-6 pt-2 
               border-black sticky top-0 z-50 shadow-sm w-[95%] rounded-full m-auto relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* ── Logo ── */}
                        <a href="/" className="flex items-center gap-2 shrink-0">
                            {/* <div className="h-[55px] w-[55px] md:h-[60px] md:w-[80px] border-2 rounded-md overflow-hidden">
                            <img src={logo2} className="w-full h-full object-contain rounded-md " />
                        </div> */}

                            {/* <div className=" flex items-center justify-center
                                             h-14 w-24 sm:w-28 md:w-32 lg:w-36  overflow-hidden ">
                                <img src={logo2} alt="logo" 
                                    className="h-full w-full object-contain"
                                />
                            </div> */}

                            <Link to="/" className="flex items-center">
                                <img
                                    src={logo2}
                                    alt="Toy Box"
                                    className=" h-16 sm:h-20 md:h-24 w-auto object-contain " />
                            </Link>

                            {/* <span className="text-xl font-bold text-yellow-300 tracking-tight sm:text-xl md:text-2xl ">
                                Toys<span className="text-blue-600"> Box</span>
                            </span> */}
                        </a>

                        {/* ── Desktop Nav Links ── */}
                        {/* <div className="hidden md:flex items-center gap-1">
                            {NAV_LINKS.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150"
                                >
                                    {label}
                                </a>
                            ))}
                        </div> */}

                        {/* <input
          type="text"
          placeholder="Search products"
          value={filters.keyword}
          onChange={(e) => setFilters({ ...filters, keyword: e.target.value, page: 1 })}
        /> */}

                        {/* ── Right Side ── */}
                        <div className="flex items-center gap-2">
                             <NavbarSearch />

                            {/* Cart Icon */}
                            <button onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                aria-label="Shopping cart"
                            >
                                <span className="absolute -top-2.5 left-5 text-blue-500 font-semibold bg-[yellow] rounded-full rounded-full px-2 py-1">
                                    {userCart?.cartItems?.length ? (<span> {userCart.cartItems.length} </span>) : (<span>0</span >)}
                                    {/* {userCart?.cartItems?.length ? (<span>{userCart.cartItems.length}</span>) : ( <span>0</span> )} */}
                                </span>
                                <ShoppingCart className="w-5 h-5" />
                                {/* {cartCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )
                            } */}
                            </button>

                            {/* ── Auth: Logged Out ── */}
                            {!isLoggedIn ? (
                                <div className="hidden md:flex items-center gap-2">

                                    {currentUser ? <button>
                                        {/* {currentUser.name} */}
                                        <UserLogOut />
                                    </button> : <Link to={'/login'}>
                                        <button
                                            onClick={onLogin}
                                            className="text-gray-700 cursor-pointer hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                            {/* Log in */}
                                            <UserKey />
                                        </button>
                                    </Link>}

                                    {/* <Link to={'/signup'}> */}
                                    
                                    {/* <button onClick={onSignup}
                                        className="bg-indigo-600 cursor-pointer hover:bg-indigo-700
                                         active:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm 
                                         font-semibold transition-colors shadow-sm"> */}
                                        {/* Sign up */}
                                        {/* <FaHeartCircleCheck />
                                    </button> */}

                                    {/* </Link> */}
                                </div>
                            ) : (
                                /* ── Auth: Logged In — User Dropdown ── */
                                <div className="relative hidden md:block" ref={dropdownRef}>
                                    <button
                                        onClick={() => setDropdownOpen((v) => !v)}
                                        className="flex items-center gap-2 py-1.5 pl-1.5 pr-3 rounded-xl border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                                        aria-haspopup="true"
                                        aria-expanded={dropdownOpen}
                                    >
                                        <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">{firstName}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {/* Dropdown Panel */}
                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                                            {/* User Info */}
                                            <div className="px-4 py-3 border-b border-gray-100 mb-1">
                                                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                            </div>

                                            <DropdownItem icon={User} label="Profile" onClick={() => { setDropdownOpen(false); onProfile?.(); }} />
                                            <DropdownItem icon={Package} label="My Orders" onClick={() => { setDropdownOpen(false); onOrders?.(); }} />
                                            <DropdownItem icon={Heart} label="Wishlist" onClick={() => { setDropdownOpen(false); onWishlist?.(); }} />
                                            <DropdownItem icon={Settings} label="Settings" onClick={() => { setDropdownOpen(false); onSettings?.(); }} />

                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <DropdownItem
                                                    icon={LogOut}
                                                    label="Log out"
                                                    onClick={handleLogout}
                                                    danger
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── Mobile Hamburger ── */}
                            <button
                                className="md:hidden p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </div >

                {/* ── Mobile Menu ── */}
                {
                    mobileOpen && (
                        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 absolute top-[60px] right-2">
                            {/* Nav Links */}
                            <div className="space-y-0.5 mb-3">
                                {NAV_LINKS.map(({ label, href }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        className="block text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-3 space-y-0.5">
                                const { currentUser } = useContext(AuthContext);

<div className="border-t border-gray-100 pt-3 space-y-0.5">
    {currentUser ? (
        <>
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-2.5 mb-1">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-white" />
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {currentUser.name}
                    </p>

                    <p className="text-xs text-gray-500 truncate">
                        {currentUser.email}
                    </p>
                </div>
            </div>

            <MobileItem
                icon={User}
                label="Profile"
                onClick={() => {
                    setMobileOpen(false);
                    onProfile?.();
                }}
            />

            <MobileItem
                icon={Package}
                label="My Orders"
                onClick={() => {
                    setMobileOpen(false);
                    onOrders?.();
                }}
            />

            <MobileItem
                icon={Heart}
                label="Wishlist"
                onClick={() => {
                    setMobileOpen(false);
                    onWishlist?.();
                }}
            />

            <MobileItem
                icon={Settings}
                label="Settings"
                onClick={() => {
                    setMobileOpen(false);
                    onSettings?.();
                }}
            />

            <div className="border-t border-gray-100 mt-1 pt-1">
                <MobileItem
                    icon={LogOut}
                    label="Log out"
                    onClick={handleLogout}
                    danger
                />
            </div>
        </>
    ) : (
        <>
            <Link to="/login">
                <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                >
                    Log in
                </button>
            </Link>

            <Link to="/signup">
                <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full text-left bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all"
                >
                    Sign up
                </button>
            </Link>
        </>
    )}
</div>
                            </div>
                        </div>
                    )
                }
            </nav >
            {/* <ToyBoxSlider /> */}
        </>

    );
}

/* ── Helper sub-components ── */

function DropdownItem({ icon: Icon, label, onClick, danger = false }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${danger
                ? "text-red-600 hover:bg-red-50"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
        >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
        </button>
    );
}

function MobileItem({ icon: Icon, label, onClick, danger = false }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${danger
                ? "text-red-600 hover:bg-red-50"
                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
        >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
        </button>
    );
}

// GPT Responsive code 


// import { useContext, useState, useRef, useEffect } from "react";
// import {
//     ShoppingCart,
//     Menu,
//     X,
//     User,
//     LogOut,
//     ChevronDown,
//     Package,
//     Heart,
//     Settings,
//     UserKey,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// import logo2 from "../assets/newlogo.png";
// import { AuthContext } from "../Context/authContext";
// import { CartContext } from "../Context/cartContext";
// import UserLogOut from "./Logout";
// import AnnouncementBar from "./NavbarSlider";

// const NAV_LINKS = [
//     { label: "Home", href: "/" },
//     { label: "Products", href: "/products" },
//     { label: "Deals", href: "/deals" },
//     { label: "About", href: "/about" },
// ];

// export default function Navbar({
//     isLoggedIn = false,
//     user = { name: "John Doe", email: "john@example.com" },
//     cartCount = 0,
//     onLogin,
//     onSignup,
//     onLogout,
//     onProfile,
//     onOrders,
//     onWishlist,
//     onSettings,
//     onCart,
// }) {
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [mobileOpen, setMobileOpen] = useState(false);

//     const dropdownRef = useRef(null);

//     const { setIsCartOpen, userCart } = useContext(CartContext);
//     const { currentUser } = useContext(AuthContext);

//     const loggedIn = Boolean(currentUser) || isLoggedIn;

//     const currentUserData = currentUser || user;

//     const firstName =
//         currentUserData?.name?.split(" ")[0] || "User";

//     const profileImage =
//         currentUserData?.avatar ||
//         currentUserData?.image ||
//         currentUserData?.profileImage ||
//         null;

//     // Close desktop dropdown when clicking outside
//     useEffect(() => {
//         const handler = (e) => {
//             if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(e.target)
//             ) {
//                 setDropdownOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handler);

//         return () => {
//             document.removeEventListener("mousedown", handler);
//         };
//     }, []);

//     // Close mobile menu when screen becomes desktop
//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768) {
//                 setMobileOpen(false);
//             }
//         };

//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     const handleLogout = () => {
//         setDropdownOpen(false);
//         setMobileOpen(false);
//         onLogout?.();
//     };

//     const closeMobileMenu = () => {
//         setMobileOpen(false);
//     };

//     return (
//         <>
//             <AnnouncementBar />

//             {/* 
//                 IMPORTANT:
//                 Wrapper is sticky.
//                 Navbar itself remains pill-shaped.
//                 Mobile menu is OUTSIDE navbar,
//                 so rounded-full does not affect it.
//             */}
//             <div className="sticky top-0 z-50 w-full">
                
//                 {/* ================= NAVBAR ================= */}
//                 <nav
//                     className="
//                         mx-auto
//                         mt-1
//                         w-[95%]
//                         border-2
//                         border-black
//                         bg-[#d4d1d1]
//                         shadow-sm
//                         rounded-full
//                     "
//                 >
//                     <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        
//                         <div className="flex h-16 items-center justify-between">
                            
//                             {/* ================= LOGO ================= */}
//                             <Link
//                                 to="/"
//                                 className="flex shrink-0 items-center"
//                             >
//                                 <img
//                                     src={logo2}
//                                     alt="Toy Box"
//                                     className="
//                                         h-14
//                                         w-auto
//                                         object-contain
//                                         sm:h-16
//                                         md:h-20
//                                     "
//                                 />
//                             </Link>

//                             {/* ================= DESKTOP LINKS ================= */}
//                             <div className="hidden items-center gap-1 md:flex">
//                                 {NAV_LINKS.map(({ label, href }) => (
//                                     <Link
//                                         key={label}
//                                         to={href}
//                                         className="
//                                             rounded-lg
//                                             px-4
//                                             py-2
//                                             text-sm
//                                             font-medium
//                                             text-gray-600
//                                             transition-all
//                                             duration-200
//                                             hover:bg-indigo-50
//                                             hover:text-indigo-600
//                                         "
//                                     >
//                                         {label}
//                                     </Link>
//                                 ))}
//                             </div>

//                             {/* ================= RIGHT SIDE ================= */}
//                             <div className="flex items-center gap-2">

//                                 {/* ================= CART ================= */}
//                                 <button
//                                     onClick={() => setIsCartOpen(true)}
//                                     className="
//                                         relative
//                                         rounded-lg
//                                         p-2
//                                         text-gray-600
//                                         transition-all
//                                         duration-200
//                                         hover:bg-indigo-50
//                                         hover:text-indigo-600
//                                     "
//                                     aria-label="Shopping cart"
//                                 >
//                                     <span
//                                         className="
//                                             absolute
//                                             -right-1
//                                             -top-2
//                                             flex
//                                             min-h-7
//                                             min-w-7
//                                             items-center
//                                             justify-center
//                                             rounded-full
//                                             bg-yellow-300
//                                             px-2
//                                             text-sm
//                                             font-semibold
//                                             text-blue-600
//                                         "
//                                     >
//                                         {userCart?.cartItems?.length || 0}
//                                     </span>

//                                     <ShoppingCart className="h-6 w-6" />
//                                 </button>

//                                 {/* ================= DESKTOP AUTH ================= */}
//                                 {loggedIn ? (
//                                     <div
//                                         ref={dropdownRef}
//                                         className="relative hidden md:block"
//                                     >
//                                         <button
//                                             onClick={() =>
//                                                 setDropdownOpen(
//                                                     (value) => !value
//                                                 )
//                                             }
//                                             className="
//                                                 flex
//                                                 items-center
//                                                 gap-2
//                                                 rounded-xl
//                                                 border
//                                                 border-gray-200
//                                                 bg-white/50
//                                                 py-1.5
//                                                 pl-1.5
//                                                 pr-3
//                                                 transition-all
//                                                 duration-200
//                                                 hover:border-indigo-300
//                                                 hover:bg-indigo-50
//                                             "
//                                         >
//                                             {/* Avatar */}
//                                             {profileImage ? (
//                                                 <img
//                                                     src={profileImage}
//                                                     alt={firstName}
//                                                     className="
//                                                         h-9
//                                                         w-9
//                                                         rounded-full
//                                                         object-cover
//                                                     "
//                                                 />
//                                             ) : (
//                                                 <div
//                                                     className="
//                                                         flex
//                                                         h-9
//                                                         w-9
//                                                         items-center
//                                                         justify-center
//                                                         rounded-full
//                                                         bg-indigo-600
//                                                     "
//                                                 >
//                                                     <User className="h-5 w-5 text-white" />
//                                                 </div>
//                                             )}

//                                             <span className="text-sm font-medium text-gray-700">
//                                                 {firstName}
//                                             </span>

//                                             <ChevronDown
//                                                 className={`
//                                                     h-4
//                                                     w-4
//                                                     text-gray-500
//                                                     transition-transform
//                                                     duration-200
//                                                     ${
//                                                         dropdownOpen
//                                                             ? "rotate-180"
//                                                             : ""
//                                                     }
//                                                 `}
//                                             />
//                                         </button>

//                                         {/* ================= DESKTOP DROPDOWN ================= */}
//                                         {dropdownOpen && (
//                                             <div
//                                                 className="
//                                                     absolute
//                                                     right-0
//                                                     top-full
//                                                     mt-3
//                                                     w-72
//                                                     overflow-hidden
//                                                     rounded-2xl
//                                                     border
//                                                     border-black
//                                                     bg-white
//                                                     shadow-xl
//                                                 "
//                                             >
//                                                 {/* User information */}
//                                                 <div
//                                                     className="
//                                                         flex
//                                                         items-center
//                                                         gap-4
//                                                         border-b
//                                                         border-gray-200
//                                                         px-5
//                                                         py-5
//                                                     "
//                                                 >
//                                                     {profileImage ? (
//                                                         <img
//                                                             src={profileImage}
//                                                             alt={firstName}
//                                                             className="
//                                                                 h-16
//                                                                 w-16
//                                                                 shrink-0
//                                                                 rounded-full
//                                                                 object-cover
//                                                             "
//                                                         />
//                                                     ) : (
//                                                         <div
//                                                             className="
//                                                                 flex
//                                                                 h-16
//                                                                 w-16
//                                                                 shrink-0
//                                                                 items-center
//                                                                 justify-center
//                                                                 rounded-full
//                                                                 bg-gray-200
//                                                             "
//                                                         >
//                                                             <User className="h-8 w-8 text-gray-600" />
//                                                         </div>
//                                                     )}

//                                                     <div className="min-w-0">
//                                                         <p className="truncate text-lg font-bold text-gray-900">
//                                                             {
//                                                                 currentUserData?.name
//                                                             }
//                                                         </p>

//                                                         <p className="mt-1 truncate text-sm text-gray-500">
//                                                             {
//                                                                 currentUserData?.email
//                                                             }
//                                                         </p>
//                                                     </div>
//                                                 </div>

//                                                 <div className="py-2">
//                                                     <DropdownItem
//                                                         icon={User}
//                                                         label="My Profile"
//                                                         onClick={() => {
//                                                             setDropdownOpen(
//                                                                 false
//                                                             );
//                                                             onProfile?.();
//                                                         }}
//                                                     />

//                                                     <DropdownItem
//                                                         icon={Package}
//                                                         label="My Orders"
//                                                         onClick={() => {
//                                                             setDropdownOpen(
//                                                                 false
//                                                             );
//                                                             onOrders?.();
//                                                         }}
//                                                     />

//                                                     <DropdownItem
//                                                         icon={Heart}
//                                                         label="Wishlist"
//                                                         onClick={() => {
//                                                             setDropdownOpen(
//                                                                 false
//                                                             );
//                                                             onWishlist?.();
//                                                         }}
//                                                     />

//                                                     <DropdownItem
//                                                         icon={Settings}
//                                                         label="Settings"
//                                                         onClick={() => {
//                                                             setDropdownOpen(
//                                                                 false
//                                                             );
//                                                             onSettings?.();
//                                                         }}
//                                                     />
//                                                 </div>

//                                                 <div className="border-t border-gray-200 py-2">
//                                                     <DropdownItem
//                                                         icon={LogOut}
//                                                         label="Logout"
//                                                         onClick={handleLogout}
//                                                         danger
//                                                     />
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 ) : (
//                                     /* ================= DESKTOP LOGIN ================= */
//                                     <div className="hidden items-center gap-2 md:flex">
//                                         {currentUser ? (
//                                             <UserLogOut />
//                                         ) : (
//                                             <Link
//                                                 to="/login"
//                                                 onClick={onLogin}
//                                                 className="
//                                                     rounded-lg
//                                                     p-2
//                                                     text-gray-600
//                                                     transition-all
//                                                     hover:bg-indigo-50
//                                                     hover:text-indigo-600
//                                                 "
//                                             >
//                                                 <UserKey className="h-6 w-6" />
//                                             </Link>
//                                         )}
//                                     </div>
//                                 )}

//                                 {/* ================= MOBILE HAMBURGER ================= */}
//                                 <button
//                                     onClick={() =>
//                                         setMobileOpen(
//                                             (value) => !value
//                                         )
//                                     }
//                                     className="
//                                         rounded-lg
//                                         p-2
//                                         text-gray-600
//                                         transition-all
//                                         hover:bg-indigo-50
//                                         hover:text-indigo-600
//                                         md:hidden
//                                     "
//                                     aria-label="Toggle menu"
//                                 >
//                                     {mobileOpen ? (
//                                         <X className="h-6 w-6" />
//                                     ) : (
//                                         <Menu className="h-6 w-6" />
//                                     )}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </nav>

//                 {/* =================================================
//                     MOBILE MENU
//                     IMPORTANT:
//                     This is OUTSIDE the rounded navbar.
//                     ================================================= */}
//                 {mobileOpen && (
//                     <div
//                         className="
//                             mx-auto
//                             mt-2
//                             w-[92%]
//                             overflow-hidden
//                             rounded-2xl
//                             border
//                             border-gray-200
//                             bg-white
//                             shadow-2xl
//                             md:hidden
//                         "
//                     >
//                         {/* Mobile Navigation */}
//                         <div className="p-3">
//                             {NAV_LINKS.map(({ label, href }) => (
//                                 <Link
//                                     key={label}
//                                     to={href}
//                                     onClick={closeMobileMenu}
//                                     className="
//                                         block
//                                         rounded-xl
//                                         px-4
//                                         py-3
//                                         text-base
//                                         font-medium
//                                         text-gray-700
//                                         transition-all
//                                         hover:bg-indigo-50
//                                         hover:text-indigo-600
//                                     "
//                                 >
//                                     {label}
//                                 </Link>
//                             ))}
//                         </div>

//                         {/* Divider */}
//                         <div className="mx-4 border-t border-gray-200" />

//                         {/* ================= MOBILE AUTH ================= */}
//                         <div className="p-4">
//                             {!loggedIn ? (
//                                 <>
//                                     {/* Login */}
//                                     <Link
//                                         to="/login"
//                                         onClick={() => {
//                                             closeMobileMenu();
//                                             onLogin?.();
//                                         }}
//                                         className="
//                                             mb-2
//                                             block
//                                             w-full
//                                             rounded-xl
//                                             px-4
//                                             py-3
//                                             text-base
//                                             font-medium
//                                             text-gray-700
//                                             transition-all
//                                             hover:bg-indigo-50
//                                             hover:text-indigo-600
//                                         "
//                                     >
//                                         Log in
//                                     </Link>

//                                     {/* Signup */}
//                                     <Link
//                                         to="/signup"
//                                         onClick={() => {
//                                             closeMobileMenu();
//                                             onSignup?.();
//                                         }}
//                                         className="
//                                             block
//                                             w-full
//                                             rounded-xl
//                                             bg-indigo-600
//                                             px-4
//                                             py-3
//                                             text-center
//                                             text-base
//                                             font-semibold
//                                             text-white
//                                             transition-all
//                                             hover:bg-indigo-700
//                                         "
//                                     >
//                                         Sign up
//                                     </Link>
//                                 </>
//                             ) : (
//                                 <>
//                                     {/* Mobile User Info */}
//                                     <div
//                                         className="
//                                             mb-3
//                                             flex
//                                             items-center
//                                             gap-3
//                                             rounded-xl
//                                             bg-gray-50
//                                             p-3
//                                         "
//                                     >
//                                         {profileImage ? (
//                                             <img
//                                                 src={profileImage}
//                                                 alt={firstName}
//                                                 className="
//                                                     h-12
//                                                     w-12
//                                                     rounded-full
//                                                     object-cover
//                                                 "
//                                             />
//                                         ) : (
//                                             <div
//                                                 className="
//                                                     flex
//                                                     h-12
//                                                     w-12
//                                                     shrink-0
//                                                     items-center
//                                                     justify-center
//                                                     rounded-full
//                                                     bg-indigo-600
//                                                 "
//                                             >
//                                                 <User className="h-6 w-6 text-white" />
//                                             </div>
//                                         )}

//                                         <div className="min-w-0">
//                                             <p className="truncate font-semibold text-gray-900">
//                                                 {
//                                                     currentUserData?.name
//                                                 }
//                                             </p>

//                                             <p className="truncate text-sm text-gray-500">
//                                                 {
//                                                     currentUserData?.email
//                                                 }
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <MobileItem
//                                         icon={User}
//                                         label="My Profile"
//                                         onClick={() => {
//                                             closeMobileMenu();
//                                             onProfile?.();
//                                         }}
//                                     />

//                                     <MobileItem
//                                         icon={Package}
//                                         label="My Orders"
//                                         onClick={() => {
//                                             closeMobileMenu();
//                                             onOrders?.();
//                                         }}
//                                     />

//                                     <MobileItem
//                                         icon={Heart}
//                                         label="Wishlist"
//                                         onClick={() => {
//                                             closeMobileMenu();
//                                             onWishlist?.();
//                                         }}
//                                     />

//                                     <MobileItem
//                                         icon={Settings}
//                                         label="Settings"
//                                         onClick={() => {
//                                             closeMobileMenu();
//                                             onSettings?.();
//                                         }}
//                                     />

//                                     <div className="mt-2 border-t border-gray-200 pt-2">
//                                         <MobileItem
//                                             icon={LogOut}
//                                             label="Logout"
//                                             onClick={handleLogout}
//                                             danger
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }


// /* =========================================================
//    DESKTOP DROPDOWN ITEM
//    ========================================================= */

// function DropdownItem({
//     icon: Icon,
//     label,
//     onClick,
//     danger = false,
// }) {
//     return (
//         <button
//             onClick={onClick}
//             className={`
//                 flex
//                 w-full
//                 items-center
//                 gap-3
//                 px-5
//                 py-3
//                 text-left
//                 text-sm
//                 font-medium
//                 transition-colors
//                 ${
//                     danger
//                         ? "text-red-600 hover:bg-red-50"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                 }
//             `}
//         >
//             <Icon className="h-5 w-5 shrink-0" />
//             {label}
//         </button>
//     );
// }


// /* =========================================================
//    MOBILE MENU ITEM
//    ========================================================= */

// function MobileItem({
//     icon: Icon,
//     label,
//     onClick,
//     danger = false,
// }) {
//     return (
//         <button
//             onClick={onClick}
//             className={`
//                 flex
//                 w-full
//                 items-center
//                 gap-3
//                 rounded-xl
//                 px-4
//                 py-3
//                 text-left
//                 text-base
//                 font-medium
//                 transition-all
//                 ${
//                     danger
//                         ? "text-red-600 hover:bg-red-50"
//                         : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
//                 }
//             `}
//         >
//             <Icon className="h-5 w-5 shrink-0" />
//             {label}
//         </button>
//     );
// }

