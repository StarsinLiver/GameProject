// ReplyBoardService.ts : axios 공통 crud 함수

import IReview from "../../types/IReview";
import IUser from "../../types/auth/IUser";
import http from "../../utils/http-common";
import authHeader from "../auth/AuthHeader";

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAll = (pid: number, page: number, size: number) => {
  return http.get<Array<IReview>>(
    `/review/parent?pid=${pid}&page=${page}&size=${size}`
  );
};

// 전체 조회 + like 검색(paging 기능 : page(현재페이지), size(1페이지당개수))
const getAllChild = (
  pid: number,
  parentId: number
) => {
  return http.get<Array<IReview>>(
    `/review/child?pid=${pid}&parentId=${parentId}`
  );
};

// todo : user 이메일 들고오기
const getEmail = (userId: any) => {
  return http.post<IUser>(`/review/email/${userId}`);
};

// 상세 조회
const get = (rid: any) => {
  return http.get<IReview>(`/review/${rid}`);
};

// 저장함수 : 게시물 생성(부모글)
const createReviewParent = (data: IReview) => {
  return http.post<IReview>("/user/review-parent", data , {
    headers : authHeader()
  });
};

// 저장함수 : 답변글 생성(자식글)
const createReviewChild = (data: IReview) => {
  return http.post<IReview>("/user/review-child", data, {
    headers : authHeader()
  });
};

// 수정함수
const update = (pid: any, data: IReview) => {
  return http.put<any>(`/user/review/${pid}`, data, {
    headers : authHeader()
  });
};
// 리뷰조회 + nopage
const getAllNoPage = (pid: number) => {
  return http.get<Array<IReview>>(`/review/no-page/${pid}`);
};

// 삭제함수 : 게시물(부모글) + 답변글(자식글) 모두 삭제
//      그룹번호 : 부모글과 자식글은 모두 그룹번호가 같음
const removeReviewParent = (groupId: any) => {
  return http.delete<any>(`/user/review/deletion/parent/${groupId}`, {
    headers : authHeader()
  });
};

// 삭제함수 : 답변글만 삭제
const removeReviewChild = (rid: any) => {
  return http.delete<any>(`/user/reply/deletion/${rid}`, {
    headers : authHeader()
  });
};

// maxPrice = 최대값 minPrice = 최솟값
const dd = (tag:any, name:any, minPrice:any,maxPrice:any,page:any, size:any, order:any) => { 
  return http.get<any>(`review/isLike?tag=${tag}&name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}&order=${order}`)
}

const ReviewService = {
  getAll,
  get,
  getEmail,
  createReviewParent,
  createReviewChild,
  update,
  removeReviewParent,
  removeReviewChild,
  getAllChild,
  getAllNoPage,
  dd
};

export default ReviewService;
