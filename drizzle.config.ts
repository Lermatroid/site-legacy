import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
	schema: "./src/db/schema.ts",
	out: "./migrations",
	driver: "turso",
	dbCredentials: {
		url: process.env.TURSO_CONNECTION_URL!,
		authToken: process.env.TURSO_URL!,
	},
} satisfies Config;
