import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Award, Calendar, X, Loader2, Trash2, UploadCloud } from 'lucide-react';
import api from '../../api/axios';
import { useTranslation } from 'react-i18next';

const Team = () => {
  const { i18n } = useTranslation();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('en'); // لغة التبويب النشط في النافذة المنبثقة

  // 1. حالات رفع الصورة
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // 2. البيانات الأساسية للعضو (بدون الاسم لأنه أصبح من ضمن الترجمات)
  const [newMember, setNewMember] = useState({
    email: '',
    designation: '',
    joining_date: new Date().toISOString().split('T')[0],
    initial_contribution: ''
  });

  // 3. حالة الترجمات (الاسم والنبذة بـ 4 لغات)
  const [translations, setTranslations] = useState({
    en: { display_name: '', bio: '' },
    ar: { display_name: '', bio: '' },
    de: { display_name: '', bio: '' },
    fr: { display_name: '', bio: '' }
  });

  // جلب أعضاء الفريق باللغة المحددة حالياً في لوحة التحكم
  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/team?lang=${i18n.language || 'en'}`);
      setTeam(res.data);
    } catch (err) { console.error(err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, [i18n.language]);

  // حذف عضو
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
        await api.delete(`/admin/team/${id}`);
        setTeam(team.filter(member => member.id !== id));
      } catch (error) { alert("Failed to delete member"); }
    }
  };

  // اختيار الصورة لمعاينتها قبل الرفع
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // إرسال البيانات (إضافة العضو)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // تصفية اللغات التي تم إدخال اسم فيها فقط
      const activeTranslations = Object.keys(translations)
        .filter(lang => translations[lang].display_name.trim() !== '')
        .map(lang => ({
          language: lang,
          display_name: translations[lang].display_name,
          bio: translations[lang].bio
        }));

      if (activeTranslations.length === 0) {
        alert("Please provide the name in at least one language.");
        setSaving(false);
        return;
      }

      // تحويل البيانات إلى FormData لدعم رفع الملفات الحقيقية
      const submitData = new FormData();
      submitData.append('email', newMember.email);
      submitData.append('designation', newMember.designation);
      submitData.append('joining_date', newMember.joining_date);
      submitData.append('initial_contribution', newMember.initial_contribution || 0);
      submitData.append('translations', JSON.stringify(activeTranslations)); // إرسال اللغات كنص JSON
      
      if (imageFile) {
        submitData.append('image', imageFile); // إرفاق الصورة
      }

      await api.post('/admin/team', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // إغلاق النافذة وتصفير البيانات بعد النجاح
      setShowModal(false);
      setImageFile(null);
      setImagePreview(null);
      setNewMember({ email: '', designation: '', joining_date: '', initial_contribution: '' });
      setTranslations({
        en: { display_name: '', bio: '' }, ar: { display_name: '', bio: '' },
        de: { display_name: '', bio: '' }, fr: { display_name: '', bio: '' }
      });
      fetchTeam(); 
    } catch (err) {
      alert("Error adding member. Please try again.");
    } finally { setSaving(false); }
  };

  // دالة عرض الصورة بشكل صحيح
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url;
    const backendOrigin = api.defaults.baseURL ? new URL(api.defaults.baseURL).origin : 'http://localhost:5000';
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    return `${backendOrigin}${cleanUrl}`;
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#58c322]" size={40} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">Team & Founders</h1>
          <p className="text-slate-500 text-sm">Manage organization members and founding details.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-[#58c322] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-100 hover:bg-[#4aad1d] transition-all"
        >
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      {/* عرض بطاقات الأعضاء */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => {
          const displayName = member.display_name || member.email.split('@')[0];
          const initial = displayName.charAt(0).toUpperCase();
          const avatarUrl = getImageUrl(member.avatar_url);

          return (
            <div key={member.id} className="bg-white rounded-[2.5rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all relative group">
              <button 
                onClick={() => handleDelete(member.id)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-xl font-black text-slate-400 overflow-hidden">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  ) : initial}
                </div>
                <div>
                  <h3 className="font-black text-slate-800 truncate">{displayName}</h3>
                  <p className="text-xs font-bold text-[#58c322] uppercase tracking-wider">
                    {member.designation || (member.role_name && member.role_name.replace('_', ' '))}
                  </p>
                </div>
              </div>
              <div className="space-y-3 border-t border-slate-50 pt-4 text-sm text-slate-500">
                <div className="flex items-center gap-3"><Mail size={16} /> <span className="truncate">{member.email}</span></div>
                <div className="flex items-center gap-3">
                  <Calendar size={16} /> Joined {member.joining_date ? new Date(member.joining_date).toLocaleDateString() : 'N/A'}
                </div>
                {member.initial_contribution > 0 && (
                  <div className="bg-slate-50 p-3 rounded-xl font-bold text-slate-700 flex items-center gap-2 mt-2">
                    <Award size={16} className="text-amber-500" /> Contribution: ${Number(member.initial_contribution).toLocaleString()}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* نافذة الإضافة المحدثة (Modal) */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden my-8">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><UserPlus size={24} className="text-[#58c322]" /> New Team Member</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:bg-white rounded-full transition-all"><X /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* القسم الأيمن: اللغات */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto">
                  {['en', 'ar', 'de', 'fr'].map((lang) => (
                    <button
                      key={lang} type="button" onClick={() => setActiveLang(lang)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                        ${activeLang === lang ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                    >
                      {lang}
                      {translations[lang].display_name.trim() !== '' && <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Name ({activeLang})</label>
                    <input 
                      type="text" 
                      value={translations[activeLang].display_name}
                      onChange={(e) => setTranslations(prev => ({...prev, [activeLang]: {...prev[activeLang], display_name: e.target.value}}))}
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold text-slate-700" 
                      placeholder={`Member Name in ${activeLang.toUpperCase()}`} 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Bio ({activeLang})</label>
                    <textarea 
                      rows="4"
                      value={translations[activeLang].bio}
                      onChange={(e) => setTranslations(prev => ({...prev, [activeLang]: {...prev[activeLang], bio: e.target.value}}))}
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold text-slate-700" 
                      placeholder={`Short biography in ${activeLang.toUpperCase()}`} 
                    />
                  </div>
                </div>
              </div>

              {/* القسم الأيسر: الصورة والبيانات الأساسية */}
              <div className="space-y-4 bg-slate-50/50 p-6 rounded-3xl border border-slate-50">
                
                {/* رفع الصورة */}
                <div className="flex flex-col items-center justify-center space-y-2 mb-4">
                  <div className="relative w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 overflow-hidden hover:border-[#58c322] transition-colors group bg-white">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                        <UploadCloud size={24} className="group-hover:text-[#58c322] transition-colors" />
                        <span className="text-[10px] font-bold mt-1">Upload</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Profile Picture</span>
                </div>

                <input 
                  type="email" placeholder="Email Address (Required)" required
                  className="w-full p-4 bg-white border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold"
                  value={newMember.email}
                  onChange={e => setNewMember({...newMember, email: e.target.value})}
                />
                
                <input 
                  type="text" placeholder="Designation (e.g. CEO, Director)" required
                  className="w-full p-4 bg-white border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold"
                  value={newMember.designation}
                  onChange={e => setNewMember({...newMember, designation: e.target.value})}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Join Date</label>
                    <input 
                      type="date" required
                      className="w-full p-4 bg-white rounded-2xl outline-none font-bold text-sm text-slate-600"
                      value={newMember.joining_date}
                      onChange={e => setNewMember({...newMember, joining_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Initial $</label>
                    <input 
                      type="number" placeholder="0.00"
                      className="w-full p-4 bg-white rounded-2xl outline-none font-bold text-sm"
                      value={newMember.initial_contribution}
                      onChange={e => setNewMember({...newMember, initial_contribution: e.target.value})}
                    />
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-slate-200">
                  <button 
                    type="submit" disabled={saving}
                    className="w-full bg-[#58c322] text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-[#4aad1d] transition-all flex items-center justify-center gap-2"
                  >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : "Publish Member"}
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;