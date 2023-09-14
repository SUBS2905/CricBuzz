import pool from "../config/dbConfig.js";
import crypto from "crypto";
import { hashPassword } from "../utils/bcryptUtils.js";

export const createUser = async (username, password, email) => {
  try {
    const hashedPassword = await hashPassword(password);
    const accessToken = crypto.randomBytes(32).toString("hex");
    const [result] = await pool.query(
      "INSERT INTO users (username, password, email, access_token) VALUES (?, ?, ?, ?)",
      [username, hashedPassword, email, accessToken]
    );
    return result.insertId.toString();
  } catch (error) {
    throw error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    return result[0];
  } catch (error) {
    throw error;
  }
};
