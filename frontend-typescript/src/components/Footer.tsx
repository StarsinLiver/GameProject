import React from "react";
import { useEffect } from "react";
import customMarquee from "../assets/js/custom-marquee";
import customSwiper1 from "../assets/js/custom-swiper-1";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

function Footer() {
  useEffect(() => {
    customMarquee();
    customSwiper1();
  }, []);

  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  
  return (
    <>
      {/* <!-- ` begin --> */}
      <footer style={{ backgroundColor: "black" }} className="overflow-hidden">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-4">
              <img src={require("../assets/images/logo.png")} alt="" />
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-6 col-sm-6">
                  <div className="widget">
                    <h5>Pages</h5>
                    <ul>
                      <li>
                        <a href="/games">전체 게임조회</a>
                      </li>
                      <li>
                        <a href="/news">뉴스룸</a>
                      </li>
                      <li>
                        <a href="/about">팀원 소개</a>
                      </li>
                      <li>
                        <a href="/faq">FAQ</a>
                      </li>
                      <li>
                        <a href="/location">Locations</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-6">
                  <div className="widget">
                    <h5>관련사이트</h5>
                    <ul>
                      <li>
                        <a href="https://store.steampowered.com/?l=koreana">Steam</a>
                      </li>
                      <li>
                        <a href="https://directg.net/main/main.html">다이렉트 게임즈</a>
                      </li>
                      <li>
                        <a href="https://store.epicgames.com/ko/">에픽게임즈</a>
                      </li>
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {!isLoggedIn && (
            <div className="col-lg-3">
              <div className="widget">
                <h5>JOIN</h5>

                <div className="spacer-10"></div>
                <small>저희 사이트에 가입하시고 <br /> 다양한 게임 정보를 얻어가세요!</small>
                <a href="/register" className="btn-line mt-3">
                  회원가입하기
                </a>
                <div className="spacer-30"></div>
              </div>
            </div>
          )}
          </div>
        </div>
        <div className="subfooter">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-6">
                Copyright 2023 - Playhost by Designesia
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- footer close --> */}
    </>
  );
}

export default Footer;
