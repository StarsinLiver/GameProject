import React, { useEffect, useState } from "react";
import ISteamList from "../../../types/steam/ISteamList";
import ISteam from "../../../types/steam/ISteam";
import TestOpenApiService from "../../../services/steam/SteamOpenApiService";
import Pagination from "@mui/material/Pagination";
import IProduct from "../../../types/IProduct";
import AdminProductService from "../../../services/admin/AdminProductService";
import designesis from "../../../assets/js/designesia";
import { Link } from "react-router-dom";
import ThumbNailService from "../../../services/product/ThumbNailService";
import { ToastContainer, toast } from "react-toastify";

function AdminControllPenal() {
  useEffect(() => {
    designesis();
  }, []);
  // TODO: 변수 정의
  //  TODO : open api 전체 조회
  let [steamList, setSteamList] = useState<Array<ISteamList>>([]);
  let [render, setRender] = useState<boolean>(false);
  let [steam, setSteam] = useState<ISteam>();
  // Todo : 할인율
  let [discount, setDiscount] = useState<any>(0);
  // 검색어 변수
  const [searchName, setSearchName] = useState<string>("");

  // TODO : 공통 변수(필수) : page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열 : 1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호        : 최초값 1
  const [count, setCount] = useState<number>(1); // 총페이지 건수         : 최초값 1
  const [pageSize, setPageSize] = useState<number>(10); // 1페이지당 개수 : 최초값 20

  //  검색어 수동 바인딩
  const onChangeSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchName = e.target.value;
    setSearchName(searchName);

    const pageCount = Math.floor(
      steamList.filter(
        (value) =>
          value.name.toUpperCase().indexOf(e.target.value.toUpperCase()) != -1
      ).length / pageSize
    );
    setCount(pageCount);
  };

  // Todo : 파일
  const [selectedFiles, setSelectedFiles] = useState<FileList>();

  // TODO: 함수 정의
  // TODO : Pagenation 수동 바인딩
  // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };
  // Todo : 함수 정의
  useEffect(() => {
    // todo : 첫번째 실행
    reteiveSteamAll();
  }, [render]);

  // todo : 첫번째 실행
  const reteiveSteamAll = () => {
    TestOpenApiService.findAll()
      .then((response: any) => {

        const { apps } = response.data.applist;

        // Todo : 검색 결과 제한
        setSteamList(apps.slice(50, 10000)); // name 과 appid

        // Todo : 페이징 처리
        setCount(Math.ceil(steamList.length / pageSize));
        setRender(true);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // Todo : 상세조회
  const onClickButton = (appid: any) => {
    TestOpenApiService.findById(appid)
      .then((response: any) => {
        let data = response.data[`${appid}`].data;
        setSteam(data);
        setDiscount(0);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // Todo : 할인율 수동 바인딩
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (discount >= 0 && discount <= 100) {
      setDiscount(event.target.value);
    }
  };

  //  Todo : 상품 등록
  const onClickRegistration = (appid: number) => {
    if (selectedFiles?.[0] == null) {
      uploadProduct(appid, null);
    } else {
      upload(appid);
    }
  };

  const uploadProduct = (appid: number, uuid: any) => {
    // Todo : 상품 등록
    let data: IProduct = {
      pid: appid,
      name: steam?.name,
      shortDescription: steam?.short_description,
      imgUrl: steam?.header_image,
      price: steam?.price_overview
        ? Math.ceil(((steam?.price_overview[`final`] / 100) * 1300) / 100) * 100
        : 0,
      finalPrice: steam?.price_overview
        ? Math.ceil(((steam?.price_overview[`final`] / 100) * 1300) / 100) *
          100 *
          ((100 - discount) / 100)
        : 0,
      tag: steam?.genres ? steam?.genres[0].description : "",
      discount: discount,
      uuid: uuid,
    };

    AdminProductService.create(data)
      .then((response: any) => {
        toastMessage("상품이 등록되었습니다.");
        setSelectedFiles(undefined);
        setDiscount(0);
      })
      .catch((e: Error) => {
        if ("Request failed with status code 400" == e.message) {
          toastMessage("이미 상품이 등록 되어 있습니다.");
        } else {
          toastMessage("서버 에러가 발생하였습니다. 개발자에게 문의해주세요");
        }
        console.log(e);
      });
  };

  const selectFile = (event: any) => {
    // 화면에서 이미지 선택시 저장된 객체 : event.target.files
    // 변수명 as 타입명 : 개발자가 변수가 무조건 특정타입이라고 보증함
    //                   (타입스크립트에서 체크 안함)
    setSelectedFiles(event.target.files as FileList);
  };

  // Todo : 이미지 저장 함수
  const upload = (appid: number) => {
    // 선택된 이미지 파일 배열변수
    // 변수명? = 옵셔널체이닝, 변수의 값이 null이면 undefined 바꾸어줌
    let currentFile = selectedFiles?.[0]; // 첫번째 선택된 파일

    ThumbNailService.upload(appid, currentFile) // 저장 요청
      .then((response: any) => {
        uploadProduct(appid, response.data);
      })
      .catch((e: Error) => {
        if ("Request failed with status code 400" == e.message) {
          toastMessage("이미 상품이 등록 되어 있습니다.");
        } else {
          toastMessage("서버 에러가 발생하였습니다. 개발자에게 문의해주세요");
        }
        console.log(e);
      });
  };

  const toastMessage = (message: string) => {
    toast.info(
      <div>
        <div>{message}</div>
        <div style={{ whiteSpace: "pre-line" }}>{steam?.name}</div>
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
      {!render && (
        <>
          {/* <!-- page preloader begin --> */}
          <div id="de-loader"></div>
          {/* <!-- page preloader close --> */}
        </>
      )}
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
                  상품 등록 페이지
                </h2>
              </div>
            </div>
          </div>
          {/* 검색어 입력창 시작 */}
          <div className="row mt-5 justify-content-center">
            {/* w-50 : 크기 조정, mx-auto : 중앙정렬(margin: 0 auto), justify-content-center */}
            <div className="col-12 w-50 input-group mb-3" id="form_sb">
              <input
                type="text"
                className="form-control"
                placeholder="게임 이름을 입력해 주세요"
                value={searchName}
                onChange={onChangeSearchName}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-primary overflow-hidden"
                  type="button"
                  style={{ height: "49px", width: "80px" }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* 검색어 입력창 끝 */}
        </section>
        {/* <!-- 목차 section 끝 --> */}
        <section className="no-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center wow fadeInUp">
                <div className="switch-set">
                  <div className="spacer-20"></div>
                </div>
              </div>
              {/* 관리용 테이블(+콜랩스) 시작 */}
              <div className="col-md-12">
                <table className="table table-pricing dark-style text-center">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col" style={{ paddingLeft: "80px" }}>
                        게임 이름
                      </th>
                      {/* 이 이부분은 전체 조회때 안나옵니다. */}
                      <th>상품 상세 페이지 바로가기</th>
                      <th>상품 등록 관리</th>
                    </tr>
                  </thead>
                  {/* 관리용 테이블(내용) 반복문 시작 */}
                  <tbody id="my-accordion">
                    {render &&
                      steamList
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("sex".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("hentai".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("girl".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("demo".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("soundtrack".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("illust".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("pack".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("bgm".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("dlc".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("bonus".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("sticker set".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("gesture".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Pendant:".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("MHW:".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Costume".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Wings of Ruin".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("The Handler's ".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("face Paint: ".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Hairstyle".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Voucher".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Bundle".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("armor piece".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("layered armor".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("layered weapon".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Deluxe Kit".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("Cohoot outfit".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("hunter voice".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("face paint".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("pose set".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()
                              .indexOf("makeup".toUpperCase()) == -1
                        )
                        .filter(
                          (value) =>
                            value.name
                              .toUpperCase()

                              .indexOf(searchName.toUpperCase()) != -1
                        )
                        .map((value, index) => (
                          <>
                            <tr key={index} style={{ height: "100px" }}>
                              <th>{value.appid}</th>
                              <td
                                className="d-spc"
                                style={{ width: "300px", paddingLeft: "80px" }}
                              >
                                {value.name}
                              </td>

                              {/* 콜랩스 부모 */}
                              <td>
                                <Link
                                  to={`/control-panel/${value.appid}`}
                                  className="btn-main opt-1"
                                >
                                  상품 상세 페이지 바로가기
                                </Link>
                              </td>
                              <td
                                className="accordion-header"
                                id={"heading" + index}
                              >
                                <a
                                  data-bs-toggle="collapse"
                                  data-bs-target={"#collapse" + index}
                                  role="button"
                                  aria-expanded="false"
                                  aria-controls={"collapse" + index}
                                  className="btn-main opt-1"
                                  onClick={() => onClickButton(value.appid)}
                                >
                                  상품 등록 관리
                                </a>
                              </td>
                            </tr>
                            {/* steam details 시작 */}
                            <tr>
                              <td
                                colSpan={5}
                                style={{ padding: "10px 0 10px 0" }}
                              >
                                {/* 콜랩스 자식 */}
                                <div
                                  className="accordion-collapse collapse"
                                  id={"collapse" + index}
                                  aria-labelledby={"heading" + index}
                                  data-bs-parent="#my-accordion"
                                >
                                  <div className="my-card card-body">
                                    <table className="table table-pricing dark-style text-center">
                                      <thead>
                                        <tr style={{ height: "60px" }}>
                                          <td
                                            style={{
                                              padding: "0 0 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            게임 사진
                                          </td>

                                          <td
                                            style={{
                                              padding: "0 0 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            게임 설명{" "}
                                          </td>
                                          <td
                                            style={{
                                              padding: "0 0 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            가격{" "}
                                          </td>
                                          <td
                                            style={{
                                              padding: "0 0 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            장르
                                          </td>
                                          <td
                                            style={{
                                              padding: "0 30px 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            할인율{" "}
                                          </td>
                                          <td
                                            style={{
                                              padding: "0 0 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            이미지 등록{" "}
                                          </td>
                                          <td
                                            style={{
                                              padding: "0 0 0 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            등록
                                          </td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr style={{ height: "100px" }}>
                                          {/* 이미지 시작 */}
                                          <td
                                            style={{
                                              padding: "10px 0 10px 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            <img
                                              src={
                                                steam?.header_image &&
                                                steam?.header_image
                                              }
                                              style={{
                                                width: "180px",
                                                borderRadius: "15px",
                                              }}
                                            ></img>
                                          </td>
                                          {/* 이미지 끝 */}

                                          {/* 짧은 설명 시작 */}
                                          <td
                                            style={{
                                              width: "250px",
                                              padding: "10px 0 10px 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            {steam?.short_description &&
                                              steam?.short_description}
                                          </td>
                                          {/* 짧은 설명 끝 */}
                                          {/* 가격 시작 */}
                                          {steam?.price_overview ? (
                                            <td
                                              style={{
                                                padding: "10px 10px 10px 20px",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              {Math.ceil(
                                                ((steam?.price_overview[
                                                  `final`
                                                ] /
                                                  100) *
                                                  1300) /
                                                  100
                                              ) * 100}{" "}
                                              원
                                            </td>
                                          ) : (
                                            <td
                                              style={{
                                                padding: "10px 10px 10px 20px",
                                                verticalAlign: "middle",
                                              }}
                                            >
                                              가격 없음
                                            </td>
                                          )}
                                          {/* 가격 끝 */}
                                          {/* 장르 시작 */}
                                          <td
                                            style={{
                                              padding: "10px 20px 10px 20px",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {" "}
                                            {steam?.genres &&
                                              steam?.genres[0].description}{" "}
                                          </td>
                                          {/* 장르 끝 */}
                                          {/* 할인율 시작 */}
                                          <td
                                            style={{
                                              padding: "10px 0 10px 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            {steam?.price_overview &&
                                            steam.price_overview[`final`] >
                                              0 ? (
                                              <>
                                                {" "}
                                                <input
                                                  style={{
                                                    width: "70px",
                                                  }}
                                                  type="number"
                                                  id="discount"
                                                  required
                                                  className={`form-control ms-3`}
                                                  value={discount}
                                                  onChange={handleInputChange}
                                                  placeholder="unitPrice"
                                                  name="discount"
                                                />
                                              </>
                                            ) : (
                                              <>
                                                {" "}
                                                <input
                                                  style={{
                                                    width: "70px",
                                                  }}
                                                  type="number"
                                                  id="discount"
                                                  required
                                                  className={`form-control ms-3`}
                                                  value={discount}
                                                  onChange={handleInputChange}
                                                  placeholder="unitPrice"
                                                  disabled
                                                  name="discount"
                                                />
                                              </>
                                            )}
                                          </td>
                                          {/* 할인율 끝 */}
                                          {/* upload 선택상자/버튼 start */}
                                          <td
                                            style={{
                                              padding: "10px 0 10px 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            <div className="input-group">
                                              <input
                                                type="file"
                                                className="form-control"
                                                id="inputGroupFile02"
                                                style={{
                                                  width: "140px",
                                                  fontSize: "13px",
                                                }}
                                                onChange={selectFile}
                                              />
                                            </div>
                                          </td>
                                          {/* upload 선택상자/버튼 end */}
                                          {/* 등록 버튼 */}
                                          <td
                                            style={{
                                              padding: "10px 0 10px 0",
                                              verticalAlign: "middle",
                                            }}
                                          >
                                            <button
                                              className="btn-main opt-1"
                                              onClick={() =>
                                                onClickRegistration(value.appid)
                                              }
                                            >
                                              상품 등록
                                            </button>
                                          </td>
                                          {/* 등록버튼 끝 */}
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </>
                        ))
                        .slice((page - 1) * pageSize, page * pageSize)}
                  </tbody>
                  {/* 관리용 테이블(내용) 반복문 끝 */}
                </table>
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

        {/* < -- 2번째 섹션 : Premium Game Server 시작 -- > */}
        <section className="no-bottom">
          <div className="container pb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="subtitle wow fadeInUp mb-3">
                  Incredibly features
                </div>
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  프리미엄 게임 서버
                </h2>
              </div>

              <div className="col-lg-6"></div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay="0s"
              >
                <div>
                  <img src="images/icons/1.png" className="mb20" alt="" />
                  <h4>Super Quick Setup</h4>
                  <p>다른 웹 사이트보다 훨신 빠른 게임 설정이 가능합니다.</p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay=".2s"
              >
                <div>
                  <img src="images/icons/2.png" className="mb20" alt="" />
                  <h4>Premium Hardware</h4>
                  <p>저희 서버에서는 프리미엄 하드웨어를 제공합니다.</p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay=".4s"
              >
                <div>
                  <img src="images/icons/3.png" className="mb20" alt="" />
                  <h4>DDos Protection</h4>
                  <p>어떠한 디도스 공격에도 막아낼 수 있습니다.</p>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6 mb-sm-20 wow fadeInRight"
                data-wow-delay=".6s"
              >
                <div>
                  <img src="images/icons/4.png" className="mb20" alt="" />
                  <h4>Fast Support</h4>
                  <p>
                    24시간 대기 하고있는 상담원을 빠른 서포트 기능을 만나보세요!
                  </p>
                </div>
              </div>
            </div>
          </div>
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
        </section>
        {/* < -- 2번째 섹션 : Premium Game Server 종료 -- > */}
      </div>
    </>
  );
}

export default AdminControllPenal;
