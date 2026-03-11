const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');
fastify.register(cors);
fastify.register(require('./modules/project/project.routes'), { prefix: '/api/projects' });
const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT || 5000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
