import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
} from "react-icons/fa";

import {
    HiOutlineMail,
    HiOutlinePhone,
    HiOutlineLocationMarker,
} from "react-icons/hi";

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-gray-300">
            {/* Top Section */}
            <div className="border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Brand */}
                    <div>
                        <h2 className="text-3xl font-extrabold text-white">
                            Toy <span className="text-pink-500">Box</span>
                        </h2>

                        <p className="mt-5 text-sm leading-7">
                            Discover exciting toys for kids of every age. We bring fun,
                            creativity and happiness with premium quality toys delivered all
                            across Pakistan.
                        </p>

                        <div className="flex gap-4 mt-6">
                            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
                                (Icon, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="h-11 w-11 rounded-full bg-slate-800 hover:bg-pink-500 transition duration-300 flex items-center justify-center"
                                    >
                                        <Icon size={18} />
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-5">
                            Shop
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-pink-400">Action Toys</a></li>
                            <li><a href="#" className="hover:text-pink-400">Educational Toys</a></li>
                            <li><a href="#" className="hover:text-pink-400">Remote Cars</a></li>
                            <li><a href="#" className="hover:text-pink-400">Baby Toys</a></li>
                            <li><a href="#" className="hover:text-pink-400">Board Games</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-5">
                            Support
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li><a href="#" className="hover:text-pink-400">About Us</a></li>
                            <li><a href="#" className="hover:text-pink-400">Contact</a></li>
                            <li><a href="#" className="hover:text-pink-400">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-pink-400">Terms & Conditions</a></li>
                            <li><a href="#" className="hover:text-pink-400">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white text-xl font-bold mb-5">
                            Contact
                        </h3>

                        <div className="space-y-5 text-sm">

                            <div className="flex gap-3">
                                <HiOutlineLocationMarker
                                    size={22}
                                    className="text-pink-500 mt-1"
                                />
                                <p>Lahore, Pakistan</p>
                            </div>

                            <div className="flex gap-3">
                                <HiOutlinePhone
                                    size={22}
                                    className="text-pink-500"
                                />
                                <p>+92 300 1234567</p>
                            </div>

                            <div className="flex gap-3">
                                <HiOutlineMail
                                    size={22}
                                    className="text-pink-500"
                                />
                                <p>support@toybox.com</p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

                <p className="text-sm text-center md:text-left">
                    © {new Date().getFullYear()} Toy Box. All Rights Reserved.
                </p>

                <div className="flex items-center gap-4 text-3xl">
                    <FaCcVisa />
                    <FaCcMastercard />
                    <FaCcPaypal />
                </div>

            </div>
        </footer>
    );
}