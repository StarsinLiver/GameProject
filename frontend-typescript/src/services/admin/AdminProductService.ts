import IProduct from "../../types/IProduct";
import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (name: string, page: number, size: number) => {
  return http.get<Array<IProduct>>(
    `/admin/admin-controll-panel?name=${name}&page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

// 상품 전체조회(페이징) + qna, 환불요청목록 전체조회(페이징 x)
const getAllByTagQnaRefund = (
  userId: number,
  name: string,
  tag: string,
  question: string,
  page: number,
  size: number
) => {
  return http.get<Array<IProduct>>(
    `/admin/admin-console?userId=${userId}&name=${name}&tag=${tag}&question=${question}&page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

const getAllByTag = (name: string, tag: string, page: number, size: number) => {
  return http.get<Array<IProduct>>(
    `/admin/admin-controll-panel-tag?name=${name}&tag=${tag}&page=${page}&size=${size}`,
    {
      headers: authHeader(),
    }
  );
};

// 상세 조회
const get = (pid: any) => {
  return http.get<IProduct>(`/admin/admin-controll-panel/${pid}`, {
    headers: authHeader(),
  });
};

// 저장함수
const create = (data: IProduct) => {
  return http.post<IProduct>("/admin/admin-controll-panel", data, {
    headers: authHeader(),
  });
};

// 수정함수
const update = (pid: any, data: IProduct) => {
  return http.put<any>(`/admin/admin-controll-panel/${pid}`, data, {
    headers: authHeader(),
  });
};

// 삭제함수
const remove = (pid: any) => {
  return http.delete<any>(`/admin/admin-controll-panel/deletion/${pid}`, {
    headers: authHeader(),
  });
};

const AdminProductService = {
  getAll,
  getAllByTag,
  getAllByTagQnaRefund,
  get,
  create,
  update,
  remove,
};

export default AdminProductService;
