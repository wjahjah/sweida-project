import React from 'react';
import { TrendingUp, Users, FolderKanban, DollarSign } from 'lucide-react';

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm shadow-slate-200/50">
    <div className={`${color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white`}>
      {icon}
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</p>
    <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Projects" value="24" icon={<FolderKanban />} color="bg-blue-500" />
        <StatCard title="Active Donors" value="158" icon={<DollarSign />} color="bg-sweida-green" />
        <StatCard title="Team Members" value="12" icon={<Users />} color="bg-purple-500" />
        <StatCard title="Engagement" value="+12%" icon={<TrendingUp />} color="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-[300px]">
          <h3 className="font-black text-slate-800 mb-6">Recent Projects</h3>
          <p className="text-slate-400 text-sm">List of the last 5 projects added...</p>
          {/* هنا سنضيف جدول المشاريع لاحقاً */}
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 min-h-[300px]">
          <h3 className="font-black text-slate-800 mb-6">Latest Donations</h3>
          <p className="text-slate-400 text-sm">Real-time update of donations...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;