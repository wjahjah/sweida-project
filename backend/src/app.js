const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

// تسجيل الـ CORS بشكل كامل للسماح بجميع العمليات
fastify.register(cors, {
  origin: '*', // في الإنتاج استبدلها برابط الفرونت إند الخاص بك
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] // السماح بالحذف والتعديل
});

// --- تسجيل المسارات (Routes Registration) ---

// 1. مسارات المشاريع العامة (Public)
fastify.register(require('./modules/project/project.routes'), { prefix: '/api/projects' });

// 2. مسارات الإدارة (Admin Routes)
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