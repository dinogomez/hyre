import pg from "pg";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/lib/schema/drizzle/drizzle.schema";
const pool = new pg.Pool({
  connectionString: process.env.DB_URL!,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

export default db;
