// authHeader.ts : 웹토큰이 있는 http 헤더 (공통)

export default function authHeader() {
    // 1) 웹 토큰 가져오기 : 로컬스토리지
  if (localStorage.getItem("user")) {
    // 2) user 값이 null 이라면 빈문자열
    const user = JSON.parse(localStorage.getItem("user") || "");
    // 3) user 객체가 있고 동시에 user.accessToken (웹토큰) 있으면
    if (user && user.accessToken) {
      return { Authorization: "Bearer " + user.accessToken };
    } else {
      return {};
    }
  }
}
