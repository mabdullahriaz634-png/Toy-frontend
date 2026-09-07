import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaBoxOpen, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle,
    FaFacebookF, FaApple, FaCube, FaStar, FaGift, FaRocket,
    FaGem, FaShippingFast, FaUndo, FaCheck, FaUserPlus, FaUser,
    FaCircleNotch, FaRobot, FaCar, FaDragon, FaLock as FaLockIcon
} from 'react-icons/fa';

import { useContext, useEffect, } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, setToken } from "../Api"
import { toast } from 'react-toastify';


const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            const res = await API.post(`/auth/signup`, formData)
            toast.success(res.data.msg)
            if (!res.ok) return
            setFormData({ name: '', email: '', password: '', confirmPassword: '' })
            navigate('/login')
        } catch (error) {
            toast.error(error.response.data.msg)
            console.log(error);
        }
        finally {
            setIsLoading(false);
        }
        setTimeout(() => {
            setIsLoading(false);
            setShowSuccess(true);
            createConfetti();
            // Redirect after 3 seconds
            setTimeout(() => {
                // window.location.href = '/login';
            }, 3000);
        }, 2000);
    };

    // Confetti effect
    const createConfetti = () => {
        const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#fa709a', '#fee140'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random();
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.transition = 'all 3s ease-out';
            confetti.style.zIndex = '1000';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.top = '100vh';
                confetti.style.transform = `rotate(${Math.random() * 720}deg)`;
                confetti.style.opacity = '0';
            }, 10);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }
    };

    // Animation variants
    const floatAnimation = {
        initial: { y: 0 },
        animate: {
            y: [-20, 0, -20],
            rotate: [0, 5, -5, 3, 0],
        },
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const bounceAnimation = {
        initial: { y: 0 },
        animate: { y: [-30, 0] },
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const pulseAnimation = {
        initial: { scale: 1 },
        animate: { scale: [1, 1.1, 1] },
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 overflow-hidden">
            {/* Background decorations */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10"
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                >
                    <FaCube className="text-6xl text-white opacity-20" />
                </motion.div>

                <motion.div
                    className="absolute top-40 right-20"
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                    transition={{ ...floatAnimation.transition, delay: 2 }}
                >
                    <FaStar className="text-5xl text-white opacity-20" />
                </motion.div>

                <motion.div
                    className="absolute bottom-40 left-1/4"
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                    transition={{ ...floatAnimation.transition, delay: 4 }}
                >
                    <FaGift className="text-7xl text-white opacity-20" />
                </motion.div>

                <motion.div
                    className="absolute bottom-20 right-1/3"
                    variants={floatAnimation}
                    initial="initial"
                    animate="animate"
                    transition={{ ...floatAnimation.transition, delay: 1 }}
                >
                    <FaRocket className="text-5xl text-white opacity-20" />
                </motion.div>

                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                    <FaCircleNotch className="text-4xl text-white/10" />
                </motion.div>
            </div>

            {/* Main container */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Left side - welcome section */}
                        <motion.div
                            className="text-white p-8"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Logo */}
                            <motion.div
                                className="flex items-center justify-center mb-8"
                                variants={bounceAnimation}
                                initial="initial"
                                animate="animate"
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
                                    <FaBoxOpen className="text-4xl text-white" />
                                </div>
                            </motion.div>

                            {/* Welcome text */}
                            <div className="text-center mb-12">
                                <h1 className="text-5xl font-bold mb-4">Welcome to Toy Box</h1>
                                <p className="text-xl text-white/80">Create your account to start shopping amazing toys</p>
                            </div>

                            {/* Toy stack animation */}
                            <div className="relative h-64 mb-12">
                                {[0, 1, 2, 3].map((index) => (
                                    <motion.div
                                        key={index}
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                                        style={{
                                            bottom: `${index * 16}px`,
                                            width: `${192 - index * 16}px`,
                                            height: `${64 - index * 4}px`,
                                        }}
                                        whileHover={{
                                            transform: 'translateX(-50%) translateZ(20px) rotateY(10deg) scale(1.05)',
                                            zIndex: 10
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className={`w-full h-full rounded-lg shadow-lg flex items-center justify-center bg-gradient-to-r ${index === 0 ? 'from-pink-400 to-purple-500' :
                                            index === 1 ? 'from-blue-400 to-cyan-500' :
                                                index === 2 ? 'from-yellow-400 to-orange-500' :
                                                    'from-green-400 to-teal-500'
                                            }`}>
                                            {index === 0 && <FaCube className="text-3xl text-white" />}
                                            {index === 1 && <FaRobot className="text-2xl text-white" />}
                                            {index === 2 && <FaCar className="text-2xl text-white" />}
                                            {index === 3 && <FaDragon className="text-xl text-white" />}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { icon: <FaGem />, text: 'Premium Quality' },
                                    { icon: <FaShippingFast />, text: 'Free Shipping' },
                                    { icon: <FaUndo />, text: 'Easy Returns' }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center"
                                        variants={pulseAnimation}
                                        initial="initial"
                                        animate="animate"
                                        transition={{ ...pulseAnimation.transition, delay: index * 0.5 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="text-3xl mb-2">{feature.icon}</div>
                                        <p className="text-sm font-medium">{feature.text}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right side - signup form */}
                        <motion.div
                            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl"
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            {showSuccess ? (
                                <motion.div
                                    className="text-center py-6"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <motion.div
                                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                                        variants={bounceAnimation}
                                        initial="initial"
                                        animate="animate"
                                    >
                                        <FaCheck className="text-2xl text-white" />
                                    </motion.div>
                                    <h3 className="text-white text-xl font-bold mb-2">Account Created!</h3>
                                    <p className="text-white/80 mb-4">Welcome to ToyBox family!</p>
                                    <a href="/login" className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300">
                                        Go to Login
                                    </a>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Form header */}
                                    <div className="text-center mb-8">
                                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                                        <p className="text-white/80">Join us and start exploring amazing toys</p>
                                    </div>

                                    {/* Name input */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            <FaUser className="inline mr-2" /> Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 pl-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                placeholder="Enter your full name"
                                            />
                                            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                                        </div>
                                        {errors.name && (
                                            <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Email input */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            <FaEnvelope className="inline mr-2" /> Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 pl-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                placeholder="Enter your email address"
                                            />
                                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Password input */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            <FaLockIcon className="inline mr-2" /> Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                placeholder="Create a password"
                                            />
                                            <FaLockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                                        )}
                                    </div>

                                    {/* Confirm password input */}
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            <FaLockIcon className="inline mr-2" /> Confirm Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                                                placeholder="Confirm your password"
                                            />
                                            <FaLockIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                                        )}
                                    </div>

                                    {/* Terms and conditions */}
                                    <div className="flex items-start">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            className="mt-1 mr-2 rounded"
                                            required
                                        />
                                        <label htmlFor="terms" className="text-white/80 text-sm">
                                            I agree to the <a href="#" className="text-white hover:underline">Terms of Service</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>
                                        </label>
                                    </div>

                                    {/* Submit button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        {isLoading ? (
                                            <>
                                                <FaCircleNotch className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Creating Account...</span>
                                            </>
                                        ) : (
                                            <>
                                                <FaUserPlus />
                                                <span>Create Account</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Divider */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-white/30"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-4 bg-transparent text-white/60">Or continue with</span>
                                        </div>
                                    </div>

                                    {/* Social signup */}
                                    <div className="grid grid-cols-3 gap-4">
                                        {[
                                            { icon: <FaGoogle />, color: 'hover:bg-red-500' },
                                            { icon: <FaFacebookF />, color: 'hover:bg-blue-600' },
                                            { icon: <FaApple />, color: 'hover:bg-gray-800' }
                                        ].map((social, index) => (
                                            <motion.button
                                                key={index}
                                                type="button"
                                                className={`${social.color} bg-white/20 backdrop-blur-md rounded-xl py-3 flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300`}
                                                whileHover={{ y: -3, scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {social.icon}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Login link */}
                                    <div className="text-center pt-4">
                                        <p className="text-white/80">
                                            Already have an account?
                                            <a href="/login" className="text-white hover:underline font-medium ml-1">Login</a>
                                        </p>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Loading overlay */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-2xl p-8 shadow-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                        >
                            <div className="flex flex-col items-center">
                                <FaCircleNotch className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4" />
                                <p className="text-gray-700 font-medium">Creating your account...</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SignupPage;