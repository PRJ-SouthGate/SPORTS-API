const db = require('../../db/database');

async function updatePlayerStats(stats) {
    const { playerId, season, goals, assists, appearances } = stats;

    const query = `
        UPDATE player_stats
        SET goals = ?, assists = ?, appearances = ?
        WHERE playerId = ? AND season = ?;
    `;

    try {
        const [result] = await db.execute(query, [goals, assists, appearances, playerId, season]);
        console.log('Update successful', result);
    } catch (error) {
        console.error('Error updating player stats', error);
    }
}

async function getPlayerStats(playerName) {
    const query = `
        SELECT ps.season, ps.goals, ps.assists, ps.rating,t.name AS teamName
        FROM player_stats ps
        JOIN teams t ON ps.teamId = t.id
        WHERE ps.playerId = (
            SELECT id FROM players WHERE name = ?
        )
    `;

    try {
        const [rows, fields] = await db.query(query, [playerName]);
        return rows;
    } catch (error) {
        console.error('Error fetching player stats', error);
        return null;
    }
}

module.exports = { updatePlayerStats, getPlayerStats };
