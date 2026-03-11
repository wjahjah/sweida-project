import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
 import Header from './components/Header';
import Footer from './components/Footer';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import HomePage from './pages/HomePage';
import SuggestProject from './pages/SuggestProject';
import MonthlySupport from './pages/Support';

import './i18n';

// استيراد الصفحات (تأكد من وجود صفحة SupportPage و ImpactPage)
import VisionPage from './pages/VisionPage';
import ProjectsPage from './pages/ProjectsPage';

function App() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // مراقبة التمرير لتغيير خلفية الهيدر
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    return () => window.removeEventListener('scroll', handleScroll);
  }, [i18n.language, isAr]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // مصفوفة الروابط الموحدة لمطابقة روابط الموقع
  const navLinks = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.projects', path: '/projects' },
    { key: 'nav.vision', path: '/vision' },
    { key: 'nav.statistics', path: '/impact' },
    { key: 'suggest.title', path: '/suggest' },
    { key: 'nav.contact', path: '/contact' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-logo-green selection:text-white">
        
        {/* Navigation Bar */}
         <Header />

        {/* Page Content */}
        <main className="pt-[130px]">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
              <Route path="/vision" element={<VisionPage />} />
              <Route path="/suggest" element={<SuggestProject />} />
              <Route path="/monthly-support" element={<MonthlySupport />} />
           
 
            {/* أضف المسارات الأخرى هنا */}
          </Routes>
        </main>

        {/* Footer */}
    <Footer />
      </div>
    </Router>
  );
}

export default App;