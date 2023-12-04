import IQna from '../../types/IQna';
import http from '../../utils/http-common'
import authHeader from '../auth/AuthHeader';

// 상세 조회
const get = (qid:any) => {
  return http.get<IQna>(`/admin/qna/${qid}`, {
    headers : authHeader()
  });
};

// 수정함수
const update = (qid:any, data:IQna) => {

  return http.put<any>(`/admin/qna/${qid}`, data, {
    headers : authHeader()
  });
};

// 삭제함수
const remove = (qid:any) => {
  return http.delete<any>(`/admin/qna/deletion/${qid}`, {
    headers : authHeader()
  });
};

const AdminQnaService = {
  get,
  update,
  remove
}

export default AdminQnaService;

