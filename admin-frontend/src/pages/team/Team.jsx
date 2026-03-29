import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Award, Calendar, X, Loader2, MoreHorizontal } from 'lucide-react';
import api from '../../api/axios';

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // حالة النموذج الجديد
  const [newMember, setNewMember] = useState({
    email: '',
    display_name: '',
    designation: '',
    joining_date: new Date().toISOString().split('T')[0],
    initial_contribution: 0,
    is_founder: true
  });

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/team');
      setTeam(res.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post('/admin/team', newMember);
      setShowModal(false);
      fetchTeam(); // تحديث القائمة
      setNewMember({ email: '', display_name: '', designation: '', joining_date: '', initial_contribution: 0, is_founder: true });
    } catch (err) {
      alert("خطأ في إضافة العضو");
    } finally { setSaving(false); }
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-green-500" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Team & Founders</h1>
          <p className="text-slate-500 text-sm">إدارة أعضاء المؤسسة وتفاصيل التأسيس.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#58c322] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 hover:bg-[#4aad1d] transition-all"
        >
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      {/* شبكة عرض الأعضاء */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-slate-300">
                {member.display_name[0]}
              </div>
              <div>
                <h3 className="font-black text-slate-800">{member.display_name}</h3>
                <p className="text-xs font-bold text-[#58c322] uppercase tracking-wider">{member.designation}</p>
              </div>
            </div>
            <div className="space-y-3 border-t border-slate-50 pt-4 text-sm text-slate-500">
              <div className="flex items-center gap-3"><Mail size={16} /> {member.email}</div>
              <div className="flex items-center gap-3"><Calendar size={16} /> Joined {new Date(member.joining_date).toLocaleDateString()}</div>
              {member.initial_contribution > 0 && (
                <div className="bg-slate-50 p-3 rounded-xl font-bold text-slate-700 flex items-center gap-2">
                  <Award size={16} className="text-amber-500" /> Contribution: ${member.initial_contribution}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal إضافة عضو جديد */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-800">New Team Member</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <input 
                type="text" placeholder="Full Name" required
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold"
                value={newMember.display_name}
                onChange={e => setNewMember({...newMember, display_name: e.target.value})}
              />
              <input 
                type="email" placeholder="Email Address" required
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold"
                value={newMember.email}
                onChange={e => setNewMember({...newMember, email: e.target.value})}
              />
              <input 
                type="text" placeholder="Designation (e.g. Director)" required
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold"
                value={newMember.designation}
                onChange={e => setNewMember({...newMember, designation: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="date" required
                  className="p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm"
                  value={newMember.joining_date}
                  onChange={e => setNewMember({...newMember, joining_date: e.target.value})}
                />
                <input 
                  type="number" placeholder="Contribution $"
                  className="p-4 bg-slate-50 rounded-2xl outline-none font-bold text-sm"
                  value={newMember.initial_contribution}
                  onChange={e => setNewMember({...newMember, initial_contribution: e.target.value})}
                />
              </div>
              <button 
                type="submit" disabled={saving}
                className="w-full bg-[#58c322] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-[#4aad1d] transition-all flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="animate-spin" size={20} /> : "Save Member"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;