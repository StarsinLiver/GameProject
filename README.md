# Playhost Springboot Game Web page Project
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?tab=readme-ov-file&url=https%3A%2F%2Fgithub.com%2FStarsinLiver%2FGameProject&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

## 0. Spring Boot 와 React 을 활용한 게임 웹사이트 프로젝트
- SpringBoot 기반 웹 사이트 개발 프로젝트를 진행

### 프로젝트 선정 배경
<img src="https://github.com/StarsinLiver/StarsinLiver.github.io/assets/141594965/68c641df-4d3c-4df5-be3b-4c5f4af59d74" width="400"/>
<img src="https://github.com/StarsinLiver/StarsinLiver.github.io/assets/141594965/94bb3268-9a62-4242-b1c9-24d7c36cefd9" width="400" />

### 브랜치별 설명
각자 맡은 역할에 따라 브랜치를 생성
- main    : 기본 프로젝트
- Junhee  : 상세조회 , 리뷰 , 태그별 게임 컬렉션
- junyeok : 결제 , News(뉴스) , About , 유저페이지 
- sanghwa : 게임 컬렉션, 메인페이지, 관리자페이지(front)
- sanha   : 로그인 및 회원가입 기능 , 메인페이지 , 관리자 페이지(backend)

## 1. 사용기술 - FRONT
- React
- JQuery
- BootStrap
- Redux
- steam API
- toss payments API

## 1-2. 사용기술 - Backend
- Java 11
- Spring Boot MVC
- Gradle
- kakao openAPI
- google openAPI
- Oracle DATABASE
- AWS EC2
- GABIA (도메인)

![1706859882414-4c2a9d00-e4c7-47df-ab00-e5ebc180871a_11](https://github.com/StarsinLiver/StarsinLiver.github.io/assets/141594965/0cfc01bb-44c2-4936-a440-73715183f4f0)

## 2. ERD 
![1706859882414-4c2a9d00-e4c7-47df-ab00-e5ebc180871a_14](https://github.com/StarsinLiver/StarsinLiver.github.io/assets/141594965/8abc2928-88fd-4ac5-8413-62df7b9cc142)

## 3. 구현 기능
1) 로그인/회원가입
   - GOOGLE , KAKAO OPEN API를 활용한 간편로그인
   - 비밀번호 찾기 기능
   - 자체 회원가입 기능
2) 메인페이지
   - 추천게임 목록 
   - 금주의 할인 게임 (할인율 적용시 나타나는 페이지)
   - 액션 , 무료 게임 탭 기능
   - 카테고리별 순위 
3) 전체조회
   - 검색 기능
     - 게임 이름 검색창
     - 태그별 선택창
     - 가격별 선택창
     - 리뷰 평가 선택창
4) 상세조회
   - 게임 설명
   - 게임 carousel 형식 이미지 , 동영상
   - 장바구니 기능
   - 태그 기능
   - 최근 소식
   - 컴퓨터 사양
   - 해당 게임 공유 기능
   - 리뷰 기능
5) 장바구니
   - 장바구니 담기 , 삭제
6) 결제 기능
   - toss payment API 를 활용
   - mail JS 를 활용한 결제 내역 메일 전송
   - 포인트 활용 기능
7) 마이 페이지
   - 구매한 게임 목록
   - 회원 정보 수정
     - 이름 , 설명 , 패스워드
   - 구매 내역 목록 확인
   - QNA 작성 / 수정 / 내역 확인
   - 환불 요청 / 수정 / 내역 확인
8) 뉴스
9) 관리자 페이지
   - steam API
     - 게임 검색 기능
     - 게임 상세 조회 기능
   - 상품
     - 등록 , 수정 , 삭제
   - 환불
     - 일반 유저가 환불 요청시 환불 목록 확인
     - 환불을 요청한 유저의 정보 , 게임정보 내역
     - 환불 승인 , 거절
   - QNA
     - 일반 유저가 작성한 QNA 목록 확인
     - 글 작성 , 수정 기능

## 4. 구동 화면
### 로그인/회원가입
![login](https://github.com/StarsinLiver/GameProject/assets/141594965/841b31db-0a16-45e5-a109-1495015ac6ef)

### 메인페이지
![main](https://github.com/StarsinLiver/GameProject/assets/141594965/aa41ab30-0e53-47f8-9eaa-9330a5a02157)

### 전체 조회 - 게임 컬렉션
![game collection](https://github.com/StarsinLiver/GameProject/assets/141594965/6e1c229b-82bd-4857-ad88-ee4071519387)

### 상세조회  
- 리뷰 <br>
![morepage_and_review](https://github.com/StarsinLiver/GameProject/assets/141594965/12b64365-c5c6-40bb-9a7e-81a93d361074)

- 장바구니 , 뉴스 <br>
![shop_and_news](https://github.com/StarsinLiver/GameProject/assets/141594965/fa44efdd-2ca8-4c99-a8c1-b9416901bce4)


### 장바구니 - 결제기능 
![cart](https://github.com/StarsinLiver/GameProject/assets/141594965/c12bcbef-c8fe-4480-bebb-664cee13c435)

### 마이 페이지
- 회원 정보 변경 <br>
![user update](https://github.com/StarsinLiver/GameProject/assets/141594965/291ab29a-069c-4d67-a6db-0a9f34ad80a3)
- QNA 작성 <br>
![user qna](https://github.com/StarsinLiver/GameProject/assets/141594965/df34e91c-c0c3-4301-bd44-70086bae5d0c)
- 환불요청 <br>
![user refund](https://github.com/StarsinLiver/GameProject/assets/141594965/6f79e7c4-6b2f-4d0a-8c9e-eb7cd76191ba)

### 관리자 페이지
- 상품 등록 , 수정 <br>
![product](https://github.com/StarsinLiver/GameProject/assets/141594965/895b724a-d1af-4699-abae-c851f25cf4ab)
- 환불 , QNA <br>
![admin_refund_qna](https://github.com/StarsinLiver/GameProject/assets/141594965/cea2b58c-be6f-4755-bfad-d84b379e965e)

- 회원 정보 수정 <br>
![admin_update](https://github.com/StarsinLiver/GameProject/assets/141594965/dc3a6661-5456-4571-a2b5-297f1a9cb234)

### 뉴스
- 뉴스 등록 <br>
![news](https://github.com/StarsinLiver/GameProject/assets/141594965/465e8a38-b441-496f-8c66-98d108d89d43)
- 뉴스 수정 <br>
![news_update](https://github.com/StarsinLiver/GameProject/assets/141594965/32d43a5e-7eb0-4649-9261-76ef9dc026dc)
