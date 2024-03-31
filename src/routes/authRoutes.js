const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth/kakao', passport.authenticate('kakao'));

router.get('/auth/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/', // 로그인 성공 시 리다이렉트 경로
        failureRedirect: '/', // 로그인 실패 시 리다이렉트 경로
    }),
);

router.get('/logout', (req, res) => {
    // req.logout()을 사용하여 Passport 세션을 파기하고 사용자를 로그아웃 상태로 만듭니다.
    req.logout(() => {
        res.redirect('/'); // 로그아웃 후 홈페이지로 리디렉션
    });
    // 선택적으로 사용자를 리디렉션할 경로를 지정합니다.
    // 여기서는 홈페이지로 리디렉션하도록 설정했습니다.
});
module.exports = router;