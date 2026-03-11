import React from 'react';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8fafc]" dir="ltr">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-slate-400 text-xs font-black uppercase tracking-widest">Overview</h2>
            <h1 className="text-2xl font-black text-slate-800">Management Panel</h1>
          </div>
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-slate-100">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">A</div>
            <span className="text-sm font-bold text-slate-700">Super Admin</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;