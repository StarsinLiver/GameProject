// IAuth.ts : 인터페이스
import IUser from "./IUser";

export default interface IAuth {   
    isLoggedIn : boolean, // 로그인 상태(true , false)
    user? : IUser | null, // 유저 객체
}