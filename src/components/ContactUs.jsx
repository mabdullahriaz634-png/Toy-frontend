import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your backend submission or API logic here
    console.log('Toy Box Contact Form Data:', formData);
    setIsSubmitted(true);
  };

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 grid grid-cols-1 md:grid-cols-5">
        
        {/* Left Info Panel (Toy Box Branding) */}
        <div className="bg-gradient-to-br from-amber-400 via-orange-400 to-pink-500 p-8 md:col-span-2 text-white flex flex-col justify-between">
          <div>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide inline-block mb-4 shadow-sm">
              Get in Touch
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mb-2">
              Toy Box Support 🧸
            </h2>
            <p className="text-amber-100 text-sm leading-relaxed mb-6">
              Have questions about an order, tracking, or need help picking the best gift? We’re here to help!
            </p>

            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📍</span>
                <span>Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">📞</span>
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">✉️</span>
                <span>support@toybox.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xl">🚚</span>
                <span>Fast Delivery Across Pakistan</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 text-xs text-amber-100">
            Support Hours: Mon – Sat (9:00 AM – 6:00 PM)
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 md:col-span-3 bg-white flex flex-col justify-center">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-2">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Message Received!</h3>
              <p className="text-slate-600 text-sm max-w-sm">
                Thank you for reaching out to Toy Box. Our support team will get back to you shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="mt-4 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl text-sm transition-colors shadow-md"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                We'd Love to Hear From You!
              </h3>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ali Ahmed"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-sm text-slate-700 transition"
                />
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ali@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-sm text-slate-700 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0300 1234567"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-sm text-slate-700 transition"
                  />
                </div>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-sm text-slate-700 transition bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Tracking">Order Tracking & Status</option>
                  <option value="Returns & Refunds">Returns & Refunds</option>
                  <option value="Product Question">Toy Recommendations</option>
                </select>
              </div>

              {/* Message Box */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help make playtime better?"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none text-sm text-slate-700 transition resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition duration-200 text-sm tracking-wide cursor-pointer"
              >
                Send Message 🚀
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};

export default ContactUs;