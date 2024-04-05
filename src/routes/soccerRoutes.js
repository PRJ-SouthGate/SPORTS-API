const express = require("express");
const router = express.Router();
const {
    getPlayerStatsByName,
} = require("../models/soccerModels/playerStatsModel"); // 경로는 실제 구조에 맞게 조정
const {
    updatePlayerStats,
} = require("../models/soccerModels/playerStatsModel");
const { fetchPlayerStatsById } = require("../api/footballStatsAPI");
const { fetchPlayerStatsByName } = require("../api/footballStatsAPI");
const {
    insertPlayerStats,
} = require("../models/soccerModels/playerStatsModel");
const {
    getPlayerIdByName,
} = require("../models/soccerModels/playerStatsModel");
const { getCountryFlag } = require("../api/countryAPI");

router.get("/player/:playerName", async (req, res) => {
    // 선수 프로필 페이지 라우트
    const playerName = req.params.playerName;
    const leagueId = req.query.leagueId;

    try {
        const playerStats = await getPlayerStatsByName(playerName);

        if (playerStats && playerStats.length > 0) {
            // 플레이어 통계 정보가 있는 경우, 프로필 페이지 렌더링
            //국기 가져오기
            const flagUrl = await getCountryFlag(playerStats[0].nationality);
            res.render("playerProfile", {
                playerName: playerName,
                stats: playerStats,
                leagueId: leagueId,
                existence: true,
                flagUrl: flagUrl,
                user: req.user,
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
    const playerName = req.body.playerName;
    const leagueId = req.body.leagueId;
    const playerId = await getPlayerIdByName(playerName); // 이 이름으로 api에서 검색하는데 검색이 되는 이름이 명확하지 않음 추후 확인후 수정필요
    console.log(playerId);
    try {
        if (playerId) {
            // ID가 있으면 외부 API로부터 통계를 가져옴
            const stats = await fetchPlayerStatsById(playerId, leagueId);
            console.log(stats);
            await updatePlayerStats(stats); // DB에 통계를 업데이트함
        } else {
            // ID가 없으면 외부 API에서 선수의 통계를 가져옴
            const stats = await fetchPlayerStatsByName(playerName, leagueId);
            console.log(stats);
            await insertPlayerStats(stats); // 새로운 통계를 DB에 삽입함
        }
        res.redirect(`/soccer/player/${playerName}?leagueId=${leagueId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating player stats");
    }
});

module.exports = router;
