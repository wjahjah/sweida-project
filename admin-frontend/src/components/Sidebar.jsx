import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  HeartHandshake, 
  Settings, 
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Projects', icon: <Briefcase size={20} />, path: '/projects' },
    { name: 'Donors', icon: <HeartHandshake size={20} />, path: '/donors' },
    { name: 'Team', icon: <Users size={20} />, path: '/team' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-white h-screen border-r border-slate-100 flex flex-col sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10">
          <img src="/images/sweida-logo.png" className="w-10" alt="Logo" />
          <span className="font-black text-slate-800 tracking-tighter text-xl">ADMIN</span>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
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

      <div className="p-8 border-t border-slate-50 mt-auto">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-4 px-4 py-3 w-full text-red-400 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;