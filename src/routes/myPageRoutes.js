const express = require("express");
const router = express.Router();

const { findBookmarkById, createBookmark } = require('../models/myPageModels/myPageModel');
const { getPlayerStatsById } = require("../models/soccerModels/playerStatsModel");
router.get("/mypage", async (req, res) => {
  // 마이 페이지 라우트
  if (req.isAuthenticated()) {
    // Passport.js의 로그인 여부 확인 메서드 사용
    // 로그인 상태일 때
    const id = req.user.id;
    const bookmarkedPlayers = await findBookmarkById(id) || [];
    const playerIds = bookmarkedPlayers.map(obj => obj.player_id);
    const statsPromises = playerIds.map(playerId => getPlayerStatsById(playerId));
    // 모든 프로미스가 해결될 때까지 기다림
    const playerStats = await Promise.all(statsPromises);
    console.log(playerStats);
    try {
      // 마이 페이지 렌더링
      res.render("mypage", {
        stat: playerStats,
      });

    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    // 로그아웃 상태일 때
    res.redirect("/auth/kakao");
  }
});

router.post("/bookmark/add", async (req, res) => {
  // 북마크 추가 라우트
  const id = req.user.id;
  const playerName = req.body.playerName;
  const leagueId = req.body.leagueId;
  const playerId = req.body.playerId;
  console.log(playerId);
  try {
    await createBookmark(id, playerId); // DB에 통계를 업데이트함
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating player stats");
  }
  res.redirect(`/soccer/player/${playerName}?leagueId=${leagueId}`);
});


module.exports = router;