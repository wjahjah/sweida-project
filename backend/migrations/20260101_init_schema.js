exports.up = function(knex) {
  return knex.schema
    .createTable('projects', (table) => {
      table.increments('id');
      table.string('image_url');
      table.decimal('budget', 12, 2);
      table.string('status').defaultTo('ACTIVE');
      table.timestamps(true, true);
    })
    .createTable('project_translations', (table) => {
      table.increments('id');
      table.integer('project_id').references('id').inTable('projects').onDelete('CASCADE');
      table.string('language', 5).notNullable();
      table.string('title').notNullable();
      table.text('description');
      table.unique(['project_id', 'language']);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('project_translations').dropTable('projects');
};

