export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: number;
            DATABASE_URL: string;

            PGDATABASE: string;
            PGHOST: string;
            PGPASSWORD: string;
            PGPORT: number;
            PGUSER: string;
            REDISHOST: string;
            REDISTPASSWORD: string;
            REDISPORT: number;
            REDISUSER: string;
        }
    }
}
