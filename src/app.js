require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
const soccerRoutes = require("./routes/soccerRoutes");
app.use("/soccer", soccerRoutes); // 라우터 등록
const PORT = process.env.PORT; // 포트 번호 환경 변수에서 가져오기
app.set("views", path.join(__dirname, "./views")); // 뷰 파일 경로 설정
app.set("view engine", "ejs"); // 뷰 엔진 설정

app.get("/", (req, res) => {
    // 루트 경로 라우트
    res.render("index");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
