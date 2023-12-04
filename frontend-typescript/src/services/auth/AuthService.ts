// TODO : AXIOS 공통 함수 : 백엔드 연동
import IUser from "../../types/auth/IUser";
import http from "../../utils/http-common";



// 로그인 : login , signin
const login = (user: IUser) => {
  return http.post(`/auth/signin`, user).then((response: any) => {
      localStorage.setItem("user", JSON.stringify(response.data));
      console.log(response);
      return response.data;
  });
};

const oauthLogin = (registrationId : any , code : any) => {
  return http.get(`/auth/login/oauth2/code/${registrationId}?code=${code}`).then((response : any) => {
    localStorage.setItem("user", JSON.stringify(response.data));
    console.log(response);
    return response.data;
  });
  
}

// 로그아웃 함수 : 로컬스토리지에서 값 제거
const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
};

// 회원가입 : register , signup
const register = (user: IUser) => {
  return http.post(`/auth/signup`, user);
};

const update = (user:IUser) => { 
  return http.put(`/auth/update` , user);
 }

// 회원탈퇴 : withdraw
const withdraw = (userId: number) => {
  return http.delete(`/auth/withdraw/${userId}`);
};


//  Todo : 유저 패스워드 수정전 (UserLibrary 에서 사용)에 맞는지 확인
const isPassword = (data : any) => { 
  return http.post(`/auth/find-password`, data);
  }

// Todo : 패스워드(forget Password 에서 사용) 찾기
const findPassword = (data : any) => { 
  return http.post(`/auth/forgot-password`,data);
 }

//  Todo : 패스워드 변경 (forget Password 에서 사용)
const resetPassword = (data : any) => { 
  return http.put(`/auth/reset-password`,data)
 }


const AuthService = {
  login,
  oauthLogin,
  logout,
  update,
  register,
  withdraw,
  findPassword,
  isPassword,
  resetPassword
};

export default AuthService;
