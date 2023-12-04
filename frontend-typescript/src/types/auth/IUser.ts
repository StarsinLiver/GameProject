// IUser.ts : 인터페이스
export default interface IUser {
    // USER_ID         NUMBER NOT NULL
    //     CONSTRAINT PK_PROJECT_USER
    //     PRIMARY KEY, -- 유저의 기본키
    // NAME        VARCHAR2(255),                  -- 유저의 이름
    // EMAIL       VARCHAR2(255) UNIQUE,           -- 유저의 이메일
    // PASSWORD    VARCHAR2(255),                  -- 유저의 패스워드
    // ROLE        VARCHAR2(20),                   -- 유저의 권한

    userId? : any | null,
    name : string ,
    email : string,
    password : string,
    description : string,
    insertTime : string,
    role : string | null,
    point : number | null
}