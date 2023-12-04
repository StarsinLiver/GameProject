import IProductDto2 from "../../types/Dto/IProductDto2";
import IProduct from "../../types/IProduct";
import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (name: string, page: number, size: number) => {
  return http.get<Array<IProduct>>(
    `/product?name=${name}&page=${page}&size=${size}`
  );
};

// 모든 태그들 가져오기
const getAllTags = () => { 
  return http.get<Array<string>>(`/product/all-tags`);
 }

// 전체 조회 + like 검색
const getAllNoPage = (name: string) => {
  return http.get<Array<IProduct>>(`/product-no-page?name=${name}`);
};

const getAllByTag = (name: string, tag: string, page: number, size: number) => {
  return http.get<Array<IProduct>>(
    `/product-tag?name=${name}&tag=${tag}&page=${page}&size=${size}`
  );
};

const getAllByThumbNailFullJoin = (tag: string, page: number, size: number) => {
  return http.get<Array<IProduct>>(
    `/product/thumbnail?tag=${tag}&page=${page}&size=${size}`
  );
};

const getAllByThumbNailAndReviewCountFullJoinOrderByDesc = (
  name: string,
  tag: string,
  firstPrice: number,
  lastPrice: number,
  page: number,
  size: number
) => {
  return http.get<Array<IProductDto2>>(
    `/product/tag/isLikeDesc?name=${name}&tag=${tag}&page=${page}&size=${size}&firstPrice=${firstPrice}&lastPrice=${lastPrice}`
  );
};

const getAllByThumbNailAndReviewCountFullJoinOrderByAsc = (
  name: string,
  tag: string,
  firstPrice: number,
  lastPrice: number,
  page: number,
  size: number
) => {
  return http.get<Array<IProductDto2>>(
    `/product/tag/isLikeAsc?name=${name}&tag=${tag}&page=${page}&size=${size}&firstPrice=${firstPrice}&lastPrice=${lastPrice}`
  );
};

// 상세 조회
const get = (pid: any) => {
  return http.get<IProduct>(`/product/${pid}`);
};

// 저장함수
const create = (data: IProduct) => {
  return http.post<IProduct>("/admin/product", data, {
    headers: authHeader(),
  });
};

// 수정함수
const update = (pid: any, data: IProduct) => {
  return http.put<any>(`/admin/product/${pid}`, data, {
    headers: authHeader(),
  });
};

// 삭제함수
const remove = (pid: any) => {
  return http.delete<any>(`/admin/product/deletion/${pid}`, {
    headers: authHeader(),
  });
};

const ProductService = {
  getAll,
  getAllByTag,
  getAllTags,
  getAllNoPage,
  getAllByThumbNailFullJoin,
  getAllByThumbNailAndReviewCountFullJoinOrderByDesc,
  getAllByThumbNailAndReviewCountFullJoinOrderByAsc,
  get,
  create,
  update,
  remove,
};

export default ProductService;
