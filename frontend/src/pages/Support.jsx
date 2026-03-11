import React, { useState } from 'react';
import { Heart, ShieldCheck, DollarSign, Check, Users, Globe, CreditCard } from 'lucide-react';

const MonthlySupport = () => {
  const [activeTab, setActiveTab] = useState('project'); // project, monthly, fund
  const [amount, setAmount] = useState('10');
  const amounts = ['10', '25', '50', '100', '500', '1000'];

  // محتوى البطاقة الجانبية بناءً على التبويب
  const sidebarContent = {
    project: { title: "دعم مشروع", desc: "مساهمتك تذهب مباشرة لتمويل المشروع الذي تختاره وتغيير حياة المستفيدين منه.", icon: <Globe className="text-blue-500" /> },
    monthly: { title: "الشراكة الشهرية", desc: "تحول دعمك إلى أثر مستدام، مع تقارير شهرية وشفافية كاملة.", icon: <ShieldCheck className="text-emerald-500" /> },
    fund: { title: "الصندوق العام", desc: "دعم مرن يُخصص للمشاريع الأكثر احتياجاً والأشد إلحاحاً في السويداء.", icon: <Heart className="text-rose-500" /> }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" dir="rtl">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* --- القسم الأيمن: الاستمارة --- */}
        <div className="flex-1 bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden w-full">
          
          {/* التبويبات (Tabs) - تصميم متجاوب */}
          <div className="flex bg-slate-50 p-2 gap-2">
            <TabButton 
              active={activeTab === 'project'} 
              onClick={() => setActiveTab('project')}
              icon={<Globe size={18} />}
              label="دعم مشروع محدد"
            />
            <TabButton 
              active={activeTab === 'monthly'} 
              onClick={() => setActiveTab('monthly')}
              icon={<ShieldCheck size={18} />}
              label="شراكة شهرية ($10)"
            />
            <TabButton 
              active={activeTab === 'fund'} 
              onClick={() => setActiveTab('fund')}
              icon={<DollarSign size={18} />}
              label="تبرع للصندوق العام"
            />
          </div>

          <div className="p-6 md:p-10">
            {/* الحقول المتغيرة بناءً على التبويب */}
            <div className="space-y-8">
              
              {/* اختيار المشروع (يظهر فقط في دعم مشروع محدد) */}
              {activeTab === 'project' && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <label className="block text-sm font-black text-slate-700 mb-3">اختر مشروعاً لدعمه</label>
                  <select className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 transition-all font-bold text-slate-600">
                    <option>اختر مشروعاً من القائمة...</option>
                    <option>مشروع التعليم المسرع</option>
                    <option>دعم مزارعي التفاح</option>
                    <option>ترميم المنازل القديمة</option>
                  </select>
                </div>
              )}

              {/* اختيار المبلغ (يظهر في الجميع) */}
              <div>
                <label className="block text-sm font-black text-slate-700 mb-4">المبلغ ($)</label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {amounts.map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className={`py-4 rounded-xl font-black transition-all border-2 ${
                        amount === val 
                        ? 'bg-slate-800 border-slate-800 text-white scale-105 shadow-lg' 
                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>
                <input 
                  type="number" 
                  placeholder="أدخل مبلغاً مخصصاً بالدولار" 
                  className="w-full mt-4 p-4 bg-emerald-50 border-2 border-emerald-100 rounded-2xl outline-none focus:border-emerald-500 text-center font-bold text-emerald-700"
                />
              </div>

              {/* تكرار التبرع (يظهر فقط في الصندوق العام ودعم المشروع) */}
              {activeTab !== 'monthly' && (
                <div className="flex gap-4">
                   <button className="flex-1 py-3 border-2 border-blue-500 bg-blue-50 text-blue-700 rounded-xl font-bold">مرة واحدة</button>
                   <button className="flex-1 py-3 border-2 border-slate-100 text-slate-400 rounded-xl font-bold">شهرياً</button>
                </div>
              )}

              {/* معلومات المتبرع */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="الاسم (اختياري)" placeholder="مثال: أحمد" />
                <InputField label="البريد (اختياري)" placeholder="you@example.com" isEmail />
              </div>

              {/* ملخص الدفع */}
              <div className="bg-slate-50 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between font-bold text-slate-500 italic">
                  <span>رسوم المعالجة (تقديري)</span>
                  <span>$0.59</span>
                </div>
                <div className="flex justify-between font-black text-xl text-slate-800 pt-3 border-t border-slate-200">
                  <span>الواصل</span>
                  <span className="text-emerald-600">${amount}</span>
                </div>
              </div>

              {/* أزرار الدفع النهائية */}
              <div className="flex flex-col md:flex-row gap-4">
                <button className="flex-1 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-3">
                  <CreditCard /> ادفع الآن (بطاقة)
                </button>
                <button className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3">
                  ادفع عبر PAYPAL
                </button>
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-400 font-bold cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-emerald-500 focus:ring-emerald-500" />
                أوافق على سياسة الخصوصية والشروط
              </label>

            </div>
          </div>
        </div>

        {/* --- القسم الأيسر: بطاقة المعلومات (Card) --- */}
        <div className="w-full lg:w-[400px] sticky top-32">
          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl shadow-slate-200/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-50 rounded-2xl">
                {sidebarContent[activeTab].icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800">{sidebarContent[activeTab].title}</h3>
            </div>
            
            <p className="text-slate-400 font-bold text-sm leading-relaxed mb-8">
              {sidebarContent[activeTab].desc}
            </p>

            <div className="text-center bg-slate-50 py-8 rounded-[2rem] mb-8">
              <span className="text-5xl font-black text-slate-800">${amount}</span>
              <span className="text-slate-400 font-bold mr-2">{activeTab === 'monthly' ? '/ شهرياً' : 'تبرع'}</span>
            </div>

            <div className="space-y-4 mb-8">
              <Feature text="تقارير مالية ومتابعة تنفيذ" />
              <Feature text="اسمك ضمن قائمة الشركاء" />
              <Feature text="تحديثات دورية عن الأثر" />
            </div>

            <div className="pt-6 border-t border-slate-100">
               <div className="flex items-center gap-2 mb-4">
                  <Users size={16} className="text-slate-400" />
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">أحدث المتبرعين</span>
               </div>
               <div className="flex flex-wrap gap-2">
                  <DonorBadge name="Rania B." amount="52" />
                  <DonorBadge name="Alaa C." amount="10" />
                  <DonorBadge name="Omar B." amount="100" />
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- مكونات مساعدة (Sub-components) ---

const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 rounded-xl font-black text-xs md:text-sm transition-all ${
      active 
      ? 'bg-white text-slate-800 shadow-sm' 
      : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {icon}
    <span className="hidden sm:inline">{label}</span>
    <span className="sm:hidden">{label.split(' ')[0]}</span>
  </button>
);

const InputField = ({ label, placeholder, isEmail }) => (
  <div>
    <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">{label}</label>
    <input 
      type={isEmail ? "email" : "text"} 
      placeholder={placeholder} 
      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent outline-none focus:border-blue-500 transition-all font-bold"
    />
  </div>
);

const Feature = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
      <Check size={14} strokeWidth={4} />
    </div>
    <span className="text-sm font-bold text-slate-600">{text}</span>
  </div>
);

const DonorBadge = ({ name, amount }) => (
  <span className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black text-slate-500 shadow-sm">
    {name} <span className="text-emerald-500">${amount}</span>
  </span>
);

export default MonthlySupport;