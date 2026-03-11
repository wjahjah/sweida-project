const ProjectRepository = require('./project.repository');
class ProjectService {
  async getProjects(lang) {
    return await ProjectRepository.getAll(lang);
  }
}
module.exports = new ProjectService();
