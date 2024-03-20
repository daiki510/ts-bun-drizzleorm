import type { Config } from "drizzle-kit";
import { load } from "ts-dotenv";

const env = load({
  DATABASE_URL: String,
});

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
