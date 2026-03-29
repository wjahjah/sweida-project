import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSlider = ({ t, isRtl }) => {
  const [current, setCurrent] = useState(0);

  // 1. خريطة الألوان لضمان قراءة Tailwind للأصناف كاملة
  const colorMap = {
    'sweida-lime': {
      text: 'text-sweida-lime',
      bg: 'bg-sweida-lime',
      border: 'border-sweida-lime'
    },
    'sweida-blue': {
      text: 'text-sweida-blue',
      bg: 'bg-sweida-blue',
      border: 'border-sweida-blue'
    },
    'sweida-green': {
      text: 'text-sweida-green',
      bg: 'bg-sweida-green',
      border: 'border-sweida-green'
    }
  };

  const slides = [
    { id: 1, image: "/images/hero3.jpg", color: "sweida-lime", key: "slide1" },
    { id: 2, image: "/images/hero2.jpg", color: "sweida-blue", key: "slide2" },
    { id: 3, image: "/images/hero3.png", color: "sweida-green", key: "slide3" },
    { id: 4, image: "/images/hero4.png", color: "sweida-green", key: "slide4" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // الحصول على أصناف اللون الحالي
  const currentColors = colorMap[slides[current].color];

  return (
    <section className="relative h-screen w-full bg-sweida-dark overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0, clipPath: 'circle(0% at 50% 50%)' }}
          animate={{ opacity: 0.4, clipPath: 'circle(100% at 50% 50%)' }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 z-0"
        >
          <img src={slides[current].image} className="w-full h-full object-cover" alt="Hero" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-sweida-dark"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 container mx-auto h-full flex items-center px-6 md:px-16">
        <div className={`grid lg:grid-cols-2 w-full items-center gap-12 ${isRtl ? 'text-right' : 'text-left'}`}>
          
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${current}`}
                initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
              >
                {/* استخدام currentColors.text الصنف الكامل */}
                <span className={`block ${currentColors.text} font-black text-[10px] tracking-[0.4em] uppercase mb-4`}>
                  {t(`hero_slides.${slides[current].key}.tag`)}
                </span>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tighter">
                   {t(`hero_slides.${slides[current].key}.title`)}
                </h1>
                
                <p className="text-sm md:text-base text-white/50 max-w-sm mb-10 font-medium leading-loose">
                  {t(`hero_slides.${slides[current].key}.desc`)}
                </p>
                
                <div className="flex gap-4">
                  <Link to="/projects" className={`${currentColors.bg} text-sweida-dark px-8 py-3 rounded-full font-black text-xs hover:scale-105 transition-all shadow-xl`}>
                    {t('nav.projects')}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* الجزء الدائري المتحرك */}
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="relative w-56 h-56 md:w-80 md:h-80 border border-white/5 rounded-full flex items-center justify-center"
            >
              <div className="absolute inset-4 border border-dashed border-white/10 rounded-full"></div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`thumb-${current}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ duration: 0.8 }}
                  className="w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl"
                >
                  <img src={slides[current].image} className="w-full h-full object-cover" alt="Thumb" />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* شريط التقدم السفلي */}
      <div className={`absolute bottom-12 ${isRtl ? 'right-16' : 'left-16'} flex gap-4 items-center`}>
        <span className="text-white font-black text-sm">0{current + 1}</span>
        <div className="w-12 h-[1px] bg-white/10 relative">
          <motion.div 
            key={current}
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 7, ease: "linear" }}
            className={`absolute h-full ${currentColors.bg}`}
          />
        </div>
        <span className="text-white/20 font-bold text-[10px]">0{slides.length}</span>
      </div>
    </section>
  );
};

export default HeroSlider;