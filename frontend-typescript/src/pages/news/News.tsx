import React, { useEffect, useState } from "react";
import designesis from "../../assets/js/designesia";
import { Link } from "react-router-dom";

import {
  Pagination,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import INews from "../../types/advanced/INews";
import FileDbService from "../../services/news/advanced/FileDbService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function News() {
  // 변수 정의
  const [loading, setLoading] = useState<boolean>(true);
  const [fileDb, setFileDb] = useState<Array<INews>>([]);
  const [searchTitle, setSearchTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  // 컴포넌트가 마운트 될 때와 특정 변수가 변경될 때 실행되는 useEffect
  useEffect(() => {
    designesis();
    retrieveFileDb();
  }, [page, pageSize]);

  // 뉴스 데이터 조회 함수
  const retrieveFileDb = () => {
    setLoading(true);
    FileDbService.getFiles(searchTitle, page - 1, pageSize)
      .then((response: any) => {
        const { fileDb, totalPages } = response.data;
        const sortedFileDb = fileDb.sort((a: INews, b: INews) =>
          new Date(b.insertTime).getTime() - new Date(a.insertTime).getTime()
        );
        setFileDb(sortedFileDb || []);
        setCount(totalPages);
        setLoading(false);
      })
      .catch((e: Error) => {
       
        setLoading(false);
      });
  };

  // 검색어 변경 이벤트 핸들러
  const onChangeSearchTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(e.target.value);
  };

  // 페이지 변경 이벤트 핸들러
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Material-UI 테마 설정
  const theme = createTheme({
    palette: {
      text: {
        primary: "white",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="no-bottom no-top" id="content">
        {/* 뉴스 섹션 시작 */}
        <section id="subheader" className="jarallax" data-video-src="https://www.youtube.com/watch?v=OLfILlzLlnw">
          {/* <img
            src={require("../../assets/images/background/subheader-news.webp")}
            className="jarallax-img"
            alt=""
          /> */}
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">News</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  뉴스룸
                </h2>
                <br />
                <h5 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  &nbsp;다양한 게임 소식을 전달해드립니다.
                </h5>
              </div>
            </div>
          </div>
        </section>
        {/* 뉴스 섹션 종료 */}

        {/* 글쓰기 버튼 */}
        <div className="container text-end mt-5">
          {userRole === "ROLE_ADMIN" && (
            <Link to="/add-news">
              <button
                className="btn btn-primary"
                style={{ width: "120px ", height: "38px" }}
              >
                글쓰기
              </button>
            </Link>
          )}
        </div>

        <div className="col-md-5 container mt-5">
          {/* 검색어 start */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control "
              placeholder="제목으로 검색하기"
              value={searchTitle}
              onChange={onChangeSearchTitle}
              style={{ background: "transparent", color: "white" }}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={retrieveFileDb}
                style={{ width: "80px", height: "45px" }}
              >
                검색🔎
              </button>
            </div>
          </div>
          {/* 검색어 end */}
        </div>

        {/* 뉴스 목록 및 페이지네이션 */}
        <section id="section-content" aria-label="section">
          <div className="container">
            {loading ? (
              // 로딩 중 표시
              <div className="text-center mt-5">
                <h3>잠시만 기다려주십시오...</h3>
              </div>
            ) : fileDb.length === 0 ? (
              // 뉴스가 없을 때 표시
              <div className="text-center mt-5">
                <h3>뉴스가 없습니다. 빠른 시일내에 소식을 전달해드리겠습니다.</h3>
              </div>
            ) : (
              // 뉴스 목록 표시
              <div className="row g-4">
                {fileDb.map((data, index) => {
                  const newsDate = new Date(data.insertTime);
                  const isToday =
                    newsDate.toISOString().split("T")[0] ===
                    new Date().toISOString().split("T")[0];

                  return (
                    <div key={index} className="col-lg-4 col-md-6 mb-5">
                      <div className="bloglist item">
                        <div
                          className="post-content"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div className="post-image">
                            <div className="d-tagline">
                              {isToday && (
                                // 오늘 새로 추가된 뉴스 표시
                                <span
                                  className="new-label"
                                  style={{
                                    color: "orange",
                                    fontWeight: "bold",
                                    backgroundColor: "black",
                                  }}
                                >
                                  New!
                                </span>
                              )}
                              <span
                                style={{
                                  fontWeight: "bold",
                                  backgroundColor: "black",
                                }}
                              >
                                {data.updateTime || data.insertTime}
                              </span>
                            </div>
                            <Link to={`/news/${data.uuid}`}>
                              <img
                                alt=""
                                src={`${data.fileUrl}?${Date.now()}`}
                                className="lazy"
                                style={{
                                  width: "360px",
                                  height: "200.14px",
                                  borderRadius: "10px",
                                }}
                              />
                            </Link>
                          </div>
                          <div
                            className="post-text mb-5"
                            style={{
                              width: "360px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <Link to={`/news/${data.uuid}`}>
                              <h3
                                style={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  marginBottom: 0,
                                }}
                              >
                                {data.fileTitle}
                              </h3>
                              <button
                                className="btn btn-outline-warning btn-sm"
                                style={{ width: "100px", height: "30px" }}
                              >
                                자세히보기
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* 페이지네이션 */}
                <Pagination
                  className="pagination"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  variant="outlined"
                  shape="rounded"
                  onChange={handlePageChange}
                  sx={{
                    backgroundColor: "#1E1F22",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    "& .Mui-selected": {
                      backgroundColor: "white",
                      color: "#1E1F22",
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    },
                    "& .MuiPaginationItem-root": {
                      fontSize: "1.5rem",
                      minWidth: "40px",
                      height: "40px",
                      backgroundColor: "#ccc",
                      color: "#1E1F22",
                      "&:hover": {
                        backgroundColor: "#ddd",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "orange",
                        color: "white",
                        "&:hover": {
                          backgroundColor: "orange",
                        },
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </ThemeProvider>
  );
}

export default News;
