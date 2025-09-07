import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.NODE_ENV === "test" ? (process.env.TEST_DB_NAME || "todo25_test") : (process.env.DB_NAME || "todo25"),
  password: process.env.DB_PASSWORD || "root",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});
