import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
export default {

  schema: "./src/Model/*",
  out: "./src/drizzle",
  verbose: true,
  driver: "pg",
  dbCredentials: {
user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    
  }
} satisfies Config;