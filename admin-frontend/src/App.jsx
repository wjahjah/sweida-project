import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. استيراد الصفحات واللاي-أوت
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layouts/AdminLayout';

// استيراد صفحات المشاريع الحقيقية
import Projects from './pages/projects/Projects';
import AddProject from './pages/projects/AddProject';
import EditProject from './pages/projects/EditProject'; 
import Donors from './pages/donors/Donors';
import Team from './pages/team/Team';
import Financials from './pages/financials/Financials';
import Roles from './pages/roles/Roles'; // تأكد أن المسار يطابق مكان ملف Roles.jsx عندك
// 2. مكون حماية المسارات
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* صفحة الدخول - بدون سايد بار */}
        <Route path="/login" element={<Login />} />

        {/* جميع مسارات لوحة التحكم محمية وداخل AdminLayout */}
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* مسارات المشاريع - العرض والإضافة */}
        <Route path="/projects" element={
          <ProtectedRoute>
            <AdminLayout>
              <Projects />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/projects/add" element={
          <ProtectedRoute>
            <AdminLayout>
              <AddProject />
            </AdminLayout>
          </ProtectedRoute>
        } />
             <Route path="/projects/edit/:id" element={
          <ProtectedRoute>
            <AdminLayout>
              <EditProject />
            </AdminLayout>
          </ProtectedRoute>
        } />
      
        <Route path="/donors" element={
          <ProtectedRoute>
            <AdminLayout>
              <Donors />
            </AdminLayout>
          </ProtectedRoute>
        } />

        <Route path="/team" element={
          <ProtectedRoute>
            <AdminLayout>
              <Team />
            </AdminLayout>
          </ProtectedRoute>
        } />
{/* مسار الماليات والعملات */}
<Route path="/currencies" element={
  <ProtectedRoute>
    <AdminLayout>
      <Financials />
    </AdminLayout>
  </ProtectedRoute>
} />
<Route path="/roles" element={
  <ProtectedRoute>
    <AdminLayout>
      <Roles />
    </AdminLayout>
  </ProtectedRoute>
} />
        {/* مسار سجل الرقابة الذي أضفناه للسايد بار */}
        <Route path="/audit-logs" element={
          <ProtectedRoute>
            <AdminLayout>
              <div className="p-8 bg-white rounded-[2.5rem] font-black uppercase tracking-widest text-slate-400 text-center">Audit Logs System</div>
            </AdminLayout>
          </ProtectedRoute>
        } />
        

        {/* إعادة توجيه أي مسار خاطئ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;