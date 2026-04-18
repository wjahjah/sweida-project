const fs = require('fs');
const path = require('path');

// 1. زيادة حجم الطلبات الأساسي في فاستيفاي إلى 10 ميجابايت (يحل مشكلة Payload Too Large)
const fastify = require('fastify')({ 
  logger: true,
  bodyLimit: 10485760 
});
const cors = require('@fastify/cors');

// 2. توحيد المسار الجذري للمشروع لضمان وصول المتصفح للصور 
const uploadRoot = path.join(process.cwd(), 'uploads');
const projectsUploadDir = path.join(uploadRoot, 'projects');
const teamUploadDir = path.join(uploadRoot, 'team'); // 👈 هنا أضفنا مسار صور الفريق

// إنشاء المجلدات إذا لم تكن موجودة لتفادي أخطاء المسارات
if (!fs.existsSync(uploadRoot)) {
  fs.mkdirSync(uploadRoot, { recursive: true });
}
if (!fs.existsSync(projectsUploadDir)) {
  fs.mkdirSync(projectsUploadDir, { recursive: true });
}
if (!fs.existsSync(teamUploadDir)) {
  fs.mkdirSync(teamUploadDir, { recursive: true }); // 👈 هنا نخبر السيرفر بإنشاء مجلد الفريق
}

// 3. تسجيل الـ CORS للسماح باتصال الرياكت
fastify.register(cors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
});

// 4. تسجيل مكتبة رفع الملفات مع حد 10 ميجابايت للملف الواحد
fastify.register(require('@fastify/multipart'), {
  limits: {
    fileSize: 10485760 
  }
});

// 5. تسجيل مكتبة عرض الملفات (Static) مع إضافة حماية CORS للصور نفسها
fastify.register(require('@fastify/static'), {
  root: uploadRoot,
  prefix: '/uploads/',
  setHeaders: (res) => {
    // هذا السطر يمنع المتصفح من حجب الصورة إذا كان الرياكت على دومين مختلف
    res.setHeader('Access-Control-Allow-Origin', '*'); 
  }
});

// --- تسجيل المسارات (Routes Registration) ---
fastify.register(require('./modules/project/project.routes'), { prefix: '/api/projects' });
fastify.register(require('./modules/admin/admin.routes'), { prefix: '/api/admin' });

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    await fastify.listen({ port: port, host: '0.0.0.0' });
    console.log(`🚀 Server ready at http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();