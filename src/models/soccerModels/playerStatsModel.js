const db = require("../../db/database");

async function insertPlayerStats(stats) {
    // stats 객체를 인자로 받아서 데이터베이스에 삽입하는 함수
    const {
        // stats 객체에서 필요한 속성들을 추출
        playerId,
        season,
        goals,
        assists,
        rating,
        teamId,
        name,
        leagueId,
        appearances,
        minutesPlayed,
        yellowCards,
        redCards,
        lineups,
        firstname,
        lastname,
        age,
        birth_date,
        nationality,
        height,
        weight,
        photo,
    } = stats;
    const query_stats = `
        INSERT INTO player_stats
        (playerId, season, goals, assists, rating, teamId, leagueId, appearances, minutesPlayed, yellowCards, redCards, lineups)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `; // 쿼리 템플릿
    const query_players = `
        INSERT INTO players (id, name, firstname, lastname, age, birth_date, nationality, height, weight, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `; // 쿼리 템플릿
    console.log("Inserting player stats", stats);
    try {
        const [result] = await db.execute(query_players, [
            playerId,
            name,
            firstname,
            lastname,
            age,
            birth_date,
            nationality,
            height,
            weight,
            photo,
        ]);
        console.log("Inserting successful", result);
    } catch (error) {
        console.error("Error inserting player stats", error);
    }
    try {
        const [result] = await db.execute(query_stats, [
            playerId,
            season,
            goals,
            assists,
            rating,
            teamId,
            leagueId,
            appearances,
            minutesPlayed,
            yellowCards,
            redCards,
            lineups,
        ]);
        console.log("Inserting successful", result);
    } catch (error) {
        console.error("Error inserting player stats", error);
    }
}

async function updatePlayerStats(stats) {
    // stats 객체를 인자로 받아서 데이터베이스에 업데이트하는 함수
    const { playerId, season, goals, assists, rating } = stats; // stats 객체에서 필요한 속성들을 추출

    const query = `
        UPDATE player_stats
        SET goals = ?, assists = ?, rating = ?
        WHERE playerId = ? AND season = ?;
    `; // 쿼리 템플릿

    try {
        const [result] = await db.execute(query, [
            goals,
            assists,
            rating,
            playerId,
            season,
        ]);
        console.log("Update successful", result);
    } catch (error) {
        console.error("Error updating player stats", error);
    }
}

async function getPlayerStats(playerName) {
    // 플레이어 이름을 인자로 받아서 해당 플레이어의 통계를 반환하는 함수
    const query = `
        SELECT ps.season, ps.goals, ps.assists, ps.rating, t.name AS teamName, p.name AS playerName
        FROM player_stats ps
        JOIN teams t ON ps.teamId = t.id
        JOIN players p ON ps.playerId = p.id
        WHERE ps.playerId = (
            SELECT id FROM players WHERE name LIKE CONCAT('%', ?, '%')
        )
    `; // 쿼리 템플릿

    try {
        const [rows, fields] = await db.query(query, [playerName]);
        console.log("Fetching player stats", rows);
        return rows;
    } catch (error) {
        console.error("Error fetching player stats", error);
        return null;
    }
}

module.exports = { updatePlayerStats, getPlayerStats, insertPlayerStats };
