import { ConnectionOptions, RedisConnection, JobsOptions, WorkerOptions, QueueOptions,Queue,Worker } from 'bullmq';
import dotenv from 'dotenv';
import IORedis from "ioredis";
dotenv.config();
import { db } from '../Model/db';
import { tmrTableDefined } from '../Model/tmr';
import { eq,and } from 'drizzle-orm';
import axios from 'axios';
export const redisClient = {
    port: process.env.REDISPORT,
    host: process.env.REDISHOST,
    username: process.env.REDISUSER,
    password: process.env.REDISPASSWORD,
}



const queueOptions: QueueOptions = {
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 4000,
        }
    },
    connection: redisClient

}


export const toSheetQ = new Queue('toSheetQ', queueOptions);


export const toSheetWorker = new Worker('toSheetQ', async job => {
   /*  const identifier = await db.select().from(tmrTableDefined).where(and(eq(tmrTableDefined.timestamp, job.data.timestamp),eq(tmrTableDefined.codeInternal,job.data.codeInternal))) */
    console.log(job.data.codeInternal)
    axios.postForm(process.env.SHEET_URL,job.data)
}, { 
  connection: redisClient ,
   limiter: {
    max: 1,
    duration: 1000,
  },}) 

toSheetWorker.on('completed', async job => {
console.log("Job ok")
   await db.update(tmrTableDefined).set({toSheet: true}).where(eq(tmrTableDefined.codeInternal,job.data.codeInternal))
     
});
toSheetWorker.on("failed",()=>
console.log("fialed")
)