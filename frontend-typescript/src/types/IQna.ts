// QID         NUMBER NOT NULL
//     USER_ID         NUMBER,                     -- 유저의 참조키
//     QUESTIONER  VARCHAR2(255),                  -- 질문자의 이름
//     QUESTION    VARCHAR2(2000),                 -- 질문
//     ANSWERER    VARCHAR2(255),                  -- 답변자
//     ANSWER      VARCHAR2(2000),                 -- 답변

export default interface IQna {
  qid?: any | null;
  userId?: number;
  questioner: string;
  question: string;
  answerer: string;
  answer: string;
  answerYn: string;
}
