import type { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

import { env } from '../../config/env';
import { prisma } from '../../db/prisma';
import { requireAuth } from '../../shared/middlewares/auth';

export const authRoutes = async (app: FastifyInstance) => {
  app.post('/register', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }).strict();

    const parsedBody = bodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return reply.status(400).send({
        message: 'Dados inválidos.',
        errors: parsedBody.error.flatten(),
      });
    }

    const { email, password } = parsedBody.data;

    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (userAlreadyExists) {
      return reply.status(409).send({ message: 'E-mail já cadastrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });

    return reply.status(201).send(user);
  });

  app.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(1),
    }).strict();

    const parsedBody = bodySchema.safeParse(request.body);

    if (!parsedBody.success) {
      return reply.status(400).send({
        message: 'Dados inválidos.',
        errors: parsedBody.error.flatten(),
      });
    }

    const { email, password } = parsedBody.data;

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      return reply.status(401).send({ message: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ email: user.email }, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '7d',
    });

    return reply.send({ token });
  });

  app.get('/me', { preHandler: requireAuth }, async (request) => {
    return {
      user: request.user,
    };
  });
};
