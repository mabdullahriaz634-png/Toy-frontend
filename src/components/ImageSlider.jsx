import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Up to 50% OFF on Selected Toys",
    subtitle: "Discover magical playtime experiences for kids of all ages.",
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=1200",
    buttonText: "Shop Discount",
    badge: "🔥 Hot Deal"
  },
  {
    id: 2,
    title: "New Educational & STEM Kits",
    subtitle: "Inspire young minds with fun and engaging learning sets.",
    image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=80&w=1200",
    buttonText: "Explore STEM",
    badge: "🧸 New Arrival"
  },
  {
    id: 3,
    title: "Remote Control & Action Cars",
    subtitle: "Built for speed, durability, and non-stop adventure.",
    image: "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&q=80&w=1200",
    buttonText: "Browse Action Toys",
    badge: "⚡ Best Seller"
  }
];

export default function ToyBoxSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Speed increase: Interval set to 2500ms (2.5 seconds)
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slider Container */}
      <div className="relative h-[380px] sm:h-[480px] md:h-[520px] lg:h-[580px] w-full overflow-hidden rounded-3xl shadow-2xl bg-slate-900">
        
        {/* Slides Track */}
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              /* Speed increase: duration-500 (faster fade transition) */
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                isActive ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Overlay */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20 text-white max-w-2xl">
                <span className="inline-block w-max bg-amber-400 text-slate-900 text-xs sm:text-sm font-bold px-3 py-1 rounded-full mb-3 shadow-md">
                  {slide.badge}
                </span>
                
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                  {slide.title}
                </h2>
                
                <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-200 line-clamp-2 sm:line-clamp-none">
                  {slide.subtitle}
                </p>

                <div className="mt-6">
                  <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-indigo-500/50 active:scale-95 text-sm sm:text-base">
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Play / Pause & Indicators Bar */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          
          {/* Play/Pause Toggle */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-white/80 hover:text-white transition-colors"
            title={isPlaying ? "Pause auto-play" : "Play auto-play"}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <div className="h-4 w-[1px] bg-white/20" />

          {/* Dots Navigation */}
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-7 bg-amber-400'
                    : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}