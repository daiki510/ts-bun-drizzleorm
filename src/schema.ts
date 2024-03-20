import {
  boolean,
  // pgSchema,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// const mySchema = pgSchema("my_schema");

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
