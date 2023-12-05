
# 1 ~ 3 번까지는 설치 되어있습니다. npm i 만 치면 됩니다.

# 1) npm i react-router-dom
# 2) npm i sass
# 3) npm i axios

# 토스 페이먼츠 api
npm install @tosspayments/payment-widget-sdk

# middleware
npm i http-proxy-middleware

# 만약 페이지 네이션을 사용하게 될시
# 4) Material Page component 업그레이드 
# 과거 v4 -> v5 변경 설치
npm install @mui/material @emotion/react @emotion/styled

# 4-1) 소스에서 임포트 사용법 : <Pagination />
import Pagination from '@mui/material/Pagination';

# 6) 공유라이브러리 리덕스-툴킷 설치
npm i react-redux @reduxjs/toolkit

# 7) 폼 유효성 체크 라이브러리 설치
# 7-1) formik
npm i formik

# 7-2) yup
npm i yup
npm i @types/yup

# 8) toastify
npm i react-toastify

# 9) 메시지 보내기
npm i @emailjs/browser
npm install emailjs-com


# 로그인 추가 순서
0) App.tsx : /home 라우터  추가
0) index.tsx : <Provider store={store}></Provider> 추가
1) types - auth 생성
2) store 생성
3) services - auth 생성
4) pages - auth 생성

# 메시지 부분
Register
ResetPassword
Contact
AdminControlPanelRefund
Success
UserRefund
ForgotPassword

# * 외부 라이브러리 타입이 없을 경우 처리 : 타입 설정
# 1) tsconfig.json 파일 - compilerOptions 속성에 아래 추가 : 프로젝트시작위치/types - 이 위치에 타입을 인식하게 하는 경로 설정
"typeRoots": ["./types", "./node_modules/@types"], // 보통 types 폴더를 만들어 타입 정의
# 2) types/외부라이브러리명/index.d.ts 파일 생성 후 아래 추가
declare module '외부라이브러리명';