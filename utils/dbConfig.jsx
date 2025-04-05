import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  'postgresql://myspendsappdb_owner:npg_R0hkGCXg3dcx@ep-lively-mouse-a5t3w87d-pooler.us-east-2.aws.neon.tech/myspendsappdb?sslmode=require'
);
export const db = drizzle(sql, { schema });
