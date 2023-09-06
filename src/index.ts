import dotenv from 'dotenv';
import express from 'express';
import cors from "cors"
import { ingestHandler } from './Controller/ingest';
import { toSheetQ,toSheetWorker } from './Controller/to_sheet';

const worker = toSheetWorker

const app = express();

app.use(express.json());
app.use(cors());
app.options('*', cors())

app.post('/ingest', ingestHandler)


app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});
