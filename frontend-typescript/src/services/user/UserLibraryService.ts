import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (userId: any, page: number, size: number) => {
  return http.get<Array<any>>(
    `/user/library?userId=${userId}&page=${page}&size=${size}`, {
      headers : authHeader()
    }
  );
};


// 상세 조회
const get = (lid: any) => {
  return http.get<any>(`/user/library/${lid}`, {
    headers : authHeader()
  });
};

// 저장함수
const create = (data: any) => {
  return http.post<any>("/user/library", data, {
    headers : authHeader()
  });
};

// 수정함수
const update = (lid: any, data: any) => {
  return http.put<any>(`/user/library/${lid}`, data, {
    headers : authHeader()
  });
};

const updateUserRefundPoint = (userId : number , finalPrice : number | any) => {
  return http.put<any>(`/user/library?userId=${userId}&finalPrice=${finalPrice}`,null, {
    headers : authHeader()
  })
}

// 삭제함수
const remove = (lid: any) => {
  return http.delete<any>(`/user/library/deletion/${lid}`, {
    headers : authHeader()
  });
};

const UserLibraryService = {
  getAll,
  get,
  updateUserRefundPoint,
  create,
  update,
  remove,
};

export default UserLibraryService;
