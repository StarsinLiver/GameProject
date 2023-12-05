import React, { useEffect, useState } from "react";
import designesis from "../../../assets/js/designesia";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import IUser from "../../../types/auth/IUser";
import IQna from "../../../types/IQna";
import { Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth/AuthService";
import AdminProductService from "../../../services/admin/AdminProductService";
import IProduct from "../../../types/IProduct";
import ILibrary from "../../../types/ILibrary";
import { logout } from "../../../store/slices/auth";
import { ToastContainer, toast } from "react-toastify";

function AdminLibrary() {
  // Todo : 공유 저장소 변수(state.변수명) 가져오기
  // Todo : 사용법 : useSelector((state) => {state.변수명})
  // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
  const { user } = useSelector((state: RootState) => state.auth);

  // Todo : 공유저장소 함수 가져오기
  // Todo : 불러오기    : useAppDispatch()
  // Todo : 함수 사용법 : dispatch(함수명)
  // Todo : 함수 사용법 : dispatch(login) , dispatch(logout)
  const dispatch = useAppDispatch();

  useEffect(() => {
    designesis();
  }, []);

  // TODO: 변수 정의
  // todo: adminProductList 배열 변수
  let [adminProductList, setAdminProductList] = useState<Array<IProduct>>([]);
  // 태그
  let [tag, setTag] = useState<Array<string>>([]);
  // 페이지 이동
  let navigate = useNavigate();
  // disable
  const [disable, setDisable] = React.useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // todo: adminLibraryList 배열 변수 (환불관리용)
  let [adminLibraryListRefundNo, setAdminLibraryListRefundNo] = useState<
    Array<ILibrary>
  >([]);
  let [adminLibraryListRefundOk, setAdminLibraryListRefundOk] = useState<
    Array<ILibrary>
  >([]);
  const [isPasswordChangButton, setIsPasswordChangeButton] =
    useState<boolean>(false);
  const [isPasswordRight, setIsPasswordRight] = useState<boolean>(false);

  // TODO: 할인율 수정할 adminProduct 변수
  // initialAdminProduct 객체 초기화
  const initialAdminProduct = {
    pid: "",
    name: "",
    shortDescription: "",
    imgUrl: "",
    price: 0,
    finalPrice: 0,
    tag: "",
    discount: 0,
    uuid: "",
  };

  const initalUser = {
    userId: null,
    name: "",
    email: "",
    password: "",
    description: "",
    insertTime: "",
    role: "",
    point: 0,
  };

  // todo: 상품 변수
  const [adminProduct, setAdminProduct] =
    useState<IProduct>(initialAdminProduct);

  // todo: qna 배열 변수
  let [qnaList, setQnaList] = useState<Array<IQna>>([]);

  const [userDto, setUserDto] = useState<IUser>(initalUser);

  const [userUpdate, setShowUserUpadte] = useState(false);

  const [repassword, setRepassword] = useState<string>("");

  const [resetPassword, setResetPassword] = useState<string>("");

  // todo: 화면에 수정 성공에 메세지 찍기 변수
  const [message, setMessage] = useState<string>("");

  // (안쓰는데 함수 고치기 귀찮아서 넣어놓음 1)
  const [searchName, setSearchName] = useState<string>("");
  // (안쓰는데 함수 고치기 귀찮아서 넣어놓음 2)
  const [selectBox, setSelectBox] = useState<string>("");
  // (안쓰는데 함수 고치기 귀찮아서 넣어놓음 3)
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  // TODO : 공통 변수(필수) : page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열 : 1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호        : 최초값 1
  const [count, setCount] = useState<number>(1); // 총페이지 건수         : 최초값 1
  const [pageSize, setPageSize] = useState<number>(6); // 1페이지당 개수 : 최초값 20

  // TODO: 함수 정의
  // TODO : Pagenation 수동 바인딩
  // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  // todo : 상품(페이징), QnA(페이징 x), 환불 요청(페이징 x) 목록 전체조회 useEffect
  useEffect(() => {
    retrieveAdminEverything();
  }, [page, pageSize]);

  // todo : 상품(페이징), QnA(페이징 x), 환불 요청(페이징 x) 목록 전체조회 함수
  const retrieveAdminEverything = () => {
    AdminProductService.getAllByTagQnaRefund(
      user?.userId,
      searchName,
      selectBox,
      searchKeyword,
      page - 1,
      pageSize
    )
      .then((response: any) => {
        const { product, libraryNoPage, tag, qnaList, userDto, totalPages } =
          response.data;
        setAdminProductList(product);
        setTag(tag);
        setQnaList(qnaList);
        setAdminLibraryListRefundNo(libraryNoPage);
        setCount(totalPages);
        setUserDto(userDto);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // todo: 상품 상세 조회 함수
  const getAdminProduct = (pid: string) => {
    AdminProductService.get(pid) // 벡엔드로 상세조회 요청
      .then((response: any) => {
        setAdminProduct(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // Todo : 할인율 수동 바인딩
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    if (value >= 0) {
      setAdminProduct({ ...adminProduct, [name]: value });
    }
  };

  // todo: 할인율 수정 버튼 온클릭 함수
  const updateProductDiscount = () => {
    let data = {
      pid: adminProduct.pid,
      name: adminProduct.name,
      shortDescription: adminProduct.shortDescription,
      imgUrl: adminProduct.imgUrl,
      price: adminProduct.price,
      finalPrice:
        Math.ceil(
          adminProduct.price * ((100 - adminProduct.discount) / 10000)
        ) * 100,
      tag: adminProduct.tag,
      discount: adminProduct.discount,
      uuid: adminProduct.uuid,
    };

    AdminProductService.update(data.pid, data) // 백엔드로 수정 요청
      .then((response: any) => {
        toastMessage("상품 할인율이 수정되었습니다.");
        retrieveAdminEverything();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // todo: 상품 삭제 버튼 온클릭 함수
  const deleteProduct = () => {
    AdminProductService.remove(adminProduct.pid) // 벡엔드로 삭제요청
      .then((response: any) => {
        toastMessage("상품이 삭제되었습니다.");
        retrieveAdminEverything();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const handleUserUpdateButtonClick = () => {
    userUpdate ? setShowUserUpadte(false) : setShowUserUpadte(true);
  };

  const inputChange = (e: any) => {
    const { name, value } = e.target;
    setUserDto({ ...userDto, [name]: value });
  };

  const inputChangeRepassword = (e: any) => {
    setRepassword(e.target.value);
  };

  const inputChnageResetPassword = (e: any) => {
    setResetPassword(e.target.value);
  };

  // Todo : 유저 수정 함수
  const handleRegisterUpdate = () => {
    if (isPasswordChangButton === false) {
      const data: IUser = {
        userId: userDto.userId,
        email: userDto.email, // == email : email (생략 가능)
        password: userDto.password, // == password : password
        name: userDto.name, // 유저 이름
        description: userDto.description,
        insertTime: userDto.insertTime,
        role: userDto.role, // 권한
        point: userDto.point,
      };
      update(data);
    }

    if (resetPassword === repassword && isPasswordChangButton === true) {
      const data: IUser = {
        userId: userDto.userId,
        email: userDto.email, // == email : email (생략 가능)
        password: resetPassword, // == password : password
        name: userDto.name, // 유저 이름
        description: userDto.description,
        insertTime: userDto.insertTime,
        role: userDto.role, // 권한
        point: userDto.point,
      };
      update(data);
    } else if (resetPassword != repassword) {
      toastMessage("패스워드가 맞지않습니다. 다시 한번 더 쳐주세요.");
    }
  };

  // Todo : 유저 수정 함수
  const update = (data: IUser) => {
    AuthService.update(data)
      .then((response: any) => {
        alert("회원 정보가 수정되었습니다.");
        window.location.reload();
      })
      .catch((e: Error) => {
        console.log(e);
        toastMessage("회원 정보 수정중 문제가 발생하였습니다.");
      });
  };

  // Todo : 유저 삭제 함수
  const handleWithDraw = () => {
    if (window.confirm("현 계정은 어드민계정입니다. 정말로 탈퇴를 원하십니까?")) {
      AuthService.withdraw(userDto.userId)
        .then((response: any) => {
          // Todo : 삭제와 함께 로그아웃
          dispatch(logout())
            .unwrap()
            .then(() => {
              alert("회원 정보가 삭제되었습니다.");
              navigate("/login");
            })
            .catch((e: any) => {
              console.log(e);
            });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  // Todo : 패스워드 바꾸기
  const onClickpasswordChangeButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    isPasswordChangButton == false
      ? setIsPasswordChangeButton(true)
      : setIsPasswordChangeButton(false);
  };

  // Todo : DB에서 패스워드가 맞는지 확인
  const onClickMatchPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let data = {
      userId: userDto.userId,
      email: userDto.email,
      password: userDto.password,
    };
    AuthService.isPassword(data)
      .then((response: any) => {
        setIsPasswordRight(response.data);
        response.data
          ? toastMessage("바꾸실 패스워드를 입력해주세요")
          : toastMessage("패스워드가 잘못되었습니다.");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const toastMessage = (title: any = null , message : any = null) => {
    toast.info(
      <div>
        <div>{title}</div>
        <div style={{ whiteSpace: "pre-line" }}>{message}</div>
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
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* <!-- 목차 section 시작 --> */}
        <section id="subheader" className="jarallax">
          <img
            src={require("../../../assets/images/background/subheader-news.webp")}
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
                  Admin PAGE
                </h2>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 목차 section 끝 --> */}

        {/* 본문 시작 */}
        <section style={{ paddingTop: "5px", margin: "0px" }}>
          <div className="container">
            <div className="row">
              {/* 본문 시작 */}
              <div className="col-md-8">
                {/* 유저 정보 시작 */}
                <div id="blog-comment">
                  <li>
                    {/* 유저 사진 */}
                    <div className="avatar">
                      <img
                        src={require("../../../assets/images/people/1.jpg")}
                        alt=""
                      />
                    </div>

                    {/* 유저 이름 */}
                    <div className="comment-info">
                      <span className="c_name">{userDto.name}</span>
                      <span className="c_date id-color">{userDto.email}</span>
                      <span className="c_reply">
                        <a href="#" onClick={handleUserUpdateButtonClick}>
                          유저 정보 수정
                        </a>
                      </span>
                      <div className="clearfix"></div>
                    </div>

                    {/* 유저 설명 : description */}
                    <div className="comment">{userDto.description}</div>
                  </li>

                  <div className="spacer-single"></div>
                </div>
                {/* 유저 정보 끝 */}
                <div className="spacer-single"></div>

                {/* 유저 정보 수정 시작 */}
                {userUpdate && (
                  <>
                    <form
                      name="contactForm"
                      id="contact_form"
                      className="form-border"
                    >
                      <h4>유저 정보 수정</h4>
                      <p>여기서 유저 정보를 수정하세요!</p>
                      {/* 비밀 번호 변경 */}
                      <div className="col-lg-6 offset-lg-8 text-center">
                        <button
                          className="btn-main color-2"
                          onClick={onClickpasswordChangeButton}
                        >
                          {isPasswordChangButton ? (
                            <>비밀번호 변경 취소</>
                          ) : (
                            <>비밀번호 변경</>
                          )}
                        </button>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Name:</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={userDto.name}
                              onChange={inputChange}
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="field-set">
                            <label>Email Address:</label>
                            <input
                              type="text"
                              name="email"
                              id="email"
                              value={userDto.email}
                              disabled
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        {isPasswordChangButton && isPasswordRight == false && (
                          <>
                            <div className="col-md-6">
                              <div className="field-set">
                                <label>enter your Password:</label>
                                <input
                                  type="text"
                                  name="password"
                                  id="password"
                                  onChange={inputChange}
                                  className={"form-control"}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 ">
                              <button
                                className="btn-main color-2"
                                style={{ marginTop: "30px", height: "45px" }}
                                onClick={onClickMatchPassword}
                              >
                                비밀번호 확인
                              </button>
                            </div>
                          </>
                        )}

                        {isPasswordRight && isPasswordChangButton && (
                          <>
                            <div className="col-md-6 ">
                              <div className="field-set">
                                <label>input your Change Password:</label>
                                <input
                                  type="text"
                                  name="password"
                                  id="password"
                                  onChange={inputChnageResetPassword}
                                  className={"form-control"}
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-set">
                                <label>Re-enter Password:</label>
                                <input
                                  type="text"
                                  name="repassword"
                                  id="repassword"
                                  onChange={inputChangeRepassword}
                                  className={"form-control"}
                                />
                              </div>
                            </div>
                          </>
                        )}

                        <div className="col-md-12">
                          <div className="field-set">
                            <label>description : </label>
                            <input
                              type="text"
                              name="description"
                              id="description"
                              value={userDto.description}
                              onChange={inputChange}
                              placeholder={"소개글"}
                              className={"form-control"}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6 offset-lg-3 text-center">
                          <div id="submit">
                            <input
                              type="button"
                              onClick={handleRegisterUpdate}
                              id="send_message"
                              value="Update Now"
                              className="btn-main color-2"
                            />

                            <input
                              type="button"
                              onClick={handleWithDraw}
                              id="send_message"
                              value="With Draw"
                              className="btn-main color-2 ms-3"
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div id="mail_success" className="success">
                            Your message has been sent successfully.
                          </div>
                          <div id="mail_fail" className="error">
                            Sorry, error occured this time sending your message.
                          </div>
                          <div className="clearfix"></div>
                        </div>

                        <div className="col-lg-6 offset-lg-3">
                          <div className="title-line">
                            Under&nbsp;line&nbsp;╰(*°▽°*)╯
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                )}
                {/* 유저 정보 수정 끝 */}

                {/* 상품 목록 시작 */}
                <section className="no-top ">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="subtitle wow fadeInUp mb-3">
                          Product List
                        </div>

                        <h2 className="wow fadeInUp" data-wow-delay=".2s">
                          판매 중인 상품들
                        </h2>
                      </div>
                    </div>

                    {/* 판매 등록된 상품리스트 시작 */}
                    <section
                      id="section-content"
                      aria-label="section"
                      style={{ padding: "20px 0 0 0" }}
                    >
                      <div
                        className="container"
                        style={{ float: "left", padding: "0 0 0 0" }}
                        id="my-collapse"
                      >
                        <div className="row g-4">
                          {adminProductList &&
                            adminProductList.map((data, index) => (
                              <>
                                <div className="col-lg-6 col-md-6" key={index}>
                                  <div
                                    className="de-item"
                                    style={{ height: "250px" }}
                                  >
                                    <div
                                      className="accordion-header post-content"
                                      id={"heading" + index}
                                    >
                                      <a
                                        data-bs-toggle="collapse"
                                        href="#"
                                        data-bs-target={"#collapse" + index}
                                        aria-expanded="false"
                                        aria-controls={"collapse" + index}
                                        onClick={() =>
                                          getAdminProduct(data.pid)
                                        }
                                      >
                                        <div className="post-image">
                                          <div className="d-tagline">
                                            <span>{data.tag}</span>
                                          </div>

                                          <img
                                            alt=""
                                            src={data.imgUrl}
                                            className="lazy"
                                          />
                                        </div>
                                      </a>
                                      <h5>{data.name}</h5>

                                      <div className="post-text">
                                        <div className="d-date"></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div
                                        className="accordion-collapse collapse"
                                        id={"collapse" + index}
                                        data-bs-parent="#my-collapse"
                                        aria-labelledby={"heading" + index}
                                      >
                                        <div className="de-box-cat">
                                          <h4 style={{ display: "inline" }}>
                                            할인율
                                          </h4>
                                          {data.price == 0 ? (
                                            <input
                                              style={{
                                                width: "70px",
                                                height: "33px",
                                                display: "inline",
                                                paddingTop: "5px",
                                                marginRight: "5px",
                                              }}
                                              type="number"
                                              id="discount"
                                              required
                                              value={adminProduct.discount}
                                              className="form-control ms-3"
                                              placeholder="unitPrice"
                                              name="discount"
                                              disabled={isDisabled}
                                            ></input>
                                          ) : (
                                            <input
                                              style={{
                                                width: "70px",
                                                height: "33px",
                                                display: "inline",
                                                paddingTop: "5px",
                                                marginRight: "5px",
                                              }}
                                              type="number"
                                              id="discount"
                                              required
                                              className="form-control ms-3"
                                              value={adminProduct.discount}
                                              onChange={handleInputChange}
                                              placeholder="unitPrice"
                                              name="discount"
                                            />
                                          )}{" "}
                                          %
                                          {data.price == 0 ? (
                                            <button
                                              className="btn-main opt-1"
                                              style={{
                                                marginLeft: "25px",
                                                fontSize: "15px",
                                                paddingTop: "5px",
                                              }}
                                              disabled={disable}
                                              onClick={() => toastMessage('해당 게임은 무료이기 때문에 할인율을 수정할수 없습니다.',data.name)}
                                            >
                                              수정 불가
                                            </button>
                                          ) : (
                                            <button
                                              className="btn-main opt-1"
                                              style={{
                                                marginLeft: "25px",
                                                fontSize: "15px",
                                                paddingTop: "5px",
                                              }}
                                              onClick={updateProductDiscount}
                                            >
                                              할인율 수정
                                            </button>
                                          )}
                                          <br />
                                          <br />
                                          {/* <h3 style={{ display: 'inline' }}>
                                                                                        정상가 &nbsp;
                                                                                    </h3>
                                                                                    <h3 style={{ display: 'inline' }}>
                                                                                        {data.price}원
                                                                                    </h3>
                                                                                    <br />
                                                                                    <h3 style={{ display: 'inline' }}>
                                                                                        판매가 &nbsp;
                                                                                    </h3> */}
                                          {data.discount > 0 ? (
                                            <>
                                              <h4 className="d-price">
                                                판매가 &nbsp;
                                                <del>{data.price} 원</del>{" "}
                                                <span
                                                  className="price"
                                                  style={{
                                                    marginLeft: "50px",
                                                    fontSize: "30px",
                                                  }}
                                                >
                                                  {data.finalPrice} 원
                                                </span>
                                              </h4>
                                            </>
                                          ) : (
                                            <>
                                              <h4 className="d-price">
                                                판매가 &nbsp;
                                                <span
                                                  className="price"
                                                  style={{
                                                    fontSize: "25px",
                                                  }}
                                                >
                                                  {data.price > 0
                                                    ? data.price + " 원"
                                                    : `무료`}
                                                </span>
                                              </h4>
                                            </>
                                          )}
                                          <button
                                            className="btn-main opt-1"
                                            onClick={deleteProduct}
                                            style={{
                                              width: "100%",
                                              marginTop: "10px",
                                            }}
                                          >
                                            Delete From ProductList
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
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
                    </section>

                    {/* 판매 등록된 상품리스트 끝 */}
                  </div>
                </section>
                {/* 상품 목록 끝 */}
              </div>

              {/* 본문 끝 */}

              {/* 사이드 바 */}
              <div id="sidebar" className="col-md-4 mt-5">
                {/* 상품 등록 페이지 이동 시작 */}
                <div className="widget widget-post">
                  <Link
                    className="btn-main float-end me-5"
                    to={"/control-panel"}
                    style={{ width: "100px" }}
                  >
                    Product
                  </Link>
                  <h4>상품 등록 내역</h4>
                  <div className="small-border"></div>
                  <ul>
                    {adminProductList &&
                      adminProductList
                        .filter((value, index) => index < 4)
                        .map((value: any, index: any) => (
                          <li key={index}>
                            <span className="date">{value.pid}</span>
                            <Link
                              to={`/game-detail/${value.pid}`}
                              style={{
                                overflow: "hidden",
                                width: "200px",
                                textOverflow: "ellipsis",
                                height: "30px",
                              }}
                            >
                              {value.name}
                            </Link>
                          </li>
                        ))}
                  </ul>
                </div>
                {/* 상품 등록 페이지 이동 끝 */}
                {/* 환불 요청 관리 시작 */}
                <div className="widget widget-post">
                  <Link
                    className="btn-main float-end me-5"
                    to={"/control-panel-refund"}
                    style={{ width: "100px" }}
                  >
                    Refund
                  </Link>
                  <h4>환불 관리</h4>
                  <div className="small-border"></div>
                  <ul>
                    {adminLibraryListRefundNo &&
                      adminLibraryListRefundNo
                        .filter((value, index) => index < 4)
                        .map((value: any, index: any) => (
                          <li key={index}>
                            <span className="date">{value.refund}</span>
                            <Link
                              to={`/control-panel-refund/${value.lid}`}
                              style={{
                                overflow: "hidden",
                                width: "200px",
                                textOverflow: "ellipsis",
                                height: "30px",
                              }}
                            >
                              {value.refundReason}
                            </Link>
                          </li>
                        ))}
                  </ul>
                </div>
                {/* 환불 요청 관리 끝 */}

                {/* QNA 시작 */}
                <div className="widget widget-post">
                  <Link
                    className="btn-main float-end me-5"
                    to={"/control-panel-qna"}
                    style={{ width: "100px" }}
                  >
                    Q & A
                  </Link>
                  <h4>Q & A 관리</h4>
                  <div className="small-border"></div>
                  <ul>
                    {qnaList &&
                      qnaList
                        .filter((value, index) => index < 4)
                        .map((value: any, index: any) => (
                          <li key={index}>
                            <span className="date">{value.answerYn}</span>
                            <Link
                              to={`/control-panel-qna/${value.qid}`}
                              style={{
                                overflow: "hidden",
                                width: "200px",
                                textOverflow: "ellipsis",
                                height: "30px",
                              }}
                            >
                              {value.question}
                            </Link>
                          </li>
                        ))}
                  </ul>
                </div>
                {/* QNA 끝 */}

                {/* 그린 아카데미 시작 */}
                <div className="widget widget-post">
                  <h4>그린컴퓨터아카데미 부산</h4>
                  <div className="small-border"></div>
                  <ul>
                    <li>
                      <span className="date">수업 날짜</span>
                      <a href="#">2023-07-24 ~ 2023-12-18</a>
                    </li>
                    <li>
                      <span className="date">프로젝트</span>
                      <a href="#">2023-11-15 ~ 2023-12-07</a>
                    </li>

                    <li>
                      <span className="date">tel</span>
                      <a href="#">051-912-1000</a>
                    </li>
                    <li>
                      <span className="date">address</span>
                      <a href="#">부산광역시 부산진구 중앙대로 688, 한춘빌딩</a>
                    </li>
                  </ul>
                </div>
                {/* 그린 아카데미 끝 */}

                {/* 위젯 시작 */}
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
                    <span>
                      <i className="fa-brands fa-tiktok fa-lg"></i>
                    </span>
                  </div>
                </div>
                {/* 위젯 끝 */}
              </div>
              {/* 사이드 바 끝 */}
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
        {/* 본문 끝 */}
      </div>
    </>
  );
}

export default AdminLibrary;
