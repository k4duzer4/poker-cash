import type { FastifyInstance } from 'fastify';

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get('/', async () => ({ module: 'transactions', status: 'ok' }));
};
