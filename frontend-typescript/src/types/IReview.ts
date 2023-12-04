export default interface IReview {
  //     RID         NUMBER NOT NULL
  //     CONSTRAINT PK_REVIEW PRIMARY KEY, -- REVIEW의 기본키
  // TITLE       VARCHAR2(512),                   -- 제목
  // CONTENT     VARCHAR2(2000),           -- 컨텐츠
  // WRITER      VARCHAR2(255),            -- 작성자
  // IS_LIKE     VARCHAR2(1),              -- 좋아요
  // GROUP_ID       NUMBER,                   -- 그룹 ID
  // PARENT_ID      NUMBER,                   -- 부모 ID
  // PID         NUMBER,
  rid?: any | null;
  title: string;
  content: string;
  email: string | any;
  writer: string | any;
  isLike: number;
  groupId: any | null;
  parentId: any | null;
  pid: number;
  insertTime: any;
}
