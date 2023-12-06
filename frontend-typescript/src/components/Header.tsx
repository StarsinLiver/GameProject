// TODO : Link 를 사용하면 랜더링 문제가 생김

import React, { useEffect, useState } from "react";
import customMarquee from "../assets/js/custom-marquee";
import customSwiper1 from "../assets/js/custom-swiper-1";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/store";
import { logout } from "../store/slices/auth";
import { Link, useNavigate } from "react-router-dom";
import ProductService from "../services/product/ProductService";

function Header() {
  useEffect(() => {
    customMarquee();
    customSwiper1();
  }, []);

  const navigate = useNavigate();

  // Todo : 공유 저장소 변수(state.변수명) 가져오기
  // Todo : 사용법 : useSelector((state) => {state.변수명})
  // Todo : 로그인 정보 상태 변수를 가져오고 싶음 (isLoggedIn : true / false)
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const [tags, setTags] = useState<Array<string>>([]);

  // Todo : 공유저장소 함수 가져오기
  // Todo : 불러오기    : useAppDispatch()
  // Todo : 함수 사용법 : dispatch(함수명)
  // Todo : 함수 사용법 : dispatch(login) , dispatch(logout)
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout())
      .unwrap()
      .then(() => {
        alert("로그아웃 되셨습니다.");
        navigate("/login");
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  return (
    <div>
      {/* <!-- header begin --> */}
      <header className="transparent">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex sm-pt10">
                <div className="de-flex-col">
                  <div className="de-flex-col">
                    {/* <!-- logo begin --> */}
                    <div id="logo">
                      <Link to="/">
                        <img
                          className="logo-main ms-6"
                          src={require(`../assets/images/logo.png`)}
                          alt=""
                          style={{width: "180px", height: "45px"}}
                        />
                        <img
                          className="logo-mobile"
                          src="images/logo-mobile.png"
                          alt=""
                        />
                      </Link>
                    </div>
                    {/* <!-- logo close --> */}
                  </div>
                </div>

                <div className="de-flex-col header-col-mid">
                  <ul id="mainmenu">
                    {/* 첫번째 메뉴 home/ homepage one ~ five */}
                    <li>
                      <Link className="menu-item" to="/">
                        Home
                      </Link>
                    </li>
                    {/* GameServers */}
                    <li>
                      <Link className="menu-item" to="/games">
                        Game
                      </Link>
                      <ul>
                        <li>
                          <Link className="menu-item" to="/games">
                            Game Collections
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-action">
                            Action Games
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-adventure">
                            Adventure Games
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-simulation">
                            Simulation Games
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-indi">
                            Indi Games
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-casual">
                            Casual Games
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-rpg">
                            RPG Games
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/game-tag-strategy">
                            Strategy Games
                          </Link>
                        </li>
                      </ul>
                    </li>

                    {/* Location */}
                    <li>
                      <Link className="menu-item" to="/location">
                        Location
                      </Link>
                    </li>
                    
                    {/* Support */}
                    <li>
                      <Link className="menu-item" to="#">
                        Support
                      </Link>
                      <ul>
                        <li>
                          <Link className="menu-item" to="/faq">
                            FAQ
                          </Link>
                        </li>
                        <li>
                          <Link className="menu-item" to="/contact">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* news */}
                    <li>
                      <Link className="menu-item" to="/news">
                        News
                      </Link>
                    </li>
                    {/* Company */}
                    <li>
                      <Link className="menu-item" to="#">
                        About
                      </Link>
                      <ul>
                        <li>
                          <Link className="menu-item" to="/about">
                            About Pages
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* More Pages */}
                    <li>
                      <Link className="menu-item" to="#">
                        More Pages
                      </Link>

                      {/* 로그인 , 로그아웃 , 회원가입 */}
                      <ul>
                        {isLoggedIn ? (
                          <>
                            <li>
                              <a className="menu-item" onClick={handleLogOut}>
                                Logout
                              </a>
                            </li>
                            {user?.role === "ROLE_ADMIN" && (
                              <>
                                {" "}
                                <li>
                                  <a
                                    className="menu-item"
                                    href="/control-panel"
                                  >
                                    Admin Product Service
                                  </a>
                                </li>
                                <li>
                                  <Link
                                    className="menu-item"
                                    to="/control-panel-modify"
                                  >
                                    Admin Product Modify
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="menu-item"
                                    to="/control-panel-refund"
                                  >
                                    Refund Request
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="menu-item"
                                    to="/control-panel-qna"
                                  >
                                    Qna Request
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="menu-item"
                                    to="/admin-library"
                                  >
                                    Admin Library
                                  </Link>
                                </li>
                              </>
                            )}
                            {user?.role === "ROLE_USER" && (
                              <>
                                {" "}
                                <li>
                                  <Link
                                    className="menu-item"
                                    to="/user-library"
                                  >
                                    User Library
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    className="menu-item"
                                    to="/user-qna-list"
                                  >
                                    Q & A
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/cart" className="menu-item">
                                    Cart
                                  </Link>
                                </li>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {" "}
                            <li>
                              <Link className="menu-item" to="/login">
                                Login
                              </Link>
                            </li>
                            <li>
                              <Link className="menu-item" to="/register">
                                Register
                              </Link>
                            </li>
                          </>
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* 장바구니 , 로그인 */}
                <div className="de-flex-col">
                  <div className="menu_side_area">
                    {isLoggedIn && user?.role == "ROLE_USER" && (
                      <Link to="/user-library" className="btn-line">
                        User Library
                      </Link>
                    )}

                    {isLoggedIn && user?.role == "ROLE_ADMIN" && (
                      <Link to="/admin-library" className="btn-line">
                        Admin Library
                      </Link>
                    )}

                    <span id="menu-btn"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- header close --> */}
    </div>
  );
}

export default Header;
