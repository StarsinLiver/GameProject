import ILibrary from "../../types/ILibrary";
import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (page: number, size: number) => {
  return http.get<Array<ILibrary>>(
    `/admin/admin-controll-panel-library-N?page=${page}&size=${size}`, {
      headers : authHeader()
    }
  );
};

// 상세 조회
const get = (lid: any) => {
  return http.get<ILibrary>(`/admin/admin-controll-panel-library/${lid}`, {
    headers : authHeader()
  });
};

// 저장함수
const create = (data:ILibrary) => {
  return http.post<ILibrary>("/admin/admin-controll-panel-library", data, {
    headers : authHeader()
  });
};

// 수정함수
const update = (lid:any, data:ILibrary) => {
  return http.put<any>(`/admin/admin-controll-panel-library/${lid}`, data, {
    headers : authHeader()
  });
};

// 삭제함수
const remove = (lid: any) => {
  return http.delete<any>(
    `/admin/admin-controll-panel-library/deletion/${lid}`, {
      headers : authHeader()
    }
  );
};

const AdminLibraryService = {
  getAll,
  get,
  create,
  update,
  remove,
};

export default AdminLibraryService;
