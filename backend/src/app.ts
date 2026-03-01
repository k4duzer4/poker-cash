import Fastify from 'fastify';
import cors from '@fastify/cors';

import { corsOrigins } from './config/env';
import { authRoutes } from './modules/auth/routes';
import { playersRoutes } from './modules/players/routes';
import { tablesRoutes } from './modules/tables/routes';
import { transactionsRoutes } from './modules/transactions/routes';

export const app = Fastify({ logger: true });

app.register(cors, {
	origin: (origin, callback) => {
		if (!origin) {
			callback(null, true);
			return;
		}

		const isAllowed = corsOrigins.includes(origin);
		callback(null, isAllowed);
	},
});

app.get('/', async () => ({ message: 'hello world' }));

app.register(authRoutes, { prefix: '/auth' });
app.register(tablesRoutes, { prefix: '/tables' });
app.register(playersRoutes, { prefix: '/players' });
app.register(transactionsRoutes, { prefix: '/transactions' });
