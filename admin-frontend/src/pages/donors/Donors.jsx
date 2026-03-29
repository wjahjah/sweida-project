import React, { useState, useEffect } from 'react';
import { Users, CreditCard, Search, Ban, CheckCircle, Calendar, MoreVertical, Loader2 } from 'lucide-react';
import api from '../../api/axios';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('donors');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const [donorsRes, subsRes] = await Promise.all([
        api.get('/admin/donors'),
        api.get('/admin/subscriptions')
      ]);
      setDonors(donorsRes.data);
      setSubscriptions(subsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // دالة لتغيير حالة المتبرع (حظر أو تفعيل)
  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    if (window.confirm(`Are you sure you want to set this user to ${newStatus}?`)) {
      try {
        await api.patch(`/admin/donors/${id}/status`, { status: newStatus });
        fetchData(); // تحديث البيانات بعد التغيير
      } catch (err) {
        alert("Failed to update status");
      }
    }
  };

  // تصفية البيانات بناءً على البحث
  const filteredDonors = donors.filter(d => 
    d.display_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="animate-spin text-green-500" size={40} />
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Donors & Subscriptions</h1>
          <p className="text-slate-500 text-sm">Review and manage self-registered supporters.</p>
        </div>

        {/* نظام التبويب */}
        <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
          <button onClick={() => setActiveTab('donors')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${activeTab === 'donors' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>
            Donors List
          </button>
          <button onClick={() => setActiveTab('subs')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase transition-all ${activeTab === 'subs' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400'}`}>
            Active Subs
          </button>
        </div>
      </div>

      {/* شريط البحث والإحصائيات */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-green-500/10 font-bold text-sm"
          />
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 flex items-center gap-4">
          <Users className="text-green-500" />
          <span className="text-sm font-bold text-slate-500">Total: {donors.length}</span>
        </div>
        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 flex items-center gap-4">
          <CreditCard className="text-blue-500" />
          <span className="text-sm font-bold text-slate-500">Subs: {subscriptions.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400">
              <th className="px-6 py-4">{activeTab === 'donors' ? 'Donor Name' : 'Subscriber'}</th>
              <th className="px-6 py-4">Contact Info</th>
              <th className="px-6 py-4">{activeTab === 'donors' ? 'Total Donated' : 'Plan'}</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {activeTab === 'donors' ? (
              filteredDonors.map(donor => (
                <tr key={donor.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-4 font-bold text-slate-700">{donor.display_name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{donor.email}</td>
                  <td className="px-6 py-4 font-black text-green-600">${Number(donor.total_donated).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${donor.status === 'ACTIVE' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleStatusChange(donor.id, donor.status)}
                      className={`p-2 rounded-lg transition-all ${donor.status === 'ACTIVE' ? 'text-slate-300 hover:text-red-500 hover:bg-red-50' : 'text-red-500 hover:text-green-500 hover:bg-green-50'}`}
                      title={donor.status === 'ACTIVE' ? 'Suspend User' : 'Activate User'}
                    >
                      {donor.status === 'ACTIVE' ? <Ban size={18} /> : <CheckCircle size={18} />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              subscriptions.map(sub => (
                <tr key={sub.id} className="hover:bg-slate-50/50 transition-all">
                  <td className="px-6 py-4 font-bold text-slate-700">{sub.display_name}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{sub.email}</td>
                  <td className="px-6 py-4 font-black text-blue-600">${Number(sub.monthly_amount).toLocaleString()}/mo</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <Calendar size={14} /> {new Date(sub.next_billing_date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-slate-300"><MoreVertical size={16} className="mx-auto" /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Donors;