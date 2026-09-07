import { useState, useRef, useEffect, useContext } from "react";
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiMapPin, FiChevronDown, } from "react-icons/fi";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/authContext";
import userProfile from '../assets/userprofile.jfif'
import {  FiGrid } from "react-icons/fi";

export default function LogOut() {
    const [open, setOpen] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const { currentUser, setCurrentUser, currentUserlogout } = useContext(AuthContext)
    // console.log("currentUser", currentUser);

    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <>
            <div className="relative" ref={menuRef}>
                {/* Profile Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-3 rounded-full bg-blue-50 px-3 py-2 hover:bg-blue-100 duration-300"
                >
                    <img
                        src={currentUser?.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    {/* <div className="hidden sm:block text-left">
                        <p className="font-semibold">
                            {currentUser.name}
                        </p>
                        <p className="text-xs text-gray-500">
                            {currentUser.email}
                        </p>
                    </div> */}

                    <FiChevronDown />
                </button>

                {/* Dropdown */}

                {open && (
                    <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white shadow-2xl border overflow-hidden z-50">
                        {/* User */}
                        <div className="flex gap-4 items-center p-5 border-b">
                            <img
                                src={currentUser.avatar}
                                className="w-16 h-16 rounded-full"
                            />

                            <div>
                                <h2 className="font-bold text-lg">
                                    {currentUser.name}
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    {currentUser.email}
                                </p>
                            </div>

                        </div>

                        {/* Menu */}

                        {/* <div className="py-2 flex items-center justify-center">
                            <Link to="/dashboard">
                                <MenuItem icon={<FiUser />} text="My Profile" />
                            </Link>

                            "
                            {currentUser?.role === "admin" && (
                                <Link to="/admin/dashboard">
                                    <button
                                        className="
        rounded-lg
        border border-purple-200
        bg-purple-50
        px-4 py-2
        text-sm font-semibold text-purple-700
        transition-all duration-300
        hover:border-purple-600
        hover:bg-purple-600
        hover:text-white
        hover:shadow-md
        active:scale-95
      "
                                    >
                                        Admin Dashboard
                                    </button>
                                </Link>
                            )}
                        </div> */}

                        <div className="flex w-full flex-col gap-1 p-2">

                            {/* My Profile */}
                            <Link
                                to="/dashboard"
                                className="group flex w-full items-center rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-gray-100"
                            >
                                <div className="flex w-full items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors duration-200 group-hover:bg-purple-100 group-hover:text-purple-600">
                                        <FiUser size={18} />
                                    </div>

                                    <span className="text-sm font-semibold text-gray-700 transition-colors group-hover:text-purple-600">
                                        My Profile
                                    </span>
                                </div>
                            </Link>


                            {/* Admin Dashboard */}
                            {currentUser?.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="group flex w-full items-center rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-purple-50"
                                >
                                    <div className="flex w-full items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 transition-all duration-200 group-hover:bg-purple-600 group-hover:text-white">
                                            <FiGrid size={18} />
                                        </div>

                                        <div className="flex flex-1 items-center justify-between">
                                            <span className="text-sm font-semibold text-purple-700">
                                                Admin Dashboard
                                            </span>

                                            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-purple-600">
                                                Admin
                                            </span>
                                        </div>

                                    </div>
                                </Link>
                            )}

                        </div>

                        <div className="border-t p-2 border-2 border-black">
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setLogoutModal(true);
                                    currentUserlogout();
                                }}
                                className="flex items-center gap-3 text-red-500 hover:bg-red-50 w-full p-3 rounded-xl"
                            >
                                <FiLogOut size={20} />
                                Logout
                            </button>

                        </div>

                    </div>
                )}
            </div >

            {/* Logout Modal */}

            {
                logoutModal && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">

                        <div className="bg-white rounded-3xl w-[90%] max-w-md p-8">

                            <div className="flex justify-center">

                                <div className="bg-red-100 text-red-500 w-20 h-20 rounded-full flex items-center justify-center">

                                    <FiLogOut size={40} />

                                </div>

                            </div>

                            <h2 className="text-3xl font-bold text-center mt-6">
                                Logout
                            </h2>

                            <p className="text-gray-500 text-center mt-3">
                                Are you sure you want to logout from your account?
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">

                                <button
                                    onClick={() => setLogoutModal(false)}
                                    className="border rounded-xl py-3 font-semibold hover:bg-gray-100"
                                >
                                    Cancel
                                </button>

                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 font-semibold"
                                    onClick={() => {
                                        // logout logic
                                    }}
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }
        </>
    );
}

function MenuItem({ icon, text }) {
    return (
        <button className="flex items-center gap-4 hover:bg-gray-100 w-full px-5 py-4 duration-300">
            <span className="text-xl">{icon}</span>
            <span>{text}</span>
        </button>
    );
}