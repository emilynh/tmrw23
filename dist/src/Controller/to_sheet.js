"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSheetWorker = exports.toSheetQ = exports.redisClient = void 0;
const bullmq_1 = require("bullmq");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("../Model/db");
const tmr_1 = require("../Model/tmr");
const drizzle_orm_1 = require("drizzle-orm");
const axios_1 = __importDefault(require("axios"));
exports.redisClient = {
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
            delay: 4000,
        }
    },
    connection: exports.redisClient
};
exports.toSheetQ = new bullmq_1.Queue('toSheetQ', queueOptions);
exports.toSheetWorker = new bullmq_1.Worker('toSheetQ', async (job) => {
    console.log(job.data.codeInternal);
    axios_1.default.postForm(process.env.SHEET_URL, job.data);
}, {
    connection: exports.redisClient,
    limiter: {
        max: 1,
        duration: 1000,
    },
});
exports.toSheetWorker.on('completed', async (job) => {
    console.log("Job ok");
    await db_1.db.update(tmr_1.tmrTableDefined).set({ toSheet: true }).where((0, drizzle_orm_1.eq)(tmr_1.tmrTableDefined.codeInternal, job.data.codeInternal));
});
exports.toSheetWorker.on("failed", () => console.log("fialed"));
//# sourceMappingURL=to_sheet.js.map