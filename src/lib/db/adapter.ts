import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import db from ".";
import { session, user } from "../schema/drizzle/drizzle.schema";

const adapter = new DrizzlePostgreSQLAdapter(db, session, user);

export default adapter;
