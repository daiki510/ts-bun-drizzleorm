import { client } from "./pgClient";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";

await client.connect();
const db = drizzle(client, { schema });

// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: "./drizzle" });

// Don't forget to close the connection, otherwise the script will hang
await client.end();
