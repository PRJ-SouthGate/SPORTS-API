require("dotenv").config();
const express = require("express");
const session = require('express-session');
const path = require("path");
const app = express();
const passportConfig = require('./passport/kakaoStrategy');
const passport = require("passport");
app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
const soccerRoutes = require("./routes/soccerRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("", authRoutes); // 라우터 등록
app.use("/soccer", soccerRoutes); // 라우터 등록
const PORT = process.env.PORT; // 포트 번호 환경 변수에서 가져오기
app.set("views", path.join(__dirname, "./views")); // 뷰 파일 경로 설정
app.use(express.static(path.join(__dirname, '../public'))); // public 폴더를 정적 파일로 서빙하기 위한 설정
app.set("view engine", "ejs"); // 뷰 엔진 설정
passportConfig(passport);
app.use(session({
    secret: '1234', // 세션을 암호화하기 위한 비밀키
    resave: false, // 세션을 항상 저장할지 여부를 정하는 값 (변경되지 않았다면 저장하지 않음)
    saveUninitialized: false, // 초기화되지 않은 세션을 스토어에 저장
    cookie: {
        secure: false, // https가 아닌 환경에서도 사용할 수 있도록 함
        maxAge: 1000 * 60 * 60 * 24 // 쿠키 유효 시간 (여기서는 1일)
    }
}));
app.use(passport.initialize()); // passport를 초기화 하기 위해서 passport.initialize 미들웨어 사용
app.use(passport.session());


app.get("/", (req, res) => {
    // 루트 경로 라우트
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});