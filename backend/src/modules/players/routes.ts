import type { FastifyInstance } from 'fastify';

export const playersRoutes = async (app: FastifyInstance) => {
  app.get('/', async () => ({ module: 'players', status: 'ok' }));
};
