
const KakaoStrategy = require('passport-kakao').Strategy
const User = require('../models/userModels/userModel');

module.exports = (passport) => {

    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, //kakao에서 발급해주는 id, .env 파일 생성후 KAKAO_ID:카카오에서 발급해준 api 를 추가해주면 된다.
        callbackURL: '/auth/kakao/callback', //인증결과를 받는 라우터이다.
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findUserById(profile.id);
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.createUser({ //새 유저 생성
                    //닉네임, 카카오 id 숫자, 제공자 저장
                    nickname: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }));

};