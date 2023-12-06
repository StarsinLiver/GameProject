import React, { useEffect, useState } from "react";
import customMarquee from "../../assets/js/custom-marquee";
import designesis from "../../assets/js/designesia";
import customSwiper1 from "../../assets/js/custom-swiper-1";
import { Link } from "react-router-dom";
import IProduct from "../../types/IProduct";
import ProductService from "../../services/product/ProductService";
import IProductDto from "../../types/Dto/IProductDto";
import customSwiper3 from "../../assets/js/custom-swiper-3";
import "../../assets/css/homePageStyle.css";

function HomePage() {
  // Todo : 랜더링
  const [render, setRender] = useState<boolean>(false);

  useEffect(() => {
    customMarquee();
    customSwiper1();
    customSwiper3();

    designesis();
  }, [render]);

  // Todo : 받아 오기
  useEffect(() => {
    retrieveProductList();
    retrievePrductListThumbNail();
  }, []);

  const [product, setProduct] = useState<Array<IProduct>>([]);

  //  TODO  공통 변수(필수)  page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열  1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호         최초값 1
  const [count, setCount] = useState<number>(1); //총페이지 건수          최초값 1
  const [pageSize, setPageSize] = useState<number>(30); //1페이지당 개수  최초값 20
  const [productDtoPage, setProductDtoPage] = useState<Array<IProductDto>>([]);

  //  todo  전체조회 - 데이터베이스
  const retrieveProductList = () => {
    ProductService.getAll("", page - 1, pageSize)
      .then((response: any) => {
        const { product, totalPages } = response.data;

        setProduct(product);
        setCount(totalPages);
        setRender(true);
      })
      .catch((e: Error) => {
      });
  };

  const retrievePrductListThumbNail = () => {
    ProductService.getAllByThumbNailFullJoin("", 0, 8)
      .then((response: any) => {
        const { list, productDtoPage } = response.data;
        setProductDtoPage(list);
      })
      .catch((e: Error) => {
      });
  };

  return (
    <>
      {render && (
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>

          {/* < -- 1번째 섹션 : 추천게임 시작 -- > */}
          <section className="no-bottom" style={{ padding: "200px 0 0 0" }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">Recommend</div>
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    추천 게임
                  </h2>
                </div>

                {/* 줄 구분용 div */}
                <div className="col-lg-6"></div>

                {/* 추천 게임란 */}
                {render &&
                  productDtoPage
                    .filter((value, index) => value.uuid != null)
                    .slice(0,4)
                    .map((value, index) => (
                      <>
                        <div
                          className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                          data-wow-delay="0s"
                        >
                          <div className="de-image-hover">
                            <Link to={`/game-detail/${value.pid}`}>
                              <img
                                src={value.fileUrl}
                                className="mb20"
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "450px",
                                  borderRadius: "15px",
                                }}
                              />
                              <span className="d-tagline">{value.tag}</span>

                              <div className="d-text">
                                <h3>{value.name}</h3>

                                {value.discount > 0 ? (
                                  <>
                                    <p
                                      className="d-price"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        className="css-15fdr99"
                                        style={{
                                          display: "inline",
                                        }}
                                      >
                                        {value.discount > 0 && (
                                          <div
                                            className="css-b0xoos"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            -{value.discount}%
                                          </div>
                                        )}
                                      </span>
                                      &nbsp; &nbsp;
                                      <del style={{ display: "inline" }}>
                                        ₩{" "}
                                        {value.price &&
                                          value.price.toLocaleString()}
                                      </del>
                                      <h4
                                        style={{
                                          display: "inline",
                                          marginTop: "12px",
                                        }}
                                      >
                                        &nbsp; ₩{" "}
                                        {value.price != null
                                          ? value.finalPrice.toLocaleString()
                                          : "무료"}
                                      </h4>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="d-price"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <h4
                                        className="price"
                                        style={{ marginTop: "12px" }}
                                      >
                                        {value.price != null && value.price > 0
                                          ? "₩ " + value.price.toLocaleString()
                                          : `무료`}
                                      </h4>
                                    </p>
                                  </>
                                )}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </>
                    ))}
              </div>
            </div>
          </section>
          {/* < -- 1번째 섹션 : 추천게임 종료 -- > */}

          {/* < -- 2번째 섹션 : 금주의 할인 게임 slider 시작  -- > */}
          <section
            id="swiper-s2"
            className="no-top no-bottom position-relative z-1000"
          >
            <div
              className="container Z-1000"
              style={{ padding: "100px 0 0 0" }}
            >
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">
                    Deals Of the Week
                  </div>
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    금주의 할인 게임
                  </h2>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <a className="btn-main mb-sm-30" href="/game-tag-action">
                    View More
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Slider main wrapper --> */}

            <div
              className="swiper-container-wrapper wow fadeInRight"
              data-wow-delay="0s"
              style={{
                width: "1280px",
                height: "600px",
                margin: "auto",
                padding: "0 0 0 0",
              }}
            >
              {/* <!-- Slider main container --> */}
              <div
                className="swiper-container gallery-top"
                style={{ height: "600px" }}
              >
                {/* <!-- 메인 슬라이드 --> */}
                <div className="swiper-wrapper">
                  {/* <!-- Slides --> */}
                  {render &&
                    product
                      // .filter((value, index) => index < 10)
                      .filter((value) => value.discount != 0)
                      .slice(0, 5)
                      .map((value, index) => (
                        <div
                          className="swiper-slide"
                          // data-bgimage="url(images/slider/5.webp)"
                          style={{
                            backgroundImage: `url(${value.imgUrl})`,
                            backgroundSize: "cover",
                            height: "600px",
                            borderRadius: "20px",
                          }}
                          key={index}
                        >
                          <div className="sw-caption s2">
                            <div className="container">
                              <div className="row gx-5 align-items-center">
                                <div className="col-lg-8 offset-lg-2 mb-sm-30">
                                  <div className="subtitle blink mb-4">
                                    Now On Sale!
                                  </div>
                                  <h2 className="slider-title text-uppercase mb-1">
                                    {value.name}
                                  </h2>
                                </div>
                                <div className="col-lg-6 offset-lg-3">
                                  <p className="slider-text">
                                    {value.shortDescription}
                                  </p>
                                  <div className="spacer-10"></div>
                                  <Link
                                    className="btn-main mb10"
                                    to={`/game-detail/${value.pid}`}
                                  >
                                    Order Your Game
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="sw-overlay"></div>
                        </div>
                      ))}
                </div>

                {/* <!-- Add Arrows --> */}
                <div className="swiper-button-next"></div>
                <div className="swiper-button-prev"></div>
              </div>

              {/* <!-- 썸네일 슬라이드 --> */}
              <div
                className="swiper-container gallery-thumbs"
                style={{ height: "600px" }}
              >
                {/* <!-- Additional required wrapper --> */}
                <div className="swiper-wrapper">
                  {/* <!-- Slides  --> */}
                  {render &&
                    product
                      // .filter((value, index) => index < 10)
                      .filter((value, index) => value.discount != 0)
                      .slice(0, 5)
                      .map((value, index) => (
                        <div
                          className="swiper-slide"
                          style={{
                            backgroundImage: `url(${value.imgUrl})`,
                            backgroundSize: "cover",
                            borderRadius: "20px",
                          }}
                          key={index}
                        >
                          <div className="sw-caption-thumb">
                            {value.discount > 0 && (
                              <span className="d-tag">
                                {value.discount}% OFF !
                              </span>
                            )}
                            <h3>{value.name}</h3>
                          </div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </section>
          {/* < -- 2번째 섹션 : 금주의 할인 게임 slider 끝  -- > */}

          {/* < -- 3번째 섹션 : 액션 게임 컬렉션 시작 -- >  */}
          <section className="jarallax" style={{ padding: "150px 0 0 0" }}>
            <div className="container z-1000">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">Action</div>
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    액션 특집
                  </h2>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <a className="btn-main mb-sm-30" href="/game-tag-action">
                    View More
                  </a>
                </div>
              </div>
              <div className="row g-0 sequence">
                {/* 1 */}
                {render &&
                  product
                    .filter((value, index) => value.tag == "액션")
                    .slice(0, 4)
                    .map((value) => (
                      <>
                        <div
                          className="col-lg-6 col-sm-6 wow fadeInRight"
                          data-wow-delay="0s"
                        >
                          <div style={{ width: "95%", marginBottom: "40px" }}>
                            <div className="de-image-hover">
                              <Link to={`/game-detail/${value.pid}`}>
                                <img
                                  src={value.imgUrl}
                                  className="img-fluid mb-3"
                                  alt=""
                                  style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    borderRadius: "15px",
                                  }}
                                />
                                <span className="d-tagline">{value.tag}</span>

                                <div className="d-text">
                                  <h3>{value.name}</h3>

                                  {value.discount > 0 ? (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <span
                                          className="css-15fdr99"
                                          style={{
                                            display: "inline",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {value.discount > 0 && (
                                            <div className="css-b0xoos">
                                              {" "}
                                              -{value.discount}%
                                            </div>
                                          )}
                                        </span>
                                        &nbsp; &nbsp;
                                        <del style={{ display: "inline" }}>
                                          ₩ {value.price.toLocaleString()}
                                        </del>
                                        <h4
                                          className="price"
                                          style={{
                                            display: "inline",
                                            marginTop: "12px",
                                          }}
                                        >
                                          &nbsp; ₩{" "}
                                          {value.finalPrice.toLocaleString()}
                                        </h4>
                                      </p>
                                      <p className="ellipsis-box">
                                        {value.shortDescription}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <h4
                                          className="price"
                                          style={{ marginTop: "12px" }}
                                        >
                                          {value.price > 0
                                            ? "₩ " +
                                              value.price.toLocaleString()
                                            : `무료`}
                                        </h4>
                                      </p>
                                      <p className="ellipsis-box">
                                        .{value.shortDescription}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
              </div>
            </div>
          </section>
          {/* < -- 3번째 섹션 : 액션 게임 컬렉션 종료 -- >  */}

          {/* < -- 4번째 섹션 : 무료 게임 컬렉션 시작 -- >  */}
          <section className="jarallax" style={{ padding: "50px 0 0 0" }}>
            <div className="container z-1000">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">For Free</div>
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    무료 게임
                  </h2>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <a className="btn-main mb-sm-30" href="/games">
                    View More
                  </a>
                </div>
              </div>
              <div className="row g-0 sequence">
                {/* 1 */}
                {render &&
                  product
                    .filter((value) => value.finalPrice == 0)
                    .slice(0, 4)
                    .map((value) => (
                      <>
                        <div
                          className="col-lg-6 col-sm-6  wow fadeInRight"
                          data-wow-delay="0s"
                        >
                          <div style={{ width: "95%", marginBottom: "40px" }}>
                            <div className="de-image-hover">
                              <Link to={`/game-detail/${value.pid}`}>
                                <img
                                  src={value.imgUrl}
                                  className="img-fluid mb-3"
                                  alt=""
                                  style={{
                                    marginBottom: "10px",
                                    width: "100%",
                                    borderRadius: "15px",
                                  }}
                                />
                                <span className="d-tagline">{value.tag}</span>

                                <div className="d-text">
                                  <h3>{value.name}</h3>

                                  {value.discount > 0 ? (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <span
                                          className="css-15fdr99"
                                          style={{
                                            display: "inline",
                                            fontSize: "12px",
                                          }}
                                        >
                                          {value.discount > 0 && (
                                            <div className="css-b0xoos">
                                              {" "}
                                              -{value.discount}%
                                            </div>
                                          )}
                                        </span>
                                        &nbsp; &nbsp;
                                        <del style={{ display: "inline" }}>
                                          ₩ {value.price.toLocaleString()}
                                        </del>
                                        <h4
                                          className="price"
                                          style={{
                                            display: "inline",
                                            marginTop: "12px",
                                          }}
                                        >
                                          &nbsp; ₩{" "}
                                          {value.finalPrice.toLocaleString()}
                                        </h4>
                                      </p>
                                      <p className="ellipsis-box">
                                        {value.shortDescription}
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <h4
                                          className="price"
                                          style={{ marginTop: "12px" }}
                                        >
                                          {value.price > 0
                                            ? "₩ " +
                                              value.price.toLocaleString()
                                            : `무료`}
                                        </h4>
                                      </p>
                                      <p className="ellipsis-box">
                                        {value.shortDescription}
                                      </p>
                                    </>
                                  )}
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
              </div>
            </div>
          </section>
          {/* < -- 4번째 섹션 : 무료 게임 컬렉션 종료 -- >  */}

          {/* < -- 5번째 섹션 : Rankings 시작 -- > */}
          <section className="no-bottom" style={{ padding: "50px 0 0 0" }}>
            <div className="container">
              <div className="row align-items-center gx-5">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">Rankings</div>
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    카테고리별 순위
                  </h2>
                </div>
                {/* 랭킹 리스트 시작 */}
                <div
                  className="container mt-2 wow fadeInRight"
                  data-wow-delay="0s"
                >
                  <ul className="css-1m205sk">
                    {/* 리스트 1 - top seller */}
                    <li className="css-dliiq8">
                      <div className="css-1sm2slz">
                        <div className="css-61xwjr">
                          <h4 className="" style={{ paddingTop: "10px" }}>
                            <span>베스트 셀러</span>
                          </h4>
                          <Link to={"/games"} className="css-1m37id5">
                            <span
                              className="css-15fdr99"
                              style={{ fontWeight: "bold" }}
                            >
                              view more
                            </span>
                          </Link>
                        </div>
                        <ul className="css-ker5ce">
                          {/* map -> 게임 정렬 */}
                          {render &&
                            product
                              .sort((a, b) => b.finalPrice - a.finalPrice)
                              .filter((value, index) => index < 4)
                              .map((value, imdex) => (
                                <li className="css-8atqhb">
                                  <div className="css-ukk7l6">
                                    <Link
                                      to={"/game-detail/" + value.pid}
                                      className="css-1xvrxmf"
                                    >
                                      <div className="css-1k6yql2">
                                        {/* 이미지 */}
                                        <div className="css-422f2k">
                                          <div className="css-csipgi">
                                            <div className="yb58t8">
                                              <div className="css-rl9sa6">
                                                {/* 게임 썸네일 이미지 넣기 */}
                                                <img
                                                  className="css-1jk123r"
                                                  src={value.imgUrl}
                                                ></img>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* 정보 */}
                                        <div className="css-8atqhb">
                                          <span className="css-119zqif">
                                            <div className="css-lgj0h8">
                                              <div className="css-1e8ix6x">
                                                {value.name}
                                              </div>
                                            </div>
                                          </span>

                                          {/* 가격 표시 */}
                                          <div className="css-1q7njkh">
                                            <div className="css-u4p24i">
                                              {/* 할인율 */}
                                              {value.discount > 0 ? (
                                                <>
                                                  <div className="css-l24hbj">
                                                    <span className="css-15fdr99">
                                                      <div className="css-b0xoos">
                                                        {value.discount}%
                                                      </div>
                                                    </span>
                                                  </div>

                                                  <div className="css-124hbj">
                                                    <div className="css-o1hbmr">
                                                      <div
                                                        className="css-124hbj"
                                                        style={{
                                                          marginRight: "10px",
                                                          marginLeft: "10px",
                                                        }}
                                                      >
                                                        <span className="css-dcpx1m">
                                                          <div className="css-4jky3p">
                                                            {value.price.toLocaleString()}
                                                            원
                                                          </div>
                                                        </span>
                                                      </div>
                                                      <div className="css-l24hbj">
                                                        <span className="css-iqno47">
                                                          {value.finalPrice.toLocaleString()}
                                                          원
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              ) : (
                                                <div className="css-l24hbj">
                                                  <span className="css-iqno47">
                                                    {value.finalPrice.toLocaleString()}
                                                    원
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </li>
                    {/* 리스트 1 - top seller */}

                    {/* 리스트 2 - 무료게임 */}
                    <li className="css-dliiq8">
                      <div className="css-1sm2slz">
                        <div className="css-61xwjr">
                          <h4 className="" style={{ paddingTop: "10px" }}>
                            <span>무료 게임</span>
                          </h4>
                          <Link to={"/games"} className="css-1m37id5">
                            <span
                              className="css-15fdr99"
                              style={{ fontWeight: "bold" }}
                            >
                              view more
                            </span>
                          </Link>
                        </div>
                        <ul className="css-ker5ce">
                          {/* map -> 게임 정렬 */}
                          {render &&
                            product
                              .filter((value, index) => value.finalPrice === 0)
                              .filter((value, index) => index < 4)
                              .map((value, imdex) => (
                                <li className="css-8atqhb">
                                  <div className="css-ukk7l6">
                                    <Link
                                      to={"/game-detail/" + value.pid}
                                      className="css-1xvrxmf"
                                    >
                                      <div className="css-1k6yql2">
                                        {/* 이미지 */}
                                        <div className="css-422f2k">
                                          <div className="css-csipgi">
                                            <div className="yb58t8">
                                              <div className="css-rl9sa6">
                                                {/* 게임 썸네일 이미지 넣기 */}
                                                <img
                                                  className="css-1jk123r"
                                                  src={value.imgUrl}
                                                ></img>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* 정보 */}
                                        <div className="css-8atqhb">
                                          <span className="css-119zqif">
                                            <div className="css-lgj0h8">
                                              <div className="css-1e8ix6x">
                                                {value.name}
                                              </div>
                                            </div>
                                          </span>

                                          {/* 가격 표시 */}
                                          <div className="css-1q7njkh">
                                            <div className="css-u4p24i">
                                              {/* 할인율 */}
                                              {value.discount > 0 ? (
                                                <>
                                                  <div className="css-l24hbj">
                                                    <span className="css-15fdr99">
                                                      <div className="css-b0xoos">
                                                        {value.discount}%
                                                      </div>
                                                    </span>
                                                  </div>

                                                  <div className="css-124hbj">
                                                    <div className="css-o1hbmr">
                                                      <div
                                                        className="css-124hbj"
                                                        style={{
                                                          marginRight: "10px",
                                                          marginLeft: "10px",
                                                        }}
                                                      >
                                                        <span className="css-dcpx1m">
                                                          <div className="css-4jky3p">
                                                            {value.price.toLocaleString()}
                                                            원
                                                          </div>
                                                        </span>
                                                      </div>
                                                      <div className="css-l24hbj">
                                                        <span className="css-iqno47">
                                                          {value.finalPrice.toLocaleString()}
                                                          원
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              ) : (
                                                <div className="css-l24hbj">
                                                  <span
                                                    className="css-iqno47"
                                                    style={{
                                                      marginLeft: "200px",
                                                    }}
                                                  >
                                                    {value.finalPrice.toLocaleString()}
                                                    원
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </li>
                    {/* 리스트 2 - 무료게임 */}

                    {/* 리스트 3 - 할인율 */}
                    <li className="css-dliiq82">
                      <div className="css-1sm2slz">
                        <div className="css-61xwjr">
                          <h4 className="" style={{ paddingTop: "10px" }}>
                            <span>할인 이벤트</span>
                          </h4>
                          <Link to={"/games"} className="css-1m37id5">
                            <span
                              className="css-15fdr99"
                              style={{ fontWeight: "bold" }}
                            >
                              view more
                            </span>
                          </Link>
                        </div>
                        <ul className="css-ker5ce">
                          {/* map -> 게임 정렬 */}
                          {render &&
                            product
                              .sort((a, b) => b.discount - a.discount)
                              .filter((value, index) => value.discount > 0)
                              .filter((value, index) => value.finalPrice != 0)
                              .filter((value, index) => index < 4)
                              .map((value, imdex) => (
                                <li className="css-8atqhb">
                                  <div className="css-ukk7l6">
                                    <Link
                                      to={"/game-detail/" + value.pid}
                                      className="css-1xvrxmf"
                                    >
                                      <div className="css-1k6yql2">
                                        {/* 이미지 */}
                                        <div className="css-422f2k">
                                          <div className="css-csipgi">
                                            <div className="yb58t8">
                                              <div className="css-rl9sa6">
                                                {/* 게임 썸네일 이미지 넣기 */}
                                                <img
                                                  className="css-1jk123r"
                                                  src={value.imgUrl}
                                                  style={{
                                                    width: "100%",
                                                  }}
                                                ></img>
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* 정보 */}
                                        <div className="css-8atqhb">
                                          <span className="css-119zqif">
                                            <div className="css-lgj0h8">
                                              <div className="css-1e8ix6x">
                                                {value.name}
                                              </div>
                                            </div>
                                          </span>

                                          {/* 가격 표시 */}
                                          <div className="css-1q7njkh">
                                            <div className="css-u4p24i">
                                              {/* 할인율 */}
                                              {value.discount > 0 ? (
                                                <>
                                                  <div className="css-l24hbj">
                                                    <span className="css-15fdr99">
                                                      <div className="css-b0xoos">
                                                        {value.discount}%
                                                      </div>
                                                    </span>
                                                  </div>

                                                  <div className="css-124hbj">
                                                    <div className="css-o1hbmr">
                                                      <div
                                                        className="css-124hbj"
                                                        style={{
                                                          marginRight: "10px",
                                                          marginLeft: "10px",
                                                        }}
                                                      >
                                                        <span className="css-dcpx1m">
                                                          <div className="css-4jky3p">
                                                            {value.price.toLocaleString()}
                                                            원
                                                          </div>
                                                        </span>
                                                      </div>
                                                      <div className="css-l24hbj">
                                                        <span className="css-iqno47">
                                                          {value.finalPrice.toLocaleString()}
                                                          원
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              ) : (
                                                <div className="css-l24hbj">
                                                  <span
                                                    className="css-iqno47"
                                                    style={{
                                                      marginLeft: "200px",
                                                    }}
                                                  >
                                                    {value.finalPrice.toLocaleString()}
                                                    원
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                </li>
                              ))}
                        </ul>
                      </div>
                    </li>
                    {/* 리스트 3 - 할인율 */}
                  </ul>
                </div>
                {/* 랭킹 리스트 끝 */}
              </div>
            </div>
          </section>
          {/* < -- 5번째 섹션 : Rankings 종료 -- > */}

          {/* < -- 6번째 섹션 : 게임 컬렉션 시작 -- >  */}
          <section className="jarallax" style={{ padding: "100px 0 100px 0" }}>
            <div className="de-gradient-edge-top2"></div>
            <div className="de-gradient-edge-bottom2"></div>
            <div className="container z-1000">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">Games</div>
                  <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                    게임 컬렉션
                  </h2>
                </div>
                <div className="col-lg-6 text-lg-end">
                  <a className="btn-main mb-sm-30" href="/games">
                    View all games
                  </a>
                </div>
              </div>
              <div className="row g-4 sequence">
                {/* 1 */}
                {render &&
                  product.slice(0, 9).map((value, index) => (
                    <>
                      <div
                        className="col-lg-4 col-md-4  wow fadeInRight"
                        data-wow-delay="0s"
                      >
                        <div style={{ width: "98%", height: "100%" }}>
                          <div className="de-image-hover">
                            <Link to={`/game-detail/${value.pid}`}>
                              <img
                                src={value.imgUrl}
                                className="img-fluid"
                                alt=""
                                style={{
                                  marginBottom: "10px",
                                  borderRadius: "15px",
                                }}
                              />
                              <span className="d-tagline">{value.tag}</span>

                              <div className="d-text">
                                <h3>{value.name}</h3>

                                {value.discount > 0 ? (
                                  <>
                                    <p
                                      className="d-price"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        className="css-15fdr99"
                                        style={{
                                          display: "inline",
                                          fontSize: "12px",
                                        }}
                                      >
                                        {value.discount > 0 && (
                                          <div className="css-b0xoos">
                                            {" "}
                                            -{value.discount}%
                                          </div>
                                        )}
                                      </span>
                                      &nbsp; &nbsp;
                                      <del style={{ display: "inline" }}>
                                        ₩ {value.price.toLocaleString()}
                                      </del>
                                      <h4
                                        className="price"
                                        style={{
                                          display: "inline",
                                          marginTop: "12px",
                                        }}
                                      >
                                        &nbsp; ₩{" "}
                                        {value.finalPrice.toLocaleString()}
                                      </h4>
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <p
                                      className="d-price"
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <h4
                                        className="price"
                                        style={{ marginTop: "12px" }}
                                      >
                                        {value.price > 0
                                          ? "₩ " + value.price.toLocaleString()
                                          : `무료`}
                                      </h4>
                                    </p>
                                  </>
                                )}
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </section>
          {/* < -- 6번째 섹션 : 게임 컬렉션 종료 -- >  */}

          {/* < -- 7번째 섹션 : 카테고리별 살펴보기 시작 -- >  */}
          <section className="no-bottom container">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="subtitle mb20">카테고리별 살펴보기</div>
                  <div className="spacer-20"></div>
                </div>
              </div>
            </div>
            <div
              className="container-fluid text-center"
              style={{
                width: `1200px`,
                height: `600px`,
                margin: 0,
                padding: 0,
              }}
            >
              <div>
                <div
                  className="owl-carousel owl-theme wow fadeInUp"
                  id="testimonial-carousel"
                  style={{ margin: 0, padding: 0 }}
                >
                  <div className="item">
                    <Link to="game-tag-action">
                      <div className="de-item">
                        <div className="de-image-hover">
                          <img
                            src={require("../../assets/images/category/액션.png")}
                            className="mb20"
                            alt=""
                            style={{
                              width: "100%",
                              height: "300px",
                              borderRadius: "15px",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="game-tag-strategy">
                      <div className="de-item">
                        <div className="de-image-hover">
                          <img
                            src={require("../../assets/images/category/전략.png")}
                            className="mb20"
                            alt=""
                            style={{
                              width: "100%",
                              height: "300px",
                              borderRadius: "15px",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="game-tag-simulation">
                      <div className="de-item">
                        <div className="de-image-hover">
                          <img
                            src={require("../../assets/images/category/시뮬레이션.png")}
                            className="mb20"
                            alt=""
                            style={{
                              width: "100%",
                              height: "300px",
                              borderRadius: "15px",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="game-tag-casual">
                      <div className="de-item">
                        <div className="de-image-hover">
                          <img
                            src={require("../../assets/images/category/캐주얼.png")}
                            className="mb20"
                            alt=""
                            style={{
                              width: "100%",
                              height: "300px",
                              borderRadius: "15px",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="item">
                    <Link to="game-tag-adventure">
                      <div className="de-item">
                        <div className="de-image-hover">
                          <img
                            src={require("../../assets/images/category/어드벤처.png")}
                            className="mb20"
                            alt=""
                            style={{
                              width: "100%",
                              height: "300px",
                              borderRadius: "15px",
                            }}
                          />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* < -- 7번째 섹션 : Do you have Any questions? 종료 -- >  */}

          {/* < -- 8번째 섹션 : Download now 시작 -- >  */}
          <section className="no-bottom">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="padding60 sm-padding40 jarallax position-relative">
                    <img
                      src="images/background/2.webp"
                      className="jarallax-img"
                      alt=""
                    />
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="subtitle wow fadeInUp mb-3">
                          Download now
                        </div>
                        <h2 className="wow fadeInUp" data-wow-delay=".2s">
                          모바일 디바이스에서도 저희 서비스를 이용하세요!
                        </h2>
                        <p>
                          당사는 모바일 서비스를 진행중 입니다. 더 많은 정보를
                          얻고 싶다면 이곳을 통해서 다운로드를 받아주세요!!
                        </p>
                        <a href="https://www.apple.com/kr/app-store/">
                          <img
                            src="images/misc/download-appstore.webp"
                            className="img-fluid mb-sm-20"
                            alt="download"
                          />
                        </a>
                        &nbsp;
                        <a href="https://play.google.com/store/games?device=windows&utm_source=apac_med&hl=ko-KR&utm_medium=hasem&utm_content=Oct0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-kr-1003227-med-hasem-py-Evergreen-Oct0121-Text_Search_BKWS-BKWS%7CONSEM_kwid_43700065216954472_creativeid_535244992740_device_c&gclid=Cj0KCQiAmNeqBhD4ARIsADsYfTfPkxqetcBk9FcqP515Q6du-NbaErZJNV7jNCR86eIf88y8ZRTfAlEaArAOEALw_wcB&gclsrc=aw.ds&pli=1">
                          <img
                            src="images/misc/download-playstore.webp"
                            className="img-fluid mb-sm-20"
                            alt="download"
                          />
                        </a>
                      </div>
                    </div>

                    <img
                      src="images/misc/man-with-phone.webp"
                      className="sm-hide position-absolute bottom-0 end-0 wow fadeIn"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* < -- 8번째 섹션 : Download now 종료 -- >  */}

          {/* < -- 9번째 섹션 : payment Methods 시작 -- >  */}
          <section>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subtitle wow fadeInUp mb-3">
                    Payment Methods
                  </div>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    결제 가능 서비스
                  </h2>
                </div>
                <div className="col-lg-6">
                  <div className="row g-4">
                    <div className="col-sm-2 col-4">
                      <div
                        className="p-2 rounded-10"
                        data-bgcolor="rgba(255, 255, 255, .05)"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <img
                          src="images/payments/toss.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 col-4">
                      <div
                        className="p-2 rounded-10"
                        data-bgcolor="rgba(255, 255, 255, .05)"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <img
                          src="images/payments/mastercard.png"
                          className="img-fluid"
                          alt=""
                          style={{ paddingTop: "8px" }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 col-4">
                      <div
                        className="p-2 rounded-10"
                        data-bgcolor="rgba(255, 255, 255, .05)"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <img
                          src="images/payments/samsungpay.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 col-4">
                      <div
                        className="p-2 rounded-10"
                        data-bgcolor="rgba(255, 255, 255, .05)"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <img
                          src="images/payments/cultureland.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="col-sm-2 col-4">
                      <div
                        className="p-2 rounded-10"
                        data-bgcolor="rgba(255, 255, 255, .05)"
                        style={{ width: "90px", height: "90px" }}
                      >
                        <img
                          src="images/payments/ssgpay.png"
                          className="img-fluid"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* < -- 9번째 섹션 : payment Methods 종료 -- >  */}
        </div>
      )}
      {/* <!-- content begin --> */}

      {/* <!-- content close --> */}
    </>
  );
}

export default HomePage;
