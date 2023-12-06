import React, { useEffect, useState } from "react";
import designesis from "../../../assets/js/designesia";
import { Pagination } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ILibrary from "../../../types/ILibrary";
import AdminLibraryService from "../../../services/admin/AdminLibrary";

function AdminControlPanelRefundList() {
  useEffect(() => {
    designesis();
  }, []);
  // TODO: 변수 정의
  // TODO: adminLibraryList 배열 변수
  let [adminLibraryListRefundNo, setAdminLibraryListRefundNo] = useState<Array<ILibrary>>([]);
  let [adminLibraryListRefundOk, setAdminLibraryListRefundOk] = useState<Array<ILibrary>>([]);

  // TODO : 공통 변수(필수) : page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열 : 1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호        : 최초값 1
  const [count, setCount] = useState<number>(1); // 총페이지 건수         : 최초값 1
  const [pageSize, setPageSize] = useState<number>(20); // 1페이지당 개수 : 최초값 20

  // TODO: 함수 정의
  // TODO : Pagenation 수동 바인딩
  // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  // todo : 첫번째 실행
  useEffect(() => {
    reteiveAdminLibraryList();
  }, [page, pageSize]);

  // todo : 환불 요청 Y , 환불 N 전체조회
  const reteiveAdminLibraryList = () => {
    AdminLibraryService.getAll(page - 1, pageSize)
      .then((response: any) => {
        const { library , totalPages } = response.data;
        setAdminLibraryListRefundNo(library);
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

        {/* <!-- 목차 section 시작 --> */}
        <section id="subheader" className="jarallax">
          <img
            src={require("../../../assets/images/background/bg-grid.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">Admin</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  환불 요청 페이지
                </h2>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 목차 section 끝 --> */}

        {/* 섹션 1번 : 환불 요청 목록 시작 */}
        <section className="no-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">Admin</div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  환불 요청
                </h2>
              </div>
              <div className="col-lg-12 text-center wow fadeInUp">
                <div className="switch-set">
                  <div className="spacer-20"></div>
                </div>
              </div>
              {/* 관리용 테이블(+콜랩스) 시작 */}
              <div className="col-md-12">
                <table className="table table-pricing dark-style text-center  wow fadeInRight">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: "40px" }}>유저 넘버</th>
                      <th style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                        상품 넘버
                      </th>
                      <th style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                        구매날짜
                      </th>
                      <th style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                        {" "}
                        상세 조회
                      </th>
                    </tr>
                  </thead>
                  {/* 관리용 테이블(내용) 반복문 시작 */}
                  <tbody id="my-accordion">
                    {adminLibraryListRefundNo &&
                      adminLibraryListRefundNo
                      .map((data, index) => (
                        <>
                          <tr key={index} style={{ height: "100px" }}>
                            {/* 유저 아이디 */}
                            <th style={{ paddingLeft: "30px" }}>
                              {data.userId}
                            </th>
                            {/* 상품 번호 */}
                            <td>{data.pid}</td>
                            {/* 구매 날짜 */}
                            <td className="d-spc" style={{ width: "300px" }}>
                              {data.insertTime}
                            </td>
                            {/* 상세 조회 페이지 이동 */}
                            <td className="d-spc" style={{ width: "300px" }}>
                              <Link
                                role="button"
                                className="btn-main opt-1 me-2"
                                style={{
                                  width: "180px",
                                  fontSize: "15px",
                                }}
                                to={`/control-panel-refund/${data.lid}`}
                              >
                                Manage Button
                              </Link>
                            </td>
                          </tr>
                        </>
                      ))}
                  </tbody>
                  {/* 관리용 테이블(내용) 반복문 끝 */}
                </table>
                {/* 페이징 처리 */}
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
              {/* 관리용 테이블(아코디언) 끝 */}
            </div>
          </div>
        </section>
        {/* 섹션 1번 : 환불 요청 목록 끝 */}

      </div>
    </>
  );
}

export default AdminControlPanelRefundList;
