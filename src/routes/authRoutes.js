const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/auth/kakao', passport.authenticate('kakao', { session: false }));

router.get('/auth/kakao/callback',
    passport.authenticate('kakao', {
        successRedirect: '/', // 로그인 성공 시 리다이렉트 경로
        failureRedirect: '/', // 로그인 실패 시 리다이렉트 경로
    }),
);
module.exports = router;