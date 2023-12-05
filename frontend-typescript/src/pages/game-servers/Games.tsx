import React, { useState } from "react";
import { useEffect } from "react";
import form from "../../assets/js/form";
import Pagination from "@mui/material/Pagination";
import IProduct from "../../types/IProduct";
import designesis from "../../assets/js/designesia";
import ProductService from "../../services/product/ProductService";
import { Link } from "react-router-dom";
import AdminProductService from "../../services/admin/AdminProductService";
import { colors } from "@mui/material";
import ReviewService from "../../services/review/ReviewService";
import "../../assets/css/gamesStyle.css";

function Games() {
  // Todo : 랜더링
  const [render, setRender] = useState<boolean>(false);

  // todo  상품 배열 변수
  const [productList, setProductList] = useState<Array<any>>([]);
  const [productList2, setProductList2] = useState<Array<string>>([]);
  const [productTag, setProductTag] = useState<Array<any>>([]);
  // 태그담는 곳
  const [tag, setTag] = useState<string>("");
  let [tag2, setTag2] = useState<Array<string>>([]);

  //  TODO  공통 변수(필수)  page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열  1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호         최초값 1
  const [count, setCount] = useState<number>(1); //총페이지 건수          최초값 1
  const [pageSize, setPageSize] = useState<number>(12); //1페이지당 개수  최초값 20

  // todo : 태그페이징
  const [page2, setPage2] = useState<number>(1); // 현재 페이지 번호         최초값 1
  const [count2, setCount2] = useState<number>(1); //총페이지 건수          최초값 1
  const [pageSize2, setPageSize2] = useState<number>(12); //1페이지당 개수  최초값 20
  //  검색어 변수
  const [searchName, setSearchName] = useState<string>("");

  //  검색어 수동 바인딩
  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const tagChange = (event: any, tag2: any) => {
    let name = searchName;
    if (tag != tag2) {
      setPage2(1);
      setTag(tag2);
      setSearchName("");
      name = "";
      if (tag2 == "") {
        setPage(1);
      }
    }

    ReviewService.dd(
      tag2,
      name,
      minPrice,
      maxPrice,
      page2 - 1,
      pageSize2,
      isLikedOrder
    )
      .then((response: any) => {
        const { IsLikeProduct, totalPages } = response.data;
        setProductTag(IsLikeProduct);
        setCount2(totalPages);
      })
      .catch((e: Error) => {});
  };

  // todo : 전체조회 - 태그 포함 검색
  const searchByTagName = () => {
    if (tag == "") {
      ReviewService.dd(
        tag,
        searchName,
        minPrice,
        maxPrice,
        page - 1,
        pageSize,
        isLikedOrder
      )
        .then((response: any) => {
          const { IsLikeProduct, totalPages, tagList } = response.data;
          setProductTag(IsLikeProduct);
          setProductList2(tagList);
          setCount2(totalPages);
          setPage2(1);
          setRender(true);
        })
        .catch((e: Error) => {});
    } else {
      setPage2(1);
      tagChange(1, tag);
    }
  };

  /* 여기부터 수정 */
  // 리뷰비율 변수
  const [isLikedOrder, setIsLikedOrder] = useState<string>("DESC"); // DESC : 높은순 ASC : 낮은순

  // todo : 리뷰정렬 버튼
  const changeReviewLiked = (event: any) => {
    setIsLikedOrder(event);
    setPage2(1);
  };

  // todo : 가격 설정
  let [minPrice, setMinPrice] = useState<number>(0);
  let [maxPrice, setMaxPrice] = useState<number>(800000);

  const changePriceTag = (data1: any, data2: any) => {
    setMaxPrice(data2);
    setMinPrice(data1);
    setPage2(1);
  };

  // todo : 따봉 개수 보여주기
  // let [likedValue, setLikedValue] = useState<string>("");
  const isLikedValue = (reviewCount: any, likeCount: any) => {
    let likedValue = "";
    if (likeCount / reviewCount > 0.8) {
      return "★★★★★";
    } else if (likeCount / reviewCount > 0.6) {
      return "★★★★";
    } else if (likeCount / reviewCount > 0.4) {
      return "★★★";
    } else if (likeCount / reviewCount > 0.2) {
      return "★★";
    } else {
      return "★";
    }
  };

  // TODO : Pagenation 수동 바인딩
  // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
  const handlePageChange2 = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage2(value);
  };

  useEffect(() => {
    designesis();
    form();
  }, [page, maxPrice, tag, isLikedOrder]);

  useEffect(() => {
    searchByTagName();
  }, [page, pageSize]);
  useEffect(() => {
    tagChange(1, tag);
  }, [page2, maxPrice, isLikedOrder]);

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* 섹션 1번 */}
        <section className="jarallax">
          {/* 백그라운드 이미지 */}
          {/* 백그라운드 이미지 */}
          <img
            src="images/game-wallpaper/21.jpg"
            className="jarallax-img"
            alt=""
            style={{ opacity: "0.3" }}
          />
          <div className="de-gradient-edge-top"></div>
          <div className="de-gradient-edge-bottom"></div>

          {/* 분문시작 */}
          <div className="container z-1000" style={{ height: "auto" }}>
            <div className="row align-items-center">
              {/* Game Collection */}
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb-3" data-wow-delay=".2s">
                  게임 컬렉션
                </h2>
              </div>
              <div className="col-lg-12">
                <div className=" wow fadeInUp mb-3">
                  playhost에서 최고의 게임을 찾아보세요!
                </div>
              </div>
              <div className="spacer-20"></div>
            </div>

            {/* 상품 목록 */}

            <div className="row" style={{ height: "auto" }}>
              <div
                id=""
                className="wow fadeInRight col-md-9 row g-4 mb-3"
                style={{ height: "fit-content" }}
              >
                {tag === "" ? (
                  <>
                    {" "}
                    <div id="" className="row g-4  wow fadeInRight mb-3">
                      {render &&
                        productTag != undefined &&
                        productTag.map((value, index) => (
                          <div
                            className={`col-lg-4 col-md-4 item ${value.tag}`}
                            key={index}
                            style={{ height: "auto", marginBottom: "1.5rem" }}
                          >
                            <div
                              className="de-item"
                              style={{ height: "10rem" }}
                            >
                              <div className="d-overlay">
                                <div
                                  className="d-label"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  {value.discount > 0 && (
                                    <>{value.discount}% off !</>
                                  )}
                                </div>

                                <div
                                  className="d-label"
                                  style={{
                                    left: "20px",
                                    width: "fit-content",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    fontSize: "0.7rem",
                                  }}
                                >
                                  {value.reviewCount > 0 ? (
                                    <span
                                      style={{
                                        color: "#F4C025",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      {isLikedValue(
                                        value.reviewCount,
                                        value.likeCount
                                      )}
                                    </span>
                                  ) : (
                                    <>리뷰가 없습니다.</>
                                  )}
                                </div>
                                <div className="d-text" style={{}}>
                                  <div
                                    className="css-1e8ix6x2"
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                      backgroundColor: "rgba(30, 30, 30, 0.3)",
                                      width: "100%",
                                      paddingLeft: "0.7rem",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {value.name}
                                  </div>

                                  {value.discount > 0 ? (
                                    <div style={{ widows: "100%" }}>
                                      <p
                                        className="d-price"
                                        style={{
                                          fontSize: "0.9rem",
                                          color: "white",
                                        }}
                                      >
                                        Price :{" "}
                                        <del
                                          style={{
                                            fontSize: "0.9rem",
                                            color: "gray",
                                          }}
                                        >
                                          {value.price.toLocaleString()}
                                        </del>
                                        <span className="price">
                                          {value.finalPrice.toLocaleString()} 원
                                        </span>
                                      </p>
                                    </div>
                                  ) : (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          fontSize: "0.9rem",
                                          color: "white",
                                        }}
                                      >
                                        Price :{" "}
                                        <span className="price">
                                          {value.price > 0
                                            ? value.price.toLocaleString() +
                                              " 원"
                                            : `무료`}
                                        </span>
                                      </p>
                                    </>
                                  )}

                                  <Link
                                    className="btn-main btn-fullwidth"
                                    to={`/game-detail/${value.pid}`}
                                  >
                                    Order Now
                                  </Link>
                                </div>
                              </div>
                              <img
                                src={value.imgUrl}
                                className="img-fluid"
                                alt=""
                                style={{ height: "10rem" }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div
                      id=""
                      className="row g-4  wow fadeInRight mb-3 "
                      style={{ height: "fit-content" }}
                    >
                      {render &&
                        productTag != undefined &&
                        productTag.map((value, index) => (
                          <div
                            className={`col-lg-4 col-md-4 item ${value.tag}`}
                            key={index}
                            style={{ height: "auto", marginBottom: "1.5rem" }}
                          >
                            <div
                              className="de-item"
                              style={{ height: "10rem" }}
                            >
                              <div className="d-overlay">
                                <div
                                  className="d-label"
                                  style={{ fontSize: "0.7rem" }}
                                >
                                  {value.discount > 0 && (
                                    <>{value.discount}% off !</>
                                  )}
                                </div>
                                <div
                                  className="d-label"
                                  style={{
                                    left: "20px",
                                    width: "fit-content",
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    fontSize: "0.6rem",
                                  }}
                                >
                                  {value.reviewCount > 0 ? (
                                    <span
                                      style={{
                                        color: "#F4C025",
                                        fontSize: "0.7rem",
                                      }}
                                    >
                                      {isLikedValue(
                                        value.reviewCount,
                                        value.likeCount
                                      )}
                                    </span>
                                  ) : (
                                    <>리뷰가 없습니다.</>
                                  )}
                                </div>
                                <div className="d-text" style={{}}>
                                  <div
                                    className="css-1e8ix6x2"
                                    style={{
                                      color: "white",
                                      fontWeight: "500",
                                      backgroundColor: "rgba(30, 30, 30, 0.4)",
                                      width: "100%",
                                      paddingLeft: "0.7rem",
                                      borderRadius: "10px",
                                    }}
                                  >
                                    {value.name}
                                  </div>
                                  {value.discount > 0 ? (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          fontSize: "0.9rem",
                                          color: "white",
                                        }}
                                      >
                                        Price{" "}
                                        <del
                                          style={{
                                            fontSize: "0.9rem",
                                            color: "gray",
                                          }}
                                        >
                                          {value.price.toLocaleString()}
                                        </del>
                                        <span className="price">
                                          {value.finalPrice.toLocaleString()} 원
                                        </span>
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      <p
                                        className="d-price"
                                        style={{
                                          fontSize: "0.9rem",
                                          color: "white",
                                        }}
                                      >
                                        Price{" "}
                                        <span
                                          className="price"
                                          style={{ backgroundColor: "" }}
                                        >
                                          {value.price > 0
                                            ? value.price.toLocaleString() +
                                              " 원"
                                            : `무료`}
                                        </span>
                                      </p>
                                    </>
                                  )}

                                  <Link
                                    className="btn-main btn-fullwidth"
                                    to={`/game-detail/${value.pid}`}
                                  >
                                    Order Now
                                  </Link>
                                </div>
                              </div>
                              <img
                                src={value.imgUrl}
                                className="img-fluid"
                                alt=""
                                style={{ height: "10rem" }}
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}
              </div>

              {/* 사이드 바 */}

              <div
                id="sidebar"
                className="col-md-3"
                style={{
                  marginTop: "3rem",
                  backgroundColor: "rgba(30, 30, 30, 0.3)",
                  paddingTop: "1.5rem",
                }}
              >
                {/* 장바구니 버튼 -> 삼항 - true false {장바구니 담기&& 장바구니 제거 } */}

                {/* 게임 이름 검색 */}
                <div className="widget mb-1">
                  <h4>게임 이름</h4>
                  <div className="small-border" style={{ width: "100%" }}></div>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={searchName}
                      onChange={onChangeSearchName}
                      style={{
                        height: "2.5rem",
                        backgroundColor: "rgba(255, 255, 255, .1)",
                        borderColor: "rgba(255, 255, 255, .1)",
                        color: "white",
                        width: "60%",
                      }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary overflow-hidden"
                        type="button"
                        onClick={searchByTagName}
                        style={{
                          height: "2.5rem",
                          width: "5rem",
                          borderColor: "rgba(255, 255, 255, .1)",
                          color: "grey",
                        }}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </div>
                {/* 게임 이름 검색 끝*/}

                {/* 게임 태그(카테고리, 종류, 타입) 시작 */}
                <div className="widget mb-1">
                  <h4>태그별 검색</h4>
                  <div className="small-border" style={{ width: "100%" }}></div>
                  <div>
                    <ul
                      // className="float-end float-sm-start wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      <li>
                        {tag == "" ? (
                          <>
                            <span
                              className="material-symbols-outlined"
                              style={{
                                fontSize: "1.1rem",
                                color: "#6a79fa",
                                fontWeight: "750",
                              }}
                            >
                              check
                            </span>
                            <a
                              onClick={() => tagChange(1, "")}
                              style={{
                                color: "#6a79fa",
                                marginLeft: "0.5rem",
                                fontWeight: "750",
                                cursor: "pointer",
                              }}
                            >
                              All Games
                            </a>
                          </>
                        ) : (
                          <a
                            onClick={() => tagChange(1, "")}
                            style={{
                              color: "white",
                              marginLeft: "0.3rem",
                              cursor: "pointer",
                            }}
                          >
                            All Games
                          </a>
                        )}
                      </li>
                      {productList2 &&
                        productList2
                          .filter(
                            (element, index, callback) =>
                              index ===
                              callback.findIndex((tag) => tag === element)
                          )
                          .filter((value: any, index) => value != "무료")
                          .map((value, index) => (
                            <li key={index}>
                              {tag == value ? (
                                <>
                                  <span
                                    className="material-symbols-outlined"
                                    style={{
                                      fontSize: "1.1rem",
                                      color: "#6a79fa",
                                      fontWeight: "750",
                                    }}
                                  >
                                    check
                                  </span>

                                  {value == null ? (
                                    <a
                                      onClick={() => tagChange(1, value)}
                                      style={{
                                        color: "#6a79fa",
                                        marginLeft: "0.5rem",
                                        fontWeight: "750",
                                        cursor: "pointer",
                                      }}
                                    >
                                      기타
                                    </a>
                                  ) : (
                                    <a
                                      onClick={() => tagChange(1, value)}
                                      style={{
                                        color: "#6a79fa",
                                        marginLeft: "0.5rem",
                                        fontWeight: "750",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {value}
                                    </a>
                                  )}
                                </>
                              ) : (
                                <>
                                  {value == null ? (
                                    <a
                                      onClick={() => tagChange(1, value)}
                                      style={{
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                    >
                                      기타
                                    </a>
                                  ) : (
                                    <a
                                      onClick={() => tagChange(1, value)}
                                      style={{
                                        color: "white",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {value}
                                    </a>
                                  )}
                                </>
                              )}
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
                {/* 게임 태그(카테고리, 종류, 타입) 끝 */}

                {/* 가격별 검색 */}
                <div className="widget mb-1">
                  <h4>가격별 검색</h4>
                  <div className="small-border" style={{ width: "100%" }}></div>

                  <ul
                    // className="float-end float-sm-start wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    <li>
                      {maxPrice == 800000 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(0, 800000)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            전체 가격
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(0, 800000)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          전체 가격
                        </a>
                      )}
                    </li>

                    <li style={{ width: "100%", alignItems: "center" }}>
                      {maxPrice == 5000 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(0, 5000)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            ~ 5,000￦
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(0, 5000)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          ~ 5,000￦
                        </a>
                      )}
                    </li>
                    <li>
                      {maxPrice == 10000 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(5001, 10000)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            5,000￦ &nbsp;~ &nbsp;10,000￦
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(5001, 10000)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          5,000￦ &nbsp;~ &nbsp;10,000￦
                        </a>
                      )}
                    </li>

                    <li>
                      {maxPrice == 30000 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(10001, 30000)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            10,000￦ ~ 30,000￦
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(10001, 30000)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          10,000￦ ~ 30,000￦
                        </a>
                      )}
                    </li>

                    <li>
                      {maxPrice == 50000 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(30001, 50000)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            30,000￦ ~ 50,000￦
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(30001, 50000)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          30,000￦ ~ 50,000￦
                        </a>
                      )}
                    </li>

                    <li>
                      {minPrice == 50000 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(50000, 1000000)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            50000￦ 이상
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(50000, 1000000)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          50000￦ 이상
                        </a>
                      )}
                    </li>

                    <li>
                      {maxPrice == 0 ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changePriceTag(0, 0)}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              fontWeight: "750",
                              cursor: "pointer",
                            }}
                          >
                            무료 게임
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changePriceTag(0, 0)}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          무료 게임
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
                {/* 가격별 검색 끝 */}

                {/* 리뷰 평가 순 정렬 */}
                <div className="widget mb-1">
                  <h4>리뷰 평가 검색</h4>
                  <div className="small-border" style={{ width: "100%" }}></div>
                  <ul
                    // className="float-end float-sm-start wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    <li>
                      {isLikedOrder == "DESC" ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changeReviewLiked("DESC")}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              cursor: "pointer",
                            }}
                          >
                            리뷰 좋은 순
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changeReviewLiked("DESC")}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          리뷰 좋은 순
                        </a>
                      )}
                    </li>

                    <li>
                      {isLikedOrder == "ASC" ? (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontSize: "1.1rem",
                              color: "#6a79fa",
                              fontWeight: "750",
                            }}
                          >
                            check
                          </span>
                          <a
                            onClick={() => changeReviewLiked("ASC")}
                            style={{
                              color: "#6a79fa",
                              marginLeft: "0.5rem",
                              cursor: "pointer",
                            }}
                          >
                            리뷰 나쁜 순
                          </a>
                        </>
                      ) : (
                        <a
                          onClick={() => changeReviewLiked("ASC")}
                          style={{
                            color: "white",
                            marginLeft: "0.5rem",
                            cursor: "pointer",
                          }}
                        >
                          리뷰 나쁜 순
                        </a>
                      )}
                    </li>
                  </ul>
                </div>
                {/* 리뷰 평가 순 정렬 끝 */}
              </div>

              {/* 사이드 바 */}
            </div>

            <>
              {/* 페이징 모음집 시작 */}

              <>
                {" "}
                {render && (
                  <div className="container" id="paging">
                    {/* 페이징 처리 */}
                    <Pagination
                      className="pagination"
                      count={count2}
                      page={page2}
                      siblingCount={1}
                      boundaryCount={1}
                      shape="rounded"
                      onChange={handlePageChange2}
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
                  </div>
                )}
              </>
            </>
            
          </div>

          {/* 본문 끝 */}
        </section>
      </div>
    </>
  );
}

export default Games;
