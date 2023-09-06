"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSheetWorker = exports.toSheetQ = void 0;
const bullmq_1 = require("bullmq");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redisClient = {
    port: process.env.REDISPORT,
    host: process.env.REDISHOST,
    username: process.env.REDISUSER,
    password: process.env.REDISPASSWORD,
};
const queueOptions = {
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 10000,
        }
    },
    connection: redisClient
};
exports.toSheetQ = new bullmq_1.Queue('toSheetQ', queueOptions);
exports.toSheetWorker = new bullmq_1.Worker('toSheetQ', async (job) => {
    console.log(job.data);
}, {
    connection: redisClient,
    limiter: {
        max: 1,
        duration: 5000,
    },
});
exports.toSheetWorker.on('completed', async (job) => {
    console.log("Job ok");
});
//# sourceMappingURL=to_sheet.js.map