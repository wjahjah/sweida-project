import React, { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, UserCheck, Settings, Lock } from 'lucide-react';
import api from '../../api/axios';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get('/admin/roles');
        setRoles(res.data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchRoles();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-slate-400">Loading Roles...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-800">Roles & Permissions</h1>
        <p className="text-slate-500 text-sm">Define what each administrator can see and do.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${role.name === 'Super Admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                {role.name === 'Super Admin' ? <ShieldAlert size={24} /> : <ShieldCheck size={24} />}
              </div>
              <span className="text-[10px] font-black bg-slate-50 text-slate-400 px-3 py-1 rounded-lg">
                {role.user_count} Users
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-800 mb-2">{role.name}</h3>
            <p className="text-slate-400 text-xs mb-6 font-medium leading-relaxed">
              Standard capabilities for {role.name.toLowerCase()} including management and reporting.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <Lock size={12} /> Full System Access
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500">
                <Settings size={12} /> Manage Financials
              </div>
            </div>

            <button className="w-full py-3 rounded-2xl bg-slate-50 text-slate-600 font-black text-[10px] uppercase tracking-widest hover:bg-[#58c322] hover:text-white transition-all">
              Edit Permissions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roles;