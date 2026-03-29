import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Search, Loader2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate();

  // 1. جلب البيانات
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/admin/projects?lang=en'); 
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // 2. دالة الموافقة وتغيير الحالة إلى ACTIVE
  const handleApprove = async (id) => {
    if (window.confirm("هل أنت متأكد من الموافقة على هذا المقترح ونشره للعامة؟")) {
      try {
        await api.patch(`/admin/projects/${id}/approve`);
        setProjects(projects.map(p => p.id === id ? { ...p, status: 'ACTIVE' } : p));
        alert("تمت الموافقة على المشروع بنجاح");
      } catch (error) {
        alert("فشل في تحديث حالة المشروع");
      }
    }
  };

  // 3. دالة الحذف
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المشروع نهائياً؟")) {
      try {
        await api.delete(`/admin/projects/${id}`);
        setProjects(projects.filter(p => p.id !== id));
      } catch (error) {
        console.error("Delete error:", error);
        alert("فشل الحذف. تأكد من اتصال السيرفر.");
      }
    }
  };

  const handleEdit = (id) => navigate(`/projects/edit/${id}`);

  // الفلترة والبحث
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="animate-spin text-green-500" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* الرأس */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-800">إدارة المشاريع</h1>
          <p className="text-slate-500 text-sm">إدارة، تعديل، والموافقة على مقترحات المشاريع.</p>
        </div>
        <Link to="/projects/add" className="bg-[#58c322] hover:bg-[#4aad1d] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg transition-all">
          <Plus size={20} /> إضافة مشروع جديد
        </Link>
      </div>

      {/* البحث والفلترة */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="بحث عن مشروع..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl outline-none focus:ring-2 ring-green-500/10 font-medium text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-slate-50 border-none rounded-xl px-6 py-3 font-bold text-slate-600 text-sm outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">كل الحالات</option>
          <option value="ACTIVE">نشط</option>
          <option value="PENDING_APPROVAL">بانتظار الموافقة</option>
          <option value="COMPLETED">مكتمل</option>
        </select>
      </div>

      {/* شبكة المشاريع */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image_url || 'https://placehold.co/400x200?text=No+Image'} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                {/* شارة الحالة المتغيرة */}
                <div className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm ${
                  project.status === 'ACTIVE' ? 'bg-green-500/90 text-white' : 
                  project.status === 'PENDING_APPROVAL' ? 'bg-amber-500/90 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {project.status === 'PENDING_APPROVAL' ? 'بانتظار الموافقة' : project.status}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-black text-slate-800 mb-2 truncate">{project.title}</h3>
                
                <div className="space-y-4">
                  {/* شريط التقدم */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400">الإنجاز</span>
                      <span className="text-green-600">
                        {Math.round((project.current_raised / project.target_budget) * 100) || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#58c322] transition-all duration-1000" 
                        style={{ width: `${Math.min((project.current_raised / (project.target_budget || 1)) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                    <div className="text-sm">
                      <span className="text-slate-400 block text-[10px] uppercase font-black">الميزانية</span>
                      <span className="font-bold text-slate-700">${Number(project.target_budget || 0).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      {/* زر الموافقة - يظهر فقط في حالة الانتظار */}
                      {project.status === 'PENDING_APPROVAL' && (
                        <button 
                          onClick={() => handleApprove(project.id)}
                          className="p-2 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-xl transition-all"
                          title="الموافقة على المشروع"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}

                      <button onClick={() => handleEdit(project.id)} className="p-2 bg-slate-50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                        <Edit3 size={18} />
                      </button>
                      
                      <button onClick={() => handleDelete(project.id)} className="p-2 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-400 font-bold">لم يتم العثور على مشاريع تطابق بحثك.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;