const express = require('express');
const router = express.Router();
const { getPlayerStats } = require('../models/soccerModels/playerStatsModel'); // 경로는 실제 구조에 맞게 조정
const { updatePlayerStats } = require('../models/soccerModels/playerStatsModel');
const { fetchPlayerStats } = require('../api/footballStatsAPI');


// 선수 프로필 페이지 라우트
router.get('/player/:playerName', async (req, res) => {
    const playerName = req.params.playerName;

    try {
        const playerStats = await getPlayerStats(playerName);

        if (playerStats && playerStats.length > 0) {
            // 플레이어 통계 정보가 있는 경우, 프로필 페이지 렌더링
            res.render('playerProfile', { playerName: playerName, stats: playerStats });
        } else {
            // 플레이어 통계 정보가 없는 경우, 사용자에게 알림
            res.render('playerNotFound', { playerName: playerName });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/updatePlayerStats', async (req, res) => {
    const playerName = req.body.playerName;
    try {
        const stats = await fetchPlayerStats(playerName);
        await updatePlayerStats(stats);
        res.redirect(`/player/${playerName}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating player stats');
    }
});

module.exports = router;
