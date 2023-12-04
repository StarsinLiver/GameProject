import IQna from '../../types/IQna';
import http from '../../utils/http-common'
import authHeader from '../auth/AuthHeader';


// 전체 조회 + userId 별로 조회 (paging 기능 : page(현재페이지), size(1페이지당개수, userId(유저 참조키))
const getAllByUserId = (userId: any, question : string , page: number, size: number) => {
  return http.get<Array<IQna>>(`/user/qna?userId=${userId}&question=${question}&page=${page}&size=${size}`, {
    headers : authHeader()
  });
};

// 상세 조회
const get = (qid:any) => {
  return http.get<IQna>(`/user/qna/${qid}`, {
    headers : authHeader()
  });
};

// 저장함수
const create = (data:IQna) => {
  return http.post<IQna>("/user/qna", data, {
    headers : authHeader()
  });
};

// 수정함수
const update = (qid:any, data:IQna) => {

  return http.put<any>(`/user/qna/${qid}`, data, {
    headers : authHeader()
  });
};

// 삭제함수
const remove = (qid:any) => {
  return http.delete<any>(`/user/qna/deletion/${qid}`, {
    headers : authHeader()
  });
};


const UserQnaService = {
  getAllByUserId,
  get,
  create,
  update,
  remove
}

export default UserQnaService;

