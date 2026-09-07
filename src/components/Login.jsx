import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBoxOpen, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle,
  FaFacebookF, FaApple, FaCube, FaStar, FaGift, FaRocket,
  FaGem, FaShippingFast, FaUndo, FaCheck, FaSignInAlt,
  FaCircleNotch, FaRobot, FaCar, FaDragon
} from 'react-icons/fa';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { API, setToken } from "../Api"
import { toast } from "react-toastify";
import { AuthContext } from '../Context/authContext';

export default function Login() {
  const { setCurrentUser } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [forgotEmail, setForgotEmail] = useState('');
  const navigate = useNavigate()

  // Login form submit handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // API call simulation
    try {
      setIsLoading(true);
      const res = await API.post(`/auth/login`, { email, password })
      setCurrentUser(res.data.user)
      localStorage.setItem('token', res.data.token)
      navigate('/profile')
      toast.success(res.data.msg)
    } catch (error) {
      // toast.error(error.response.data.msg)
      console.log(error);
    }
    finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setShowSuccess(true);
      createConfetti();

      // 2 seconds baad redirect
      setTimeout(() => {
        // window.location.href = '/dashboard';
      }, 2000);
    }, 1500);
  };

  // Forgot password handler
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // API call simulation
    try {
      const res = await API.post(`/auth/forgotpassword`, { email: forgotEmail, })
      toast.success(res.data.msg)
    } catch (error) {
      toast.error(error.response.data.msg)
      console.log(error);
    }
    setTimeout(() => {
      setIsLoading(false);
      setShowForgotModal(false);
      // toast.success('Password reset link sent to your email!');
    }, 1500);
  };

  // Confetti effect create karna
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

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
      {/* Background decorations - floating toys */}
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

        {/* Spinning decoration */}
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
                <p className="text-xl text-white/80">Discover amazing toys that bring joy to every child's life</p>
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

            {/* Right side - login form */}
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
                  <h3 className="text-white text-xl font-bold mb-2">Welcome Back!</h3>
                  <p className="text-white/80">Login successful. Redirecting...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Form header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
                    <p className="text-white/80">Login to your account</p>
                  </div>

                  {/* Email input */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaEnvelope className="inline mr-2" /> Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 pl-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Enter your email address"
                      />
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                    </div>
                    {email && !validateEmail(email) && (
                      <p className="text-red-400 text-sm mt-1">Please enter a valid email address</p>
                    )}
                  </div>

                  {/* Password input */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaLock className="inline mr-2" /> Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Enter your password"
                      />
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & forgot password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center text-white/80">
                      <input type="checkbox" className="mr-2 rounded" />
                      <span className="text-sm">Remember me</span>
                    </label>
                    {/* <Link to={"/forgotpassword"}> */}
                      <button
                        type="button"
                        onClick={() => setShowForgotModal(true)}
                        className="text-white/80 hover:text-white text-sm transition-colors duration-300"
                      >
                        Forgot Password?
                      </button>
                    {/* </Link> */}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full 
                    bg-gradient-to-r from-pink-500 to-purple-600
                     text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <FaCircleNotch className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Logging in...</span>
                      </>
                    ) : (
                      <>
                        <FaSignInAlt />
                        <span>Login</span>
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

                  {/* Social login */}
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

                  {/* Sign up link */}
                  <div className="text-center pt-4">
                    <div className="text-white/80">
                      Don't have an account?
                      <Link to={"/signup"}>
                        <h2  className="text-white hover:underline font-medium ml-1">Sign Up</h2>
                      </Link>
                    </div>
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
                <p className="text-gray-700 font-medium">Processing...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot password modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Forgot Password?</h3>
                <p className="text-white/80">Enter your email to reset password</p>
              </div>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
