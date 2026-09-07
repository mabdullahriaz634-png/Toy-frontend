import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaBoxOpen, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck, FaArrowLeft,
  FaCircleNotch, FaRobot, FaCar, FaDragon, FaStar, FaGift, FaRocket, FaCube,
  FaGem, FaShippingFast, FaUndo
} from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { API } from '../Api';

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [searchParams] = useSearchParams()

  const email = searchParams.get("email")
  // console.log(email,"email");
  
  const token = searchParams.get("token")
  // console.log("RESET Token", token);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
      newErrors.newPassword = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (formData.newPassword !== formData.confirmPassword) {
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
      const res = await API.patch(`/auth/reset-password`, { token,email,formData })
      console.log("Reset Res", res);
    } catch (error) {
      console.error(error)
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

  // Password strength checker
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;  // Fixed regex
    return strength;
  };

  // Password strength text
  const getStrengthText = (strength) => {
    switch (strength) {
      case 0: return 'Very Weak';
      case 1: return 'Weak';
      case 2: return 'Fair';
      case 3: return 'Good';
      case 4: return 'Strong';
      default: return '';
    }
  };

  // Password strength color
  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-300';
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
        <div className="w-full max-w-4xl mx-auto">
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
                <h1 className="text-5xl font-bold mb-4">Create New Password</h1>
                <p className="text-xl text-white/80">Choose a strong password to secure your account</p>
              </div>

              {/* Password strength indicator */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-4">Password Requirements:</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${formData.newPassword.length >= 8 ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                      {formData.newPassword.length >= 8 && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="text-white/80">At least 8 characters</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${(formData.newPassword.match(/[a-z]/) && formData.newPassword.match(/[A-Z]/)) ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                      {(formData.newPassword.match(/[a-z]/) && formData.newPassword.match(/[A-Z]/)) && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="text-white/80">Uppercase and lowercase letters</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${formData.newPassword.match(/\d/) ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                      {formData.newPassword.match(/\d/) && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="text-white/80">At least one number</span>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${formData.newPassword.match(/[^a-zA-Z\d]/) ? 'bg-green-500' : 'bg-white/20'
                      }`}>
                      {formData.newPassword.match(/[^a-zA-Z\d]/) && <FaCheck className="text-white text-xs" />}
                    </div>
                    <span className="text-white/80">Special character</span>
                  </div>
                </div>
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
                      {index === 0 && <FaLock className="text-3xl text-white" />}
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

            {/* Right side - password reset form */}
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
                  <h3 className="text-white text-xl font-bold mb-2">Password Updated!</h3>
                  <p className="text-white/80 mb-4">Your password has been successfully changed</p>
                  <a href="/login" className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-6 rounded-xl hover:shadow-lg transition-all duration-300">
                    Go to Login
                  </a>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Back button */}
                  <div className="mb-6">
                    <a href="/forgot-password" className="flex items-center text-white/80 hover:text-white transition-colors duration-300">
                      <FaArrowLeft className="mr-2" />
                      Back to Login
                    </a>
                  </div>

                  {/* Form header */}
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-2">Reset Password</h2>
                    <p className="text-white/80">Enter your new password below</p>
                  </div>

                  {/* New password input */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaLock className="inline mr-2" /> New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Enter new password"
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
                    {errors.newPassword && (
                      <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                    )}

                    {/* Password strength indicator */}
                    {formData.newPassword && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white/80 text-sm">Password Strength</span>
                          <span className={`text-sm font-medium ${getStrengthColor(getPasswordStrength(formData.newPassword)).replace('bg-', 'text-')}`}>
                            {getStrengthText(getPasswordStrength(formData.newPassword))}
                          </span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(formData.newPassword))}`}
                            style={{ width: `${(getPasswordStrength(formData.newPassword) / 4) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm password input */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      <FaLock className="inline mr-2" /> Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 pl-12 pr-12 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:border-white/60 focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                        placeholder="Confirm new password"
                      />
                      <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
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

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {isLoading ? (
                      <>
                        <FaCircleNotch className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <FaCheck />
                        <span>Update Password</span>
                      </>
                    )}
                  </button>
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
                <p className="text-gray-700 font-medium">Updating your password...</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResetPassword;