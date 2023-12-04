export default interface IAppsData {
  categories : any          // 카테고리 배열 description , id   예시) 멀티플레이어 , pvp 등
  developers : any          // 제작사 배열
  pc_requirements : any     // 사양 배열  minimum  등     예시 <p><strong>최소 사양:</strong> 500MHz 프로세서, 96MB RAM, 16MB 그래픽 카드,
  release_date : any        // 릴리즈 날짜 date : "2000년 11월 1일" , coming_soon 
  screenshots : any         // 스크린샷 배열 id , path_thumbnail : 큰사진 , path_thumbnail : 작은사진
  genres : any              // 장르 배열 description : 장르 , id : id   예시) 액션
  price_overview : any      // 가격 배열 currency: "KRW" , discount_percent , final_formatted : "₩ 10,500"   
                                      // , final : 현재 가격인데 10500000 <- 나누기 100 하면 될듯            
  metacritic : any          // 메타크리틱 점수  score(점수) , url(메타크리틱 url)

  about_the_game : string,      // 게임에 대한 설명
  name : string                 // 게임 이름
  is_free : boolean             // 무료 게임인지
  detailed_description : string // 디테일 설명 
  short_description : string    // 짧은 설명
  header_image : any            // 메인 이미지 소스
  background : any              // 뒷 배경화면 
  supported_languages : string  // 서비스 지원 언어
  type : string                 // game 진짜 그냥 "game" 이라 적혀있음 ㅋㅋ
}