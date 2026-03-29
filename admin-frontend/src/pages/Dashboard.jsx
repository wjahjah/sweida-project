import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { 
  DollarSign, 
  Folder, 
  Users, 
  ShieldCheck, 
  Loader2, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import api from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/admin/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-[#58c322]" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
    

      <div>
        <h2 className="text-2xl font-black text-slate-800">Global Overview</h2>
        <p className="text-slate-500 text-sm">
          Welcome back, Super Admin. Here is what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Donations" 
          value={`$${Number(stats?.totalDonations || 0).toLocaleString()}`} 
          change="12.5" 
          icon={DollarSign} 
          trend="up" 
        />
        <StatsCard 
          title="Active Projects" 
          value={stats?.activeProjects || 0} 
          change="2" 
          icon={Folder} 
          trend="up" 
        />
        <StatsCard 
          title="Total Donors" 
          value={Number(stats?.totalDonors || 0).toLocaleString()} 
          change="5.4" 
          icon={Users} 
          trend="up" 
        />
        <StatsCard 
          title="Pending Approvals" 
          value={stats?.pendingApprovals || 0} 
          change="0" 
          icon={ShieldCheck} 
          trend="down" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Projects Section */}
        <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-800">Recent Projects</h2>
            <Link 
              to="/projects" 
              className="text-[#58c322] text-sm font-black uppercase tracking-wider hover:underline flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats?.recentProjects?.length > 0 ? (
              stats.recentProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-50 hover:border-green-100 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#58c322] font-black text-xs">
                      #{project.id}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{project.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter 
                          ${project.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-700">
                      ${Number(project.target_budget).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Target</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-10 text-center border-2 border-dashed border-slate-50 rounded-3xl">
                <p className="text-slate-400 font-bold">No recent projects found.</p>
              </div>
            )}
          </div>
        </div>

        {/* System Audit Logs Section */}
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-black text-slate-800 mb-6">System Audit Logs</h2>
          <div className="space-y-6">
            {/* Example Log Item */}
            <div className="relative pl-6 border-l-2 border-slate-100 space-y-1">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-[#58c322]"></div>
              <p className="text-sm font-bold text-slate-700">Founder approved "Water Wells"</p>
              <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                <Clock size={10} />
                <span>2 hours ago</span>
              </div>
            </div>

            <div className="relative pl-6 border-l-2 border-slate-100 space-y-1">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-blue-400"></div>
              <p className="text-sm font-bold text-slate-700">New donor registration: John Doe</p>
              <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                <Clock size={10} />
                <span>5 hours ago</span>
              </div>
            </div>

            <button className="w-full py-3 text-[10px] font-black uppercase text-slate-400 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
              View Full Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;