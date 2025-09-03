import dotenv from 'dotenv';
dotenv.config();

import fs from "fs";
import path from "path";
import { pool } from "./db.js";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

const __dirname = path.resolve();

export const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(__dirname, "db.sql"), "utf8");
  pool.query(sql, (err) => {
    if (err) console.error("Error initializing test database:", err);
    else console.log("Test database initialized successfully");
  });
};

export const insertTestUser = (user) => {
  hash(user.password, 10, (err, hashedPassword) => {
    if (err) return console.error(err);
    pool.query(
      "INSERT INTO account (email, password) VALUES ($1, $2)",
      [user.email, hashedPassword],
      (err) => {
        if (err) console.error(err);
        else console.log("Test user inserted successfully");
      }
    );
  });
};

export const getToken = (email) => jwt.sign({ email }, process.env.JWT_SECRET);
