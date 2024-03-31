const kakaoStrategy = require('./kakaoStrategy');
const User = require('../models/userModels/userModel');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.snsId); // 사용자의 ID만 세션에 저장
    });

    passport.deserializeUser(async (snsId, done) => { // 세션에 저장된 ID로 사용자 정보 조회
        try {
            const user = await User.findUserById(snsId); // 사용자 정보를 데이터베이스에서 조회하는 메소드
            done(null, user); // 조회된 사용자 정보를 req.user에 저장
        } catch (error) {
            console.error(error);
            done(error);
        }
    });

    kakaoStrategy(passport); // 수정: passport 객체를 kakaoStrategy에 전달
};
