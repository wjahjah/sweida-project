import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // دخول مباشر بدون API
    localStorage.setItem('adminToken', 'bypass_token');
    
    setTimeout(() => {
      navigate('/dashboard');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 font-sans" dir="ltr">
      <div className="w-full max-w-[450px] bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        <div className="p-8 md:p-12">
          <div className="text-center mb-10">
            <div className="inline-block p-4 ">
              <img src="/images/sweida-logo.png" alt="Sweida Logo" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 text-sm font-medium mt-1">Development Testing Mode</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-700 text-sm"
                  placeholder="any@email.com (Testing Mode)"
                />
              </div>
            </div>

            <div className="relative group">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-4 bg-slate-50 border-none rounded-2xl outline-none font-bold text-slate-700 text-sm"
                  placeholder="Any password"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#58c322] hover:bg-[#4aad1d] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-green-100 transition-all flex items-center justify-center gap-3"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Quick Access (Test)'}
            </button>
          </form>
        </div>

        <div className="bg-slate-50/50 p-6 text-center border-t border-slate-50">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
             Bypass Mode Active for Development
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;