import React, { useEffect } from "react";
import designesis from "../../assets/js/designesia";

function About() {
  
  useEffect(() => {
    designesis();
    
    
  }, []);

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section id="subheader" className="jarallax" >
          <img
            src={require("../../assets/images/background/subheader-about.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">팀원 소개</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  PlayHost 팀을 소개합니다!
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section className="no-bottom">
          <div className="container">
            <div className="row align-items-center gh-5">
              <div className="col-lg-6 position-relative">
                <div className="images-deco-1">
                  <img
                    src={require("../../assets/images/misc/playhost.png")}
                    className="d-img-1 wow zoomIn"
                    data-wow-delay="0s"
                    alt=""
                  />
                  {/* <img src={require('../../assets/images/misc/girl-ai.webp')} className="d-img-2 wow zoomIn" data-wow-delay=".5s" alt=""/> */}
                  <div
                    className="d-img-3 bg-color wow zoomIn"
                    data-wow-delay=".6s"
                  ></div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="subtitle mb20">We are team-playhost!</div>
                <h2 className="wow fadeInUp">playhost : 게임을 품은 공간</h2>
                <p className="wow fadeInUp">
                  <br />
                  안녕하세요, playhost 팀입니다!
                  <br />
                  우리는 열정적인 6인의 웹 개발자들이 모여 만든 게임 구매/리뷰
                  사이트입니다. <br />
                  playhost는 다양한 게임을 한눈에 즐길 수 있는 플랫폼으로,{" "}
                  <br />
                  수많은 게임을 쉽게 찾아볼 수 있도록 정리되어 있습니다. <br />
                  우리는 제작 기간 동안 504시간을 투자하여 이 사이트를
                  완성했습니다. <br />
                  사이트를 제작하는 동안 많은 어려움이 있었지만, <br />
                  팀원들간의 소통과 노력으로 퀄리티 있는 사이트를 만들 수
                  있었습니다.
                </p>
                <div className="year-card wow fadeInUp">
                  <h1>
                    <span className="id-color">21</span>
                  </h1>
                  <div className="atr-desc">
                    Days
                    <br />
                    Team Project
                    <br />
                    Period
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section style={{ height: "300px" }}>
          <div className="container">
            <div className="row text-center">
              {/* 첫 번째 칸 */}
              <div className="col-lg-6 col-sm-6 mb-sm-30 position-relative">
                <div className="de_count text-light wow fadeInUp">
                  <h3
                    className="timer id-color"
                    data-to="21"
                    data-speed="2500"
                  ></h3>
                  <h4 className="text-uppercase">
                    프로젝트 일수 <br />
                    (DAY)
                  </h4>
                </div>
              </div>

              {/* 두 번째 칸 */}
              <div className="col-lg-6 col-sm-6 mb-sm-30 position-relative">
                <div className="de_count text-light wow fadeInUp">
                  <h3
                    className="timer id-color"
                    data-to="504"
                    data-speed="2500"
                  >
                    0
                  </h3>
                  <h4 className="text-uppercase">
                    총 프로젝트 시간
                    <br />
                    (Hour)
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="section-testimonial">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <div className="subtitle mb20">사이트 기능소개</div>
                <h2 className="wow fadeInUp">
                  playhost의 주요기능을 소개합니다.
                </h2>
                <div className="spacer-20"></div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div
                className="owl-carousel owl-theme wow fadeInUp"
                id="testimonial-carousel"
              >
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>🎮 스팀 API를 사용한 전체 게임조회</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;API로 받아온 게임 정보를 전체 게임 컬렉션에 저장
                        <br />
                        2️⃣&nbsp;게임 태그별로 isotope 기능을 이용한 구분
                        <br />
                        3️⃣&nbsp;원하는 게임을 장바구니에 담을 수 있는 기능
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/all.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>📝 게임 리뷰 기능</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;상세 조회 페이지에서 상품에 대한 리뷰 작성 기능
                        <br />
                        2️⃣&nbsp;리뷰의 수정/삭제 기능
                        <br />
                        3️⃣&nbsp;유저의 이름과 리뷰 작성일을 확인할 수 있습니다.
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/review.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>🎤 뉴스 기능</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;이미지 업로드를 이용한 뉴스 게시판 기능
                        <br />
                        2️⃣&nbsp;기사 상세보기시 추천 뉴스 알림 제공
                        <br />
                        <br />
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/news.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>📞 1:1 문의 기능</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;답변 대기/완료를 구분하여 하나씩 답변이 가능
                        <br />
                        2️⃣&nbsp;질문 키워드를 검색하여 필요한 질문을 찾을 수
                        있음
                        <br />
                        <br />
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/qna.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>🔐 로그인/회원가입</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;이메일과 이름 비밀번호를 입력하여 회원가입
                        <br />
                        2️⃣&nbsp;Google/Kakao 계정 연동 로그인 기능
                        <br />
                        <br />
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/login.jpg")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>🔐 비밀번호 찾기</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;회원가입한 비밀번호 찾기 위한 기능
                        <br />
                        2️⃣&nbsp;이름과 이메일을 입력하여 비밀번호를 찾을 수 있음
                        <br />
                        <br />
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/finduser.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>🙍‍♂️ 마이페이지</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;유저의 정보를 확인, 수정 기능
                        <br />
                        2️⃣&nbsp;최근 구입한 게임, QnA, 환불내역 확인가능
                        <br />
                        <br />
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/mypage.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
                <div className="item">
                  <div className="de_testi type-2">
                    <blockquote>
                      <div className="de-rating-ext">
                        <h4>💰 장바구니/결제/환불</h4>
                      </div>
                      <p>
                        1️⃣&nbsp;토스API를 활용한 결제구현
                        <br />
                        2️⃣&nbsp;장바구니에 제품 추가/삭제
                        <br />
                        <br />
                      </p>
                      <img
                        alt=""
                        src={require("../../assets/images/cart.png")}
                        style={{ width: "300px", height: "200px" }}
                        className="container"
                      />{" "}
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="no-bottom wow fadeInUp">
          <div className="container pb-5">
            <div className="col-lg-8">
              <div className="subtitle mb20">Our playHost team</div>
              <h2 className="mb20 wow fadeInUp">playhost팀을 소개합니다.</h2>
            </div>
            <div className="row  wow fadeInUp mt-5">
              {/* 팀 구성원 1 */}
              <div className="col-lg-4 col-md-4 col-sm-6 mb-sm-30 mb-3">
                <div className="f-profile text-center">
                  <div className="fp-wrap f-invert">
                    <div className="fpw-overlay">
                      <div className="fpwo-wrap"></div>
                    </div>
                    <div className="fpw-overlay-btm"></div>
                    <img
                      src={require("../../assets/images/team/이산하.png")}
                      className="fp-image img-fluid"
                      alt=""
                    />
                  </div>
                  <h4>이산하</h4>

                  <button
                    className="btn-main"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Project Manager"
                    data-bs-html="true"
                    data-bs-content="1️⃣ 기초 데이터베이스 설계<br>2️⃣ 로그인·회원가입 기능 담당<br>3️⃣ 메인페이지 Backend 담당<br>4️⃣ 프로젝트 총괄<br/>5️⃣ 관리자페이지 Backend 담당"
                    data-bs-target="#popover1" // 고유한 ID 부여
                    data-bs-trigger="hover" // Trigger on hover
                  >
                    담당 역할 보기
                  </button>
                </div>
              </div>

              {/* 팀 구성원 2 */}
              <div className="col-lg-4 col-md-4 col-sm-6 mb-sm-30">
                <div className="f-profile text-center">
                  <div className="fp-wrap f-invert">
                    <div className="fpw-overlay">
                      <div className="fpwo-wrap"></div>
                    </div>
                    <div className="fpw-overlay-btm"></div>
                    <img
                      src={require("../../assets/images/team/신정우.png")}
                      className="fp-image img-fluid"
                      alt=""
                    />
                  </div>
                  <h4>신정우</h4>
                  <button
                    className="btn-main"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Frontend + Backend"
                    data-bs-html="true"
                    data-bs-content="1️⃣ 제안서 작성<br>2️⃣ 장바구니 기능 Front 담당<br>3️⃣ About 페이지 Front 담당<br/>4️⃣ 유저 페이지 Front 담당<br/>5️⃣ News 페이지 Front 담당"
                    data-bs-target="#popover2" // 고유한 ID 부여
                    data-bs-trigger="hover" // Trigger on hover
                  >
                    담당 역할 보기
                  </button>
                </div>
              </div>
              {/* 팀 구성원 3 */}
              <div className="col-lg-4 col-md-4 col-sm-6 mb-sm-30">
                <div className="f-profile text-center">
                  <div className="fp-wrap f-invert">
                    <div className="fpw-overlay">
                      <div className="fpwo-wrap"></div>
                    </div>
                    <div className="fpw-overlay-btm"></div>
                    <img
                      src={require("../../assets/images/team/이준혁.jpg")}
                      className="fp-image img-fluid"
                      alt=""
                    />
                  </div>
                  <h4>이준혁</h4>
                  <button
                    className="btn-main"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Frontend + Backend"
                    data-bs-html="true"
                    data-bs-container="body" // 팝오버가 body 요소 안에 위치하도록 설정
                    data-bs-content=" 1️⃣ 결제 부분 담당<br>2️⃣ News 페이지 담당<br>3️⃣ About 페이지 담당<br>4️⃣ 장바구니 기능 부분 담당"
                    data-bs-target="#popover3" // 고유한 ID 부여
                    data-bs-trigger="hover" // Trigger on hover
                  >
                    담당 역할 보기
                  </button>
                </div>
              </div>

              {/* 팀 구성원 4 */}
              <div className="col-lg-4 col-md-4 col-sm-6 mb-sm-30">
                <div className="f-profile text-center">
                  <div className="fp-wrap f-invert">
                    <div className="fpw-overlay">
                      <div className="fpwo-wrap"></div>
                    </div>
                    <div className="fpw-overlay-btm"></div>
                    <img
                       src={require("../../assets/images/team/박준희.jpg")}
                      className="fp-image img-fluid"
                      alt=""
                    />
                  </div>
                  <h4>박준희</h4>
                  <button
                    className="btn-main"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Frontend + Backend"
                    data-bs-html="true"
                    data-bs-container="body" // 팝오버가 body 요소 안에 위치하도록 설정
                    data-bs-content=" 1️⃣ 상세조회 Front부분 담당<br>2️⃣ 게임 컬렉션 Front부분 구현 담당<br>3️⃣ 리뷰 부분 Front 담당<br>4️⃣ 태그별 게임 컬렉션 Front부분 담당"
                    data-bs-target="#popover4" // 고유한 ID 부여
                    data-bs-trigger="hover" // Trigger on hover
                  >
                    담당 역할 보기
                  </button>
                </div>
              </div>
              {/* 팀 구성원 5 */}
              <div className="col-lg-4 col-md-4 col-sm-6 mb-sm-30">
                <div className="f-profile text-center">
                  <div className="fp-wrap f-invert">
                    <div className="fpw-overlay">
                      <div className="fpwo-wrap"></div>
                    </div>
                    <div className="fpw-overlay-btm"></div>
                    <img
                      src={require("../../assets/images/team/이상화.jpg")}
                      className="fp-image img-fluid"
                      alt=""
                    />
                  </div>
                  <h4>이상화</h4>
                  <button
                    className="btn-main"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Frontend + Backend"
                    data-bs-html="true"
                    data-bs-container="body" // 팝오버가 body 요소 안에 위치하도록 설정
                    data-bs-content=" 1️⃣ 게임 컬력션 구현 담당<br>2️⃣ 메인 페이지 담당<br/>3️⃣ 관리자 페이지 Front 담당<br/>4️⃣ 유저 페이지 Front 담당"
                    data-bs-target="#popover5" // 고유한 ID 부여
                    data-bs-trigger="hover" // Trigger on hover
                  >
                    담당 역할 보기
                  </button>
                </div>
              </div>
              {/* 팀 구성원 6 */}
              <div className="col-lg-4 col-md-4 col-sm-6 mb-sm-30">
                <div className="f-profile text-center">
                  <div className="fp-wrap f-invert">
                    <div className="fpw-overlay">
                      <div className="fpwo-wrap"></div>
                    </div>
                    <div className="fpw-overlay-btm"></div>
                    <img
                      src={require("../../assets/images/team/유주환.png")}
                      className="fp-image img-fluid"
                      alt=""
                    />
                  </div>
                  <h4>유주환</h4>
                  <button
                    className="btn-main"
                    data-bs-toggle="popover"
                    data-bs-placement="top"
                    title="Frontend + Backend"
                    data-bs-html="true"
                    data-bs-container="body" // 팝오버가 body 요소 안에 위치하도록 설정
                    data-bs-content="  1️⃣ 상세조회 Backend부분 담당<br>2️⃣ 게임컬렉션 Backend부분 구현 담당<br>3️⃣ 리뷰 부분 Backend부분 담당<br>4️⃣ 태그별 게임 컬렉션 Backend부분 담당"
                    data-bs-target="#popover6" // 고유한 ID 부여
                    data-bs-trigger="hover" // Trigger on hover
                  >
                    담당 역할 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
