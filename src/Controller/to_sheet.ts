import { ConnectionOptions, RedisConnection, JobsOptions, WorkerOptions, QueueOptions,Queue,Worker } from 'bullmq';
import dotenv from 'dotenv';
import IORedis from "ioredis";
dotenv.config();
const redisClient = {
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
            delay: 10000,
        }
    },
    connection: redisClient

}

export const toSheetQ = new Queue('toSheetQ', queueOptions);


export const toSheetWorker = new Worker('toSheetQ', async job => {

    console.log(job.data)

}, { 
  connection: redisClient ,
  limiter: {
    max: 1,
    duration: 5000,
  },})

toSheetWorker.on('completed', async job => {
console.log("Job ok")
     
});
