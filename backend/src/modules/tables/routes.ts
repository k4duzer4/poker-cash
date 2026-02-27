import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

import { prisma } from '../../db/prisma';
import { requireAuth } from '../../shared/middlewares/auth';

export const tablesRoutes = async (app: FastifyInstance) => {
  app.get('/', { preHandler: requireAuth }, async (request) => {
    const tables = await prisma.table.findMany({
      where: {
        ownerUserId: request.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { tables };
  });

  app.post('/', { preHandler: requireAuth }, async (request, reply) => {
    const bodySchema = z.object({
      name: z.string().min(1),
      blinds: z.string().min(1),
      currency: z.string().min(1),
    }).strict();

    const parsedBody = bodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return reply.status(400).send({
        message: 'Dados inválidos.',
        errors: parsedBody.error.flatten(),
      });
    }

    const { name, blinds, currency } = parsedBody.data;

    const table = await prisma.table.create({
      data: {
        ownerUserId: request.user.id,
        name,
        blinds,
        currency,
      },
    });

    return reply.status(201).send({ table });
  });
};
