import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

import { env } from '../../config/env';

type JwtPayload = {
  sub?: string;
  email?: string;
};

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return reply.status(401).send({ message: 'Token não informado.' });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return reply.status(401).send({ message: 'Formato de token inválido.' });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    if (!decoded.sub || !decoded.email) {
      return reply.status(401).send({ message: 'Token inválido.' });
    }

    request.user = {
      id: decoded.sub,
      email: decoded.email,
    };
  } catch {
    return reply.status(401).send({ message: 'Token inválido.' });
  }
};

export const authMiddleware = requireAuth;
