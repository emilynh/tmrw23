"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const postgres_js_1 = require("drizzle-orm/postgres-js");
const postgres_1 = __importDefault(require("postgres"));
const queryClient = (0, postgres_1.default)(process.env.DATABASE_URL);
exports.db = (0, postgres_js_1.drizzle)(queryClient);
//# sourceMappingURL=db.js.map