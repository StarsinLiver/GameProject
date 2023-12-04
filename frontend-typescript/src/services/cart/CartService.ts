import ICart from "../../types/ICart";
import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";



// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (userId : number , page:number, size:number) => {
  return http.get<Array<ICart>>(`/user/cart?&userId=${userId}&page=${page}&size=${size}`, {
    headers : authHeader()
  });
};


// 상세 조회
const get = (cid:any) => {
  return http.get<ICart>(`/user/cart/${cid}`, {
    headers : authHeader()
  });
};

// 저장함수
const create = (data:ICart) => {
  return http.post<ICart>("/user/cart", data, {
    headers : authHeader()
  });
};
// 수정함수
const update = (data:ICart) => {
   return http.put<any>(`/user/cart`, data, {
    headers : authHeader()
  });
};

// 삭제함수
const remove = (cid:any) => {
  return http.delete<any>(`/user/cart/deletion/${cid}`, {
    headers : authHeader()
  });
};

const findByUserId = (userId: any, page:number, size:number) => { 
  return http.get<Array<ICart>>(`/user/cart/userId?userId=${userId}&page=${page}&size=${size}`, {
    headers : authHeader()
  });
};

// 구매상태 변경 함수
const updateCompleteYn = (cid : any) => {
  return http.put(`/user/cart/updateCompleteYn/${cid}`, null ,{
    headers : authHeader()
  });
};

// todo : 상세페이지실행시 장바구니에 추가하였는지 판별
const getCid = (pid: any, userId: any) => {
  return http.get<any>(`/user/cart/cid/${pid}/${userId}`, {
    headers : authHeader()
  });
};


const CartService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByUserId,
  updateCompleteYn,
  getCid
};

export default CartService;
