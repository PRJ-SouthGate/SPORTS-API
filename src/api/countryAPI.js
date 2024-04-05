require('dotenv').config();
const axios = require('axios');

const countryNameMapping = {
    "Korea Republic": "Republic of Korea",
    // 필요한 경우 다른 국가들에 대한 매핑도 이곳에 추가
};

async function getCountryFlag(countryName) {
    const mappedCountryName = countryNameMapping[countryName] || countryName;

    const apiUrl = process.env.COUNTRY_FLAGS_API_URL;
    const fullUrl = `${apiUrl}${mappedCountryName}?fullText=true`; // 환경변수를 이용한 URL 구성

    try {
        const response = await axios.get(fullUrl);
        const flagUrl = response.data[0].flags.svg; // 또는 .svg
        return flagUrl;
    } catch (error) {
        console.error(error);
        return '';
    }
}
module.exports = { getCountryFlag };

