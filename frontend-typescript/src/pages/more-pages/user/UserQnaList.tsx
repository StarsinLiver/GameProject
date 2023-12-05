import React, { useEffect, useState } from "react";
import designesis from "../../../assets/js/designesia";
import QnaService from "../../../services/qna/QnaService";
import IQna from "../../../types/IQna";
import { Link, useParams } from "react-router-dom";
import { Pagination } from "@mui/material";
import UserQnaService from "../../../services/user/UserQnaService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

function UserQnaList() {
  
  // 마이페이지에서 전송받은 참조키(userId)
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    designesis();
  }, []);

  // TODO: 변수 정의
  // 검색어 키워드 변수(keyword)
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  // qna 배열 변수
  let [qnaList, setQnaList] = useState<Array<IQna>>([]);


  // TODO : 공통 변수(필수) : page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열 : 1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호        : 최초값 1
  const [count, setCount] = useState<number>(1); // 총페이지 건수         : 최초값 1
  const [pageSize, setPageSize] = useState<number>(6); // 1페이지당 개수 : 최초값 9

  // TODO : Pagenation 수동 바인딩 함수
  // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  //   input 태그 수동바인딩
  const onChangeSearchKeyword = (e: any) => {
    setSearchKeyword(e.target.value); // 화면값 -> 변수저장
  };

  // TODO: 함수 정의
  // todo : 첫번째 실행(전체조회 함수)
  useEffect(() => {
    retrieveQnaListByUserId();
  }, [page, pageSize]);

  // todo: QnaList 전체 조회
  const retrieveQnaListByUserId = () => {
    UserQnaService.getAllByUserId(user?.userId,searchKeyword , page - 1, pageSize)
      .then((response: any) => {
        const { qna, totalPages } = response.data;
        setQnaList(qna);
        // Todo : 페이징 처리
        setCount(totalPages);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {/* 페이지 대문 시작 */}
        {/* <!-- section begin --> */}
        <section id="subheader" className="jarallax">
          <div className="de-gradient-edge-bottom"></div>
          <img
            src={require("../../../assets/images/background/space.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12 mb-3 text-center">
                <div className="subtitle wow fadeInUp mb-3">User</div>
                <h2 className="wow fadeInUp mb-3" data-wow-delay=".2s">
                  나의 QnA
                </h2>
              </div>

              <div className="col-md-8 offset-md-2 text-center wow fadeInUp mb-3">
                <form
                  action="#"
                  className="row"
                  data-wow-delay="1.25s"
                  id="form_sb"
                  method="post"
                  name="form_sb"
                >
                  <div className="col">
                    <div className="spacer-10"></div>
                    <input
                      className="form-control"
                      id="domain_name"
                      name="domain_name"
                      placeholder="질문 키워드 검색"
                      type="text"
                      value={searchKeyword}
                      onChange={onChangeSearchKeyword}
                    />{" "}
                    <a
                      id="btn-submit"
                      href="javascript:;"
                      onClick={retrieveQnaListByUserId}
                    >
                      <i className="arrow_right"></i>
                    </a>
                    <div className="clearfix"></div>
                  </div>
                </form>
                <div className="spacer-20"></div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- section close --> */}
        {/* 페이지 대문 끝 */}

        {/* QnA 목록 시작 */}
        <section className="no-top wow fadeInUp">
          {/* QnA 아코디언 반복문 시작 */}
          <div className="container">
            <div className="row g-4">
              {/* 답변 전 질문 박스 시작 */}
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                답변 대기 질문
              </h2>
              {qnaList &&
                qnaList
                  .filter((data) => data.answerYn == "N")
                  .map((data) => (
                    <>
                      <div className="col-lg-13 col-md-13">
                        <div className="de-box-cat">
                          <i className="fa fa-folder-open-o"></i>
                          <h3>
                            {data.questioner} &nbsp;
                            <span>({data.answerYn})</span>
                          </h3>
                          <div className="d-subtitle">
                            <h4></h4>
                          </div>
                          <p>{data.question}</p>
                          <Link
                            role="button"
                            className="btn-main opt-1 me-2"
                            style={{
                              width: "180px",
                              fontSize: "15px",
                            }}
                            to={`/user-qna/${data.qid}`}
                          >
                            Question Detail
                          </Link>
                        </div>
                      </div>
                    </>
                  ))}

              {/* ui 구분용 공백 */}
              <div className="spacer-single"></div>

              <div className="container" id="paging">
                <Pagination
                  className="pagination"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  shape="rounded"
                  onChange={handlePageChange}
                  sx={{
                    backgroundColor: "#1E1F22", // 검정색 배경
                    color: "white", // 흰색 글자색
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px", // 원하는 여백 설정
                    "& .Mui-selected": {
                      backgroundColor: "white", // 선택된 페이지의 배경색
                      color: "#1E1F22", // 선택된 페이지의 글자색
                      "&:hover": {
                        backgroundColor: "white", // 선택된 페이지의 호버 배경색
                      },
                    },
                    "& .MuiPaginationItem-root": {
                      fontSize: "1rem", // 페이지 아이템의 글자 크기
                      minWidth: "30px", // 페이지 아이템의 최소 너비
                      height: "30px", // 페이지 아이템의 높이
                      color: "white", // 선택되지 않은 페이지 아이템의 글자색
                      "&:hover": {
                        backgroundColor: "black", // 선택되지 않은 페이지 아이템의 호버 배경색
                      },
                      "&.Mui-selected": {
                        backgroundColor: "purple", // 특정 페이지일 때 선택된 페이지의 배경색
                        color: "white", // 특정 페이지일 때 선택된 페이지의 글자색
                        "&:hover": {
                          backgroundColor: "purple", // 특정 페이지일 때 선택된 페이지의 호버 배경색
                        },
                      },
                    },
                  }}
                />
              </div>
              {/* 답변 전 질문 박스 끝 */}

              {/* 공백용 div */}
              <div className="spacer-single"></div>

              {/* 답변 후 질문 박스 시작 */}
              <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                답변 완료 질문
              </h2>
              {qnaList &&
                qnaList
                  .filter((data) => data.answerYn == "Y")
                  .map((data) => (
                    <>
                      <div className="col-lg-13 col-md-13">
                        <div className="de-box-cat">
                          <i className="fa fa-folder-open-o"></i>
                          <h3>
                            {data.questioner} &nbsp;
                            <span>({data.answerYn})</span>
                          </h3>
                          <div className="d-subtitle">
                            <h4></h4>
                          </div>
                          <p>{data.question}</p>
                          <div className="d-subtitle">
                            <h4>{data.answerer}</h4>
                          </div>
                          <p>{data.answer}</p>
                          <Link
                            role="button"
                            className="btn-main opt-1 me-2"
                            style={{
                              width: "180px",
                              fontSize: "15px",
                            }}
                            to={`/user-qna/${data.qid}`}
                          >
                            Question Detail
                          </Link>
                        </div>
                      </div>
                    </>
                  ))
                  .slice((page - 1) * pageSize, page * pageSize)}

              {/* ui 구분용 공백 */}
              <div className="spacer-single"></div>

              <Pagination
                className="pagination"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                shape="rounded"
                onChange={handlePageChange}
                sx={{
                  color: "white", // 흰색 글자색
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px", // 원하는 여백 설정
                  "& .Mui-selected": {
                    backgroundColor: "white", // 선택된 페이지의 배경색
                    color: "#1E1F22", // 선택된 페이지의 글자색
                    "&:hover": {
                      backgroundColor: "white", // 선택된 페이지의 호버 배경색
                    },
                  },
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem", // 페이지 아이템의 글자 크기
                    minWidth: "30px", // 페이지 아이템의 최소 너비
                    height: "30px", // 페이지 아이템의 높이
                    color: "white", // 선택되지 않은 페이지 아이템의 글자색
                    "&:hover": {
                      backgroundColor: "black", // 선택되지 않은 페이지 아이템의 호버 배경색
                    },
                    "&.Mui-selected": {
                      backgroundColor: "purple", // 특정 페이지일 때 선택된 페이지의 배경색
                      color: "white", // 특정 페이지일 때 선택된 페이지의 글자색
                      "&:hover": {
                        backgroundColor: "purple", // 특정 페이지일 때 선택된 페이지의 호버 배경색
                      },
                    },
                  },
                }}
              />
              {/* 답변 후 질문 박스 끝 */}

              {/* 공백용 div */}
              <div className="spacer-double"></div>

              {/* 고객센터 페이지 링크부 시작 */}
              <div className="col-lg-12">
                <div
                  className="padding40 rounded-10"
                  data-bgcolor="rgba(255, 255, 255, .1)"
                >
                  <div className="row align-items-center">
                    <div className="col-lg-1">
                      <img
                        src={require("../../../assets/images/icons/4.png")}
                        alt=""
                        className="img-responsive"
                      />
                    </div>
                    <div className="col-lg-9">
                      <h3> 추가로 궁금한 점이 있으신가요?</h3>
                    </div>
                    <div className="col-lg-2 text-lg-end">
                      <Link
                        to={`/add-user-qna/${user?.userId}`}
                        className="btn-main"
                        style={{ width: "120px", fontSize: "15px" }}
                      >
                        질문하기
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* 고객센터 페이지 링크부 끝 */}
            </div>
          </div>
        </section>
        {/* QnA 목록(아코디언) 끝 */}
      </div>
    </>
  );
}

export default UserQnaList;
