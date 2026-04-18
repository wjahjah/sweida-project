const knexLib = require('knex');
const config = require('../../../knexfile'); 
const knex = knexLib(config);

// ------ File Upload Libraries ------
const fs = require('fs');
const path = require('path');
const util = require('util');
const { pipeline } = require('stream');
const pump = util.promisify(pipeline);

// توحيد مسارات الحفظ للمشاريع والفريق
const projectsUploadDir = path.join(process.cwd(), 'uploads', 'projects');
const teamUploadDir = path.join(process.cwd(), 'uploads', 'team');

if (!fs.existsSync(projectsUploadDir)) {
  fs.mkdirSync(projectsUploadDir, { recursive: true });
}
if (!fs.existsSync(teamUploadDir)) {
  fs.mkdirSync(teamUploadDir, { recursive: true }); // إنشاء مجلد الفريق
}
// -----------------------------------

async function adminRoutes(fastify, options) {

  // ==========================================
  // 1. Static Routes
  // ==========================================

  // Dashboard General Stats
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

  // Financial Summary
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

  // Get all projects (Dynamic based on language)
  fastify.get('/projects', async (request, reply) => {
    const { lang = 'en' } = request.query; 
    try {
      const projects = await knex('projects')
        .leftJoin('project_translations', 'projects.id', 'project_translations.project_id')
        .where('project_translations.language', lang) 
        .select('projects.*', 'project_translations.title', 'project_translations.description')
        .orderBy('projects.id', 'desc');
      return projects;
    } catch (err) {
      return reply.status(500).send({ error: 'Database Error while fetching projects' });
    }
  });

  // Get all donors
  fastify.get('/donors', async (request, reply) => {
    try {
      const donors = await knex('users')
        .join('user_translations', 'users.id', 'user_translations.user_id')
        .leftJoin('donations', 'users.id', 'donations.user_id')
        .where('user_translations.language', 'en') // Changed to English for Admin panel
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

  // Get user roles
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
  // 2. Dynamic Routes
  // ==========================================

  // Get single project details
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

  // Delete project
  fastify.delete('/projects/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const deletedCount = await knex('projects').where({ id }).del();
      if (deletedCount === 0) {
        return reply.status(404).send({ error: 'Project not found or already deleted' });
      }
      return { success: true, message: 'Project and all related data deleted successfully' };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Internal server error during deletion' });
    }
  });

  // Approve project
  fastify.patch('/projects/:id/approve', async (request, reply) => {
    const { id } = request.params;
    try {
      const updatedCount = await knex('projects')
        .where({ id })
        .update({ 
          status: 'ACTIVE',
          updated_at: knex.fn.now() 
        });

      if (updatedCount === 0) {
        return reply.status(404).send({ error: 'Project not found' });
      }

      return { success: true, message: 'Project activated successfully' };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to update project status' });
    }
  });

  // Get permissions for a specific role
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

  // Change donor status
  fastify.patch('/donors/:id/status', async (request, reply) => {
    const { id } = request.params;
    const { status } = request.body; 
    try {
      await knex('users').where({ id }).update({ status });
      return { success: true, message: 'Status updated successfully' };
    } catch (err) {
      return reply.status(500).send({ error: 'Failed to update status' });
    }
  });

  // Suggest a new project (From visitors)
  fastify.post('/projects/suggest', async (request, reply) => {
    const { suggested_by_name, suggested_by_phone, suggested_by_email, translations } = request.body;
    const trx = await knex.transaction();
    try {
      const [insertedProject] = await trx('projects').insert({
        status: 'PENDING_APPROVAL',
        is_user_proposal: true,
        suggested_by_name,
        suggested_by_phone,
        suggested_by_email,
        target_budget: 0
      }).returning('id');

      const projectId = insertedProject.id || insertedProject;

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


  // ==========================================
  // 3. Write Operations (Projects Multipart)
  // ==========================================

  // Add new project (Accepts FormData with image)
  fastify.post('/projects', async (request, reply) => {
    let target_budget = 0;
    let translations = [];
    let image_url = null;

    if (!request.isMultipart()) {
      return reply.status(400).send({ error: 'Request must be of type multipart/form-data' });
    }

    const parts = request.parts();
    for await (const part of parts) {
      if (part.type === 'file' && part.filename) {
        const filename = `${Date.now()}-${part.filename.replace(/\s+/g, '_')}`;
        const filepath = path.join(projectsUploadDir, filename);
        await pump(part.file, fs.createWriteStream(filepath));
        image_url = `/uploads/projects/${filename}`;
      } else if (part.type === 'field') {
        if (part.fieldname === 'target_budget') target_budget = part.value;
        if (part.fieldname === 'translations') translations = JSON.parse(part.value);
      }
    }

    const trx = await knex.transaction();
    try {
      const [insertedProject] = await trx('projects')
        .insert({ target_budget, image_url, status: 'ACTIVE' })
        .returning('id');
        
      const projectId = insertedProject.id || insertedProject;

      if (translations && translations.length > 0) {
        const transData = translations.map(t => ({ 
          project_id: projectId, 
          language: t.language, 
          title: t.title, 
          description: t.description 
        }));
        await trx('project_translations').insert(transData);
      }

      await trx.commit();
      return { success: true, message: 'Project published successfully' };
    } catch (err) {
      await trx.rollback();
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to insert project' });
    }
  });

  // Update existing project
  fastify.put('/projects/:id', async (request, reply) => {
    const { id } = request.params;
    let target_budget, status, translations;
    let image_url = undefined;

    if (request.isMultipart()) {
      const parts = request.parts();
      for await (const part of parts) {
        if (part.type === 'file' && part.filename) {
          const filename = `${Date.now()}-${part.filename.replace(/\s+/g, '_')}`;
          await pump(part.file, fs.createWriteStream(path.join(projectsUploadDir, filename)));
          image_url = `/uploads/projects/${filename}`;
        } else if (part.type === 'field') {
          if (part.fieldname === 'target_budget') target_budget = part.value;
          if (part.fieldname === 'status') status = part.value;
          if (part.fieldname === 'translations') translations = JSON.parse(part.value);
          if (part.fieldname === 'image_url' && !image_url) image_url = part.value;
        }
      }
    } else {
      ({ target_budget, image_url, status, translations } = request.body);
    }

    const trx = await knex.transaction();
    try {
      const updateData = { target_budget, status, updated_at: knex.fn.now() };
      if (image_url !== undefined) updateData.image_url = image_url;

      await trx('projects').where({ id }).update(updateData);

      if (translations) {
        for (const trans of translations) {
          const exists = await trx('project_translations').where({ project_id: id, language: trans.language }).first();
          if (exists) {
            await trx('project_translations')
              .where({ project_id: id, language: trans.language })
              .update({ title: trans.title, description: trans.description });
          } else {
            await trx('project_translations')
              .insert({ project_id: id, language: trans.language, title: trans.title, description: trans.description });
          }
        }
      }
      await trx.commit();
      return { success: true, message: 'Project updated successfully' };
    } catch (err) {
      await trx.rollback();
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to update project' });
    }
  });


  // ==========================================
  // 4. Team & Founders Management (التحديث الجديد للصور والترجمات)
  // ==========================================

  // Get all team members (دعم عرض اللغة ديناميكياً)
  fastify.get('/team', async (request, reply) => {
    const { lang = 'en' } = request.query;
    try {
      const team = await knex('users')
        .join('roles', 'users.role_id', 'roles.id')
        .leftJoin('founder_details', 'users.id', 'founder_details.user_id')
        .leftJoin('user_translations', function() {
          this.on('users.id', '=', 'user_translations.user_id')
              .andOn('user_translations.language', '=', knex.raw('?', [lang])) 
        })
        .whereIn('roles.name', ['SUPER_ADMIN', 'FOUNDER']) 
        .select(
          'users.id',
          'users.email',
          'users.phone_number',
          'users.status',
          'users.avatar_url',
          'roles.name as role_name',
          'founder_details.designation',
          'founder_details.joining_date',
          'founder_details.initial_contribution',
          'user_translations.display_name',
          'user_translations.bio'
        )
        .orderBy('users.id', 'desc');
        
      return team;
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to fetch team data' });
    }
  });

  // Add new team member / founder (يدعم رفع الصور والترجمة بـ 4 لغات)
  fastify.post('/team', async (request, reply) => {
    let email, designation, joining_date, initial_contribution = 0;
    let translations = [];
    let avatar_url = null;

    if (!request.isMultipart()) {
      return reply.status(400).send({ error: 'Request must be multipart/form-data' });
    }

    const parts = request.parts();
    for await (const part of parts) {
      if (part.type === 'file' && part.filename) {
        const filename = `${Date.now()}-${part.filename.replace(/\s+/g, '_')}`;
        await pump(part.file, fs.createWriteStream(path.join(teamUploadDir, filename)));
        avatar_url = `/uploads/team/${filename}`;
      } else if (part.type === 'field') {
        if (part.fieldname === 'email') email = part.value;
        if (part.fieldname === 'designation') designation = part.value;
        if (part.fieldname === 'joining_date') joining_date = part.value;
        if (part.fieldname === 'initial_contribution') initial_contribution = part.value;
        if (part.fieldname === 'translations') translations = JSON.parse(part.value);
      }
    }

    const trx = await knex.transaction(); 
    try {
      const role = await trx('roles').where('name', 'FOUNDER').first();

      const [insertedUser] = await trx('users').insert({
        email: email,
        avatar_url: avatar_url,
        password: 'default_password_123', 
        role_id: role ? role.id : null,
        status: 'ACTIVE'
      }).returning('id');
      
      const userId = insertedUser?.id || insertedUser;

      await trx('founder_details').insert({
        user_id: userId,
        designation: designation,
        joining_date: joining_date || knex.fn.now(),
        initial_contribution: initial_contribution || 0
      });

      if (translations && translations.length > 0) {
        const transData = translations.map(t => ({
          user_id: userId,
          language: t.language,
          display_name: t.display_name,
          bio: t.bio || ''
        }));
        await trx('user_translations').insert(transData);
      }

      await trx.commit();
      return { success: true, message: 'Member added successfully' };
    } catch (err) {
      await trx.rollback();
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to add member', details: err.message });
    }
  });

  // Delete team member
  fastify.delete('/team/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      // سيقوم بحذف المستخدم، وإذا كانت قاعدة البيانات مضبوطة على Cascade ستحذف باقي الجداول المرتبطة
      const deletedCount = await knex('users').where('id', id).del();

      if (deletedCount === 0) {
        return reply.status(404).send({ error: 'Member not found' });
      }
      return { success: true, message: 'Member deleted successfully' };
    } catch (err) {
      fastify.log.error(err);
      return reply.status(500).send({ error: 'Failed to delete member' });
    }
  });

}

module.exports = adminRoutes;