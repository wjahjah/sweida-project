const ProjectService = require('./project.service');
async function projectRoutes(fastify) {
  fastify.get('/', async (request, reply) => {
    const { lang = 'ar' } = request.query;
    return await ProjectService.getProjects(lang);
  });
}
module.exports = projectRoutes;
