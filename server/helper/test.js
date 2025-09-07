import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { pool } from "./db.js";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

// Oikea dirname ES-moduuleissa
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize test DB
export const initializeTestDb = () => {
  const sqlPath = path.resolve(__dirname, "../db.sql"); // db.sql server-kansion juuressa
  const sql = fs.readFileSync(sqlPath, "utf8");
  return new Promise((resolve, reject) => {
    pool.query(sql, (err) => {
      if (err) {
        console.error("Error initializing test database:", err);
        return reject(err);
      }
      console.log("Test database initialized successfully");
      resolve();
    });
  });
};

// Lisää testikäyttäjä
export const insertTestUser = (user) => {
  return new Promise((resolve, reject) => {
    hash(user.password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      const sql =
        "INSERT INTO account (email, password) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING";
      pool.query(sql, [user.email, hashedPassword], (err2) => {
        if (err2) {
          console.error("Error inserting test user:", err2);
          return reject(err2);
        }
        console.log("Test user inserted (or already existed) successfully");
        resolve();
      });
    });
  });
};

// Tokenin luonti
export const getToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET);
};

