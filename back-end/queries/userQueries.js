const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  const query = `SELECT * FROM users;`;
  return await db.query(query);
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  return await db.oneOrNone(query, [email]);
};

const createUser = async (email) => {
  try {
    const query = `
      INSERT INTO users (email)
      VALUES ($1)
      RETURNING *;
    `;
    return await db.one(query, [email]);
  } catch (error) {
    if (error.code === "23505") {
      throw new Error("User with this email already exists.");
    } else {
      throw error;
    }
  }
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
};
