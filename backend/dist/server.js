"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const app_1 = require("./app");
const start = async () => {
    try {
        await app_1.app.listen({ port: env_1.env.PORT, host: '0.0.0.0' });
        app_1.app.log.info(`HTTP server running on port ${env_1.env.PORT}`);
    }
    catch (error) {
        app_1.app.log.error(error);
        process.exit(1);
    }
};
start();
