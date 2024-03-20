import { drizzle } from "drizzle-orm/node-postgres";
import { client, fetchAllTasks, fetchTaskBy, initDB } from "./pgClient";
// import {
//   boolean,
//   pgSchema,
//   // pgTable,
//   serial,
//   text,
//   timestamp,
// } from "drizzle-orm/pg-core";
import { tasks } from "./schema";
import { and, eq, gte } from "drizzle-orm/pg-core/expressions";

await client.connect();
const db = drizzle(client);

// export const mySchema = pgSchema("my_schema");

// const tasks = mySchema.table("tasks", {
//   id: serial("id").primaryKey(),
//   title: text("title").notNull(),
//   isCompleted: boolean("is_completed").default(false).notNull(),
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
// });

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    await initDB();
    const result = await db
      .select()
      .from(tasks)
      .where(
        and(
          eq(tasks.id, 1),
          eq(tasks.isCompleted, false),
          gte(tasks.createdAt, new Date("2024-03-19"))
        )
      );
    console.log(result);
    return new Response("Bun");
  },
});

console.log(`Listening on http://localhost:${server.port} ..`);
