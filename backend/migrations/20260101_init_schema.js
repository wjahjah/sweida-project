/**
 * @param { import("knex").Knex } knex
 */
exports.up = function(knex) {
  return knex.schema
    // 1. العملات
    .createTable('currencies', (table) => {
      table.string('code', 3).primary();
      table.string('symbol', 10);
      table.decimal('exchange_rate', 15, 6).defaultTo(1.0); 
      table.boolean('is_active').defaultTo(true);
    })

    // 2. الصلاحيات
    .createTable('permissions', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
      table.string('description');
    })

    // 3. الأدوار
    .createTable('roles', (table) => {
      table.increments('id').primary();
      table.string('name').unique().notNullable();
    })

    // 4. ربط الأدوار بالصلاحيات
    .createTable('role_permissions', (table) => {
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
      table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('CASCADE');
      table.primary(['role_id', 'permission_id']);
    })

    // 5. المستخدمين
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('email').unique().notNullable().index();
      table.string('password').notNullable();
      table.string('phone_number', 20);
      table.string('avatar_url').nullable();
      table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('SET NULL');
      table.enum('status', ['ACTIVE', 'SUSPENDED', 'PENDING']).defaultTo('ACTIVE');
      table.boolean('is_verified').defaultTo(false);
      table.timestamps(true, true);
    })

    // 6. ترجمة بيانات المستخدمين
    .createTable('user_translations', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.string('language', 5).notNullable(); // 'ar' أو 'en'
      table.string('display_name').notNullable();
      table.text('bio'); 
      table.unique(['user_id', 'language']);
    })

    // 7. تفاصيل المؤسسين
    .createTable('founder_details', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().unique().references('id').inTable('users').onDelete('CASCADE');
      table.string('designation');
      table.date('joining_date');
      table.decimal('initial_contribution', 15, 2).defaultTo(0);
      table.boolean('can_approve_projects').defaultTo(true);
    })

    // 8. المشاريع (معدل لدعم المقترحات)
    .createTable('projects', (table) => {
      table.increments('id').primary();
      table.integer('organization_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.decimal('target_budget', 15, 2).nullable(); // Nullable للمقترحات الجديدة
      table.decimal('current_raised', 15, 2).defaultTo(0);
      table.string('currency_code').references('code').inTable('currencies').defaultTo('USD');
      table.string('image_url').nullable();
      
      // الحالات (أضفنا REJECTED)
      table.enum('status', ['DRAFT', 'PENDING_APPROVAL', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'REJECTED']).defaultTo('PENDING_APPROVAL');
      
      // حقول دعم مقترحات المستخدمين
      table.boolean('is_user_proposal').defaultTo(false);
      table.string('suggested_by_name').nullable();
      table.string('suggested_by_phone').nullable();
      table.string('suggested_by_email').nullable();
      table.text('admin_notes').nullable(); 
      
      table.timestamps(true, true);
    })

    // 9. ترجمة المشاريع
    .createTable('project_translations', (table) => {
      table.increments('id').primary();
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
      table.string('language', 5).notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.unique(['project_id', 'language']);
    })

    // 10. التبرعات
    .createTable('donations', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('SET NULL');
      table.decimal('amount', 15, 2).notNullable();
      table.string('currency_code').references('code').inTable('currencies');
      table.enum('status', ['PENDING', 'SUCCESS', 'FAILED']).defaultTo('PENDING');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })

    // 11. سجل الرقابة
    .createTable('audit_logs', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
      table.string('action').notNullable();
      table.string('table_name').notNullable(); 
      table.integer('record_id').notNullable();
      table.jsonb('old_data').nullable();
      table.jsonb('new_data').nullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('audit_logs')
    .dropTableIfExists('donations')
    .dropTableIfExists('project_translations')
    .dropTableIfExists('projects')
    .dropTableIfExists('founder_details')
    .dropTableIfExists('user_translations')
    .dropTableIfExists('role_permissions')
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('permissions')
    .dropTableIfExists('currencies');
};