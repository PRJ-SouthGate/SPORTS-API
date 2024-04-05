require("dotenv").config();
const axios = require("axios");
//const { name } = require("ejs");

// 함수를 async로 선언하여 내부에서 await 사용 가능
async function fetchPlayerStatsByName(playerName, targetLeague) {
    console.log("Fetching Player Stats By Name");
    const options = {
        method: "GET",
        // URL을 동적으로 구성하여 playerName에 따라 다른 결과를 가져올 수 있도록 합니다.
        url: process.env.API_URL,
        params: {
            league: targetLeague,
            search: playerName, // 검색 쿼리에 사용할 이름인데 되는 이름과 안되는 이름의 기준이 명확하지 않음. 추후 기준 확인 필요
        }, // 검색 쿼리에 playerName 사용
        headers: {
            "X-RapidAPI-Key": process.env.API_KEY, // 여기에 실제 RapidAPI 키 입력
            "X-RapidAPI-Host": process.env.API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        const playerInfo = response.data.response[0]; // 선수 정보에 접근
        const statistics = playerInfo.statistics[0]; // 리그의 통계 정보에 접근
        const stats = {
            // 반환할 데이터 구조를 정의
            playerId: playerInfo.player.id, // 선수의 고유 ID
            season: statistics.league.season.toString(), // 대상 시즌을 문자열로 변환
            goals: statistics.goals.total, // 넣은 골 수
            assists: statistics.goals.assists, // 기록한 어시스트 수
            rating: statistics.games.rating, // 평가 점수
            teamId: statistics.team.id, // 소속된 팀의 고유 ID
            name: playerInfo.player.name, // 선수의 이름
            leagueId: statistics.league.id, // 대상 리그의 고유 ID
            appearances: statistics.games.appearences, // 출장 횟수
            minutesPlayed: statistics.games.minutes, // 출장 시간
            position: statistics.games.position, // 포지션
            yellowCards: statistics.cards.yellow, // 경고 수
            redCards: statistics.cards.red, // 퇴장 수
            lineups: statistics.games.lineups, // 선발 출장 수
            firstname: playerInfo.player.firstname, // 선수의 이름
            lastname: playerInfo.player.lastname, // 선수의 성
            age: playerInfo.player.age, // 선수의 나이
            birth_date: playerInfo.player.birth.date, // 선수의 생년월일
            nationality: playerInfo.player.nationality, // 선수의 국적
            height: playerInfo.player.height, // 선수의 키
            weight: playerInfo.player.weight, // 선수의 몸무게
            photo: playerInfo.player.photo, // 선수의 사진 URL
        };
        return stats; // stats 객체 반환
    } catch (error) {
        console.error("Error Fetching player stats via API", error);
        throw error; // 에러를 적절히 처리하거나, 필요에 따라 상위로 전파
    }
}

async function fetchPlayerStatsById(playerId, targetLeague) {
    console.log("Fetching Player Stats By ID");
    const options = {
        method: 'GET',
        url: process.env.API_URL,
        params: {
            id: playerId, // 함수 파라미터로 받은 선수 ID
            league: targetLeague,
            season: "2023",
        },
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY, // 환경 변수에서 API 키를 가져옵니다.
            'X-RapidAPI-Host': process.env.API_HOST,
        }
    };

    try {
        const response = await axios.request(options);
        const playerInfo = response.data.response[0]; // 선수 정보에 접근
        const statistics = playerInfo.statistics[0]; // 리그의 통계 정보에 접근
        const stats = {
            // 반환할 데이터 구조를 정의
            playerId: playerInfo.player.id, // 선수의 고유 ID
            season: statistics.league.season.toString(), // 대상 시즌을 문자열로 변환
            goals: statistics.goals.total, // 넣은 골 수
            assists: statistics.goals.assists, // 기록한 어시스트 수
            rating: statistics.games.rating, // 평가 점수
            teamId: statistics.team.id, // 소속된 팀의 고유 ID
            name: playerInfo.player.name, // 선수의 이름
            leagueId: statistics.league.id, // 대상 리그의 고유 ID
            appearances: statistics.games.appearences, // 출장 횟수
            minutesPlayed: statistics.games.minutes, // 출장 시간
            position: statistics.games.position, // 포지션
            yellowCards: statistics.cards.yellow, // 경고 수
            redCards: statistics.cards.red, // 퇴장 수
            lineups: statistics.games.lineups, // 선발 출장 수
            firstname: playerInfo.player.firstname, // 선수의 이름
            lastname: playerInfo.player.lastname, // 선수의 성
            age: playerInfo.player.age, // 선수의 나이
            birth_date: playerInfo.player.birth.date, // 선수의 생년월일
            nationality: playerInfo.player.nationality, // 선수의 국적
            height: playerInfo.player.height, // 선수의 키
            weight: playerInfo.player.weight, // 선수의 몸무게
            photo: playerInfo.player.photo, // 선수의 사진 URL
        };

        return stats; // stats 객체 반환
    } catch (error) {
        console.error("Error Fetching player stats via API", error);
        throw error; // 에러를 적절히 처리하거나, 필요에 따라 상위로 전파
    }
}

module.exports = { fetchPlayerStatsByName, fetchPlayerStatsById };
