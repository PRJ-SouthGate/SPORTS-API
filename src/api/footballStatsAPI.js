require('dotenv').config();
const axios = require('axios');

// 함수를 async로 선언하여 내부에서 await 사용 가능
async function fetchPlayerStats(playerName, targetLeague) {
    console.log(targetLeague + typeof (targetLeague));
    const options = {
        method: 'GET',
        // URL을 동적으로 구성하여 playerName에 따라 다른 결과를 가져올 수 있도록 합니다.
        url: process.env.API_URL,
        params: {
            league: targetLeague,
            search: playerName
        }, // 검색 쿼리에 playerName 사용
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY, // 여기에 실제 RapidAPI 키 입력
            'X-RapidAPI-Host': process.env.API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        // 필요한 데이터만을 반환하도록 데이터를 처리합니다.
        // 예를 들어, 반환 데이터 중 players 정보만을 필터링하여 반환할 수 있습니다.
        // 실제 데이터 구조에 따라 접근 방법이 달라질 수 있습니다.
        return response.data.response; // 예시로 response 객체의 response 프로퍼티 반환
    } catch (error) {
        console.error(error);
        throw error; // 에러를 적절히 처리하거나, 필요에 따라 상위로 전파
    }
}

module.exports = { fetchPlayerStats };
