
import dotenv from 'dotenv';
dotenv.config()
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
 

 
// for query purposes
const queryClient = postgres(process.env.DATABASE_URL);
export const db: PostgresJsDatabase = drizzle(queryClient);