require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json()); // JSON 요청 본문 처리
app.use(express.urlencoded({ extended: true }));
const soccerRoutes = require('./routes/soccerRoutes');
app.use('/soccer', soccerRoutes);
const PORT = process.env.PORT
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index');
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
