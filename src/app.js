require("dotenv").config();
const express = require("express");

const path = require("path");
const app = express();
const session = require("express-session");
const passportConfig = require("./passport");
const passport = require("passport");

app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
const soccerRoutes = require("./routes/soccerRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/soccer", soccerRoutes); // 라우터 등록
const PORT = process.env.PORT; // 포트 번호 환경 변수에서 가져오기
app.set("views", path.join(__dirname, "./views")); // 뷰 파일 경로 설정
app.use(express.static(path.join(__dirname, "../public"))); // public 폴더를 정적 파일로 서빙하기 위한 설정
app.set("view engine", "ejs"); // 뷰 엔진 설정

passportConfig(passport);
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "asdfas",
        cookie: {
            httpOnly: false,
            secure: false,
        },
    })
); //세션 설정

app.use(passport.initialize()); //초기화
app.use(passport.session()); //세션 사용
app.use("", authRoutes); // 로그인용 라우터 등록

app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
        // Passport.js의 로그인 여부 확인 메서드 사용
        // 로그인 상태일 때
        res.render("index", { loggedIn: true });
    } else {
        // 로그아웃 상태일 때
        res.render("index", { loggedIn: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
