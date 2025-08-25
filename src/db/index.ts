import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const rawUrl = process.env.DATABASE_URL!;
// Enforce TLS in production if not explicitly disabled
const shouldRequireSsl = process.env.NODE_ENV === 'production';
let databaseUrl = rawUrl;
if (shouldRequireSsl && !/sslmode=/.test(rawUrl)) {
  databaseUrl = rawUrl.includes('?') ? `${rawUrl}&sslmode=require` : `${rawUrl}?sslmode=require`;
}

const client = postgres(databaseUrl, {
  max: 10,
});
export const db = drizzle({ client });