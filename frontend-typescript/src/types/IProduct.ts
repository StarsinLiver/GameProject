// PID         NUMBER NOT NULL
//     NAME       VARCHAR2(500),             -- 제목
//     SHORT_DESCRIPTION       VARCHAR2(4000),             -- 짧은 설명
//     IMG_URL         VARCHAR2(1000),       -- 이미지(전체조회때 쓰일)
//     PRICE       NUMBER(8),                -- 가격
//     TAG         VARCHAR2(50),             -- 태그
//     DISCOUNT    NUMBER(4),                -- 할인율
//     INSERT_TIME VARCHAR2(255),
//     UPDATE_TIME VARCHAR2(255),
//     DELETE_YN   VARCHAR2(2) DEFAULT 'N',
//     DELETE_TIME VARCHAR2(255)

export default interface IProduct {
  pid? : any | null,
  name? : string ,
  shortDescription : string | undefined,
  imgUrl : string,
  price : number ,
  finalPrice : number,
  tag : string ,
  discount : number,
  uuid : string
}