"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ingest_1 = require("./Controller/ingest");
const to_sheet_1 = require("./Controller/to_sheet");
const worker = to_sheet_1.toSheetWorker;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
app.post('/ingest', ingest_1.ingestHandler);
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map