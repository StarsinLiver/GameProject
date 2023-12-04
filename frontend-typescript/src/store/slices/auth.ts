// Todo : 공유저장소를 정의하는 파일 : 공유함수 , 공유변수
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import IUser from "../../types/auth/IUser";
import AuthService from "../../services/auth/AuthService";
import IAuth from "../../types/auth/IAuth";
import IOauth2 from "../../types/auth/IOauth2";

// Todo : localStorage 에서 user 값 가져오기 : 문자열 -> 객체로 변환 : JSON.parse
// user = webToken이 있음
const user = JSON.parse(localStorage.getItem("user") || "null");

// Todo  : 의미
// Async의 의미   : 비동기
// createAsyncThunk(함수명 , (변수 , thunkAPI) => {실행문}) : 리덕스 비동기 함수 적용

// thunkAPI      : 에러메시지 처리 : 고정적으로 붙여서 사용
//                -> 사용법 : thunkAPI.rejectWithValue(에러메시지)

// Todo : async ~ await 비동기 코딩 방식(최근)
// 비동기함수 처리 :
// promise -> 함수실행.then().catch() [옛날 방식]
// async () => { await 함수명 };      [현대방식] : 요즘 뜨는 비동기 함수를 처리하는 실행문

/* ------ 공유 함수 정의 --------*/
// Todo : 회원가입 공유함수 (비동기 함수)
export const register = createAsyncThunk(
  "auth/register", // 공유 함수를 실행시킬 함수명
  async (user: IUser, thunkAPI) => {
    // 화살표 함수 == 비동기 함수
    try {
      const response = await AuthService.register(user); // 회원가입 service 실행
      return response.data;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue("회원가입 에러 : " + message);
    }
  }
);

// Todo : 로그인 공유함수 (비동기 함수)
export const login = createAsyncThunk(
  // 함수명
  "auth/login",
  // 비동기 함수
  async (user: IUser, thunkAPI) => {
    try {
      const data = await AuthService.login(user); // 로그인 service 실행
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue("로그인 에러 : " + message);
    }
  }
);

// Todo : 로그인 공유함수 (비동기 함수)
export const oauthLogin = createAsyncThunk(
  // 함수명
  "auth/oauthLogin",
  // 비동기 함수
  async (app: IOauth2, thunkAPI) => {
    try {
      const data = await AuthService.oauthLogin(app.registrationId ,app.code); // 로그인 service 실행
      return { user: data };
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue("oauthLogin 로그인 에러 : " + message);
    }
  }
);

// Todo : 로그아웃 공유함수 (비동기 함수)
export const logout = createAsyncThunk(
  "auth/logout", // 공유 함수를 실행시킬 함수명
  async () => {
    await AuthService.logout(); // 로그아웃 service 실행
  }
);

/* ------ 공유 변수 정의 --------*/
// Todo : State(공유 변수) 초기값 정의
const initialState: IAuth = user
  ? { isLoggedIn: true, user } // user 가 있으면 initialState = { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null }; // user 가 없으면 initialState = { isLoggedIn: false, user: null }

// Todo : 실제 공유 저장소 (리듀서 정의) : 공유 변수의 값을 정의
// name          : 리듀서의 이름
// state         : state(공유 변수)
// reducers      : 동기로 실행시    : 동기 함수 정의할때 사용하는 속성
// extraReducers : 비동기로 실행시  : 비동기함수 정의시 사용하는 속성
// Todo : 사용법 : extraReducers : (builder) => {builder.addCase (비동기 함수명.fulfilled) , 실행함수} : 비동기함수 성공시 실행 함수 실행
// Todo : 사용법 : extraReducers : (builder) => {builder.addCase (비동기 함수명.rejected) , 실행함수}  : 비동기함수 실패시 실행 함수 실행
// Todo : state , action 은 공유저장소(리덕스)에서 관리하는 값 , 한마디로 알아서 된다
const authSlice = createSlice({
  name: "auth",
  initialState,
  // 동기로 실행 시
  reducers: {},
  // 비동기로 함수 실행 시 : register, login, logout 은 모두 비동기 함수임
  extraReducers: (builder) => {
    builder
      // register 비동기함수 성공시
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      // register 비동기함수 실패시
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      // login 비동기함수 성공시
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user; // action.payload : user 객체 저장
      })
      // login 비동기함수 실패시
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      // logout 비동기함수 성공시
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      // oauthLogin 비동기함수 실패시
      .addCase(oauthLogin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      // oauthLogin 비동기함수 성공시
      .addCase(oauthLogin.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
