import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react'; // تأكد من وجود مكتبة lucide-react

const HeroSliderClassic = ({ t, isRtl }) => {
  const [current, setCurrent] = useState(0);

  const colorMap = {
    'sweida-lime': { text: 'text-sweida-lime', bg: 'bg-sweida-lime' },
    'sweida-blue': { text: 'text-sweida-blue', bg: 'bg-sweida-blue' },
    'sweida-green': { text: 'text-sweida-green', bg: 'bg-sweida-green' }
  };

  const slides = [
    { id: 1, image: "/images/hero3.jpg", color: "sweida-lime", key: "slide1" },
    { id: 2, image: "/images/hero2.jpg", color: "sweida-blue", key: "slide2" },
    { id: 3, image: "/images/hero3.png", color: "sweida-green", key: "slide3" },
    { id: 4, image: "/images/hero4.png", color: "sweida-green", key: "slide4" }
  ];

  const nextSlide = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, []);

  const currentColors = colorMap[slides[current].color];

  return (
    <section className="relative h-screen w-full bg-black overflow-hidden group">
      
      {/* 1. خلفية الصورة مع تلاشي كلاسيكي ناعم */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <img src={slides[current].image} className="w-full h-full object-cover" alt="Hero Background" />
          {/* طبقة حماية سوداء بنسبة 50% لضمان وضوح النص الأبيض دائماً */}
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
      </AnimatePresence>

      {/* 2. المحتوى النصي (توسيط كلاسيكي) */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center px-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`text-${current}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="max-w-4xl flex flex-col items-center"
          >
            <span className={`inline-block ${currentColors.text} font-bold text-sm tracking-[0.2em] uppercase mb-6 drop-shadow-md`}>
              {t(`hero_slides.${slides[current].key}.tag`)}
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-xl">
              {t(`hero_slides.${slides[current].key}.title`)}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 font-normal leading-relaxed drop-shadow-md">
              {t(`hero_slides.${slides[current].key}.desc`)}
            </p>
            
            <Link 
              to="/projects" 
              // استخدام حواف مستطيلة قليلاً (rounded) بدلاً من الدائرية لتعزيز الطابع الكلاسيكي الرسمي
              className={`${currentColors.bg} text-black px-10 py-4 rounded font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg`}
            >
              {t('nav.projects')}
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. أسهم التنقل الجانبية (تظهر فقط عند تمرير الماوس) */}
      <button 
        onClick={prevSlide}
        className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'right-4 md:right-8' : 'left-4 md:left-8'} z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300`}
        aria-label="Previous Slide"
      >
        {isRtl ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
      </button>
      
      <button 
        onClick={nextSlide}
        className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-4 md:left-8' : 'right-4 md:right-8'} z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/30 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300`}
        aria-label="Next Slide"
      >
        {isRtl ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
      </button>

      {/* 4. نقاط التنقل السفلية (Classic Dots) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === index ? currentColors.bg + ' scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/40 hover:bg-white/70'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </section>
  );
};

export default HeroSliderClassic;