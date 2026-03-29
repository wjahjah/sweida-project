/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // دالة مساعدة للحذف الآمن
  const safeDelete = async (tableName) => {
    const exists = await knex.schema.hasTable(tableName);
    if (exists) await knex(tableName).del();
  };

  // 1. تنظيف الجداول بترتيب عكسي لتجنب مشاكل Foreign Keys
  await safeDelete('audit_logs');
  await safeDelete('donations');
  await safeDelete('project_translations');
  await safeDelete('projects');
  await safeDelete('founder_details');
  await safeDelete('user_translations');
  await safeDelete('role_permissions');
  await safeDelete('users');
  await safeDelete('roles');
  await safeDelete('permissions');
  await safeDelete('currencies');

  // 2. إدخال العملات
  await knex('currencies').insert([
    { code: 'USD', symbol: '$', exchange_rate: 1.0, is_active: true },
    { code: 'SYP', symbol: 'ل.س', exchange_rate: 15000.0, is_active: true },
    { code: 'SAR', symbol: 'ر.س', exchange_rate: 3.75, is_active: true }
  ]);

  // 3. إدخال الأدوار (Roles)
  const roles = await knex('roles').insert([
    { name: 'SUPER_ADMIN' },
    { name: 'FOUNDER' },
    { name: 'DONOR' }
  ]).returning(['id', 'name']);

  const getRoleId = (name) => roles.find(r => r.name === name).id;

  // 4. إدخال الصلاحيات (Permissions)
  const [permAll] = await knex('permissions').insert([
    { name: 'all_access', description: 'كامل الصلاحيات على النظام' },
    { name: 'approve_projects', description: 'صلاحية الموافقة على المقترحات' }
  ]).returning('id');

  await knex('role_permissions').insert([
    { role_id: getRoleId('SUPER_ADMIN'), permission_id: permAll.id || permAll }
  ]);

  // 5. إدخال مستخدمين (Admin & Founder)
  const users = await knex('users').insert([
    { email: 'admin@sweida.com', password: 'hashed_password_here', role_id: getRoleId('SUPER_ADMIN'), status: 'ACTIVE' },
    { email: 'founder@sweida.com', password: 'hashed_password_here', role_id: getRoleId('FOUNDER'), status: 'ACTIVE' },
    { email: 'donor@test.com', password: 'hashed_password_here', role_id: getRoleId('DONOR'), status: 'ACTIVE' }
  ]).returning(['id', 'email']);

  const getUserId = (email) => users.find(u => u.email === email).id;

  // 6. ترجمة أسماء المستخدمين
  await knex('user_translations').insert([
    { user_id: getUserId('admin@sweida.com'), language: 'en', display_name: 'System Admin' },
    { user_id: getUserId('admin@sweida.com'), language: 'ar', display_name: 'مدير النظام' },
    { user_id: getUserId('founder@sweida.com'), language: 'ar', display_name: 'د. جمال السويداء' }
  ]);

  // 7. إدخال المشاريع (Projects)
  const insertedProjects = await knex('projects').insert([
    { 
      target_budget: 50000, 
      current_raised: 15000, 
      status: 'ACTIVE', 
      image_url: 'https://images.unsplash.com/photo-1541244029123-24e4460ec3e5',
      is_user_proposal: false 
    },
    { 
      target_budget: null, 
      status: 'PENDING_APPROVAL', 
      is_user_proposal: true, 
      suggested_by_name: 'عصام الحلبي',
      suggested_by_phone: '0933112233'
    }
  ]).returning('id');

  const proj1Id = insertedProjects[0].id || insertedProjects[0];
  const proj2Id = insertedProjects[1].id || insertedProjects[1];

  // 8. ترجمة المشاريع
  await knex('project_translations').insert([
    // المشروع الأول (عربي وانجليزي)
    { project_id: proj1Id, language: 'ar', title: 'تأهيل آبار المياه', description: 'مشروع لتأمين الطاقة الشمسية لآبار الري.' },
    { project_id: proj1Id, language: 'en', title: 'Water Wells Rehab', description: 'Solar energy project for irrigation wells.' },
    // المشروع الثاني (مقترح - عربي فقط)
    { project_id: proj2Id, language: 'ar', title: 'ترميم مدرسة الريف', description: 'مقترح لترميم السقف والنوافذ قبل الشتاء.' }
  ]);

  // 9. إدخال تبرع تجريبي
  await knex('donations').insert([
    { 
      user_id: getUserId('donor@test.com'), 
      project_id: proj1Id, 
      amount: 1000, 
      currency_code: 'USD', 
      status: 'SUCCESS' 
    }
  ]);

  console.log('✅ Seed data injected successfully!');
};