// FileDbService : axios 공통 CRUD 함수
// axios 공통함수 : 벡엔드 연동

import IFileDb from "../../../types/advanced/IFileDb";
import http from "../../../utils/http-common";
import authHeader from "../../auth/AuthHeader";


// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getFiles = (
  fileTitle: string,
  page: number,
  size: number
): Promise<any> => {
  return http.get(
    `/advanced/fileDb?fileTitle=${fileTitle}&page=${page}&size=${size}`, {
      headers : authHeader()
    }
  );
};

// 전체 조회 (페이징 없음)
const getAllFiles = (): Promise<any> => {
  return http.get("/advanced/fileDb/all", {
    headers : authHeader()
  });
};


// 상세 조회(uuid)
const getFileDb = (uuid: any): Promise<any> => {
  return http.get(`/advanced/fileDb/get/${uuid}`, {
    headers : authHeader()
  });
};

// 저장함수
// uploadFileDb : 제목 + 타이틀(내용) 속성 가진 객체
// fileDb       : 실제 이미지(첨부파일)
// FormData 객체를 이용해서 백엔드로 전송
const upload = (uploadFileDb: IFileDb, fileDb: any) : Promise<any> => {
  // FormData 객체 생성 : Map 자료구조와 유사(키, 값)
  let formData = new FormData();
  formData.append("fileTitle", uploadFileDb.fileTitle);
  formData.append("fileContent", uploadFileDb.fileContent);
  formData.append("fileDb", fileDb); // 첨부파일
  const user = JSON.parse(localStorage.getItem("user") || "");
  return http.post("/admin/advanced/fileDb/upload", formData, {
    headers: {                                  // headers : 문서종류
      Authorization: "Bearer " + user.accessToken ,
      "Content-Type": "multipart/form-data",    // 첨부파일 형태로 보낸다.
    },
  });
};

// 수정함수
// 1) FormData 객체 사용
// 2) headers: {"Content-Type": "multipart/form-data"}
const updateFileDb = (uploadFileDb:IFileDb, fileDb:any): Promise<any> => {

    console.log("update() parameter ; ", uploadFileDb);
  
    let formData = new FormData();
  
    formData.append("fileTitle", uploadFileDb.fileTitle);
    formData.append("fileContent", uploadFileDb.fileContent);
    formData.append("fileDb", fileDb);
    const user = JSON.parse(localStorage.getItem("user") || "");
    
    return http.put(`/admin/advanced/fileDb/${uploadFileDb.uuid}`, formData, {
      headers: {
        Authorization: "Bearer " + user.accessToken ,
        "Content-Type": "multipart/form-data"
      },
    });
  };

// 삭제함수(기본키 : uuid)
const deleteFile = (uuid: any): Promise<any> => {

  return http.delete(`/admin/advanced/fileDb/deletion/${uuid}`,{
    headers : authHeader()
  });
};

const FileDbService = {
  getFiles,         // 전체조회
  getAllFiles,
  getFileDb,        // 상세조회
  upload,           // 저장
  updateFileDb,     // 수정
  deleteFile,       // 삭제
};

export default FileDbService;
