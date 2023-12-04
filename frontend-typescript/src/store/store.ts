import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import { useDispatch } from 'react-redux';

// Todo : 공유 저장소 만드는 곳 : store

// seting redux-toolkit
// 리덕스 - 툴킷 환경설정 파일
// 리덕스를 사용하기 쉽게 줄여논 lib : redux-tookit
// 리덕스 : 공유저장소 (공유변수(전역변수) , 공유함수)
export const store = configureStore({
  // Todo : 공유 저장소 이름 : 리듀서(reducer)
  reducer: {
    auth: authReducer, // 공유 저장소 1개 (여러개 만들 수 있음)
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
