import React, { useEffect, useState } from "react";
import customMarquee from "../../assets/js/custom-marquee";
import customSwiper2 from "../../assets/js/custom-swiper-2";
import { Link, useNavigate, useParams } from "react-router-dom";
import ISteam from "../../types/steam/ISteam";
import SteamOpenApiService from "../../services/steam/SteamOpenApiService";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CartService from "../../services/cart/CartService";
import IReview from "../../types/IReview";
import ReviewService from "../../services/review/ReviewService";
import { Pagination } from "@mui/material";
import designesis from "../../assets/js/designesia";
import LibraryService from "../../services/library/LibraryService";
import ProductService from "../../services/product/ProductService";
import IProduct from "../../types/IProduct";
import ILibrary from "../../types/ILibrary";
import ISteamNews from "../../types/steam/ISteamNews";
import "../../assets/css/gameDetail.css";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import ScrollToTop from "../../assets/js/scrollTop";

function GamesDetail() {
  // user
  const { user } = useSelector((state: RootState) => state.auth);

  // 유저권한 저장변수
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  // email 찾기(보안강화!)
  const [email, setEmail] = useState<any>(null);
  const getEmail = (userId: number) => {
    ReviewService.getEmail(user?.userId)
      .then((response: any) => {
        setEmail(response.data);

        if (review.email == null) {
          setReview(initalReview);
          setReview2(initalReview);
        }
      })
      .catch((e: Error) => {});
  };

  // 전체조회 페이지에서 전송한 기본키
  const { pid } = useParams();
  const [parentId, setParentId] = useState<number>(0);
  const use = useNavigate();
  // todo :  Pagination 수동 바인딩
  // 페이지 번호를 누르면 page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지 번호
    setPage(value);
  };
  const handlePageChange2 = (event: any, value: number) => {
    // value == 화면의 페이지 번호

    setPage2(value);
    showReviewChild(pid, parentId);
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

  const initalProduct = {
    pid: null,
    name: "",
    shortDescription: "",
    imgUrl: "",
    price: 0,
    finalPrice: 0,
    tag: "",
    discount: 0,
    uuid: "",
  };
  // 스팀게임 객체 저장소
  const [movies, setMovies] = useState<any>();
  let [product, setProduct] = useState<ISteam>(initalSteam);
  let [productList, setProductList] = useState<IProduct>(initalProduct);
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
      .catch((e: Error) => {});
    ProductService.get(appid)
      .then((response: any) => {
        setProductList(response.data);
      })
      .catch((e: Error) => {});
  };

  const getSteamNews = (appid: number) => {
    SteamOpenApiService.findNewsById(appid)
      .then((response: any) => {
        const newsData = response.data.appnews.newsitems;
        setSteamNews(newsData);
      })
      .catch((e: Error) => {});
  };

  useEffect(() => {
    getSteam(Number(pid));
    getSteamNews(Number(pid));
    customMarquee();
    designesis();
    customSwiper2();
    // todo : 화면 시작과 동시에 스팀에서 게임정보를 받아오는 함수 호출
  }, [render]);
  // 스팀복사 끝
  // todo 스팀 조회 끝

  // todo 카트 시작
  const [cart, setCart] = useState<boolean>(false);
  const [cid, setCid] = useState<number>(0);
  // 카트 초기화
  const initialCart = {
    cid: 0,
    userId: 0,
    pid: 0,
  };

  // 시작시 장바구니(cart) 유무 확인

  const getCart = () => {
    CartService.getCid(pid, user?.userId)
      .then((response: any) => {
        setCid(response.data);
        setCart(true);
      })
      .catch((e: Error) => {});
  };

  // cart 담기 button onclik이벤트
  const sendDater = () => {
    var data = {
      userId: user?.userId, // 유저 id
      pid: Number(pid), // pid  // 장바구니 번호
      name: user?.name,
      imgUrl: "",
      price: product.price_overview,
      discount: 0,
    };
    CartService.create(data)
      .then((response: any) => {
        toastMessage(null, "장바구니에 담겼습니다.", "/cart");
        setCart(true);
        setCid(response.data.cid);
      })
      .catch((e: Error) => {});
  };

  // 장바구니(cart) 비우기
  const cartClear = (event: any) => {
    CartService.remove(cid)
      .then(() => {
        setCart(false);
        toastMessage("장바구니에서 취소하였습니다.");
      })
      .catch(() => {});
  };

  // todo : 카트 끝

  // TODO : review 기능 시작

  /* **** review작성 기능 ****  */
  // 로그인 해야만 작성 가능한 기능

  // review 객체 초기화
  const initalReview = {
    rid: null,
    title: "",
    content: "",
    email: email,
    writer: user?.name,
    isLike: -1,
    groupId: null,
    parentId: 0,
    pid: 0,
    insertTime: null,
  };

  const initalReviewChild = {
    rid: null,
    title: "",
    content: "",
    email: email,
    writer: user?.name,
    isLike: 0,
    groupId: null,
    parentId: 0,
    pid: 0,
    insertTime: null,
  };

  // 긍정평가 - 부정평가

  // 별점?

  // // 게임 구매시에만 작성 가능
  // review 배열 변수

  // 페이징
  // todo: 공통 변수 : page(현재페이지번호), count(총페이지건수), pageSize(3,6,9 배열)
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4); // 1페이지당개수

  // todo : 댓글 페이지 처리
  const [page2, setPage2] = useState<number>(1);
  const [count2, setCount2] = useState<number>(1);
  const [pageSize2, setPageSize2] = useState<number>(4); // 1페이지당개수
  // todo: 공통 pageSizes : 배열 (셀렉트 박스 사용)

  // 전체조회된 리뷰(부모) 객체 배열
  const [reviewList, setReviewList] = useState<Array<IReview>>([]);
  // 우리가 직접 수정할 리뷰(댓글) 객체
  const [review, setReview] = useState<IReview>(initalReview);
  // 바인딩 분리
  let [review2, setReview2] = useState<IReview>(initalReview);
  // 답글 전체조회 객체 배열
  const [reviewChild, setReviewChild] = useState<Array<IReview>>([]);

  // todo : 보이는 기능
  const [show, setShow] = useState<string>("");
  // select 태그 바인딩 -> 화면값 변수 저장 (태그 검색기능 - IS_LIKE / 최신순 / 오래된 순)

  // pagenation

  // 시작시 게임의 모든 리뷰글을 불러옴

  const getReviewList = () => {
    ReviewService.getAll(Number(pid), page - 1, pageSize)
      .then((response: any) => {
        const { reviewList, totalPages } = response.data;
        setReviewList(reviewList);
        setCount(totalPages);
      })
      .catch((e: Error) => {});
  };

  // 리뷰 작성
  const createReviewParent = () => {
    const data = {
      rid: review.rid,
      title: review.title,
      content: review.content,
      email: review.email,
      writer: review.writer, // 유저 정보 들고오기
      isLike: review.isLike,
      groupId: null,
      parentId: 0,
      pid: Number(pid),
      insertTime: null,
    };
    ReviewService.createReviewParent(data)
      .then(() => {
        toastMessage("리뷰 등록 성공");
        setReview2(initalReview);
        setReview(initalReview);
        // use(`/game-detail/${pid} `);
        setHasOnDisLike(false);
        setHasOnLike(false);
        getReviewList();
      })
      .catch((e: Error) => {});
  };

  // 화면 새로고침(저장 후 저장된 객체 불러오기)

  /* **** 리뷰 상세 **** */

  // 리뷰 수정
  const updateReview = () => {
    ReviewService.update(review2.rid, review2)
      .then((response: any) => {
        toastMessage("리뷰수정 성공");
        setReview2(initalReview);
        setHasOnDisLike(false);
        setHasOnLike(false);
        getReviewList();
      })
      .catch((e: Error) => {});
  };

  // 댓글 수정
  const updateReview2 = () => {
    ReviewService.update(review2.rid, review2)
      .then((response: any) => {
        toastMessage("댓글수정 성공");
        setReview2(initalReview);
        setHasOnDisLike(false);
        setHasOnLike(false);
        showReviewChild(pid, response.data.parentId);
      })
      .catch((e: Error) => {});
  };

  // 상세조회 함수
  const getReview = (rid: string) => {
    ReviewService.get(rid) // 백엔드로 상세조회 요청

      .then((response: any) => {
        setReview2(response.data);
        if (response.data.isLike == 1) {
          setHasOnLike2(true);
          setHasOnDisLike2(false);
          review2.isLike = 1;
        } else if (response.data.isLike == 0) {
          setHasOnLike2(false);
          setHasOnDisLike2(true);
        }
      })
      .catch((e: Error) => {});
  };

  // 댓글 작성 시 작동하는 상세조회
  const getReview2 = (rid: string, title: string) => {
    ReviewService.get(rid) // 백엔드로 상세조회 요청
      .then((response: any) => {
        const data2 = {
          rid: rid,
          title: title,
          content: "",
          email: email,
          writer: user?.userId, // 유저 정보 들고오기
          isLike: review.isLike,
          groupId: null,
          parentId: 0,
          pid: Number(pid),
          insertTime: null,
        };

        setReview(data2);
      })
      .catch((e: Error) => {});
  };
  /* **** 대댓글? ***** */
  // 리뷰, 댓글  작성 바인딩 함수

  const handleReviewChange = (event: any) => {
    const { name, value } = event.target;
    setReview({ ...review, [name]: value });
  };

  // 수정 시 바인딩
  const handleReviewChange2 = (event: any) => {
    const { name, value } = event.target;
    setReview2({ ...review2, [name]: value });
  };

  // 리뷰 댓글 생성
  const createReviewChild = () => {
    const data = {
      rid: null,
      title: review.title, // 프론트엔드 에서 안보이게 처리
      content: review2.content,
      email: email,
      writer: user?.name,
      isLike: review.isLike,
      groupId: review.rid,
      parentId: review.rid,
      pid: Number(pid),
      insertTime: null,
    };

    ReviewService.createReviewChild(data)
      .then((response: any) => {
        toastMessage("댓글이 작성되었습니다.");
        setReview(initalReview);
        setReview2(initalReview);
        showReviewChild(pid, response.data.parentId);
      })
      .catch((e: Error) => {});
  };

  // TODO : 유효성 체크
  // Todo : 함수 정의
  // Todo : Formit 라이브러리 : validationSchema
  // Todo : validationSchema : 유효성 체크 규칙을 정의
  // Todo : validationSchema = Yup.object().shape({유효성 체크규칙})
  const validationSchema = Yup.object().shape({});

  // todo : 따봉 버튼 함수

  const [hasOnLike, setHasOnLike] = useState<boolean>(false);
  const [hasOnDisLike, setHasOnDisLike] = useState<boolean>(false);

  /* 긍정적 평가 버튼 */
  const onLike = () => {
    if (!hasOnDisLike) {
      setHasOnLike(true);
      review.isLike = 1;
    } else {
      setHasOnLike(true);
      setHasOnDisLike(false);
      review.isLike = 1;
    }
  };

  /* 부정적 평가 버튼 */
  const onDisLike = () => {
    if (!hasOnLike) {
      setHasOnDisLike(true);
      review.isLike = 0;
    } else {
      setHasOnLike(false);
      setHasOnDisLike(true);
      review.isLike = 0;
    }
  };
  /* 바인딩으로 나눈 긍정 부정 버튼 */
  const [hasOnLike2, setHasOnLike2] = useState<boolean>(false);
  const [hasOnDisLike2, setHasOnDisLike2] = useState<boolean>(false);

  const onLike2 = () => {
    if (!hasOnDisLike2) {
      setHasOnLike2(true);
      review2.isLike = 1;
    } else {
      setHasOnLike2(true);
      setHasOnDisLike2(false);
      review2.isLike = 1;
    }
  };

  const onDisLike2 = () => {
    if (!hasOnLike2) {
      setHasOnDisLike2(true);
      review2.isLike = 0;
    } else {
      setHasOnLike2(false);
      setHasOnDisLike2(true);
      review2.isLike = 0;
    }
  };

  // TODO : 아코디언 버튼 누르면 댓글 보여주기 함수
  const showReviewChild = (pid: any, parentId: any) => {
    ReviewService.getAllChild(Number(pid), Number(parentId))
      .then((response: any) => {
        setReviewChild(response.data);
        setRender(true);
        setParentId(parentId);
      })
      .catch((e: Error) => {});
  };

  // todo : close button 누를 때 리뷰 저장 초기화
  const initialReview2 = (event: any) => {
    setReview(initalReview);
    setReview2(initalReview);
    setHasOnDisLike(false);
    setHasOnLike(false);
  };

  // todo : 리뷰 삭제함수 만들기
  const deleteReview = (groupId: any) => {
    ReviewService.removeReviewParent(groupId)
      .then((response: any) => {
        toastMessage("삭제성공!");
        setReview(initalReview);
        getReviewList();
      })
      .catch((e: Error) => {});
  };
  // todo : 리뷰 기능 끝

  // TODO : 리뷰 댓글 삭제
  const deleteReviewChild = (rid: any, parentId: any) => {
    ReviewService.removeReviewChild(rid)
      .then((response: any) => {
        toastMessage("댓글 삭제 완료");
        getReviewList();
        showReviewChild(pid, parentId);
      })
      .catch((e: Error) => {});
  };

  // todo : 라이브러리 시작
  const initalLibrary = {
    lid: null,
    userId: user?.userId,
    pid: Number(pid),
    insertTime: "",
    finalPrice: 0,
    requestRefund: "N",
    refundReason: null,
    refund: null,
    refundTime: null,
  };
  // 시작시 라이브러리에 게임이 있는지 확인하는 변수
  const [library, setLibrary] = useState<boolean>(false);
  // 만약 게임이 무료라면 라이브러리에 바로 게임을 저장할 수 있게해주는 객체
  const [saveLibrary, setSaveLibrary] = useState<ILibrary>(initalLibrary);

  // 라이브러리에 직접 게임을 추가하는 함수
  const saveLibraryGame = () => {
    LibraryService.create(saveLibrary)
      .then((response: any) => {
        getLibarary();
      })
      .catch((e: Error) => {});
  };

  const getLibarary = () => {
    LibraryService.getLibarary(Number(pid), user?.userId)
      .then((response: any) => {
        if (response.data === true) {
          setLibrary(true);
        } else {
          setLibrary(false);
        }
      })
      .catch((e: Error) => {});
  };
  // todo : 라이브러리 끝

  // todo : 게임 평가 만들기
  const [likedValue, setLikedValue] = useState<string>("");
  const [reviewListNopage, setReviewLIstNoPage] = useState<Array<IReview>>([]);
  const [kk, setKk] = useState<boolean>(false);
  const getAllReviewNoPage = () => {
    ReviewService.getAllNoPage(Number(pid))
      .then((response: any) => {
        setReviewLIstNoPage(response.data || []);
        setKk(true);
        isLikedValue(response.data || []);
      })
      .catch((e: Error) => {});
  };
  // const [isLIke, setIsLiked] = useState<number>(0);
  // todo : 오류발생원인!!!!!!!!!!!!
  const isLikedValue = (data: any) => {
    // // setIsLiked = {review.isLike}/{reviewList};

    if (data.length == 0) {
      setLikedValue("리뷰가 없습니다.");
    } else {
      let i;
      let k = 0;
      for (i = 0; i < data.length; i++) {
        k += Number(data[i].isLike);
      }
      if (k / data.length > 0.8) {
        setLikedValue("매우 긍정적");
      } else if (k / data.length > 0.6) {
        setLikedValue("긍정적");
      } else if (k / data.length > 0.4) {
        setLikedValue("보통");
      } else if (k / data.length > 0.2) {
        setLikedValue("부정적");
      } else {
        setLikedValue("매우 부정적");
      }
    }
  };

  // todo : 화면 시작시 나타남
  useEffect(() => {
    getSteam(Number(pid));
    getSteamNews(Number(pid));
    customMarquee();
    designesis();
    customSwiper2();
    getCart();
    getLibarary();

    // todo : 화면 시작과 동시에 스팀에서 게임정보를 받아오는 함수 호출
  }, [pid]);

  useEffect(() => {
    getReviewList();
    // todo : 화면 시작과 동시에 스팀에서 게임정보를 받아오는 함수 호출
  }, [page, reviewChild]);
  useEffect(() => {
    getAllReviewNoPage();
  }, [reviewList]);

  const toastMessage = (
    title: any = null,
    message: any = null,
    link: any = "#"
  ) => {
    toast.info(
      <div>
        <Link to={link}>
          <div style={{ color: "black" }}>{title}</div>
          <div style={{ whiteSpace: "pre-line", color: "black" }}>
            {message}
          </div>
        </Link>
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
  };

  return (
    <>
      {/* <!-- content begin --> */}
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {user?.userId && review.email == null && getEmail(user.userId)}
        {product && (
          <>
            {/* 헤더 이미지 + 평점 */}
            <section id="subheader" className="jarallax">
              <div className="de-gradient-edge-bottom"></div>
              <img
                src={require("../../assets/images/background/subheader-game.webp")}
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
                        {likedValue == "매우 긍정적" && (
                          <>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </>
                        )}

                        {likedValue == "긍정적" && (
                          <>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </>
                        )}

                        {likedValue == "보통" && (
                          <>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </>
                        )}

                        {likedValue == "부정적" && (
                          <>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </>
                        )}

                        {likedValue == "매우 부정적" && (
                          <>
                            <i className="fa fa-star"></i>
                          </>
                        )}

                        {likedValue == "리뷰가 없습니다." ? (
                          <>{likedValue}</>
                        ) : (
                          <span className="d-val">
                            {" "}
                            {likedValue}평가 &nbsp;{" "}
                            <span style={{ color: "gray", fontSize: "1rem" }}>
                              {reviewListNopage.length}개의 리뷰
                            </span>
                          </span>
                        )}
                      </span>
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
                        style={{
                          backgroundColor: "black",
                          width: "100vw",
                        }}
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
                          {/* style={{borderTop:"solid 1px #6a79fa", background:"linear-gradiant(to right, #5623d8, #6a79fa)"}} */}
                          <div className="widget mb-0">
                            <div
                              className="small-border"
                              style={{ width: "100%" }}
                            ></div>
                            <h4 className="d-label mt-3">Reviews</h4>
                          </div>
                          {/* 전체조회 - map 시작 */}
                          <div
                            className="accordion accordion-flush "
                            id="accordionFlushExample"
                          >
                            {reviewList &&
                              reviewList.map((value, index) => (
                                <>
                                  <div className="row row-flex" key={index}>
                                    <div
                                      className="col-lg-12 mb30 wow fadeInRight"
                                      data-wow-delay=".2s"
                                    >
                                      {/* 리뷰 아코디언 시작 */}

                                      <div
                                        className="accordion-item pt-1"
                                        style={{
                                          backgroundColor: "#6a78fa18",
                                          borderTop: "4px solid #5623d8",
                                        }}
                                      >
                                        {/* 리뷰 - 시작 */}

                                        {/* 리뷰 목록 시작 - 아코디언 */}
                                        <div
                                          className="accordion-header "
                                          id={"flush-heading" + index}
                                          style={{ color: "white" }}
                                        >
                                          <span style={{ float: "left" }}>
                                            {/* 긍정 부정 평가 표시 시작 */}
                                            {value.isLike == 1 && (
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
                                            )}

                                            {value.isLike == 0 && (
                                              <span
                                                className="material-symbols-outlined "
                                                style={{
                                                  fontSize: `40px`,
                                                  margin: `12.5px  0px 0px 20px`,
                                                  color: `red`,
                                                }}
                                              >
                                                thumb_down
                                              </span>
                                            )}
                                            {/* 긍정 부정 평가 표시 끝 */}
                                          </span>

                                          {/* 수정/삭제 버튼 시작 */}
                                          <span
                                            className="comment-info"
                                            style={{
                                              float: `right`,
                                              marginRight: `0px`,
                                            }}
                                          >
                                            {/* 수정 버튼 시작 */}
                                            {value.email == email && (
                                              <span>
                                                <span
                                                  className=""
                                                  style={{
                                                    marginRight: `0px`,
                                                  }}
                                                >
                                                  <a
                                                    style={{
                                                      fontSize: "12px",
                                                      fontWeight: "bold",
                                                      color: "#6a79fa",
                                                    }}
                                                    href="#"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModal2"
                                                    data-bs-whatever="@mdo"
                                                    onClick={() =>
                                                      getReview(value.rid)
                                                    }
                                                  >
                                                    수정
                                                  </a>
                                                </span>

                                                <span
                                                  className="ms-3 me-3"
                                                  style={{
                                                    fontSize: "12px",
                                                    fontWeight: "light",
                                                    color: "#828282",
                                                  }}
                                                >
                                                  |
                                                </span>

                                                <span
                                                  className=""
                                                  style={{
                                                    marginRight: `20px`,
                                                  }}
                                                >
                                                  <a
                                                    style={{
                                                      fontSize: "12px",
                                                      color: "#FF0000",
                                                      fontWeight: "bold",
                                                    }}
                                                    href="#"
                                                    onClick={() =>
                                                      deleteReview(
                                                        value.groupId
                                                      )
                                                    }
                                                  >
                                                    삭제
                                                  </a>
                                                </span>
                                              </span>
                                            )}
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
                                              {value.writer}
                                            </span>
                                            {/* 유저 이름 끝 */}
                                            {/* 작성일 */}
                                            <span className="c_date id-color">
                                              {value.insertTime}
                                            </span>
                                            {/* 작성일 끝 */}
                                            &nbsp;&nbsp; |&nbsp;&nbsp;
                                            {/* 리뷰 댓글 달기 시작 */}
                                            <span className="">
                                              {value.parentId == 0 && (
                                                <a
                                                  style={{
                                                    color: "#969696",
                                                    fontSize: "13px",
                                                  }}
                                                  href="#"
                                                  data-bs-toggle="modal"
                                                  data-bs-target="#exampleModal"
                                                  data-bs-whatever="@mdo"
                                                  onClick={() =>
                                                    getReview2(
                                                      value.rid,
                                                      value.title
                                                    )
                                                  }
                                                >
                                                  댓글 달기
                                                </a>
                                              )}
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
                                            data-bs-target={
                                              "#flush-collapse" + index
                                            }
                                            aria-expanded="false"
                                            aria-controls={
                                              "flush-collapse" + index
                                            }
                                            style={{
                                              backgroundColor: "#5724d900",
                                              color: "#ffffff",
                                              fontSize: "15px",
                                              borderTop: "2px solid #757575",
                                            }}
                                            onClick={() =>
                                              showReviewChild(pid, value.rid)
                                            }
                                          >
                                            <h5>{value.title}</h5>
                                          </button>

                                          {/* 리뷰 제목 끝 */}
                                        </div>
                                        {/* 리뷰 내용 + 댓글 시작 */}
                                        <div
                                          id={"flush-collapse" + index}
                                          className="accordion-collapse collapse"
                                          aria-labelledby={
                                            "flush-heading" + index
                                          }
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
                                            {value.content}
                                          </div>

                                          {/* 리뷰 내용 끝 */}

                                          <div
                                            className=""
                                            style={{
                                              borderTop: "1px solid #5623d8",
                                            }}
                                          >
                                            {/* 리뷰 답글 시작 */}
                                            <div
                                              className=""
                                              style={{
                                                borderTop: "1px solid #5623d8",
                                              }}
                                              id="reviewReply"
                                            >
                                              <div
                                                className="scrollbarDesign"
                                                style={{
                                                  overflowY: "scroll",
                                                  maxHeight: "400px",
                                                }}
                                              >
                                                {render &&
                                                  reviewChild &&
                                                  reviewChild.map(
                                                    (value2, index) => (
                                                      /* 댓글 시작 */
                                                      <div
                                                        key={index}
                                                        className="accordion-body container col-lg-11"
                                                        style={{
                                                          backgroundColor:
                                                            "#5724d900",
                                                          color: "#FFFFFF",
                                                          borderTop: `1px solid #757575`,
                                                          width: `100%`,
                                                        }}
                                                        id="reviewReply"
                                                      >
                                                        {value2.writer}
                                                        {/* 댓글 수정 버튼 */}
                                                        {value2.email ==
                                                          email && (
                                                          <>
                                                            <span
                                                              style={{
                                                                float: "right",
                                                              }}
                                                            >
                                                              <span className="c_date id-color">
                                                                {
                                                                  value.insertTime
                                                                }
                                                              </span>

                                                              <span className="c_reply ms-5">
                                                                <a
                                                                  // className="btn btn-primary"
                                                                  data-bs-toggle="collapse"
                                                                  href={
                                                                    "#collapseExample" +
                                                                    index
                                                                  }
                                                                  role="button"
                                                                  aria-expanded="false"
                                                                  aria-controls={
                                                                    "collapseExample" +
                                                                    index
                                                                  }
                                                                  style={{
                                                                    fontSize:
                                                                      "12px",
                                                                    fontWeight:
                                                                      "bold",
                                                                    color:
                                                                      "#6a79fa",
                                                                  }}
                                                                  onClick={() =>
                                                                    getReview(
                                                                      value2.rid
                                                                    )
                                                                  }
                                                                >
                                                                  수정
                                                                </a>
                                                              </span>
                                                              {/* 댓글 수정 버튼 */}
                                                              <span
                                                                className="ms-3 me-3"
                                                                style={{
                                                                  fontSize:
                                                                    "12px",
                                                                  fontWeight:
                                                                    "light",
                                                                  color:
                                                                    "#828282",
                                                                }}
                                                              >
                                                                |
                                                              </span>
                                                              {/* 댓글 삭제 버튼 */}
                                                              <span className="c_reply">
                                                                <a
                                                                  // className="btn btn-primary"
                                                                  data-bs-toggle="collapse"
                                                                  href={"#"}
                                                                  role="button"
                                                                  style={{
                                                                    fontSize:
                                                                      "12px",
                                                                    color:
                                                                      "#FF0000",
                                                                    fontWeight:
                                                                      "bold",
                                                                  }}
                                                                  onClick={() =>
                                                                    deleteReviewChild(
                                                                      value2.rid,
                                                                      value2.parentId
                                                                    )
                                                                  }
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
                                                              id={
                                                                "collapseExample" +
                                                                index
                                                              }
                                                              data-bs-parent="#reviewReply"
                                                            >
                                                              <div className="mb-3">
                                                                <label className="col-form-label">
                                                                  댓글 수정
                                                                </label>
                                                                <textarea
                                                                  className="form-control"
                                                                  value={
                                                                    review2.content
                                                                  }
                                                                  onChange={
                                                                    handleReviewChange2
                                                                  }
                                                                  name="content"
                                                                  required
                                                                  style={{
                                                                    backgroundColor:
                                                                      "#FFFFFF",
                                                                    color:
                                                                      "black",
                                                                    height:
                                                                      "200px",
                                                                  }}
                                                                ></textarea>
                                                              </div>

                                                              <div
                                                                className=""
                                                                style={{
                                                                  float:
                                                                    "right",
                                                                }}
                                                              >
                                                                <a
                                                                  className="btn btn-secondary me-1"
                                                                  data-bs-toggle="collapse"
                                                                  href={
                                                                    "#collapseExample" +
                                                                    index
                                                                  }
                                                                  role="button"
                                                                  aria-expanded="false"
                                                                  aria-controls={
                                                                    "#collapseExample" +
                                                                    index
                                                                  }
                                                                  style={{
                                                                    height:
                                                                      "2.2rem",
                                                                    width:
                                                                      "4.5rem",
                                                                  }}
                                                                  onClick={
                                                                    initialReview2
                                                                  }
                                                                >
                                                                  Close
                                                                </a>
                                                                <a
                                                                  className="btn btn-primary"
                                                                  data-bs-toggle="collapse"
                                                                  href={
                                                                    "#collapseExample" +
                                                                    index
                                                                  }
                                                                  role="button"
                                                                  aria-expanded="false"
                                                                  aria-controls={
                                                                    "#collapseExample" +
                                                                    index
                                                                  }
                                                                  style={{
                                                                    height:
                                                                      "2.2rem",
                                                                    width:
                                                                      "9rem",
                                                                  }}
                                                                  onClick={
                                                                    updateReview2
                                                                  }
                                                                >
                                                                  Send Message
                                                                </a>
                                                              </div>
                                                            </div>
                                                            {/* 댓글 수정 양식 끝 */}
                                                          </>
                                                        )}
                                                        <br />
                                                        <div
                                                          style={{
                                                            whiteSpace: "pre",
                                                          }}
                                                        >
                                                          <br></br>
                                                          {value2.content}
                                                        </div>
                                                      </div>
                                                      /* 댓글 끝 */
                                                    )
                                                  )}
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

                                          {/* 여기 유효성 체크 */}
                                          <div className="modal-body">
                                            <form>
                                              <div className="mb-3">
                                                <label className="col-form-label">
                                                  Reply to: {review.title}
                                                </label>
                                                <textarea
                                                  className="form-control"
                                                  placeholder="댓글 작성"
                                                  value={review2.content}
                                                  onChange={handleReviewChange2}
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
                                              onClick={initialReview2}
                                            >
                                              Close
                                            </button>
                                            {review2.content == "" ? (
                                              <button
                                                type="button"
                                                className="btn btn-primary"
                                                style={{
                                                  height: "2.2rem",
                                                  width: "9rem",
                                                  background: "#6c757d",
                                                }}
                                              >
                                                Send message
                                              </button>
                                            ) : (
                                              <button
                                                type="button"
                                                className="btn btn-primary"
                                                data-bs-dismiss="modal"
                                                onClick={createReviewChild}
                                                style={{
                                                  height: "2.2rem",
                                                  width: "9rem",
                                                }}
                                              >
                                                Send message
                                              </button>
                                            )}
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
                                                      onClick={onLike2}
                                                      className="material-symbols-outlined me-5"
                                                      style={{
                                                        color: hasOnLike2
                                                          ? "#5623d8"
                                                          : "#FFFFFF",
                                                      }}
                                                      value={review2.isLike}
                                                    >
                                                      thumb_up
                                                    </li>
                                                    <li
                                                      onClick={onDisLike2}
                                                      className="material-symbols-outlined hasOffDisLike"
                                                      value={review2.isLike}
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
                                                  value={review2.title}
                                                  onChange={handleReviewChange2}
                                                  placeholder={review2.title}
                                                  name="title"
                                                />
                                                {/* 수정 내용 input */}
                                                <textarea
                                                  className="form-control"
                                                  placeholder={review2.content}
                                                  value={review2.content}
                                                  onChange={handleReviewChange2}
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
                                          <div
                                            className="modal-footer"
                                            style={{ right: "1rem" }}
                                          >
                                            <button
                                              type="button"
                                              className="btn btn-secondary"
                                              data-bs-dismiss="modal"
                                              style={{
                                                height: "2.2rem",
                                                width: "4.5rem",
                                              }}
                                              onClick={initialReview2}
                                            >
                                              Close
                                            </button>
                                            <button
                                              type="button"
                                              className="btn btn-primary"
                                              data-bs-dismiss="modal"
                                              onClick={updateReview}
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
                              ))}
                          </div>
                          {/* 리뷰 전체조회 -map 끝*/}
                          <div className="container  justify-content-center">
                            {reviewList && (
                              <div className="container text-center">
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
                            )}
                          </div>
                        </div>
                      </section>
                      {/* 리뷰 시스템 */}

                      {/* 리뷰 작성 */}
                      <section style={{ margin: "0px", padding: "0px" }}>
                        <div className="container col-lg-12 mt-5">
                          <div className="col-lg-12">
                            <div className="field-set">
                              <div className="mb-2">
                                {product.name}에 대한 리뷰 작성
                              </div>
                            </div>
                          </div>

                          {/* 따봉버튼 */}
                          <a
                            className=""
                            type="button"
                            style={{ width: "100%" }}
                          >
                            <ul
                              className="top-0 start-100"
                              style={{ float: "right" }}
                            >
                              <li
                                onClick={onLike}
                                className="material-symbols-outlined me-5"
                                style={{
                                  color: hasOnLike ? "#5623d8" : "#FFFFFF",
                                }}
                                value={review.isLike}
                              >
                                thumb_up
                              </li>
                              <li
                                onClick={onDisLike}
                                className="material-symbols-outlined hasOffDisLike"
                                value={review.isLike}
                                style={{
                                  color: hasOnDisLike ? "#5623d8" : "#FFFFFF",
                                }}
                              >
                                thumb_down
                              </li>
                            </ul>
                          </a>
                          {/* 따봉버튼 끝 */}
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
                              value={review.title}
                              onChange={handleReviewChange}
                              placeholder="Review Tittle"
                              name="title"
                              style={{
                                backgroundColor: "#212529",
                                color: "#FFFFFF",
                              }}
                            />
                            {/* 리뷰 제목 작성 끝 */}

                            {/* 리뷰 내용작성 */}
                            <textarea
                              name="content"
                              id="content"
                              className="form-control"
                              placeholder="Your Review"
                              value={review.content}
                              onChange={handleReviewChange}
                              required
                              style={{ color: "#FFFFFF" }}
                            />
                            {/* 리뷰 내용 작성 끝 */}
                          </div>

                          {user?.email && (
                            <div className="" style={{ float: "right" }}>
                              {review.isLike === -1 ||
                              review.content === "" ||
                              review.title === "" ||
                              library === false ? (
                                <button
                                  className="btn-main"
                                  style={{ background: "#828282" }}
                                >
                                  Send Review
                                </button>
                              ) : (
                                <button
                                  className="btn-main"
                                  onClick={createReviewParent}
                                >
                                  Send Review
                                </button>
                              )}
                            </div>
                          )}
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
                      {/* userRole이 ROLE_USER인 경우에만 장바구니 버튼 보임 */}

                      {userRole === "ROLE_USER" && (
                        <>
                          <h4>장바구니</h4>
                          <div className="small-border"></div>
                          {library == false ? (
                            cart == false ? (
                              <div
                                className="text-center mb-5"
                                style={{ float: "left" }}
                              >
                                <div>
                                  {productList.finalPrice == 0 ? (
                                    <div className="text-center">
                                      <button
                                        className="btn-main mb10 mt-3"
                                        onClick={saveLibraryGame}
                                        style={{
                                          display: "inline-block",
                                          paddingTop: "10px",
                                        }}
                                      >
                                        <span
                                          className="material-symbols-outlined"
                                          style={{
                                            fontSize: "1.1rem",
                                            marginRight: "0.5rem",
                                            color: "white",
                                          }}
                                        >
                                          library_add
                                        </span>
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.3rem",
                                          }}
                                        >
                                          라이브러리에 추가
                                        </span>
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <button
                                        className="btn-main mb10 mt-3"
                                        onClick={sendDater}
                                        style={{
                                          display: "inline-block",
                                          paddingTop: "10px",
                                        }}
                                      >
                                        <span
                                          className="material-symbols-outlined"
                                          style={{
                                            fontSize: "1.1rem",
                                            marginRight: "0.5rem",
                                            color: "white",
                                          }}
                                        >
                                          add_shopping_cart
                                        </span>
                                        <span
                                          style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            fontSize: "1.3rem",
                                          }}
                                        >
                                          {productList.finalPrice.toLocaleString()}
                                          ￦
                                        </span>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="">
                                <button
                                  className="btn-main mb10 mt-3"
                                  onClick={cartClear}
                                  style={{
                                    display: "inline-block",
                                    paddingTop: "10px",
                                    background: "#828282",
                                  }}
                                >
                                  <span
                                    className="material-symbols-outlined"
                                    style={{
                                      fontSize: "1.1rem",
                                      marginRight: "0.5rem",
                                      color: "white",
                                    }}
                                  >
                                    remove_shopping_cart
                                  </span>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "white",
                                      fontSize: "1.1rem",
                                    }}
                                  >
                                    장바구니에서 제거
                                  </span>
                                </button>
                              </div>
                            )
                          ) : (
                            <div> 이미 구매한 게임입니다.</div>
                          )}
                        </>
                      )}
                    </div>

                    <div
                      className="widget widget_tags"
                      style={{ clear: `both` }}
                    >
                      <h4>제작사</h4>
                      <div className="small-border"></div>
                      <div>{product.developers}</div>
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

                    <div className="widget widget-post">
                      <h4>최근 소식</h4>
                      <div className="small-border"></div>
                      <ul>
                        {steamNews.map((value: any, index: any) => (
                          <li key={index}>
                            <span>{value.author}</span>
                            <Link to={`${value.url}`} target="_blank">
                              {value.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {product.pc_requirements && (
                      <div className="widget widget-text">
                        <h4>컴퓨터 사양</h4>
                        <div className="small-border"></div>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: product.pc_requirements.minimum,
                          }}
                        />
                      </div>
                    )}

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
                  </div>
                </div>
              </div>
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
            </section>
          </>
        )}
      </div>
      {/* <!-- content close --> */}
    </>
  );
}

export default GamesDetail;
