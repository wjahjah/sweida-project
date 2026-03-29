const knexLib = require('knex');
const config = require('../../../knexfile'); 
const knex = knexLib(config);

async function adminRoutes(fastify, options) {

  // ==========================================
  // 1. المسارات الثابتة (Static Routes) - يجب أن تكون في البداية
  // ==========================================

  // إحصائيات لوحة التحكم العامة
  fastify.get('/stats', async (request, reply) => {
    try {
      const donationsResult = await knex('donations').where('status', 'SUCCESS').sum('amount as total').first();
      const activeProjectsResult = await knex('projects').where('status', 'ACTIVE').count('id as count').first();
      const donorsResult = await knex('donations').countDistinct('user_id as count').first();
      const pendingResult = await knex('projects').where('status', 'PENDING_APPROVAL').count('id as count').first();

      return {
        totalDonations: parseFloat(donationsResult?.total) || 0,
        activeProjects: parseInt(activeProjectsResult?.count) || 0,
        totalDonors: parseInt(donorsResult?.count) || 0,
        pendingApprovals: parseInt(pendingResult?.count) || 0
      };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to fetch stats' });
    }
  });

  // ملخص البيانات المالية
  fastify.get('/financials/summary', async (request, reply) => {
    try {
      const totalRaisedRes = await knex('donations').where('status', 'SUCCESS').sum('amount as total').first();
      const totalAllocatedRes = await knex('projects').sum('current_raised as total').first();
      const currencies = await knex('currencies').select('*');

      const totalRaised = parseFloat(totalRaisedRes?.total || 0);
      const totalAllocated = parseFloat(totalAllocatedRes?.total || 0);

      return {
        totalRaised,
        totalAllocated,
        balance: totalRaised - totalAllocated,
        currencies: currencies || []
      };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to fetch financial summary' });
    }
  });

  // جلب كل المشاريع (عربي افتراضي للأدمن)
  fastify.get('/projects', async (request, reply) => {
    try {
      const projects = await knex('projects')
        .leftJoin('project_translations', 'projects.id', 'project_translations.project_id')
        .where('project_translations.language', 'ar') 
        .select('projects.*', 'project_translations.title')
        .orderBy('projects.id', 'desc');
      return projects;
    } catch (err) {
      return reply.status(500).send({ error: 'Database Error' });
    }
  });

  // جلب قائمة المتبرعين
  fastify.get('/donors', async (request, reply) => {
    try {
      const donors = await knex('users')
        .join('user_translations', 'users.id', 'user_translations.user_id')
        .leftJoin('donations', 'users.id', 'donations.user_id')
        .where('user_translations.language', 'ar')
        .select(
          'users.id',
          'users.email',
          'users.status',
          'user_translations.display_name',
          knex.raw('COALESCE(SUM(donations.amount), 0) as total_donated')
        )
        .groupBy('users.id', 'user_translations.display_name', 'users.email', 'users.status')
        .orderBy('total_donated', 'desc');
      return donors;
    } catch (err) {
      return reply.status(500).send({ error: 'Failed to fetch donors' });
    }
  });

  // جلب الأدوار
  fastify.get('/roles', async (request, reply) => {
    try {
      const roles = await knex('roles')
        .leftJoin('users', 'roles.id', 'users.role_id')
        .select('roles.id', 'roles.name')
        .count('users.id as user_count')
        .groupBy('roles.id', 'roles.name');
      
      return roles.map(r => ({ ...r, user_count: parseInt(r.user_count) || 0 }));
    } catch (err) {
      return reply.status(500).send({ error: 'Failed to fetch roles' });
    }
  });

  // ==========================================
  // 2. المسارات الديناميكية (Dynamic Routes)
  // ==========================================

  // جلب مشروع واحد بالتفصيل
  fastify.get('/projects/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const project = await knex('projects').where({ id }).first();
      if (!project) return reply.status(404).send({ error: 'Project not found' });
      const translations = await knex('project_translations').where({ project_id: id });
      return { ...project, translations };
    } catch (err) {
      return reply.status(500).send({ error: 'Failed to fetch project details' });
    }
  });
