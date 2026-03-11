const db = require('../../config/db');
class ProjectRepository {
  async getAll(lang) {
    return db('projects')
      .join('project_translations', 'projects.id', 'project_translations.project_id')
      .where('project_translations.language', lang)
      .select('projects.*', 'project_translations.title', 'project_translations.description');
  }
}
module.exports = new ProjectRepository();
