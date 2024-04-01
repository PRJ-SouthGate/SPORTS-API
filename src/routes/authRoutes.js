const express = require("express");
const router = express.Router();
const passport = require("passport");
const axios = require("axios");
router.get("/auth/kakao", passport.authenticate("kakao"));

router.get(
    "/auth/kakao/callback",
    passport.authenticate("kakao", {
        successRedirect: "/", // 로그인 성공 시 리다이렉트 경로
        failureRedirect: "/", // 로그인 실패 시 리다이렉트 경로
    })
);

router.get("/logout", (req, res) => {
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${
        process.env.KAKAO_ID
    }&logout_redirect_uri=${encodeURIComponent(process.env.KAKAO_LOGOUT)}`;
    res.redirect(kakaoLogoutUrl);
});

router.get("/kakao/logout", async (req, res) => {
    console.log("logout");
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});
// router.get("/logout", async (req, res) => {
//     // https://kapi.kakao/com/v1/user/logout
//     try {
//         const ACCESS_TOKEN = req.user.accessToken;
//         let logout = await axios({
//             method: "post",
//             url: "https://kapi.kakao.com/v1/user/logout",
//             headers: {
//                 Authorization: `Bearer ${ACCESS_TOKEN}`,
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         res.json(error);
//     }
//     // 세션 정리
//     req.logout(function (err) {
//         if (err) {
//             return next(err);
//         }
//         res.clearCookie("connect.sid");
//         res.redirect("/");
//     });
//     req.session.destroy(() => {
//         res.clearCookie("connect.sid");
//         res.redirect("/");
//     });
// });

module.exports = router;
