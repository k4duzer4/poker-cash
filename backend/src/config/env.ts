import 'dotenv/config';
import { z } from 'zod';

const toNormalizedOrigins = (value: string) =>
  value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => new URL(item).origin);

const hasValidOrigins = (value: string) => {
  try {
    const origins = toNormalizedOrigins(value);
    return origins.length > 0;
  } catch {
    return false;
  }
};

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  CORS_ORIGIN: z.string().min(1).refine(hasValidOrigins, {
    message: 'CORS_ORIGIN must be a valid URL or a comma-separated list of valid URLs.',
  }),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(1),
});

export const env = envSchema.parse(process.env);

export const corsOrigins = toNormalizedOrigins(env.CORS_ORIGIN);
