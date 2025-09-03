import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: process.env.NODE_ENV === "test" ? "todo25_test" : "todo25",
  password: "root",
  port: 5432,
});
