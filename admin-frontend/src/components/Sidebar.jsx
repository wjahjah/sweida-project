import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  HeartHandshake, 
  ShieldCheck, 
  History,     
  Coins,       
  LogOut,
  Menu, // أيقونة فتح القائمة للموبايل
  X     // أيقونة إغلاق القائمة للموبايل
} from 'lucide-react';

const Sidebar = () => {
  // حالة التحكم بفتح وإغلاق القائمة في الموبايل
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Projects', icon: <Briefcase size={20} />, path: '/projects' },
    { name: 'Donors & Subs', icon: <HeartHandshake size={20} />, path: '/donors' },
    { name: 'Team & Founders', icon: <Users size={20} />, path: '/team' },
    { name: 'Financials', icon: <Coins size={20} />, path: '/currencies' },
    { name: 'Roles & Permissions', icon: <ShieldCheck size={20} />, path: '/roles' },
    { name: 'Audit Logs', icon: <History size={20} />, path: '/audit-logs' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <>
      {/* 1. زر فتح القائمة (يظهر فقط في الموبايل) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-white rounded-xl shadow-md text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Menu size={24} />
      </button>

      {/* 2. خلفية التظليل للموبايل (تغلق القائمة عند الضغط عليها) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 3. القائمة الجانبية */}
      <aside className={`
        w-64 bg-white h-screen border-r border-slate-100 flex flex-col 
        fixed lg:sticky top-0 z-50 overflow-y-auto transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}>
        <div className="p-8 flex-1">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sweida-green rounded-xl flex items-center justify-center text-white font-bold">S</div>
              <span className="font-black text-slate-800 tracking-tighter text-xl uppercase">Sweida Fund</span>
            </div>
            
            {/* زر إغلاق القائمة من الداخل (يظهر فقط في الموبايل) */}
            <button 
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-700 bg-slate-50 p-1.5 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-4">Main Menu</p>
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)} // إغلاق القائمة تلقائياً عند اختيار صفحة في الموبايل
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-sm transition-all
                  ${isActive 
                    ? 'bg-sweida-green text-white shadow-lg shadow-sweida-green/20' 
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}
                `}
              >
                {item.icon}
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-50">
          <div className="bg-slate-50 p-4 rounded-2xl mb-4">
            <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">System Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <p className="text-xs font-bold text-slate-700">Server Online</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3 w-full text-red-400 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;