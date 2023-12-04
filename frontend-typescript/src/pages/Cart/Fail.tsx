import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from '@mui/material';
import designesis from "../../assets/js/designesia";

  // 여백 넉넉하게 하기위해 스타일로 높이 추가

  let blank = {
    height : "100px"
  }

  let head = {
    height : '150px',
  };
  let text = {
    height : '200px',
  };


function Fail() {
  useEffect(()=> {
    designesis();
  },[])
    return (
    <div>
      <section className="jarallax">
        <img
          src={require("../../assets/images/background/galactic-oddsey.webp")}
          className="jarallax-img"
          alt=""
        />
        <div className="de-gradient-edge-top"></div>
        <div className="de-gradient-edge-bottom"></div>
        <div className="container z-1000">
          <div className="row align-items-center">
            <div style={blank}></div>
            <h1 className="mt-5 mb-5" style={head}>결제 실패</h1>
            <div className="mt-5 mb-5"><h4 style ={text}>결제시도중 오류 발생으로 결제가 실패되었습니다..</h4>
            </div>
            <div className="col-lg-12 offset-lg-first">
            <a className="btn-main mb-5" href="/cart">장바구니 화면으로 이동</a>
            </div>
          </div>

          <div className="spacer-double"></div>
        </div>
      </section>
    </div>
  );
}

export default Fail;
