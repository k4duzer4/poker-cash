import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 3333);

app.get('/', async () => {
  return { message: 'hello world' };
});

const start = async () => {
  try {
    await app.register(cors, {
      origin: true,
    });
    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`HTTP server running on port ${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();