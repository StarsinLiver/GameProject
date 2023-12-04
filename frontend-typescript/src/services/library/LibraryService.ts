import http from "../../utils/http-common";
import ILibrary from "../../types/ILibrary";
import authHeader from "../auth/AuthHeader";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (name: string, page: number, size: number) => {
  return http.get<Array<ILibrary>>(
    `/user/library?name=${name}&page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

// 상세조회 : 게임 유무 확인
const getLibarary = (pid: number, userId: number) => {
  return http.get<boolean>(`/user/library/${pid}/${userId}`, {
    headers: authHeader(),
  });
};

const getAllByTag = (name: string, tag: string, page: number, size: number) => {
  return http.get<Array<ILibrary>>(
    `/user/library-tag?name=${name}&tag=${tag}&page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

// 상세 조회
const get = (pid: any) => {
  return http.get<ILibrary>(`/user/library/${pid}`, {
    headers: authHeader(),
  });
};

// 저장함수
const create = (data: ILibrary) => {
  return http.post<ILibrary>("/user/library", data, {
    headers: authHeader(),
  });
};

// 수정함수
const update = (pid: any, data: ILibrary) => {
  return http.put<any>(`/user/library/${pid}`, data, {
    headers: authHeader(),
  });
};

// 삭제함수
const remove = (pid: any) => {
  return http.delete<any>(`/user/library/deletion/${pid}`, {
    headers: authHeader(),
  });
};

const LibraryService = {
  getAll,
  getAllByTag,
  getLibarary,
  get,
  create,
  update,
  remove,
};

export default LibraryService;
