const db = require("../../db/database");

async function findUserById(snsId) {
    const [rows] = await db.query('SELECT * FROM users WHERE snsId = ?', [snsId]);
    return rows[0];
}

async function createUser(user) {
    const { email, nickname, snsId, provider } = user;
    const [result] = await db.query('INSERT INTO users (email, nickname, snsId, provider) VALUES (?, ?, ?, ?)', [email, nickname, snsId, provider]);
    return { id: result.insertId, ...user };
}

module.exports = { findUserById, createUser };