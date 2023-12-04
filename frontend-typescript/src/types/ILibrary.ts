// LID         NUMBER NOT NULL
//     USER_ID         NUMBER,                 -- 유저의 기본키
//     PID         NUMBER,                     -- PRODUCT 의 참조키
//     INSERT_TIME VARCHAR2(255),              -- 구매 날짜
//     REQUEST_REFUND VARCHAR2(1) DEFAULT 'N', -- 환불 요청
//     REFUND_REASON   VARCHAR2(4000) ,        -- 환불 사유
//     REFUND VARCHAR2(1) DEFAULT 'N',         -- 환불
//     REFUND_TIME VARCHAR2(255),              -- 환불 시간
//     CONSTRAINT FK_LIBRARY_PID FOREIGN KEY (PID)
//         REFERENCES PRODUCT (PID)
// );

export default interface ILibrary {
  lid? : any | null,
  userId? : number ,
  pid : number,
  finalPrice : number | null , 
  insertTime : string ,
  requestRefund : string | null,
  refundReason : string | null,
  refund : string | null,
  refundTime :string | null
}