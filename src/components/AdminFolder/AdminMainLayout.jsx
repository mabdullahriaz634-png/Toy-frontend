import AdminCustomers from "./AdminCustomers";
import AdminDashboard from "./AdminDashboard";
import AdminOrders from "./AdminOrders";
import AdminOverview from "./AdminOverview";
import AdminProducts from "./AdminProducts";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard, ShoppingCart, Package, Users, LogOut,
    // Settings, 
    Search, Bell, ChevronDown,
    DollarSign, TrendingUp, TrendingDown, Menu, X, Box, UserRound,
} from "lucide-react";
import { authAPI } from "../../Api";

const menuItems = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Orders",
        path: "/admin/orders",
        icon: ShoppingCart,
        count: 24,
    },
    {
        name: "Products",
        path: "/admin/products",
        icon: Package,
    },
    {
        name: "Customers",
        path: "/admin/customers",
        icon: Users,
    },
];

export default function AdminMainLayout() {

    const location = useLocation();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const isDashboard =
        location.pathname === "/admin/dashboard" ||
        location.pathname === "/admin";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    // orders logic
    const [adminOrders, setAdminOrdes] = useState([])
    //   console.log("All Orders State", adminOrders.length);

    const totalRevenue = adminOrders.filter((order) => order.isPaid === true)
        .reduce((total, order) => {
            return total + (order.orderSummary?.totalAmount || 0);
        }, 0)

    const paidOrdersCount = adminOrders.filter((order) => order.isPaid === true).length

    console.log("ADMIN ORDERS:", adminOrders);
    console.log("PAID ORDERS:", paidOrdersCount);
    console.log("TOTAL REVENUE:", totalRevenue);

    const [loading, setLoading] = useState(true)
   

    const getOrders = async () => {
        try {
            setLoading(true);
            const res = await authAPI.get('/order/admin')
            // console.log("Admin Orders Res", res);
            setAdminOrdes(res.data.orders || [])
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get orders")
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    //Product Logic 
        const [AdminProducts, setAdminProducts] = useState([]);
      
     const GetProducts = async () => {
        try {
          const res = await authAPI.get("/products/admin");
    
          console.log("Admin Products:", res.data);
    
          setAdminProducts(res.data.products || []);
        } catch (error) {
          console.log(error);
    
          toast.error(
            error.response?.data?.message ||
            "Failed to get products"
          );
        }
      };
      //Customer Logic 
       const [AdminCustomers, setAdminCustomers] = useState([])
      
        const getCustomers = async () => {
          try {
            const res = await authAPI.get("/auth/admin")
            // console.log("Admin backend Customers= ",res.data);
            setAdminCustomers(res.data.customers || [])
      
          } catch (error) {
            toast.error(error.response?.data?.message || "Failed to get all Customers")
            console.log(error);
          }
        }

    useEffect(() => {
        getOrders();
        GetProducts();
        getCustomers();
    }, [])

    // const [count, setcount] = useState(0)
    // const [orders, setOrders] = useState([])
    // const [adminOrderCount, setOrderCount] = useState([])
    // console.log("All Orders length", adminOrderCount.length);

    // useEffect(() => {
    //     async function getAllAdminOrders() {
    //         const res = await authAPI.get('/order/admin')
    //         // console.log("Admin Mainlayout", res);
    //         setOrderCount(res.data.orders)
    //     }

    //     getAllAdminOrders()
    // }, [])

    return (
        <div>
            {/* // <div className="min-h-screen overflow-x-hidden"> */}
            <aside>
                {/* Sidebar */}
                <motion.aside
                    initial={false}
                    animate={{
                        x: sidebarOpen ? 0 : 0,
                    }}
                    className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col bg-[#111113] text-white transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    {/* Logo */}
                    <div className="flex h-[90px] items-center border-b border-white/10 px-6">
                        <div className="flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-lg">
                                <Box size={28} strokeWidth={2.2} />
                            </div>

                            <div>
                                <h1 className="text-[24px] font-bold tracking-tight">
                                    ToysBox
                                </h1>

                                <p className="mt-1 text-[10px] font-medium tracking-[3px] text-white/40">
                                    ADMINISTRATION
                                </p>
                            </div>
                        </div>

                        {/* Mobile Close */}
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="ml-auto rounded-lg p-2 text-white/60 hover:bg-white/10 lg:hidden"
                        >
                            <X size={22} />
                        </button>
                    </div>

                    {/* Menu */}
                    <div className="flex-1 overflow-y-auto px-5 py-8">
                        <p className="mb-5 px-4 text-[11px] font-semibold tracking-[2px] text-white/30">
                            MENU
                        </p>

                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;

                                const active =
                                    location.pathname === item.path ||
                                    (item.name === "Dashboard" && isDashboard);

                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group flex items-center justify-between rounded-2xl px-4 py-4 transition-all duration-200 ${active
                                            ? "bg-white text-[#111113] shadow-lg"
                                            : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <Icon
                                                size={22}
                                                strokeWidth={active ? 2.4 : 2}
                                                className="shrink-0"
                                            />

                                            <span className="text-[16px] font-semibold">
                                                {item.name}
                                            </span>
                                        </div>

                                        {item.count && (
                                            <span
                                                className={`flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-xs font-bold ${active
                                                    ? "bg-[#111113] text-white"
                                                    : "bg-white/10 text-white/60"
                                                    }`}
                                            >
                                                {/* {item.count} */}
                                                {adminOrders.length}
                                                {/* //// */}
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* System */}
                        <p className="mb-5 mt-10 px-4 text-[11px] font-semibold tracking-[2px] text-white/30">
                            SYSTEM
                        </p>

                        <nav className="space-y-2">
                            {/* <Link
              to="/admin/settings"
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 rounded-2xl px-4 py-4 font-semibold transition ${
                location.pathname === "/admin/settings"
                  ? "bg-white text-[#111113]"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Settings size={22} />
              <span>Settings</span>
            </Link> */}

                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-4 rounded-2xl px-4 py-4 font-semibold text-white/55 transition hover:bg-red-500/10 hover:text-red-400"
                            >
                                <LogOut size={22} />
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>

                    {/* Admin Profile */}
                    <div className="border-t border-white/10 p-5">
                        <div className="flex items-center gap-3 rounded-2xl bg-[#1d1d20] p-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] text-sm font-bold text-white">
                                AR
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[15px] font-bold text-white">
                                    Abdullah Riaz
                                </p>

                                <p className="mt-0.5 text-xs text-white/40">
                                    Super Admin
                                </p>
                            </div>

                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="rounded-lg p-1 text-white/40 hover:text-white"
                            >
                                <ChevronDown size={19} />
                            </button>
                        </div>

                        <AnimatePresence>
                            {profileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#1d1d20]"
                                >
                                    <Link
                                        to="/admin/profile"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-white/60 hover:bg-white/5 hover:text-white"
                                    >
                                        <UserRound size={17} />
                                        Profile
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10"
                                    >
                                        <LogOut size={17} />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.aside>

            </aside>
            {/* GPT Changes */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="fixed left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl bg-[#111113] text-white shadow-lg lg:hidden"
            >
                <Menu size={22} />
            </button>

            <main className="lg:ml-[270px] ml-0 p-9">
                {/* <main className="min-w-0 w-full ml-0 p-3 sm:p-5 md:p-6 lg:ml-[270px] lg:p-8"> */}
                {/* <main className="min-w-0 w-full ml-0 p-3 pt-16 sm:p-5 sm:pt-16 md:p-6 md:pt-16 lg:ml-[270px] lg:p-8"> */}
                <Outlet context={{
                   adminOrders, paidOrdersCount, totalRevenue,
                    setAdminOrdes, loading, setLoading,getOrders,
                    GetProducts,AdminProducts,setAdminProducts,
                    AdminCustomers, setAdminCustomers,getCustomers,
                }} />
            </main>
        </div>
        // addProduct, setAddProduct,formData, setFormData,
        // handleChange,handleAddProduct
    )

}