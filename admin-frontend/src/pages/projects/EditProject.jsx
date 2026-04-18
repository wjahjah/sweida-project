import React, { useState, useEffect } from 'react';
import { Save, X, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/axios';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  const [formData, setFormData] = useState({ target_budget: '', status: '' });
  
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [translations, setTranslations] = useState({
    en: { title: '', description: '' },
    ar: { title: '', description: '' },
    de: { title: '', description: '' },
    fr: { title: '', description: '' }
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/admin/projects/${id}`);
        const project = res.data;

        setFormData({
          target_budget: project.target_budget,
          status: project.status
        });
        setCurrentImageUrl(project.image_url);

        const newTrans = { ...translations };
        if (project.translations) {
          project.translations.forEach(t => {
            if (newTrans[t.language]) {
              newTrans[t.language] = { title: t.title, description: t.description };
            }
          });
        }
        setTranslations(newTrans);
      } catch (err) {
        alert("Failed to load project data");
        navigate('/projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const activeTranslations = Object.keys(translations)
        .filter(lang => translations[lang].title.trim() !== '')
        .map(lang => ({
          language: lang,
          title: translations[lang].title,
          description: translations[lang].description
        }));

      const submitData = new FormData();
      submitData.append('target_budget', formData.target_budget);
      submitData.append('status', formData.status);
      submitData.append('translations', JSON.stringify(activeTranslations));

      if (imageFile) {
        submitData.append('image', imageFile); // صورة جديدة
      } else if (currentImageUrl) {
        submitData.append('image_url', currentImageUrl); // الاحتفاظ بالصورة القديمة
      }

      await api.put(`/admin/projects/${id}`, submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      alert("Project updated successfully! ✨");
      navigate('/projects');
    } catch (err) {
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const getDisplayImageUrl = () => {
    if (imagePreview) return imagePreview;
    if (!currentImageUrl) return null;
    return currentImageUrl.startsWith('http') ? currentImageUrl : `http://localhost:5000${currentImageUrl}`;
  };

  if (loading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin text-[#58c322]" size={48} /></div>;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800">Edit Project #{id}</h1>
        <button type="button" onClick={() => navigate('/projects')} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all">
          <X size={24}/>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-4 overflow-x-auto">
              {['en', 'ar', 'de', 'fr'].map((lang) => (
                <button
                  key={lang} type="button" onClick={() => setActiveLang(lang)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                    ${activeLang === lang ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-50'}`}
                >
                  {lang}
                  {translations[lang].title.trim() !== '' && <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Project Title ({activeLang})</label>
                <input 
                  type="text" 
                  value={translations[activeLang].title}
                  onChange={(e) => setTranslations(prev => ({...prev, [activeLang]: {...prev[activeLang], title: e.target.value}}))}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold text-slate-700" 
                  placeholder={`Enter title in ${activeLang.toUpperCase()}...`} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Description ({activeLang})</label>
                <textarea 
                  rows="5" 
                  value={translations[activeLang].description}
                  onChange={(e) => setTranslations(prev => ({...prev, [activeLang]: {...prev[activeLang], description: e.target.value}}))}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-2 ring-green-500/20 font-bold text-slate-700" 
                  placeholder={`Enter details in ${activeLang.toUpperCase()}...`}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-800 flex items-center gap-2"><ImageIcon size={18} className="text-green-500" /> Media & Settings</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Project Status</label>
                <select 
                  value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 ring-green-500/20"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="PENDING_APPROVAL">Pending Approval</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Target Budget ($)</label>
                <input 
                  type="number" required value={formData.target_budget} onChange={(e) => setFormData({...formData, target_budget: e.target.value})}
                  className="w-full p-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-700 outline-none focus:ring-2 ring-green-500/20" 
                  placeholder="0.00" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Project Image</label>
                <div className="relative border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden hover:bg-slate-50 transition-colors group">
                  {getDisplayImageUrl() ? (
                    <div className="relative h-40 w-full group">
                      <img src={getDisplayImageUrl()} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                        <span className="text-white font-bold text-sm">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-slate-400">
                      <UploadCloud size={32} className="mb-2 group-hover:text-green-500 transition-colors" />
                      <span className="text-xs font-bold">Click to upload image</span>
                    </div>
                  )}
                  <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>

            <button type="submit" disabled={saving} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Update Project</>}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProject;