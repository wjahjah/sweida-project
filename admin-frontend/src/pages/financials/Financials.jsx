import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, RefreshCcw, Coins, ArrowUpRight, Clock, CheckCircle } from 'lucide-react';
import api from '../../api/axios';

const Financials = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFinancials = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/financials/summary');
      setData(res.data);
    } catch (err) { 
      console.error("Error fetching financial data:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchFinancials(); }, []);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#58c322]"></div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Financial Management</h1>
        <p className="text-slate-500 text-sm">Track donations, project allocations, and real-time currency rates.</p>
      </div>

      {/* 1. Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><DollarSign size={24}/></div>
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight size={12}/> +12%
            </span>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Raised</p>
          <h3 className="text-3xl font-black text-slate-800 mt-1">${data.totalRaised.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><TrendingUp size={24}/></div>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Allocated to Projects</p>
          <h3 className="text-3xl font-black text-slate-800 mt-1">${data.totalAllocated.toLocaleString()}</h3>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl shadow-slate-200 text-white border-none transform hover:scale-[1.02] transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/10 text-white rounded-2xl"><Coins size={24}/></div>
          </div>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Balance</p>
          <h3 className="text-3xl font-black mt-1">${data.balance.toLocaleString()}</h3>
        </div>
      </div>

      {/* 2. Exchange Rates Management */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl text-slate-800"><RefreshCcw size={18}/></div>
            <h2 className="text-xl font-black text-slate-800">Exchange Rates</h2>
          </div>
          <button onClick={fetchFinancials} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400">
            <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.currencies.map(curr => (
            <div key={curr.code} className="p-6 bg-slate-50/50 rounded-3xl border border-slate-100 flex justify-between items-center group hover:bg-white hover:shadow-sm transition-all">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{curr.name}</p>
                <p className="font-black text-slate-800 text-lg">{curr.code}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">Rate (vs USD)</p>
                <p className="font-black text-[#58c322] text-lg">{curr.exchange_rate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Latest Transactions Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 rounded-xl text-slate-800"><Clock size={18}/></div>
            <h2 className="text-xl font-black text-slate-800">Latest Transactions</h2>
          </div>
          <button className="text-[10px] font-black uppercase text-slate-400 hover:text-[#58c322] transition-colors">View All History</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                <th className="px-8 py-4">Project / Description</th>
                <th className="px-8 py-4">Amount</th>
                <th className="px-8 py-4">Date</th>
                <th className="px-8 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {/* ملاحظة: هذه البيانات يمكن جلبها من API منفصل أو دمجها في السمرى */}
              <tr className="hover:bg-slate-50/80 transition-all group">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 text-sm">Water Wells Construction</span>
                    <span className="text-[10px] text-slate-400 font-medium">One-time Donation</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="font-black text-green-600 text-sm">+$500.00</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-slate-500 text-xs font-bold">Mar 24, 2026</span>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    <CheckCircle size={10}/> Success
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-all">
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-700 text-sm">Vocational Training Center</span>
                    <span className="text-[10px] text-slate-400 font-medium">Monthly Subscription</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="font-black text-green-600 text-sm">+$120.00</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-slate-500 text-xs font-bold">Mar 23, 2026</span>
                </td>
                <td className="px-8 py-5 text-center">
                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    <CheckCircle size={10}/> Success
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="p-6 bg-slate-50/30 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">End of recent activities</p>
        </div>
      </div>
    </div>
  );
};

export default Financials;