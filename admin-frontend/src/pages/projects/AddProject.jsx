import React, { useState } from 'react';
import { Image as ImageIcon, Save, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; 

const AddProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  const [translations, setTranslations] = useState({
    en: { title: '', description: '' },
    ar: { title: '', description: '' },
    de: { title: '', description: '' },
    fr: { title: '', description: '' }
  });

  const [formData, setFormData] = useState({
    target_budget: '',
    image_url: ''
  });

  const handleTranslationChange = (field, value) => {
    setTranslations(prev => ({
      ...prev,
      [activeLang]: { ...prev[activeLang], [field]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formattedTranslations = Object.keys(translations).map(lang => ({
        language: lang,
        title: translations[lang].title,
        description: translations[lang].description
      }));

      const payload = {
        target_budget: formData.target_budget,
        image_url: formData.image_url,
        translations: formattedTranslations
      };

      // ملاحظة هامة: إذا كان الـ baseURL في axios ينتهي بـ /api/admin
      // نستخدم المسار '/projects' فقط لتجنب تكرار الكلمة في الرابط
      await api.post('/admin/projects', payload);
      
      alert('Project Published Successfully! 🎉');
      navigate('/projects');
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
      alert('Error: ' + (err.response?.data?.error || 'Failed to connect to server'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800">Create New Project</h1>
        <button type="button" onClick={() => navigate('/projects')} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all">
          <X size={24}/>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
              {['en', 'ar', 'de', 'fr'].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all 
                    ${activeLang === lang ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Project Title ({activeLang})</label>
                <input 
                  type="text" 
                  required
                  value={translations[activeLang].title}
                  onChange={(e) => handleTranslationChange('title', e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold text-slate-700" 
                  placeholder={`Enter title in ${activeLang.toUpperCase()}...`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Description ({activeLang})</label>
                <textarea 
                  rows="5" 
                  required
                  value={translations[activeLang].description}
                  onChange={(e) => handleTranslationChange('description', e.target.value)}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold text-slate-700" 
                  placeholder={`Enter details in ${activeLang.toUpperCase()}...`}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2">
              <ImageIcon size={18} className="text-green-500" /> Media & Budget
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Target Budget ($)</label>
                <input 
                  type="number" 
                  required
                  value={formData.target_budget}
                  onChange={(e) => setFormData({...formData, target_budget: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 ring-green-500/20" 
                  placeholder="0.00" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Project Image URL</label>
                <input 
                  type="text" 
                  required
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 ring-green-500/20" 
                  placeholder="https://images.unsplash.com/..." 
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#58c322] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-100 hover:bg-[#4aad1d] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Publish Project</>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProject;