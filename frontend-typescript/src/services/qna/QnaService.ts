import IQna from '../../types/IQna';
import http from '../../utils/http-common'


// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (question:string, page:number, size:number) => {
  return http.get<Array<IQna>>(`/qna?question=${question}&page=${page}&size=${size}`);
};

// 상세 조회
const get = (qid:any) => {
  return http.get<IQna>(`/qna/${qid}`);
};



const QnaService = {
  getAll,
  get,
}

export default QnaService;

