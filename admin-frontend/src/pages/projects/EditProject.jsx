import React, { useState, useEffect } from 'react';
import { Save, X, Loader2, Image as ImageIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

const EditProject = () => {
  const { id } = useParams(); // جلب معرف المشروع من الرابط
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // لانتظار جلب البيانات
  const [saving, setSaving] = useState(false); // لحالة زر الحفظ
  const [activeLang, setActiveLang] = useState('en');

  const [formData, setFormData] = useState({ target_budget: '', image_url: '', status: '' });
  const [translations, setTranslations] = useState({
    en: { title: '', description: '' },
    ar: { title: '', description: '' },
    de: { title: '', description: '' },
    fr: { title: '', description: '' }
  });

  // 1. جلب بيانات المشروع عند تحميل الصفحة
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/admin/projects/${id}`);
        const project = res.data;

        setFormData({
          target_budget: project.target_budget,
          image_url: project.image_url,
          status: project.status
        });

        // توزيع الترجمات القادمة من الباكيند على الـ State
        const newTrans = { ...translations };
        project.translations.forEach(t => {
          if (newTrans[t.language]) {
            newTrans[t.language] = { title: t.title, description: t.description };
          }
        });
        setTranslations(newTrans);
      } catch (err) {
        console.error(err);
        alert("Failed to load project data");
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // 2. معالجة تحديث البيانات
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        translations: Object.keys(translations).map(lang => ({
          language: lang,
          ...translations[lang]
        }))
      };
      await api.put(`/admin/projects/${id}`, payload);
      alert("Project updated successfully! ✨");
      navigate('/projects');
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={48} />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800">Edit Project #{id}</h1>
        <button type="button" onClick={() => navigate('/projects')} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all">
          <X size={24}/>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              {['en', 'ar', 'de', 'fr'].map(lang => (
                <button key={lang} type="button" onClick={() => setActiveLang(lang)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all 
                  ${activeLang === lang ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-50'}`}>
                  {lang}
                </button>
              ))}
            </div>

            <input 
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none ring-blue-500/20 focus:ring-2"
              value={translations[activeLang].title}
              onChange={e => setTranslations({...translations, [activeLang]: {...translations[activeLang], title: e.target.value}})}
              placeholder={`Title (${activeLang})`} 
            />
            <textarea 
              rows="6"
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none ring-blue-500/20 focus:ring-2"
              value={translations[activeLang].description}
              onChange={e => setTranslations({...translations, [activeLang]: {...translations[activeLang], description: e.target.value}})}
              placeholder={`Description (${activeLang})`}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black flex items-center gap-2"><ImageIcon size={18}/> Settings</h3>
            
            <select 
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none"
            >
              <option value="ACTIVE">Active</option>
              <option value="PENDING_APPROVAL">Pending</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            <input 
              type="number"
              value={formData.target_budget}
              onChange={e => setFormData({...formData, target_budget: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none"
              placeholder="Budget"
            />
            
            <input 
              type="text"
              value={formData.image_url}
              onChange={e => setFormData({...formData, image_url: e.target.value})}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold outline-none"
              placeholder="Image URL"
            />

            <button 
              type="submit" 
              disabled={saving}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProject;