const db = require("../../db/database");

async function findUserById(snsId) {

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE snsId = ?', [snsId]);
        console.log("Find successful", rows);
        return rows[0];
    } catch (error) {
        console.error("Error finding user", error);
    }
}

async function createUser(user) {
    const { nickname, snsId, provider } = user;
    try {
        const [result] = await db.query('INSERT INTO users (nickname, snsId, provider) VALUES (?, ?, ?)', [nickname, snsId, provider]);
        console.log("Update successful", result);
        return { id: result.insertId, ...user };
    } catch (error) {
        console.error("Error updating user", error);
    }
}



module.exports = { findUserById, createUser };