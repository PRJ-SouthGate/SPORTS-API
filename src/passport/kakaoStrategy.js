
const KakaoStrategy = require('passport-kakao').Strategy
const User = require('../models/userModels/userModel');

module.exports = (passport) => {



    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_URL,
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const exUser = await User.findUserById(profile.id);
                if (exUser) {
                    done(null, exUser);
                } else {
                    const newUserDetails = {
                        email: profile._json && profile._json.kakao_account_email,
                        nickname: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao',
                    };
                    const newUser = await User.createUser(newUserDetails);
                    done(null, newUser);
                }
            } catch (error) {
                console.error(error);
                done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

};