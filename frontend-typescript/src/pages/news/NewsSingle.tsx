import React, { useEffect, useState } from "react";
import designesis from "../../assets/js/designesia";
import { Link, useNavigate, useParams } from "react-router-dom";
import INews from "../../types/advanced/INews";
import FileDbService from "../../services/news/advanced/FileDbService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function NewsSingle() {
  useEffect(() => {
    designesis();
  }, []);
  // todo : 변수정의
  // 전체조회 페이지에서 전송한 기본키(uuid)
  const { uuid } = useParams();

  // 객체 초기화(상세조회 : 기본키 있음)
  const initialFileDb = {
    uuid: "", // 기본키(범용적으로 유일한 값을 만들어주는 값)
    fileTitle: "", // 제목
    fileContent: "", // 내용
    fileUrl: "", // 파일 다운로드 URL
    insertTime: "", // 입력시간
    updateTime: "", // 수정시간
  };

  // uploadFileDb 수정될객체
  const [uploadFileDb, setUploadFileDb] = useState<INews>(initialFileDb);
  // 화면 강제이동
  let navigate = useNavigate();
  // 유저 권한 저장 변수
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  // 뉴스 배열 변수
  const [fileDb, setFileDb] = useState<Array<INews>>([]);
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6); // 1페이지당개수
  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)
  const pageSizes = [3, 6, 9];
  // title 검색어 변수
  const [searchTitle, setSearchTitle] = useState<string>("");

  // todo : 함수정의
  // 상세조회 함수
  const getFileDb = (uuid: string) => {
    FileDbService.getFileDb(uuid) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setUploadFileDb(response.data);
        
      })
      .catch((e: Error) => {
       
      });
  };

  // 화면이 뜰때 실행되는 이벤트 + uuid 값이 바뀌면 실행
  useEffect(() => {
    if (uuid) getFileDb(uuid);
  }, [uuid]);

  // 삭제함수(uuid)
  const deleteImage = (uuid: any) => {
    FileDbService.deleteFile(uuid) // 벡엔드로 삭제요청
      .then((response: any) => {
      
        alert("삭제되었습니다.");
        // 재조회
        navigate("/news");
      })
      .catch((e: Error) => {
       
      });
  };

  // todo: 사이드바 최근뉴스 조회
  //   전체조회 함수
  const retrieveFileDb = () => {
    // 벡엔드 매개변수 전송 : + 현재페이지(page), 1페이지당개수(pageSize)
    FileDbService.getFiles(searchTitle, page - 1, pageSize) // 벡엔드 전체조회요청
      .then((response: any) => {
        const { fileDb, totalPages } = response.data;
        setFileDb(fileDb);
        setCount(totalPages);
       
      })
      .catch((e: Error) => {
        // 벡엔드 실패시 실행됨
      
      });
  };

  useEffect(() => {
    retrieveFileDb(); // 전체 조회
  }, [page, pageSize]);

  useEffect(() => {
    // 뉴스 상세조회를 하면 화면 하단에 추천 기사 토스트 메시지 띄우기
    if (uuid && fileDb.length > 0) {
      const randomIndex = Math.floor(Math.random() * fileDb.length);
      const recommendedNews = fileDb[randomIndex];

      toast.info(
        <div>
          <div>이런 뉴스는 어떠세요?</div>
          <div style={{ whiteSpace: "pre-line" }}>
            {recommendedNews.fileTitle}
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, [uuid, fileDb]);

  // 트위터 공유 함수
  const shareOnTwitter = () => {
    // 내용과 현재 페이지 URL을 인코딩하여 전달
    const tweetText = encodeURIComponent(`**playhost에서 공유한 기사내용입니다.** \n [${uploadFileDb.fileTitle}]`);
    const tweetUrl = encodeURIComponent(window.location.href);
    const tweetHashtags = "게임뉴스,IT뉴스"; // 원하는 해시태그 추가

    // 트위터 인텐트 URL 생성
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}&hashtags=${tweetHashtags}`;

    // 새 창에서 트위터 인텐트 페이지 열기
    window.open(twitterUrl, "_blank");
  };

  // 페이스북 공유 함수
  const shareOnFacebook = () => {
    // 공유할 내용 설정
    const shareUrl = window.location.href;

    // 페이스북 공유 API를 사용하여 링크 생성
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;

    // 생성한 링크로 이동
    window.open(facebookLink, "_blank");
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="subheader" className="jarallax">
          <img
            src={require("../../assets/images/background/subheader-news-default.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">뉴스룸</div>
              </div>
              <div className="col-lg-12">
                <br />
                <h3 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  {uploadFileDb.fileTitle}
                  <br />
                  <br />
                  {/* TODO: 초기 게시글 업로드시 작성일자 표시, 게시글 수정시에는 수정일자만 표시 */}
                  {uploadFileDb.updateTime ? (
                    <h6>
                      <div className="subtitle wow fadeInUp">수정일자</div>{" "}
                      {uploadFileDb.updateTime}
                    </h6>
                  ) : (
                    <h6>
                      <div className="subtitle wow fadeInUp">작성일자</div>{" "}
                      {uploadFileDb.insertTime}
                    </h6>
                  )}
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* 본문 시작 */}
        <section style={{ paddingTop: "5px", margin: "0px" }}>
          <div className="container">
            <div className="row">
              {/* 본문 시작 */}
              <div className="col-md-8 mt-5">
                <div className="blog-read">
                  <div className="post-text">
                    {/* 이미지 URL에 타임스탬프를 추가하여 캐시 버스팅 적용 */}
                    <img
                      alt=""
                      src={`${uploadFileDb.fileUrl}?${Date.now()}`}
                      className="lazy"
                      style={{
                        width: "830px",
                        height: "500px",
                        borderRadius: "10px",
                      }}
                    />
                    <hr />
                    <span style={{ fontSize: "15pt" }}>
                      {uploadFileDb.fileContent}
                    </span>
                  </div>
                </div>

                <div className="spacer-single"></div>
              </div>
              {/* 본문 끝 */}

              {/* 사이드 바 */}
              <div id="sidebar" className="col-md-4 mt-5">
                {/* 최근 뉴스 시작 */}
                <div className="widget widget-post">
                  <h4>최근 뉴스</h4>

                  <div className="small-border" style={{}}></div>

                  <ul>
                    {/* 뉴스 목록을 매핑하여 출력 */}
                    {fileDb.slice(0, 5).map((news, index) => (
                      <li key={index}>
                        <span
                          className="date"
                          style={{ width: "30px", borderRadius: "5px" }}
                        >
                          {index + 1}
                        </span>

                        <Link to={`/news/${news.uuid}`}>
                          {" "}
                          <span>
                            {news.fileTitle.length > 15
                              ? `${news.fileTitle.substring(0, 15)}...`
                              : news.fileTitle}
                          </span>
                        </Link>
                      </li>
                    ))}

                    <Link to={`/news`}>
                      <h6>🏠뉴스홈으로가기</h6>
                    </Link>
                  </ul>
                </div>
                {/* 최근뉴스 끝 */}

                {/* 게시글 관리 시작 */}
                {/* TODO: ROLE_ADMIN 인 경우에만 표시됨 */}
                {userRole === "ROLE_ADMIN" && (
                  <div className="widget widget-post">
                    <h4>게시글 관리</h4>
                    <div className="small-border" style={{}}></div>
                    <div className="text-start">
                      {/* 수정하기버튼 */}
                      <Link to={`/news-detail/${uploadFileDb.uuid}`}>
                        <button
                          className="btn btn-primary me-3"
                          style={{ width: "120px ", height: "38px" }}
                        >
                          수정하기
                        </button>
                      </Link>
                      {/* 수정하기버튼 끝 */}

                      {/* 삭제하기 버튼 */}
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          deleteImage(uploadFileDb.uuid);
                        }}
                        style={{ width: "120px ", height: "38px" }}
                      >
                        삭제하기
                      </button>
                      {/* 삭제하기 버튼 끝*/}
                    </div>
                  </div>
                )}
                {/* 게시글 관리 끝 */}

                {/* 위젯 시작 */}
                <div className="widget">
                  <h4>SNS 공유</h4>
                  <div className="small-border"></div>
                  <div className="widget">
                    <div className="de-color-icons">
                      <span onClick={shareOnTwitter}>
                        <i className="fa-brands fa-x-twitter fa-lg" style={{background: "black"}}></i>
                      </span>
                      <span onClick={shareOnFacebook}>
                        {/* 페이스북 아이콘 또는 다른 이미지 */}
                        <i className="fab fa-facebook fa-lg" style={{background: "black"}}></i>
                      </span>
                    </div>
                  </div>
                </div>
                {/* 위젯 끝 */}
              </div>
              {/* 사이드 바 끝 */}
            </div>
          </div>
        </section>
        {/* 본문 끝 */}

        {/* Toast Container */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: "600px" }}
        />
      </div>
    </>
  );
}

export default NewsSingle;
