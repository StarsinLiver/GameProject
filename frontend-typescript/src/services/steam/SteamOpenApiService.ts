import axios from "axios";

// 전체 조회 : https://api.steampowered.com/ISteamApps/GetAppList/v2
// 상세 조회(외국) : https://store.steampowered.com/api/appdetails?appids=1476090
// 상세 조회(한국) : https://store.steampowered.com/api/appdetails?appids=218620&l=korean
// 게임 플레이어 숫자 : https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=240

// 리뷰 (모르겟음) : https://api.steampowered.com/appreviews/763679?json=1&cursor=AoIIPwYYanDTv%2BQB&l=korean
// 뉴스 정보 : https://api.steampowered.com/ISteamNews/GetNewsForApp/v2?appid=appid

// Todo : 프록시 데모 : http://cors-anywhere.herokuapp.com/


// 전체 조회 공통 : https://api.steampowered.com
// 상세 조회 공통 : https://store.steampowered.com

// 연습 : id 값 : 218620

const findAll = () => {
  return axios.get(`https://proxy.cors.sh/https://api.steampowered.com/ISteamApps/GetAppList/v2`, {
    headers: {
    'x-cors-api-key': `${process.env.REACT_APP_PROXY_KEY}`
    }
  });
};

const findById = (appid: number) => {
  console.log("appid" , appid);
  return axios.get(`https://proxy.cors.sh/https://store.steampowered.com/api/appdetails?appids=${appid}&l=korean`, {
    headers: {
      'x-cors-api-key': `${process.env.REACT_APP_PROXY_KEY}`
    }
  });
};

const findNewsById = (appid : number) => {
  console.log("appid" , appid);
  return axios.get(`https://proxy.cors.sh/https://api.steampowered.com/ISteamNews/GetNewsForApp/v2?appid=${appid}`, {
    headers: {
      'x-cors-api-key': `${process.env.REACT_APP_PROXY_KEY}`
    }
  });
}

const TestOpenApiService = {
  findAll,
  findById,
  findNewsById
};

export default TestOpenApiService;
