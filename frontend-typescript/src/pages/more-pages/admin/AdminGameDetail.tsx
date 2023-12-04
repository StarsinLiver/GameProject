import React, { useEffect, useState } from "react";
import customMarquee from "../../../assets/js/custom-marquee";
import customSwiper2 from "../../../assets/js/custom-swiper-2";
import { Link, useParams } from "react-router-dom";
import ISteam from "../../../types/steam/ISteam";
import SteamOpenApiService from "../../../services/steam/SteamOpenApiService";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Pagination } from "@mui/material";
import designesis from "../../../assets/js/designesia";
import ISteamNews from "../../../types/steam/ISteamNews";

function AdminGamesDetail() {
  // user
  const { user } = useSelector((state: RootState) => state.auth);

  // 전체조회 페이지에서 전송한 기본키
  const { pid } = useParams();

  // todo :  Pagination 수동 바인딩
  // 페이지 번호를 누르면 page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지 번호
    setPage(value);
  };
  // todo : 스팀 조회 시작

  // 받아온 스팀게임의 id
  // const { pid } = useParams();
  // let pid = 218620
  // 초기 스팀 객체의 초기화
  const initalSteam = {
    categories: null, // 카테고리 배열 description , id   예시) 멀티플레이어 , pvp 등
    developers: null, // 제작사 배열
    pc_requirements: null, // 사양 배열  minimum  등     예시 <p><strong>최소 사양:</strong> 500MHz 프로세서, 96MB RAM, 16MB 그래픽 카드,
    release_date: null, // 릴리즈 날짜 date : "2000년 11월 1일" , coming_soon
    screenshots: null, // 스크린샷 배열 id , path_thumbnail : 큰사진 , path_thumbnail : 작은사진
    genres: null, // 장르 배열 description : 장르 , id : id   예시) 액션
    price_overview: null, // 가격 배열 currency: "KRW" , discount_percent , final_formatted : "₩ 10,500" // , final : 현재 가격인데 10500000 <- 나누기 100 하면 될듯
    metacritic: null, // 메타크리틱 점수  score(점수) , url(메타크리틱 url)

    about_the_game: "", // 게임에 대한 설명
    name: "", // 게임 이름
    is_free: false, // 무료 게임인지
    detailed_description: "", // 디테일 설명
    short_description: "", // 짧은 설명
    header_image: "", // 메인 이미지 소스
    background: "", // 뒷 배경화면
    supported_languages: "", // 서비스 지원 언어
    type: "",
  };
  // 스팀게임 객체 저장소
  const [movies, setMovies] = useState<any>();
  let [product, setProduct] = useState<ISteam>(initalSteam);
  let [steamNews, setSteamNews] = useState<Array<ISteamNews>>([]);
  const [render, setRender] = useState<Boolean>(false);

  // todo : 함수 정의
  // 시작시 스팀객체 생성할 함수
  const getSteam = (appid: number) => {
    SteamOpenApiService.findById(appid)
      .then((response: any) => {
        const data = response.data[`${appid}`].data;
        setProduct(data);
        setRender(true);
        setMovies(data.movies[0]);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const getSteamNews = (appid: number) => {
    SteamOpenApiService.findNewsById(appid)
      .then((response: any) => {
        const newsData = response.data.appnews.newsitems;
        setSteamNews(newsData);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getSteam(Number(pid));
    getSteamNews(Number(pid));
    customMarquee();
    designesis();
    customSwiper2();
    // todo : 화면 시작과 동시에 스팀에서 게임정보를 받아오는 함수 호출
  }, [render]);

  // 페이징
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4); // 1페이지당개수

  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)

  // 화면 새로고침(저장 후 저장된 객체 불러오기)

  /* **** 리뷰 상세 **** */

  // todo : 따봉 버튼 함수

  const [hasOnLike, setHasOnLike] = useState<boolean>(false);
  const [hasOnDisLike, setHasOnDisLike] = useState<boolean>(false);

  /* 바인딩으로 나눈 긍정 부정 버튼 */
  const [hasOnLike2, setHasOnLike2] = useState<boolean>(false);
  const [hasOnDisLike2, setHasOnDisLike2] = useState<boolean>(false);

  // todo : 화면 시작시 나타남
  useEffect(() => {
    getSteam(Number(pid));
    customMarquee();
    customSwiper2();
    // todo : 화면 시작과 동시에 스팀에서 게임정보를 받아오는 함수 호출
  }, [pid, page]);

  return (
    <>
      {/* <!-- content begin --> */}
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {product && (
          <>
            {/* 헤더 이미지 + 평점 */}
            <section id="subheader" className="jarallax">
              <div className="de-gradient-edge-bottom"></div>
              <img
                src={require("../../../assets/images/background/subheader-game.webp")}
                className="jarallax-img"
                alt=""
              />
              <div className="container z-1000">
                <div className="row gx-5 align-items-center">
                  <div className="col-lg-2 d-lg-block d-none">
                    <img
                      src={product.header_image}
                      className="img-fluid wow fadeInUp"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                      {product.name}
                    </h2>
                    <div
                      className="de-rating-ext wow fadeInUp"
                      data-wow-delay=".4s"
                    >
                      <span className="d-stars">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half"></i>
                      </span>
                      <span className="d-val">4.75</span>
                      based on <strong>4086</strong> reviews.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 첫번째 섹션 : slider */}
            <section
              id="swiper-s2"
              className="no-top no-bottom position-relative z-1000"
            >
              {/* <!-- Slider main wrapper --> */}
              <div
                className="swiper-container-wrapper rounded mx-auto "
                style={{ width: "1350px", height: "700px" }}
              >
                {/* <!-- Slider main container --> */}
                <div
                  className="swiper-container gallery-top"
                  style={{ height: "700px" }}
                >
                  {/* <!-- Additional required wrapper --> */}
                  <div className="swiper-wrapper">
                    {/* <!-- Slides --> */}

                    {/* map과 따로 사용시 기능작동이 제대로 않됨 해결까지 주석처리할것!!
                깔끔한 기능구현을 위해선 사진은 4개가 최적임 (4개 이상부턴 위로 스크롤시 랙 + 안올라감 발생) */}

                    {movies && (
                      <video
                        controls
                        muted
                        autoPlay
                        loop
                        style={{ backgroundColor: "black" }}
                      >
                        <source src={movies.mp4["480"]} type="video/mp4" />
                      </video>
                    )}
                    {product.screenshots &&
                      product.screenshots
                        .slice(0, 4)
                        .map((value: any, index: any) => (
                          <div
                            className="swiper-slide"
                            style={{
                              backgroundImage: `url(${value.path_thumbnail})`,
                              backgroundSize: "cover",
                            }}
                            key={index}
                          ></div>
                        ))}
                  </div>
                  {/* <!-- Add Arrows --> */}
                  <div className="swiper-button-next"></div>
                  <div className="swiper-button-prev"></div>
                </div>
                {/* <!-- Slider thumbnail container --> */}
                <div
                  className="swiper-container gallery-thumbs"
                  style={{ height: "700px" }}
                >
                  {/* <!-- Additional required wrapper --> */}
                  <div className="swiper-wrapper">
                    {/* <!-- Slides  --> */}
                    {/* map과 따로 사용시 기능작동이 제대로 않됨 해결까지 주석처리할것!!
                깔끔한 기능구현을 위해선 사진은 4개가 최적임 (4개 이상부턴 위로 스크롤시 랙 + 안올라감 발생) */}
                    {movies && (
                      <div
                        className="swiper-slide"
                        style={{
                          backgroundImage: `url(${movies.thumbnail})`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                    )}
                    {movies &&
                      product.screenshots &&
                      product.screenshots
                        .slice(0, 3)
                        .map((value: any, index: any) => (
                          <div
                            className="swiper-slide"
                            style={{
                              backgroundImage: `url(${value.path_thumbnail})`,
                              backgroundSize: "cover",
                            }}
                            key={index}
                          ></div>
                        ))}
                    {!movies &&
                      product.screenshots &&
                      product.screenshots
                        .slice(0, 4)
                        .map((value: any, index: any) => (
                          <div
                            className="swiper-slide"
                            style={{
                              backgroundImage: `url(${value.path_thumbnail})`,
                              backgroundSize: "cover",
                            }}
                            key={index}
                          ></div>
                        ))}
                  </div>
                </div>
              </div>
            </section>
            {/* 첫번째 섹션 : slider */}

            {/* img 여기 */}

            <section style={{ margin: "0px", padding: "0px" }}>
              <div className="container">
                <div className="row">
                  {/* 본문 */}
                  <div className="col-md-8">
                    {/* 게임 설명 */}
                    <section>
                      <div className="container">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: product.detailed_description,
                          }}
                        />
                      </div>

                      {/* 리뷰 시스템 */}
                      <section style={{ margin: "0px", padding: "0px" }}>
                        {/* 리뷰 영역 시작 */}
                        <div className="container mt-5">
                          <div className="container  justify-content-center"></div>
                          <h4 className="d-label">Review</h4>
                          {/* 전체조회 - map 시작 */}
                          <div
                            className="accordion accordion-flush "
                            id="accordionFlushExample"
                          >
                            <>
                              <div className="row row-flex">
                                <div
                                  className="col-lg-12 mb30 wow fadeInRight"
                                  data-wow-delay=".2s"
                                >
                                  {/* 리뷰 아코디언 시작 */}

                                  <div
                                    className="accordion-item"
                                    style={{
                                      backgroundColor: "#6a78fa18",
                                      borderTop: "2px solid white",
                                    }}
                                  >
                                    {/* 리뷰 - 시작 */}

                                    {/* 리뷰 목록 시작 - 아코디언 */}
                                    <div
                                      className="accordion-header "
                                      id={"flush-heading1"}
                                      style={{ color: "white" }}
                                    >
                                      <span style={{ float: "left" }}>
                                        {/* 긍정 부정 평가 표시 시작 */}
                                        <span
                                          className="material-symbols-outlined "
                                          style={{
                                            fontSize: `40px`,
                                            margin: `12px  0px 0px 20px`,
                                            color: `green`,
                                          }}
                                        >
                                          thumb_up
                                        </span>
                                        {/* 긍정 부정 평가 표시 끝 */}
                                      </span>

                                      {/* 수정/삭제 버튼 시작 */}
                                      <span
                                        className="comment-info"
                                        style={{
                                          float: `right`,
                                          marginRight: `15px`,
                                        }}
                                      >
                                        {/* 수정 버튼 시작 */}

                                        <span
                                          className="c_reply"
                                          style={{
                                            marginRight: `15px`,
                                          }}
                                        >
                                          <a
                                            style={{ color: "#ffffff" }}
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal2"
                                            data-bs-whatever="@mdo"
                                          >
                                            수정
                                          </a>
                                        </span>

                                        {/* 수정 버튼 끝 */}
                                        {/* 삭제 버튼 시작 */}

                                        <span
                                          className="c_reply"
                                          style={{
                                            marginRight: `20px`,
                                          }}
                                        >
                                          <a
                                            style={{ color: "#ffffff" }}
                                            href="#"
                                          >
                                            삭제
                                          </a>
                                        </span>

                                        {/* 삭제 버튼 끝 */}
                                      </span>
                                      {/* 수정/삭제 버튼 끝 */}

                                      {/* 리뷰 정보 시작 */}
                                      <div className="comment-info">
                                        {/* <div className="avatar"></div> */}
                                        {/* 유저 이름 */}
                                        <span
                                          className="c_name"
                                          style={{ padding: `0px` }}
                                        >
                                          writer
                                        </span>
                                        {/* 유저 이름 끝 */}
                                        {/* 작성일 */}
                                        <span className="c_date id-color">
                                          insertTime
                                        </span>
                                        {/* 작성일 끝 */}

                                        {/* 리뷰 댓글 달기 시작 */}
                                        <span className="c_reply">
                                          <a
                                            style={{ color: "#ffffff" }}
                                            href="#"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            data-bs-whatever="@mdo"
                                          >
                                            댓글 달기
                                          </a>
                                        </span>
                                        {/* 리뷰 댓글 달기 끝 */}

                                        <div className="clearfix"></div>
                                      </div>
                                      {/* 리뷰 정보 끝 */}

                                      {/* 리뷰 제목 시작 */}

                                      <button
                                        className="accordion-button collapsed"
                                        // data-bs-parent="#accordionFlushExample"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={"#flush-collapse1"}
                                        aria-expanded="false"
                                        aria-controls={"flush-collapse1"}
                                        style={{
                                          backgroundColor: "#5724d900",
                                          color: "#ffffff",
                                          fontSize: "15px",
                                          borderTop: "2px solid white",
                                        }}
                                      >
                                        <h5>title</h5>
                                      </button>

                                      {/* 리뷰 제목 끝 */}
                                    </div>
                                    {/* 리뷰 내용 + 답글 시작 */}
                                    <div
                                      id={"flush-collapse1"}
                                      className="accordion-collapse collapse"
                                      aria-labelledby={"flush-heading1"}
                                      data-bs-parent="#accordionFlushExample"
                                    >
                                      {/* 리뷰 내용 시작 */}

                                      <div
                                        className="accordion-body"
                                        style={{
                                          backgroundColor: "#5724d900",
                                          whiteSpace: "pre",
                                        }}
                                      >
                                        content
                                      </div>

                                      {/* 리뷰 내용 끝 */}

                                      <div
                                        className=""
                                        style={{
                                          borderTop: "2px solid white",
                                        }}
                                      >
                                        {/* 리뷰 답글 시작 */}
                                        <div
                                          className=""
                                          style={{
                                            borderTop: "2px solid white",
                                          }}
                                          id="reviewReply"
                                        >
                                          <div
                                            className="accordion-body container col-lg-11"
                                            style={{
                                              backgroundColor: "#5724d900",
                                              color: "#FFFFFF",
                                              borderTop: `1px solid white`,
                                              width: `100%`,
                                            }}
                                            id="reviewReply"
                                          >
                                            writer
                                            {/* 댓글 수정 버튼 */}
                                            <span
                                              style={{
                                                float: "right",
                                              }}
                                            >
                                              <span className="c_date id-color">
                                                insertTime
                                              </span>

                                              <span className="c_reply ms-5">
                                                <a
                                                  // className="btn btn-primary"
                                                  data-bs-toggle="collapse"
                                                  href={"#collapseExample1"}
                                                  role="button"
                                                  aria-expanded="false"
                                                  aria-controls={
                                                    "collapseExample1"
                                                  }
                                                  style={{
                                                    color: "#ffffff",
                                                  }}
                                                >
                                                  수정
                                                </a>
                                              </span>
                                              {/* 댓글 수정 버튼 */}
                                              {/* 댓글 삭제 버튼 */}
                                              <span className="c_reply ms-3">
                                                <a
                                                  // className="btn btn-primary"
                                                  data-bs-toggle="collapse"
                                                  href={"#"}
                                                  role="button"
                                                  style={{
                                                    color: "#ffffff",
                                                  }}
                                                >
                                                  삭제
                                                </a>
                                              </span>
                                              {/* 댓글 삭제 버튼 */}
                                            </span>
                                            {/* 댓글 수정 양식 */}
                                            <div
                                              style={{
                                                clear: "both",
                                              }}
                                              className="collapse"
                                              id={"collapseExample1"}
                                              data-bs-parent="#reviewReply"
                                            >
                                              <div className="mb-3">
                                                <label className="col-form-label">
                                                  댓글 수정
                                                </label>
                                                <textarea
                                                  className="form-control"
                                                  name="content"
                                                  required
                                                  style={{
                                                    backgroundColor: "#FFFFFF",
                                                    color: "black",
                                                    height: "200px",
                                                  }}
                                                ></textarea>
                                              </div>

                                              <div className="">
                                                <a
                                                  className="btn btn-secondary"
                                                  data-bs-toggle="collapse"
                                                  href={"#collapseExample1"}
                                                  role="button"
                                                  aria-expanded="false"
                                                  aria-controls={
                                                    "#collapseExample1"
                                                  }
                                                  style={{
                                                    height: "2.2rem",
                                                    width: "4.5rem",
                                                  }}
                                                >
                                                  Close
                                                </a>
                                                <a
                                                  className="btn btn-primary"
                                                  data-bs-toggle="collapse"
                                                  href={"#collapseExample1"}
                                                  role="button"
                                                  aria-expanded="false"
                                                  aria-controls={
                                                    "#collapseExample1"
                                                  }
                                                  style={{
                                                    height: "2.2rem",
                                                    width: "9rem",
                                                  }}

                                                  // data-bs-target={
                                                  //   "#flush-collapse" +
                                                  //   index
                                                  // }
                                                >
                                                  Send Message
                                                </a>
                                              </div>
                                            </div>
                                            {/* 댓글 수정 양식 끝 */}
                                            <br />
                                            <div
                                              style={{
                                                whiteSpace: "pre",
                                              }}
                                            >
                                              <br></br>
                                              content
                                            </div>
                                          </div>
                                        </div>
                                        {/* 리뷰 답글 끝 */}
                                      </div>
                                    </div>
                                    {/* 리뷰 내용 + 답글 끝 */}
                                  </div>
                                </div>
                                {/* 리뷰 아코디언 끝 */}
                              </div>

                              {/* 모달 - 수정, 답글 액션 */}
                              <div className="container">
                                {/* 답글달기 */}
                                {/* 모달 내용 */}
                                <div
                                  className="modal fade"
                                  id="exampleModal"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Reply
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <form>
                                          <div className="mb-3">
                                            <label className="col-form-label">
                                              Reply to: title
                                            </label>
                                            <textarea
                                              className="form-control"
                                              placeholder="댓글 작성"
                                              name="content"
                                              required
                                              style={{
                                                backgroundColor: "#FFFFFF",
                                                color: "black",
                                                height: "200px",
                                              }}
                                            />
                                          </div>
                                        </form>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                          style={{
                                            height: "2.2rem",
                                            width: "4.5rem",
                                          }}
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                          style={{
                                            height: "2.2rem",
                                            width: "9rem",
                                          }}
                                        >
                                          Send message
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* 댓글 달기 끝 */}

                                {/* 리뷰 수정 */}
                                {/* 리뷰 수정 모달 내용 */}
                                <div
                                  className="modal fade"
                                  id="exampleModal2"
                                  aria-labelledby="exampleModalLabel"
                                  aria-hidden="true"
                                >
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <h5
                                          className="modal-title"
                                          id="exampleModalLabel"
                                        >
                                          Correction
                                        </h5>
                                        <button
                                          type="button"
                                          className="btn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                      <div className="modal-body">
                                        <form>
                                          <div className="mb-3">
                                            <label className="col-form-label">
                                              리뷰 수정
                                            </label>

                                            {/* 따봉버튼 */}
                                            <a className="" type="button">
                                              <ul>
                                                <li
                                                  className="material-symbols-outlined me-5"
                                                  style={{
                                                    color: hasOnLike2
                                                      ? "#5623d8"
                                                      : "#FFFFFF",
                                                  }}
                                                >
                                                  thumb_up
                                                </li>
                                                <li
                                                  className="material-symbols-outlined hasOffDisLike"
                                                  style={{
                                                    color: hasOnDisLike2
                                                      ? "#5623d8"
                                                      : "#FFFFFF",
                                                  }}
                                                >
                                                  thumb_down
                                                </li>
                                              </ul>
                                            </a>

                                            {/* 수정 제목 input */}
                                            <input
                                              type="text"
                                              id="title"
                                              required
                                              className="form-control mb-1"
                                              name="title"
                                            />
                                            {/* 수정 내용 input */}
                                            <textarea
                                              className="form-control"
                                              name="content"
                                              required
                                              style={{
                                                backgroundColor: "#FFFFFF",
                                                color: "black",
                                                height: "200px",
                                              }}
                                            ></textarea>
                                          </div>
                                        </form>
                                      </div>
                                      <div className="modal-footer">
                                        <button
                                          type="button"
                                          className="btn btn-secondary"
                                          data-bs-dismiss="modal"
                                          style={{
                                            height: "2.2rem",
                                            width: "4.5rem",
                                          }}
                                        >
                                          Close
                                        </button>
                                        <button
                                          type="button"
                                          className="btn btn-primary"
                                          data-bs-dismiss="modal"
                                          style={{
                                            height: "2.2rem",
                                            width: "9rem",
                                          }}
                                        >
                                          Send message
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* 리뷰 수정 끝 */}
                              </div>
                            </>
                          </div>
                          {/* 리뷰 전체조회 -map 끝*/}
                          <div className="container  justify-content-center">
                            <div className="container text-center">
                            <Pagination
                  className="pagination"
                  count={count}
                  page={page}
                  siblingCount={1}
                  boundaryCount={1}
                  shape="rounded"
                  // onChange={handlePageChange}
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
                          </div>
                        </div>
                      </section>
                      {/* 리뷰 시스템 */}

                      {/* 리뷰 작성 */}
                      <section style={{ margin: "0px", padding: "0px" }}>
                        <div className="container p-5 col-lg-12">
                          <div className="col-lg-12">
                            <div className="field-set">
                              <div className="container mb-2">
                                {product.name}에 대한 리뷰 작성
                              </div>
                              {/*  id="contact_form" : textarea 첫줄부터 글적기기능 */}
                              <div
                                id="contact_form"
                                className="position-relative z1000 wow fadeInUp mb-3"
                              >
                                {/* 리뷰 제목 작성 */}
                                <input
                                  type="text"
                                  id="title"
                                  required
                                  className="form-control mb-1"
                                  placeholder="Review Tittle"
                                  name="title"
                                  style={{
                                    backgroundColor: "#212529",
                                    color: "#FFFFFF",
                                  }}
                                />

                                {/* 리뷰 내용작성 */}
                                <textarea
                                  name="content"
                                  id="content"
                                  className="form-control"
                                  placeholder="Your Review"
                                  required
                                  style={{ color: "#FFFFFF" }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* 따봉버튼 */}
                          <a className="" type="button">
                            <ul>
                              <li
                                className="material-symbols-outlined me-5"
                                style={{
                                  color: hasOnLike ? "#5623d8" : "#FFFFFF",
                                }}
                              >
                                thumb_up
                              </li>
                              <li
                                className="material-symbols-outlined hasOffDisLike"
                                style={{
                                  color: hasOnDisLike ? "#5623d8" : "#FFFFFF",
                                }}
                              >
                                thumb_down
                              </li>
                            </ul>
                          </a>

                          {/* 리뷰 전송 */}
                          <div className="col-lg-12 ">
                            <button className="btn-main">Send Review</button>
                          </div>
                        </div>
                      </section>
                    </section>
                  </div>

                  {/* 사이드바 */}

                  <div
                    id="sidebar"
                    className="col-md-4"
                    style={{ marginTop: "100px" }}
                  >
                    {/* 장바구니 버튼 -> 삼항 - true false {장바구니 담기&& 장바구니 제거 } */}
                    <div className="widget">
                      <h4>장바구니</h4>
                      <div className="small-border"></div>
                    </div>

                    {/* 게임 태그(카테고리, 종류, 타입) 시작 */}
                    <div
                      className="widget widget_tags"
                      style={{ clear: `both` }}
                    >
                      <h4>Tags</h4>
                      <div className="small-border"></div>
                      <ul>
                        {product.genres &&
                          product.genres.map((value: any, index: any) => (
                            <li key={index}>
                              <a href="#link">{value.description}</a>
                            </li>
                          ))}
                      </ul>
                    </div>
                    {/* 게임 태그(카테고리, 종류, 타입) 끝 */}
                    <div className="widget">
                      <h4>Share With Friends</h4>
                      <div className="small-border"></div>
                      <div className="de-color-icons">
                        <span>
                          <i className="fa-brands fa-twitter fa-lg"></i>
                        </span>
                        <span>
                          <i className="fa-brands fa-facebook fa-lg"></i>
                        </span>
                        <span>
                          <i className="fa-brands fa-reddit fa-lg"></i>
                        </span>
                        <span>
                          <i className="fa-brands fa-linkedin fa-lg"></i>
                        </span>
                        <span>
                          <i className="fa-brands fa-pinterest fa-lg"></i>
                        </span>
                        <span>
                          <i className="fa-brands fa-stumbleupon fa-lg"></i>
                        </span>
                        <span>
                          <i className="fa-brands fa-delicious fa-lg"></i>
                        </span>
                      </div>
                    </div>

                    <div className="widget widget-post">
                      <h4>Recent Posts</h4>
                      <div className="small-border"></div>
                      <ul>
                        {steamNews.map((value) => (
                          <li>
                            <span>{value.author}</span>
                            <Link to={`${value.url}`} target="_blank">
                              {value.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="widget widget-text">
                      <h4>About Us</h4>
                      <div className="small-border"></div>
                      <p className="small no-bottom">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae vitae dicta sunt explicabo. Nemo
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia consequuntur magni
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      {/* <!-- content close --> */}
    </>
  );
}

export default AdminGamesDetail;
