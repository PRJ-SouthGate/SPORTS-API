const db = require("../../db/database");

async function findBookmarkById(id) {

  try {
    const [rows] = await db.query('SELECT player_id FROM bookmark WHERE user_id = ?', [id]);
    console.log("Find successful", rows);
    return rows;
  } catch (error) {
    console.error("Error finding bookmark", error);
  }
}
async function createBookmark(id, playerId) {
  try {
    const [result] = await db.query('INSERT INTO bookmark (user_id, player_id) VALUES ( ?, ?)', [id, playerId]);
    console.log("Update successful", result);
  } catch (error) {
    console.error("Error updating bookmark", error);
  }
}

module.exports = { findBookmarkById, createBookmark };
