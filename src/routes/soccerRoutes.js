const express = require("express");
const router = express.Router();
const { getPlayerStats } = require("../models/soccerModels/playerStatsModel"); // 경로는 실제 구조에 맞게 조정
const {
    updatePlayerStats,
} = require("../models/soccerModels/playerStatsModel");
const { fetchPlayerStats } = require("../api/footballStatsAPI");
const {
    insertPlayerStats,
} = require("../models/soccerModels/playerStatsModel");

router.get("/player/:playerName", async (req, res) => {
    // 선수 프로필 페이지 라우트
    const playerName = req.params.playerName;
    const leagueId = req.query.leagueId;
    try {
        const playerStats = await getPlayerStats(playerName);

        if (playerStats && playerStats.length > 0) {
            // 플레이어 통계 정보가 있는 경우, 프로필 페이지 렌더링
            res.render("playerProfile", {
                playerName: playerName,
                stats: playerStats,
                leagueId: leagueId,
                existence: true,
            });
        } else {
            // 플레이어 통계 정보가 없는 경우, 사용자에게 알림
            res.render("playerNotFound", {
                playerName: playerName,
                leagueId: leagueId,
                existence: false,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/updatePlayerStats", async (req, res) => {
    // 플레이어 통계 정보 업데이트 라우트
    const playerName = req.body.playerName; // 이 이름으로 api에서 검색하는데 검색이 되는 이름이 명확하지 않음 추후 확인후 수정필요
    const leagueId = req.body.leagueId;
    const existence = req.body.existence;
    try {
        const stats = await fetchPlayerStats(playerName, leagueId);
        if (existence === "true") {
            // 플레이어 통계 정보가 이미 있는 경우
            await updatePlayerStats(stats); // 기존 정보를 업데이트
            res.redirect(`/soccer/player/${playerName}?leagueId=${leagueId}`);
        } else {
            // 플레이어 통계 정보가 없는 경우
            await insertPlayerStats(stats); // 새로운 정보를 삽입
            res.redirect(`/soccer/player/${playerName}?leagueId=${leagueId}`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating player stats");
    }
});

module.exports = router;
