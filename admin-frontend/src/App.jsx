import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. استيراد الصفحات واللاي-أوت
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminLayout from './layouts/AdminLayout';

// (ملاحظة: يمكنك إنشاء هذه الصفحات لاحقاً، حالياً سنضع مكونات مؤقتة لها)
const Projects = () => <div className="p-4 bg-white rounded-3xl shadow-sm font-bold">Projects Management Screen</div>;
const Donors = () => <div className="p-4 bg-white rounded-3xl shadow-sm font-bold">Donors List</div>;
const Team = () => <div className="p-4 bg-white rounded-3xl shadow-sm font-bold">Team Members</div>;

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

        {/* مسارات لوحة التحكم - كلها داخل الـ AdminLayout */}
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

        <Route path="/projects" element={
          <ProtectedRoute>
            <AdminLayout>
              <Projects />
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

        {/* إعادة توجيه أي مسار خاطئ */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;