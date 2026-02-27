"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const app = (0, fastify_1.default)({ logger: true });
const port = Number(process.env.PORT ?? 3333);
app.get('/', async () => {
    return { message: 'hello world' };
});
const start = async () => {
    try {
        await app.register(cors_1.default, {
            origin: true,
        });
        await app.listen({ port, host: '0.0.0.0' });
        app.log.info(`HTTP server running on port ${port}`);
    }
    catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};
start();
