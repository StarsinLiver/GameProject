import React, { useEffect, useState } from "react";
import designesis from "../../../assets/js/designesia";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import UserLibraryService from "../../../services/user/UserLibraryService";
import IUser from "../../../types/auth/IUser";
import ILibraryDto from "../../../types/Dto/ILibraryDto";
import IQna from "../../../types/IQna";
import { Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import AuthService from "../../../services/auth/AuthService";
import { logout } from "../../../store/slices/auth";

function UserLibrary() {
  // Todo : 공유 저장소 변수(state.변수명) 가져오기
  // Todo : 사용법 : useSelector((state) => {state.변수명})
  // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
  const { user } = useSelector((state: RootState) => state.auth);

  // Todo : 공유저장소 함수 가져오기
  // Todo : 불러오기    : useAppDispatch()
  // Todo : 함수 사용법 : dispatch(함수명)
  // Todo : 함수 사용법 : dispatch(login) , dispatch(logout)
  const dispatch = useAppDispatch();

  let navigate = useNavigate();
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

  const [userDto, setUserDto] = useState<IUser>(initalUser);
  // 패스워드 확인하고자 할때
  const [password, setPassword] = useState<string>("");
  // 변경된 패스워드 다시 치기
  const [repassword, setRepassword] = useState<string>("");
  // 변경된 패스워드
  const [resetPassword, setResetPassword] = useState<string>("");
  const [libraryDto, setLibraryDto] = useState<Array<ILibraryDto>>([]);
  const [libraryDtoNoPage, setLibraryDtoNoPage] = useState<Array<ILibraryDto>>(
    []
  );
  const [qnaList, setQnaList] = useState<Array<IQna>>([]);
  const [isPasswordChangButton, setIsPasswordChangeButton] =
    useState<boolean>(false);
  const [isPasswordRight, setIsPasswordRight] = useState<boolean>(false);

  const [IspasswordCheck, setIsPasswordCheck] = useState<boolean>(false);

  // TODO : 공통 변수(필수) : page(현재 페이지), count(총 페이지 건수) , pageSize(3,6,9 배열 : 1페이지 당 건수)
  const [page, setPage] = useState<number>(1); // 현재 페이지 번호        : 최초값 1
  const [count, setCount] = useState<number>(1); // 총페이지 건수         : 최초값 1
  const [pageSize, setPageSize] = useState<number>(12); // 1페이지당 개수 : 최초값 20

  // 변수 & 함수정의 부분
  const [showRefundButton, setShowRefundButton] = useState(false);
  const [userUpdate, setShowUserUpadte] = useState(false);

  const handleRefundButtonClick = () => {
    showRefundButton ? setShowRefundButton(false) : setShowRefundButton(true);
  };

  const handleUserUpdateButtonClick = () => {
    userUpdate ? setShowUserUpadte(false) : setShowUserUpadte(true);
  };

  // TODO: 함수 정의
  // TODO : Pagenation 수동 바인딩
  // TODO : 페이지 번호를 누르면 -> page 변수에 값 저장
  const handlePageChange = (event: any, value: number) => {
    // value == 화면의 페이지번호
    setPage(value);
  };

  useEffect(() => {
    designesis();
    if (user?.userId) reteiveUser();
  }, [page, pageSize]);

  const reteiveUser = () => {
    UserLibraryService.getAll(user?.userId, page - 1, pageSize)
      .then((response: any) => {
        const { libraryDto, libraryDtoNoPage, qnaList, userDto, totalPages } =
          response.data;
        setLibraryDto(libraryDto);
        setQnaList(qnaList);
        setUserDto(userDto);
        setCount(totalPages);
        setLibraryDtoNoPage(libraryDtoNoPage);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const inputChange = (e: any) => {
    const { name, value } = e.target;
    setUserDto({ ...userDto, [name]: value });
  };

  // 패스워드를 확인하고자 할때
  const inputChangeSetPassword = (e: any) => {
    setPassword(e.target.value);
  };

  // 변경된 패스워드 확인
  const inputChangeRepassword = (e: any) => {
    setRepassword(e.target.value);
  };

  // 변경된 패스워드
  const inputChangeResetPassword = (e: any) => {
    // Todo : 영문자 + 숫자 6자리 이상으로 정규식 체크
    const passwordCheck = /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/;
    setResetPassword(e.target.value);
    if (passwordCheck.test(e.target.value)) {
      return setIsPasswordCheck(true);
    } else {
      return setIsPasswordCheck(false);
    }
  };

  // Todo : 유저 수정 함수
  const handleRegisterUpdate = () => {
    if (!IspasswordCheck) {
      alert("영문자 + 숫자 6자리 이상으로 비밀번호를 입력해주세요");
      return;
    }

    // 패스워드 변경 버튼이 활성화가 되지 않았을때
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

    // 패스워드 변경 버튼이 활성화가 됬을때
    if (
      resetPassword === repassword &&
      isPasswordChangButton === true &&
      IspasswordCheck
    ) {
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
      alert("패스워드가 맞지않습니다. 다시 한번 확인해주세요");
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
        alert("회원 정보 수정중 문제가 발생하였습니다.");
      });
  };

  // Todo : 유저 삭제 함수
  const handleWithDraw = () => {
    if (window.confirm("확인을 누르면 회원 정보가 삭제됩니다.")) {
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
    isPasswordChangButton === false
      ? setIsPasswordChangeButton(true)
      : setIsPasswordChangeButton(false);
  };

  // Todo : DB에서 패스워드가 맞는지 확인
  const onClickMatchPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (userDto.password == null) {
      alert("카카오 또는 구글아이디는 패스워드를 수정할 수 없습니다.");
      setIsPasswordChangeButton(false);
      return;
    }

    let data = {
      userId: userDto.userId,
      email: userDto.email,
      password: password,
    };
    AuthService.isPassword(data)
      .then((response: any) => {
        setIsPasswordRight(response.data);
        response.data
          ? alert("바꾸실 패스워드를 입력해주세요")
          : alert("패스워드가 잘못되었습니다.");
        if (response.data == false) {
          setIsPasswordChangeButton(false);
        }
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  // 구매내역날짜 선택한 값이 들어간 변수
  const [selectedDateBuy, setSelectedDateBuy] = useState(new Date());

  // 구매내역 날짜이동 버튼을 누르면 날짜 이동 함수들
  const moveToPreviousMonthBuy = () => {
    const newDate = new Date(selectedDateBuy);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDateBuy(newDate);
  };

  const moveToNextMonthBuy = () => {
    const newDate = new Date(selectedDateBuy);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDateBuy(newDate);
  };

  // 환불내역날짜 선택한 값이 들어간 변수
  const [selectedDateRefund, setSelectedDateRefund] = useState(new Date());

  // 환불내역 날짜이동 버튼을 누르면 날짜 이동 함수들
  const moveToPreviousMonthRefund = () => {
    const newDate = new Date(selectedDateRefund);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDateRefund(newDate);
  };

  const moveToNextMonthRefund = () => {
    const newDate = new Date(selectedDateRefund);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDateRefund(newDate);
  };

  return (
    <>
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        {/* <!-- 목차 section 시작 --> */}
        <section id="subheader" className="jarallax">
          <img
            src={require("../../../assets/images/background/space.webp")}
            className="jarallax-img"
            alt=""
          />
          <div className="container z-1000">
            <div className="row">
              <div className="col-lg-12">
                <div className="subtitle wow fadeInUp mb-3">User</div>
              </div>
              <div className="col-lg-6">
                <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                  User PAGE
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

                        {/* 비밀번호 확인  */}
                        {isPasswordChangButton && isPasswordRight == false && (
                          <>
                            <div className="col-md-6">
                              <div className="field-set">
                                <label>enter your Password:</label>
                                <input
                                  type="text"
                                  name="password"
                                  id="password"
                                  onChange={inputChangeSetPassword}
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

                        {/* 비밀번호가 확인이 되었다면 이곳으로 */}
                        {isPasswordRight && isPasswordChangButton && (
                          <>
                            <div className="col-md-6 ">
                              <div className="field-set">
                                <label>input your Change Password:</label>
                                <input
                                  type="text"
                                  name="password"
                                  id="password"
                                  onChange={inputChangeResetPassword}
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
                {/* 라이브러리 시작 */}
                <section className="no-top ">
                  <div className="container">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="subtitle wow fadeInUp mb-3">
                          Library
                        </div>

                        <h2 className="wow fadeInUp mb20" data-wow-delay=".2s">
                          내 게임들
                        </h2>
                      </div>
                    </div>

                    {/* 유저가 가진 게임들 */}

                    <div className="row g-4 sequence">
                      {libraryDto.map((value: any, index: any) => (
                        <div
                          className="col-lg-4 col-sm-6 gallery-item"
                          key={index}
                        >
                          <div
                            className="de-item wow"
                            style={{
                              border: showRefundButton
                                ? "3px solid red"
                                : "none",
                              borderRadius: showRefundButton ? "10px" : "0",
                            }}
                          >
                            <div className="d-overlay">
                              <div className="d-text">
                                <h4>{value.pname}</h4>
                                <p className="d-price"></p>
                                {!showRefundButton && (
                                  <Link
                                    className="btn-main btn-fullwidth"
                                    to="https://store.steampowered.com/"
                                  >
                                    게임 플레이
                                  </Link>
                                )}
                                {/* 환불 버튼을 환불 상태에 따라 보이게 조건부 렌더링 */}
                                {showRefundButton && (
                                  <Link
                                    className="btn-main btn-fullwidth btn-primary"
                                    to={`/user-refund/${value.lid}`}
                                  >
                                    환불하기
                                  </Link>
                                )}
                              </div>
                            </div>
                            <img
                              src={value.imgUrl}
                              className="img-fluid"
                              alt=""
                              style={{ height: "280px" }}
                            />
                          </div>
                        </div>
                      ))}
                      <div className="container" id="paging">
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
                    </div>

                    {libraryDto[0] == null && (
                      <div className="row g-4 sequence">
                        <h3>상품이 없어요 구매하러 가시겠어요?</h3>
                        <a
                          className="btn-main float-end me-5 col-md-3"
                          href="/games"
                        >
                          게임 보러 가기
                        </a>
                      </div>
                    )}
                  </div>
                </section>
                {/* 라이브러리 끝 */}
              </div>
              {/* 본문 끝 */}

              {/* 사이드 바 */}
              <div id="sidebar" className="col-md-4 mt-5">
                {/* 나의 포인트 시작 */}
                <div className="widget widget-post">
                  <h4>나의 포인트</h4>
                  <div className="small-border"></div>
                  <ul>
                    <li>
                      <span className="date">point</span>
                      <a href="#">
                        {userDto.point && userDto.point.toLocaleString()} 원{" "}
                      </a>
                    </li>
                  </ul>
                </div>
                {/* 나의 포인트 내역 끝 */}

                {/* 최근 구입한 내역 시작 */}
                <div className="widget widget-post">
                  <a
                    type="button"
                    className="btn-main float-end me-5"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    구입 내역
                  </a>
                  <h4>최근 구입한 게임 목록</h4>
                  {/* <!-- Button trigger modal --> */}

                  <div className="small-border"></div>
                  <ul>
                    {libraryDtoNoPage
                      .filter((value, index) => index < 4)
                      .map((value: any, index: any) => (
                        <>
                          <li key={index}>
                            <span className="date w-25">{value.tag}</span>
                            <a href="#">{value.pname}</a>
                          </li>
                        </>
                      ))}
                  </ul>
                </div>

                {/* <!-- Modal --> */}
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                          {userDto.name}님의 구매내역
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className="modal-body"
                        style={{ whiteSpace: "pre", textAlign: "center" }}
                      >
                        <div
                          className="modal-body"
                          style={{
                            whiteSpace: "pre",
                            textAlign: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* 이전 월로 이동 버튼 */}
                          <button
                            onClick={moveToPreviousMonthBuy}
                            className="btn-main me-3"
                          >
                            &lt;&lt;
                          </button>

                          {/* 연도 및 월 표시 */}
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <strong>
                              {selectedDateBuy.toLocaleDateString("ko-KR", {
                                year: "numeric",
                              })}
                            </strong>
                            {selectedDateBuy.toLocaleDateString("ko-KR", {
                              month: "long",
                            })}
                          </div>

                          {/* 다음 월로 이동 버튼 */}
                          <button
                            onClick={moveToNextMonthBuy}
                            className="btn-main ms-3"
                          >
                            &gt;&gt;
                          </button>
                        </div>

                        {/* 선택된 월에 해당하는 데이터 표시 */}
                        <div
                          className="widget widget-post"
                          style={{ listStyle: "none", width: "300px" }}
                        >
                          {libraryDtoNoPage
                            .filter((value: any) => {
                              const purchaseDate = new Date(value.insertTime);
                              return (
                                purchaseDate.getMonth() ===
                                  selectedDateBuy.getMonth() &&
                                purchaseDate.getFullYear() ===
                                  selectedDateBuy.getFullYear()
                              );
                            })
                            .map((value: any, index: any) => (
                              <React.Fragment key={index}>
                                <li>
                                  <span className="date w-25">{value.tag}</span>
                                  &nbsp; 구입날짜 :{value.insertTime}&nbsp; 가격
                                  : {value.finalPrice} 원
                                  <a href="#">{value.pname}</a>
                                </li>
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn-main"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 최근 구입한 내역 끝 */}

                {/* QNA 시작 */}
                <div className="widget widget-post">
                  <Link
                    className="btn-main float-end me-5"
                    to={`/user-qna-list`}
                  >
                    Q & A
                  </Link>
                  <h4>Q & A</h4>
                  <div className="small-border"></div>
                  <ul>
                    {qnaList
                      .filter((value, index) => index < 4)
                      .map((value: any, index: any) => (
                        <li key={index}>
                          {value.answerYn === "Y" ? (
                            <span className="date">{value.answerYn}</span>
                          ) : (
                            <span
                              className=""
                              style={{
                                backgroundColor: "#e615af",
                                fontSize: "12px",
                                width: "60px",
                                display: "inline-block",
                                marginTop: "5px",
                                marginRight: "10px",
                                float: "left",
                                color: "#fff",
                                padding: "2px 3px 2px 3px",
                                lineHeight: "1.4em",
                                fontWeight: "bold",
                                textAlign: "center",
                              }}
                            >
                              {value.answerYn}
                            </span>
                          )}
                          {/* <span className="date">{value.answerYn}</span> */}
                          <Link
                            to={`/user-qna/${value.qid}`}
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

                {/* 환불 내역 시작 */}
                <div className="widget widget-post">
                  <Link
                    className="btn-main float-end me-5"
                    to={``}
                    onClick={handleRefundButtonClick}
                  >
                    {showRefundButton ? <>원상복구</> : <>환불하기</>}
                  </Link>
                  <h4>환불 내역</h4>
                  <div className="small-border"></div>
                  <span></span>
                  <ul>
                    {libraryDtoNoPage &&
                      libraryDtoNoPage.map((value: any) => (
                        <>
                          {value.requestRefund === "Y" && (
                            <li>
                              {value.refund === "Y" ? (
                                <span className="date">{value.refund}</span>
                              ) : (
                                <span
                                  className=""
                                  style={{
                                    backgroundColor: "#e615af",
                                    fontSize: "12px",
                                    width: "60px",
                                    display: "inline-block",
                                    marginTop: "5px",
                                    marginRight: "10px",
                                    float: "left",
                                    color: "#fff",
                                    padding: "2px 3px 2px 3px",
                                    lineHeight: "1.4em",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                  }}
                                >
                                  {value.refund}
                                </span>
                              )}

                              <Link to={`/user-refund/${value.lid}`}>
                                {value.pname}
                              </Link>
                            </li>
                          )}
                        </>
                      ))}
                  </ul>

                  {/* 환불 모달-버튼 */}
                  <a
                    type="button"
                    className="btn-sub float-end me-5 mt-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                  >
                    환불 내역 전체보기
                  </a>
                  {/* 환불 모달 버튼 끝 */}

                  {/* 환불 모달 */}
                  <div
                    className="modal fade"
                    id="exampleModal2"
                    tabIndex={-1}
                    aria-labelledby="exampleModalLabel2"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel2"
                          >
                            {userDto.name}님의 환불내역
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div
                          className="modal-body"
                          style={{ whiteSpace: "pre" }}
                        >
                          <div
                            className="modal-body"
                            style={{
                              whiteSpace: "pre",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {/* 이전 월로 이동 버튼 */}
                            <button
                              onClick={moveToPreviousMonthRefund}
                              className="btn-main me-3"
                            >
                              &lt;&lt;
                            </button>

                            {/* 연도 및 월 표시 */}
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                              }}
                            >
                              <strong>
                                {selectedDateRefund.toLocaleDateString(
                                  "ko-KR",
                                  {
                                    year: "numeric",
                                  }
                                )}
                              </strong>
                              {selectedDateRefund.toLocaleDateString("ko-KR", {
                                month: "long",
                              })}
                            </div>

                            {/* 다음 월로 이동 버튼 */}
                            <button
                              onClick={moveToNextMonthRefund}
                              className="btn-main ms-3"
                            >
                              &gt;&gt;
                            </button>
                          </div>

                          <div
                            className="widget widget-post"
                            style={{ listStyle: "none" }}
                          >
                            {libraryDtoNoPage &&
                              libraryDtoNoPage
                                .filter(
                                  (value: any) => value.requestRefund === "Y"
                                )
                                .filter(
                                  (value: any) =>
                                    new Date(value.refundTime).getFullYear() ===
                                      selectedDateRefund.getFullYear() &&
                                    new Date(value.refundTime).getMonth() ===
                                      selectedDateRefund.getMonth()
                                )
                                .map((value: any) => (
                                  <React.Fragment key={value.lid}>
                                    <li>
                                      {value.refund === "Y" ? (
                                        <span style={{ color: "green" }}>
                                          <a>
                                            환불처리 시간 :{" "}
                                            {new Date(
                                              value.refundTime
                                            ).toLocaleDateString("ko-KR", {
                                              year: "numeric",
                                              month: "long",
                                              day: "numeric",
                                            })}
                                          </a>
                                          <span className="date">
                                            {value.refund}
                                          </span>
                                          환불처리 완료
                                        </span>
                                      ) : (
                                        <span>
                                          <span
                                            className=""
                                            style={{
                                              backgroundColor: "#e615af",
                                              fontSize: "12px",
                                              width: "60px",
                                              display: "inline-block",
                                              marginTop: "5px",
                                              marginRight: "10px",
                                              float: "left",
                                              color: "#fff",
                                              padding: "2px 3px 2px 3px",
                                              lineHeight: "1.4em",
                                              fontWeight: "bold",
                                              textAlign: "center",
                                            }}
                                          >
                                            {value.refund}
                                          </span>
                                          환불처리 진행중
                                        </span>
                                      )}
                                      <br />
                                      <Link to={`/user-refund/${value.lid}`}>
                                        <span data-bs-dismiss="modal">
                                          {value.pname}
                                        </span>
                                      </Link>
                                    </li>
                                  </React.Fragment>
                                ))}
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn-main"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 환불 내역 끝 */}

                {/* 주의 사항 시작 */}
                <div className="widget widget-text">
                  <h4>주의 사항</h4>
                  <div className="small-border"></div>
                  <p className="small no-bottom">
                    환불한 게임은 다시 그 가격에 구매하지 못할수도 있습니다.{" "}
                    <br /> 일부 게임은 환불이 불가합니다. <br /> 추가적인
                    문의사항은 Q&A를 이용해주세요.
                  </p>
                </div>
                {/* 주의 사항 끝 */}

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
        </section>
        {/* 본문 끝 */}
      </div>
    </>
  );
}

export default UserLibrary;