// تابع حذف المشروع
fastify.delete('/projects/:id', async (request, reply) => {
  const { id } = request.params; // الحصول على معرف المشروع من الرابط
  try {
    // تنفيذ عملية الحذف في قاعدة البيانات
    // ملاحظة: سيتم حذف التراجم تلقائياً بسبب وجود onDelete('CASCADE') في الميجريشن
    const deletedCount = await knex('projects').where({ id }).del();

    if (deletedCount === 0) {
      return reply.status(404).send({ error: 'المشروع غير موجود أو تم حذفه مسبقاً' });
    }

    return { success: true, message: 'تم حذف المشروع وكافة بياناته بنجاح' };
  } catch (err) {
    fastify.log.error(err);
    return reply.status(500).send({ error: 'حدث خطأ داخلي أثناء محاولة الحذف' });
  }
});
fastify.patch('/projects/:id/approve', async (request, reply) => {
    const { id } = request.params;
    try {
      // تحديث حالة المشروع إلى ACTIVE
      const updatedCount = await knex('projects')
        .where({ id })
        .update({ 
          status: 'ACTIVE',
          updated_at: knex.fn.now() 
        });

      if (updatedCount === 0) {
        return reply.status(404).send({ error: 'المشروع غير موجود' });
      }

      return { success: true, message: 'تم تفعيل المشروع بنجاح' };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'فشل في تحديث حالة المشروع' });
    }
  });
  // جلب صلاحيات دور معين
  fastify.get('/roles/:id/permissions', async (request, reply) => {
    const { id } = request.params;
    try {
      const permissions = await knex('permissions')
        .join('role_permissions', 'permissions.id', 'role_permissions.permission_id')
        .where('role_permissions.role_id', id)
        .select('permissions.*');
      return permissions;
    } catch (err) {
      return reply.status(500).send({ error: 'Failed to fetch permissions' });
    }
  });

  // ==========================================
  // 3. عمليات الإضافة والتعديل (Write Operations)
  // ==========================================

  fastify.post('/projects', async (request, reply) => {
    const { target_budget, image_url, translations } = request.body; 
    const trx = await knex.transaction();
    try {
      const [idResult] = await trx('projects').insert({ target_budget, image_url, status: 'ACTIVE' }).returning('id');
      const projectId = idResult.id || idResult;
      const transData = translations.map(t => ({ project_id: projectId, ...t }));
      await trx('project_translations').insert(transData);
      await trx.commit();
      return { success: true };
    } catch (err) {
      await trx.rollback();
      return reply.status(500).send({ error: err.message });
    }
  });

  fastify.put('/projects/:id', async (request, reply) => {
    const { id } = request.params;
    const { target_budget, image_url, status, translations } = request.body;
    const trx = await knex.transaction();
    try {
      await trx('projects').where({ id }).update({ target_budget, image_url, status, updated_at: knex.fn.now() });
      if (translations) {
        for (const trans of translations) {
          await trx('project_translations')
            .where({ project_id: id, language: trans.language })
            .update({ title: trans.title, description: trans.description });
        }
      }
      await trx.commit();
      return { success: true };
    } catch (err) {
      await trx.rollback();
      return reply.status(500).send({ error: 'Update Failed' });
    }
  });

  fastify.patch('/donors/:id/status', async (request, reply) => {
    const { id } = request.params;
    const { status } = request.body; 
    try {
      await knex('users').where({ id }).update({ status });
      return { success: true };
    } catch (err) {
      return reply.status(500).send({ error: 'Failed to update status' });
    }
  });
  // داخل ملف المسارات في الباك-أند
fastify.post('/projects/suggest', async (request, reply) => {
  const { suggested_by_name, suggested_by_phone, suggested_by_email, translations } = request.body;
  const trx = await knex.transaction();
  try {
    // 1. إدخال البيانات الأساسية في جدول projects
    const [insertedProject] = await trx('projects').insert({
      status: 'PENDING_APPROVAL',
      is_user_proposal: true,
      suggested_by_name,
      suggested_by_phone,
      suggested_by_email,
      target_budget: 0
    }).returning('id');

    const projectId = insertedProject.id || insertedProject;

    // 2. إدخال النصوص المترجمة في جدول project_translations
    const transData = translations.map(t => ({
      project_id: projectId,
      language: t.language,
      title: t.title,
      description: t.description
    }));

    await trx('project_translations').insert(transData);
    await trx.commit();
    return { success: true, message: 'Proposal submitted successfully' };
  } catch (err) {
    await trx.rollback();
    return reply.status(500).send({ error: 'Failed to submit proposal' });
  }
});
}

module.exports = adminRoutes;